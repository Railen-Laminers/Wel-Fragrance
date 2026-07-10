const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const { protect, adminOnly } = require("../middleware/auth");

const serializeInquiry = (inquiry) => ({
  _id: inquiry._id,
  firstName: inquiry.firstName,
  lastName: inquiry.lastName,
  email: inquiry.email,
  facebookLink: inquiry.facebookLink,
  message: inquiry.message,
  consent: inquiry.consent,
  status: inquiry.status,
  createdAt: inquiry.createdAt,
  updatedAt: inquiry.updatedAt,
});

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries.map(serializeInquiry));
  } catch (error) {
    res.status(500).json({ message: "Failed to load inquiries", error: error.message });
  }
});

router.get("/:id", protect, adminOnly, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.json(serializeInquiry(inquiry));
  } catch (error) {
    res.status(500).json({ message: "Failed to load inquiry", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, facebookLink, message, consent } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (consent !== true) {
      return res.status(400).json({ message: "Consent is required to submit an inquiry" });
    }

    const inquiry = await Inquiry.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      facebookLink: facebookLink || "",
      message: message.trim(),
      consent: true,
      status: "New",
    });

    res.status(201).json(serializeInquiry(inquiry));
  } catch (error) {
    res.status(500).json({ message: "Failed to submit inquiry", error: error.message });
  }
});

router.patch("/:id/read", protect, adminOnly, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    inquiry.status = "Read";
    await inquiry.save();

    res.json(serializeInquiry(inquiry));
  } catch (error) {
    res.status(500).json({ message: "Failed to update inquiry", error: error.message });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete inquiry", error: error.message });
  }
});

module.exports = router;
