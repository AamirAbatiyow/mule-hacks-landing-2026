import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "./models/User.js";

export async function connectDb(uri) {
  if (!uri) {
    throw new Error("MONGODB_URI is required.");
  }
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

export async function ensureAdminUser() {
  const email = String(process.env.ADMIN_EMAIL || "admin@ucmo.edu")
    .trim()
    .toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";

  if (!email || !password) {
    console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set; skipping admin seed.");
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    if (!existing.isAdmin) {
      existing.isAdmin = true;
      await existing.save();
    }
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await User.create({
    email,
    passwordHash,
    name: "Admin",
    hasCompletedOnboarding: true,
    isAdmin: true,
  });
  console.log(`Seeded admin user: ${email}`);
}
