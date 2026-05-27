import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  formatAnnouncementTime,
  type StoredAnnouncement,
} from "@/lib/hackathonStorage";

export function AnnouncementManager() {
  const [items, setItems] = useState<StoredAnnouncement[]>(() => getAnnouncements());
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const refresh = () => setItems(getAnnouncements());

  useEffect(() => {
    const onStorage = () => refresh();
    window.addEventListener("mulehacks-storage", onStorage);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("mulehacks-storage", onStorage);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    addAnnouncement(title, message);
    setTitle("");
    setMessage("");
    refresh();
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this announcement?")) return;
    deleteAnnouncement(id);
    refresh();
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
          className="bg-[#6b0000] hover:bg-[#8b0000] text-white px-5 py-2 rounded-lg transition-colors shadow-[0_0_20px_rgba(107,0,0,0.4)]"
        >
          Publish
        </button>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg text-white">All announcements ({items.length})</h3>
        {items.length === 0 ? (
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
                  onClick={() => handleDelete(a.id)}
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
