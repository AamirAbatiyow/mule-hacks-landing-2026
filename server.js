import express from "express";
import path from "path";
import { Resend } from "resend";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "dist");
const port = Number(process.env.PORT) || 3000;
const emailFrom = process.env.EMAIL_FROM || "Mule Hacks <hello@mulehacks.com>";
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const app = express();

app.use(express.json());

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function uniqueEmails(emails = []) {
  if (!Array.isArray(emails)) return [];
  return [...new Set(emails.map((email) => String(email).trim()).filter(Boolean))];
}

app.post("/api/send-confirmation", async (req, res) => {
  const email = String(req.body?.email || "").trim();
  const name = String(req.body?.name || "").trim();

  if (!email) {
    return res.status(400).json({ ok: false, error: "Email is required." });
  }

  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Skipping registration confirmation email.");
    return res.json({ ok: true, skipped: true });
  }

  try {
    await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: "Registration confirmed for Mule Hacks 2026",
      html: `
        <h1>You're registered for Mule Hacks 2026!</h1>
        <p>Hi ${escapeHtml(name || "there")},</p>
        <p>Your registration is confirmed. Complete onboarding in your dashboard so organizers have your event details.</p>
        <p>We will send important announcements to this email as the event gets closer.</p>
      `,
      text: `You're registered for Mule Hacks 2026!\n\nHi ${name || "there"},\n\nYour registration is confirmed. Complete onboarding in your dashboard so organizers have your event details.\n\nWe will send important announcements to this email as the event gets closer.`,
    });

    return res.json({ ok: true, sent: 1 });
  } catch (error) {
    console.error("Failed to send registration confirmation email:", error);
    return res.status(500).json({ ok: false, error: "Failed to send email." });
  }
});

app.post("/api/send-announcement", async (req, res) => {
  const title = String(req.body?.title || "").trim();
  const message = String(req.body?.message || "").trim();
  const recipients = uniqueEmails(req.body?.recipients);

  if (!title || !message) {
    return res.status(400).json({ ok: false, error: "Title and message are required." });
  }

  if (recipients.length === 0) {
    return res.json({ ok: true, sent: 0 });
  }

  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Skipping announcement email.");
    return res.json({ ok: true, skipped: true, sent: 0, recipients: recipients.length });
  }

  try {
    const batchSize = 50;
    let sent = 0;

    for (let index = 0; index < recipients.length; index += batchSize) {
      const batch = recipients.slice(index, index + batchSize);
      await resend.emails.send({
        from: emailFrom,
        to: emailFrom,
        bcc: batch,
        subject: `Mule Hacks announcement: ${title}`,
        html: `
          <h1>${escapeHtml(title)}</h1>
          <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        `,
        text: `${title}\n\n${message}`,
      });
      sent += batch.length;
    }

    return res.json({ ok: true, sent });
  } catch (error) {
    console.error("Failed to send announcement email:", error);
    return res.status(500).json({ ok: false, error: "Failed to send announcement email." });
  }
});

app.use(express.static(distPath, { index: false }));

app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
