import { useEffect, useState } from "react";
import { getRegisteredUsersForAdmin, type PublicUserRow } from "@/lib/hackathonStorage";

function toProfileUrl(value: string | undefined, baseUrl: string) {
  const trimmed = value?.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^(www\.|github\.com|linkedin\.com)/i.test(trimmed)) return `https://${trimmed}`;
  return `${baseUrl}${trimmed}`;
}

export function UsersList() {
  const [users, setUsers] = useState<PublicUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getRegisteredUsersForAdmin();
        if (!cancelled) setUsers(list);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load users");
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
        <h2 className="text-2xl text-white mb-2">Registered users</h2>
        <p className="text-white/70 text-sm">
          From MongoDB Atlas. Passwords are never shown.
        </p>
      </div>
      {loading ? (
        <p className="text-white/60 text-sm">Loading…</p>
      ) : error ? (
        <p className="text-red-300 text-sm">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/20 bg-black/30">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">University</th>
                <th className="p-3 font-medium">T-shirt</th>
                <th className="p-3 font-medium">Dietary</th>
                <th className="p-3 font-medium">Phone</th>
                <th className="p-3 font-medium">GitHub</th>
                <th className="p-3 font-medium">LinkedIn</th>
                <th className="p-3 font-medium">Onboarding</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-6 text-white/50 text-center">
                    No registered users yet.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const githubUrl = toProfileUrl(u.github, "https://github.com/");
                  const linkedinUrl = toProfileUrl(u.linkedin, "https://linkedin.com/in/");

                  return (
                    <tr key={u.email} className="border-b border-white/5 text-white/90">
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.name || "—"}</td>
                      <td className="p-3">{u.university || "—"}</td>
                      <td className="p-3">{u.shirtSize || "—"}</td>
                      <td className="p-3">{u.dietaryRestrictions || "—"}</td>
                      <td className="p-3">{u.phone || "—"}</td>
                      <td className="p-3">
                        {githubUrl ? (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                          >
                            GitHub
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3">
                        {linkedinUrl ? (
                          <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                          >
                            LinkedIn
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3">{u.hasCompletedOnboarding ? "Done" : "Pending"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
