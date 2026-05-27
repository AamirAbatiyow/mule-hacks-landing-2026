import { useEffect, useState } from "react";
import { getRegisteredUsersForAdmin, type PublicUserRow } from "@/lib/hackathonStorage";

export function UsersList() {
  const [users, setUsers] = useState<PublicUserRow[]>([]);

  useEffect(() => {
    const load = () => setUsers(getRegisteredUsersForAdmin());
    load();
    window.addEventListener("mulehacks-storage", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("mulehacks-storage", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl text-white mb-2">Registered users</h2>
        <p className="text-white/70 text-sm">
          From localStorage (<code className="text-white/90">users</code>). Passwords are never shown.
        </p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/20 bg-black/30">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/60">
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">University</th>
              <th className="p-3 font-medium">Onboarding</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-white/50 text-center">
                  No registered users yet.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.email} className="border-b border-white/5 text-white/90">
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.name || "—"}</td>
                  <td className="p-3">{u.university || "—"}</td>
                  <td className="p-3">{u.hasCompletedOnboarding ? "Done" : "Pending"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
