import { useEffect, useState } from "react";
import { getTeams, type StoredTeam } from "@/lib/hackathonStorage";

export function TeamsList() {
  const [teams, setTeams] = useState<StoredTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getTeams();
        if (!cancelled) setTeams(list);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load teams");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl text-white mb-2">Teams</h2>
        <p className="text-white/70 text-sm">Teams stored in MongoDB Atlas.</p>
      </div>
      {loading ? (
        <p className="text-white/60 text-sm">Loading…</p>
      ) : error ? (
        <p className="text-red-300 text-sm">{error}</p>
      ) : teams.length === 0 ? (
        <p className="text-white/60 text-sm">No teams yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {teams.map((t) => (
            <div
              key={t.id}
              className="bg-black/30 border border-white/20 rounded-xl p-5 hover:border-white/40 transition-colors"
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="text-lg text-white font-medium">{t.name}</h3>
                <span className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded font-mono">
                  {t.code}
                </span>
              </div>
              {t.project && <p className="text-white/70 text-sm mb-3">{t.project}</p>}
              <p className="text-white/50 text-xs mb-2">Members ({t.memberEmails.length})</p>
              <ul className="text-sm text-white/80 space-y-1">
                {t.memberEmails.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
