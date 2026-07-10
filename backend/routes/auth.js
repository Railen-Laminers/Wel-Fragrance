const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/auth");
const { logActivity, createNotification } = require("../utils/audit");

const router = express.Router();

const serializeUser = (user) => ({
  id: user._id,
  firstName: user.firstName,
  middleInitial: user.middleInitial,
  lastName: user.lastName,
  email: user.email,
  role: user.role,
  businessName: user.businessName || "",
  emailAddresses: user.emailAddresses || [],
  contactNumbers: user.contactNumbers || [],
  instagramAccounts: user.instagramAccounts || [],
  facebookPages: user.facebookPages || [],
  businessLocations: user.businessLocations || [],
});

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "wel-fragrance-secret",
    { expiresIn: "7d" }
  );

const normalizeList = (value) => {
  if (!Array.isArray(value)) {
    return typeof value === "string"
      ? value
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
  }

  return value.map((item) => String(item).trim()).filter(Boolean);
};

router.post("/register", async (req, res) => {
  try {
    const { firstName, middleInitial, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please provide firstName, lastName, email and password" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      firstName,
      middleInitial,
      lastName,
      email: normalizedEmail,
      password,
      role: role === "admin" ? "admin" : "customer",
    });

    await logActivity({
      req,
      user,
      action: "Create",
      module: "Users",
      description: `Registered a new customer account for ${user.firstName} ${user.lastName}`,
      resourceId: user._id.toString(),
      metadata: { role: user.role },
    });

    res.status(201).json({
      message: "User registered successfully",
      user: serializeUser(user),
      token: signToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register-admin", protect, adminOnly, async (req, res) => {
  try {
    const { firstName, middleInitial, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please provide firstName, lastName, email and password" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      firstName,
      middleInitial,
      lastName,
      email: normalizedEmail,
      password,
      role: "admin",
    });

    await logActivity({
      req,
      user: req.user,
      action: "Create",
      module: "Users",
      description: `Created a new admin account for ${user.firstName} ${user.lastName}`,
      resourceId: user._id.toString(),
      metadata: { role: user.role },
    });

    res.status(201).json({
      message: "Admin registered successfully",
      user: serializeUser(user),
      token: signToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    await logActivity({
      req,
      user,
      action: "Login",
      module: "Auth",
      description: `${user.firstName} ${user.lastName} signed in`,
      resourceId: user._id.toString(),
      metadata: { role: user.role },
    });

    res.json({
      message: "Login successful",
      user: serializeUser(user),
      token: signToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/me", protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user: serializeUser(user) });
});

router.post("/logout", protect, async (req, res) => {
  try {
    await logActivity({
      req,
      user: req.user,
      action: "Logout",
      module: "Auth",
      description: `${req.user.firstName} ${req.user.lastName} signed out`,
      resourceId: req.user._id.toString(),
      metadata: { role: req.user.role },
    });

    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Failed to complete logout", error: error.message });
  }
});

router.get("/contact-info", async (req, res) => {
  try {
    const admin = await User.findOne({ role: "admin" }).sort({ createdAt: 1 });

    if (!admin) {
      return res.json({
        businessName: "Wel Fragrance Collection",
        emailAddresses: ["wel.fragrancecollection@gmail.com"],
        contactNumbers: ["+1 7782219055"],
        instagramAccounts: ["@Wel_FragranceCollection"],
        facebookPages: [],
        businessLocations: ["Farcon Ville, San Cristobal, Calamba Laguna"],
      });
    }

    res.json({
      businessName: admin.businessName || "Wel Fragrance Collection",
      emailAddresses: admin.emailAddresses || ["wel.fragrancecollection@gmail.com"],
      contactNumbers: admin.contactNumbers || ["+1 7782219055"],
      instagramAccounts: admin.instagramAccounts || ["@Wel_FragranceCollection"],
      facebookPages: admin.facebookPages || [],
      businessLocations: admin.businessLocations || ["Farcon Ville, San Cristobal, Calamba Laguna"],
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load contact information", error: error.message });
  }
});

router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      firstName,
      middleInitial,
      lastName,
      email,
      businessName,
      emailAddresses,
      contactNumbers,
      instagramAccounts,
      facebookPages,
      businessLocations,
    } = req.body;

    if (firstName !== undefined) user.firstName = firstName.trim();
    if (middleInitial !== undefined) user.middleInitial = middleInitial.trim();
    if (lastName !== undefined) user.lastName = lastName.trim();

    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        return res.status(400).json({ message: "Please enter a valid email address" });
      }

      const existingUser = await User.findOne({ email: normalizedEmail, _id: { $ne: user._id } });
      if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
      }

      user.email = normalizedEmail;
    }

    if (user.role === "admin") {
      if (businessName !== undefined) user.businessName = businessName.trim();
      if (emailAddresses !== undefined) user.emailAddresses = normalizeList(emailAddresses);
      if (contactNumbers !== undefined) user.contactNumbers = normalizeList(contactNumbers);
      if (instagramAccounts !== undefined) user.instagramAccounts = normalizeList(instagramAccounts);
      if (facebookPages !== undefined) user.facebookPages = normalizeList(facebookPages);
      if (businessLocations !== undefined) user.businessLocations = normalizeList(businessLocations);
    }

    await user.save();

    await logActivity({
      req,
      user,
      action: "Update",
      module: "Profile",
      description: `${user.firstName} ${user.lastName} updated profile information`,
      resourceId: user._id.toString(),
    });

    res.json({
      message: "Profile updated successfully",
      user: serializeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
});

router.put("/change-password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Current password, new password, and confirmation are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New password and confirmation must match" });
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    await logActivity({
      req,
      user,
      action: "Update",
      module: "Profile",
      description: `${user.firstName} ${user.lastName} changed their password`,
      resourceId: user._id.toString(),
    });

    await createNotification({
      recipientUserIds: [user._id],
      title: "Password updated",
      message: "Your password was changed successfully.",
      link: "/profile",
      type: "warning",
    });

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update password", error: error.message });
  }
});

module.exports = router;
