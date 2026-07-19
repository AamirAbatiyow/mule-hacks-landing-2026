import { Router } from "express";
import bcrypt from "bcryptjs";
import { User, toPublicUser } from "../models/User.js";
import { requireAuth, signToken } from "../middleware/auth.js";

const router = Router();

const PROFILE_FIELDS = [
  "name",
  "university",
  "major",
  "year",
  "phone",
  "dietaryRestrictions",
  "shirtSize",
  "github",
  "linkedin",
  "hasCompletedOnboarding",
];

router.post("/register", async (req, res) => {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Email and password are required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ ok: false, error: "Password must be at least 6 characters." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ ok: false, error: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      passwordHash,
      hasCompletedOnboarding: false,
      isAdmin: false,
    });

    const token = signToken(user);
    const publicUser = toPublicUser(user);

    // Fire-and-forget confirmation via sibling email route handler pattern
    if (typeof req.app.locals.sendConfirmationEmail === "function") {
      void req.app.locals.sendConfirmationEmail(email);
    }

    return res.status(201).json({ ok: true, token, user: publicUser });
  } catch (error) {
    console.error("Register failed:", error);
    return res.status(500).json({ ok: false, error: "Registration failed." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = String(req.body?.email || "")
      .trim()
      .toLowerCase();
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ ok: false, error: "Invalid credentials" });
    }

    const token = signToken(user);
    return res.json({ ok: true, token, user: toPublicUser(user) });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ ok: false, error: "Login failed." });
  }
});

router.get("/me", requireAuth, (req, res) => {
  return res.json({ ok: true, user: req.publicUser });
});

router.patch("/profile", requireAuth, async (req, res) => {
  try {
    const updates = {};
    for (const field of PROFILE_FIELDS) {
      if (req.body?.[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    Object.assign(req.user, updates);
    await req.user.save();
    return res.json({ ok: true, user: toPublicUser(req.user) });
  } catch (error) {
    console.error("Profile update failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to update profile." });
  }
});

export default router;
