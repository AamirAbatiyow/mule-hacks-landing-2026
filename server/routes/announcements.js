import { Router } from "express";
import { Announcement, toStoredAnnouncement } from "../models/Announcement.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (_req, res) => {
  try {
    const list = await Announcement.find().sort({ createdAt: -1 });
    return res.json({
      ok: true,
      announcements: list.map(toStoredAnnouncement),
    });
  } catch (error) {
    console.error("List announcements failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to list announcements." });
  }
});

router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const title = String(req.body?.title || "").trim();
    const message = String(req.body?.message || "").trim();
    if (!title || !message) {
      return res.status(400).json({ ok: false, error: "Title and message are required." });
    }

    const doc = await Announcement.create({
      title,
      message,
      author: req.user.name || "Organizers",
      comments: [],
    });

    return res.status(201).json({ ok: true, announcement: toStoredAnnouncement(doc) });
  } catch (error) {
    console.error("Create announcement failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to create announcement." });
  }
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ ok: false, error: "Announcement not found." });
    }
    return res.json({ ok: true });
  } catch (error) {
    console.error("Delete announcement failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to delete announcement." });
  }
});

export default router;
