import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    project: { type: String, trim: true, default: "" },
    memberEmails: {
      type: [String],
      default: [],
      validate: {
        validator(emails) {
          return Array.isArray(emails) && emails.length <= 4;
        },
        message: "Teams can have at most 4 members.",
      },
    },
  },
  { timestamps: true }
);

export function toStoredTeam(doc) {
  if (!doc) return null;
  const t = typeof doc.toObject === "function" ? doc.toObject() : doc;
  return {
    id: String(t._id),
    name: t.name,
    code: t.code,
    project: t.project || "",
    memberEmails: Array.isArray(t.memberEmails) ? t.memberEmails : [],
  };
}

export const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
