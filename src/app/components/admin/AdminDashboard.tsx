import { useState } from "react";
import { useNavigate } from "react-router";
import {
  LayoutDashboard,
  Megaphone,
  Users,
  UsersRound,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { AnnouncementManager } from "./AnnouncementManager";
import { UsersList } from "./UsersList";
import { TeamsList } from "./TeamsList";

type AdminTab = "dashboard" | "announcements" | "users" | "teams";

const nav: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "users", label: "Users", icon: Users },
  { id: "teams", label: "Teams", icon: UsersRound },
];

export function AdminDashboard() {
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand flex flex-col lg:flex-row">
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/20 bg-black/40 backdrop-blur-md flex-shrink-0 lg:flex lg:flex-col">
        <div className="p-4 border-b border-white/10">
          <p className="text-white/50 text-xs uppercase tracking-wider">Mule Hacks</p>
          <p className="text-white font-semibold">Admin</p>
          <p className="text-white/60 text-sm truncate mt-1">{user?.email}</p>
        </div>
        <nav className="p-2 flex lg:flex-col gap-1 overflow-x-auto">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                tab === item.id
                  ? "bg-[#6b0000]/80 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-white/10 mt-auto hidden lg:block">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5"
          >
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-0 min-w-0">
        <header className="h-14 border-b border-white/20 flex items-center justify-between px-4 bg-black/20 shrink-0">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-white/70 hover:text-white text-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Site home
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/auth");
            }}
            className="lg:hidden text-white/70 text-sm"
          >
            Log out
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6 lg:p-10">
          {tab === "dashboard" && (
            <div className="max-w-3xl space-y-6">
              <h1 className="text-3xl text-white">Admin dashboard</h1>
              <p className="text-white/70">
                Use the sidebar to manage announcements, view registered users, and browse teams. Data is stored in{" "}
                <code className="text-white/90 bg-white/10 px-1 rounded">localStorage</code> for this demo.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTab("announcements")}
                  className="text-left bg-black/30 border border-white/20 rounded-xl p-5 hover:border-[#6b0000]/60 transition-colors"
                >
                  <Megaphone className="w-8 h-8 text-white mb-2" />
                  <h2 className="text-white font-medium">Announcements</h2>
                  <p className="text-white/60 text-sm mt-1">Create and delete posts for hackers.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setTab("users")}
                  className="text-left bg-black/30 border border-white/20 rounded-xl p-5 hover:border-[#6b0000]/60 transition-colors"
                >
                  <Users className="w-8 h-8 text-white mb-2" />
                  <h2 className="text-white font-medium">Users</h2>
                  <p className="text-white/60 text-sm mt-1">See everyone who registered.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setTab("teams")}
                  className="text-left bg-black/30 border border-white/20 rounded-xl p-5 hover:border-[#6b0000]/60 transition-colors sm:col-span-2"
                >
                  <UsersRound className="w-8 h-8 text-white mb-2" />
                  <h2 className="text-white font-medium">Teams</h2>
                  <p className="text-white/60 text-sm mt-1">View team roster and codes.</p>
                </button>
              </div>
            </div>
          )}
          {tab === "announcements" && <AnnouncementManager />}
          {tab === "users" && <UsersList />}
          {tab === "teams" && <TeamsList />}
        </main>
      </div>
    </div>
  );
}
