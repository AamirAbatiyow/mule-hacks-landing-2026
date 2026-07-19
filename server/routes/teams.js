import { Router } from "express";
import { Team, toStoredTeam } from "../models/Team.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

function randomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

router.get("/", requireAuth, async (_req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    return res.json({ ok: true, teams: teams.map(toStoredTeam) });
  } catch (error) {
    console.error("List teams failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to list teams." });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const email = req.user.email;
    const existing = await Team.findOne({ memberEmails: email });
    if (existing) {
      return res.status(409).json({
        ok: false,
        error: "You are already on a team.",
        team: toStoredTeam(existing),
      });
    }

    const name = String(req.body?.name || "").trim() || "My Team";
    const project = String(req.body?.project || "").trim();
    let code = String(req.body?.code || "")
      .trim()
      .toUpperCase();
    if (!code) code = randomCode();

    const team = await Team.create({
      name,
      code,
      project,
      memberEmails: [email],
    });

    return res.status(201).json({ ok: true, team: toStoredTeam(team) });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ ok: false, error: "Team code already in use." });
    }
    console.error("Create team failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to create team." });
  }
});

router.post("/join", requireAuth, async (req, res) => {
  try {
    const email = req.user.email;
    const code = String(req.body?.code || "")
      .trim()
      .toUpperCase();
    if (!code) {
      return res.status(400).json({ ok: false, error: "Team code is required." });
    }

    const already = await Team.findOne({ memberEmails: email });
    if (already) {
      return res.status(409).json({
        ok: false,
        error: "You are already on a team.",
        team: toStoredTeam(already),
      });
    }

    const team = await Team.findOne({ code });
    if (!team) {
      return res.status(404).json({ ok: false, error: "Team not found." });
    }
    if (team.memberEmails.length >= 4) {
      return res.status(400).json({ ok: false, error: "This team is full." });
    }

    team.memberEmails.push(email);
    await team.save();
    return res.json({ ok: true, team: toStoredTeam(team) });
  } catch (error) {
    console.error("Join team failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to join team." });
  }
});

router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ ok: false, error: "Team not found." });
    }

    const email = req.user.email;
    const isMember = team.memberEmails.includes(email);
    if (!isMember && !req.user.isAdmin) {
      return res.status(403).json({ ok: false, error: "Not a member of this team." });
    }

    if (req.body?.name !== undefined) {
      team.name = String(req.body.name).trim() || team.name;
    }
    if (req.body?.project !== undefined) {
      team.project = String(req.body.project).trim();
    }
    if (Array.isArray(req.body?.memberEmails) && req.user.isAdmin) {
      team.memberEmails = req.body.memberEmails
        .map((e) => String(e).trim().toLowerCase())
        .filter(Boolean)
        .slice(0, 4);
    }

    // Leave team: remove self from members
    if (req.body?.leave === true) {
      team.memberEmails = team.memberEmails.filter((e) => e !== email);
      if (team.memberEmails.length === 0) {
        await team.deleteOne();
        return res.json({ ok: true, team: null });
      }
    }

    await team.save();
    return res.json({ ok: true, team: toStoredTeam(team) });
  } catch (error) {
    console.error("Update team failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to update team." });
  }
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const deleted = await Team.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ ok: false, error: "Team not found." });
    }
    return res.json({ ok: true });
  } catch (error) {
    console.error("Delete team failed:", error);
    return res.status(500).json({ ok: false, error: "Failed to delete team." });
  }
});

export default router;
