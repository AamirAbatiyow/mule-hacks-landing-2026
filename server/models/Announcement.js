import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true, default: "Organizers" },
  createdAt: { type: Date, default: Date.now },
  comments: { type: [commentSchema], default: [] },
});

export function toStoredAnnouncement(doc) {
  if (!doc) return null;
  const a = typeof doc.toObject === "function" ? doc.toObject() : doc;
  return {
    id: String(a._id),
    title: a.title,
    message: a.message,
    author: a.author,
    createdAt: new Date(a.createdAt).toISOString(),
    comments: Array.isArray(a.comments) ? a.comments : [],
  };
}

export const Announcement =
  mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);
