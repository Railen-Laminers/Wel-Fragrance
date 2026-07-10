const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const { protect, adminOnly } = require("../middleware/auth");

const serializeTestimonial = (testimonial) => ({
  _id: testimonial._id,
  firstName: testimonial.firstName,
  lastName: testimonial.lastName,
  email: testimonial.email,
  profilePicture: testimonial.profilePicture,
  profilePictureName: testimonial.profilePictureName,
  profilePictureType: testimonial.profilePictureType,
  rating: testimonial.rating,
  message: testimonial.message,
  consent: testimonial.consent,
  status: testimonial.status,
  createdAt: testimonial.createdAt,
  updatedAt: testimonial.updatedAt,
});

router.get("/public", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: "Approved" }).sort({ createdAt: -1 });
    res.json(testimonials.map(serializeTestimonial));
  } catch (error) {
    res.status(500).json({ message: "Failed to load testimonials", error: error.message });
  }
});

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials.map(serializeTestimonial));
  } catch (error) {
    res.status(500).json({ message: "Failed to load testimonials", error: error.message });
  }
});

router.get("/:id", protect, adminOnly, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.json(serializeTestimonial(testimonial));
  } catch (error) {
    res.status(500).json({ message: "Failed to load testimonial", error: error.message });
  }
});

const normalizeProfilePicture = (profilePicture) => {
  if (!profilePicture || typeof profilePicture !== "string") {
    return "";
  }

  if (profilePicture.startsWith("data:")) {
    return profilePicture;
  }

  return "";
};

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      profilePicture,
      profilePictureName,
      profilePictureType,
      rating,
      message,
      consent,
    } = req.body;

    if (!firstName || !lastName || !email || !message || !rating) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (consent !== true) {
      return res.status(400).json({ message: "Consent is required to submit a testimonial" });
    }

    const savedProfilePicture = normalizeProfilePicture(profilePicture);

    const testimonial = await Testimonial.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      profilePicture: savedProfilePicture,
      profilePictureName: profilePictureName || "",
      profilePictureType: profilePictureType || "",
      rating: Number(rating),
      message: message.trim(),
      consent: true,
      status: "Pending",
    });

    res.status(201).json(serializeTestimonial(testimonial));
  } catch (error) {
    res.status(500).json({ message: "Failed to submit testimonial", error: error.message });
  }
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    const allowedUpdates = ["firstName", "lastName", "email", "profilePicture", "profilePictureName", "profilePictureType", "rating", "message", "consent", "status"];
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        testimonial[field] = req.body[field];
      }
    });

    await testimonial.save();
    res.json(serializeTestimonial(testimonial));
  } catch (error) {
    res.status(500).json({ message: "Failed to update testimonial", error: error.message });
  }
});

router.patch("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "A valid testimonial status is required" });
    }

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    testimonial.status = status;
    await testimonial.save();

    res.json(serializeTestimonial(testimonial));
  } catch (error) {
    res.status(500).json({ message: "Failed to update testimonial status", error: error.message });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete testimonial", error: error.message });
  }
});

module.exports = router;
