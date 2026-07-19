import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  formatAnnouncementTime,
  getRegisteredUsersForAdmin,
  type StoredAnnouncement,
} from "@/lib/hackathonStorage";
import { sendAnnouncementEmail } from "@/lib/email";

export function AnnouncementManager() {
  const [items, setItems] = useState<StoredAnnouncement[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const list = await getAnnouncements();
      setItems(list);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    const nextTitle = title.trim();
    const nextMessage = message.trim();

    try {
      await addAnnouncement(nextTitle, nextMessage);
      setTitle("");
      setMessage("");
      await refresh();
    } catch (error) {
      setEmailStatus(error instanceof Error ? error.message : "Failed to publish announcement.");
      return;
    }

    let recipients: string[] = [];
    try {
      recipients = (await getRegisteredUsersForAdmin()).map((user) => user.email).filter(Boolean);
    } catch {
      recipients = [];
    }

    if (recipients.length === 0) {
      setEmailStatus("Announcement published. No registered emails to notify yet.");
      return;
    }

    setSendingEmail(true);
    const result = await sendAnnouncementEmail(nextTitle, nextMessage, recipients);
    setSendingEmail(false);

    if (result?.skipped) {
      setEmailStatus(
        `Announcement published. Email skipped until RESEND_API_KEY is configured (${recipients.length} recipients).`
      );
    } else if (result?.ok) {
      setEmailStatus(
        `Announcement published and sent to ${result.sent ?? recipients.length} attendees.`
      );
    } else {
      setEmailStatus("Announcement published, but email sending failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      await deleteAnnouncement(id);
      await refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete announcement.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl text-white mb-2">Announcements</h2>
        <p className="text-white/70 text-sm">
          Create and remove announcements. Changes sync to the attendee dashboard.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="bg-black/40 border border-white/20 rounded-xl p-6 space-y-4"
      >
        <h3 className="text-lg text-white flex items-center gap-2">
          <Plus className="w-5 h-5" /> New announcement
        </h3>
        <div>
          <label className="block text-white/80 text-sm mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50"
            placeholder="Title"
          />
        </div>
        <div>
          <label className="block text-white/80 text-sm mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 resize-none"
            placeholder="Message"
          />
        </div>
        <button
          type="submit"
          disabled={sendingEmail}
          className="bg-[#6b0000] hover:bg-[#8b0000] text-white px-5 py-2 rounded-lg transition-colors shadow-[0_0_20px_rgba(107,0,0,0.4)]"
        >
          {sendingEmail ? "Publishing..." : "Publish"}
        </button>
        {emailStatus && <p className="text-white/70 text-sm">{emailStatus}</p>}
      </form>

      <div className="space-y-3">
        <h3 className="text-lg text-white">All announcements ({items.length})</h3>
        {loading ? (
          <p className="text-white/60 text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-white/60 text-sm">No announcements yet.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((a) => (
              <li
                key={a.id}
                className="bg-black/30 border border-white/15 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
              >
                <div>
                  <h4 className="text-white font-medium">{a.title}</h4>
                  <p className="text-white/80 text-sm mt-1 whitespace-pre-wrap">{a.message}</p>
                  <p className="text-white/50 text-xs mt-2">
                    {a.author} · {formatAnnouncementTime(a.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleDelete(a.id)}
                  className="shrink-0 inline-flex items-center gap-2 text-red-300 hover:text-red-200 text-sm border border-red-500/40 rounded-lg px-3 py-2 hover:bg-red-950/40"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
