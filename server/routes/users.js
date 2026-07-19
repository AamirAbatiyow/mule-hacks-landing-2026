import { Router } from "express";
import { User, toPublicUser } from "../models/User.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, requireAdmin, async (_req, res) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } })
      .sort({ createdAt: -1 })
      .lean();
    return res.json({
      ok: true,
      users: users.map((u) => toPublicUser(u)),
    });
  } catch (error) {
    console.error("List users failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to list users." });
  }
});

export default router;
