export type AnnouncementComment = {
  author: string;
  message: string;
  time: string;
};

export type StoredAnnouncement = {
  id: string;
  title: string;
  message: string;
  author: string;
  createdAt: string;
  comments: AnnouncementComment[];
};

export type StoredTeam = {
  id: string;
  name: string;
  code: string;
  project?: string;
  memberEmails: string[];
};

const LS_ANNOUNCEMENTS = "mulehacks_announcements";
const LS_TEAMS = "mulehacks_teams";
const LS_INITIALIZED = "mulehacks_storage_initialized";

export function notifyHackathonStorageChanged() {
  window.dispatchEvent(new Event("mulehacks-storage"));
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
  notifyHackathonStorageChanged();
}

const DEMO_ANNOUNCEMENTS: StoredAnnouncement[] = [
  {
    id: "seed-1",
    title: "Welcome to Mule Hacks 2026!",
    message:
      "Registration is open from 9:00 AM to 10:00 AM. Please have your QR code ready for check-in.",
    author: "Sarah Chen",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    comments: [
      { author: "Alex Johnson", message: "Where is the registration desk?", time: "1 hour ago" },
      {
        author: "Sarah Chen",
        message: "Main lobby entrance, you can't miss it!",
        time: "45 min ago",
      },
    ],
  },
  {
    id: "seed-2",
    title: "Workshop: Intro to Machine Learning",
    message:
      "Join us at 2:00 PM in Room 101 for an introductory workshop on ML with TensorFlow. Open to all skill levels!",
    author: "David Kim",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    comments: [
      {
        author: "Emily Rodriguez",
        message: "Do we need to bring our own laptops?",
        time: "3 hours ago",
      },
      {
        author: "David Kim",
        message: "Yes! Make sure to have Python installed.",
        time: "3 hours ago",
      },
    ],
  },
  {
    id: "seed-3",
    title: "Lunch is Served!",
    message:
      "Pizza and drinks are now available in the main hall. Please show your QR code to collect your meal.",
    author: "Marcus Rodriguez",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    comments: [],
  },
  {
    id: "seed-4",
    title: "Submission Deadline Reminder",
    message:
      "Projects must be submitted by 11:00 AM tomorrow. Make sure to test your demo before submitting!",
    author: "Emily Thompson",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    comments: [
      { author: "Jake Smith", message: "What's the submission format?", time: "45 min ago" },
      {
        author: "Emily Thompson",
        message: "Check your email for the submission form link!",
        time: "30 min ago",
      },
    ],
  },
];

const DEMO_TEAMS: StoredTeam[] = [
  {
    id: "team-1",
    name: "Hack Heroes",
    code: "HH2026",
    project: "AI-powered task manager",
    memberEmails: ["alex@example.com", "sam@example.com", "jamie@example.com", "taylor@example.com"],
  },
  {
    id: "team-2",
    name: "Debug Dragons",
    code: "DD2026",
    project: "Smart home automation",
    memberEmails: ["dev1@example.com", "dev2@example.com", "dev3@example.com"],
  },
  {
    id: "team-3",
    name: "Pixel Pirates",
    code: "PP2026",
    project: "Educational game platform",
    memberEmails: ["a@example.com", "b@example.com", "c@example.com", "d@example.com"],
  },
  {
    id: "team-4",
    name: "Code Warriors",
    code: "CW2026",
    project: "Health tracking app",
    memberEmails: ["x@example.com", "y@example.com"],
  },
];

function ensureInitialized() {
  if (localStorage.getItem(LS_INITIALIZED)) return;
  if (!localStorage.getItem(LS_ANNOUNCEMENTS)) {
    writeJson(LS_ANNOUNCEMENTS, DEMO_ANNOUNCEMENTS);
  }
  if (!localStorage.getItem(LS_TEAMS)) {
    localStorage.setItem(LS_TEAMS, JSON.stringify(DEMO_TEAMS));
  }
  localStorage.setItem(LS_INITIALIZED, "1");
  notifyHackathonStorageChanged();
}

export function getAnnouncements(): StoredAnnouncement[] {
  ensureInitialized();
  return readJson<StoredAnnouncement[]>(LS_ANNOUNCEMENTS, []);
}

export function setAnnouncements(list: StoredAnnouncement[]) {
  writeJson(LS_ANNOUNCEMENTS, list);
}

export function addAnnouncement(title: string, message: string) {
  const list = getAnnouncements();
  const next: StoredAnnouncement = {
    id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: title.trim(),
    message: message.trim(),
    author: "Organizers",
    createdAt: new Date().toISOString(),
    comments: [],
  };
  setAnnouncements([next, ...list]);
}

export function deleteAnnouncement(id: string) {
  setAnnouncements(getAnnouncements().filter((a) => a.id !== id));
}

export function getTeams(): StoredTeam[] {
  ensureInitialized();
  return readJson<StoredTeam[]>(LS_TEAMS, []);
}

export type PublicUserRow = {
  email: string;
  name?: string;
  university?: string;
  major?: string;
  year?: string;
  hasCompletedOnboarding: boolean;
};

export function getRegisteredUsersForAdmin(): PublicUserRow[] {
  ensureInitialized();
  const raw = readJson<Record<string, Record<string, unknown>>>("users", {});
  return Object.values(raw).map((row) => {
    const { email, name, university, major, year, hasCompletedOnboarding } = row as PublicUserRow & {
      password?: string;
    };
    return {
      email: String(email ?? ""),
      name,
      university,
      major,
      year,
      hasCompletedOnboarding: Boolean(hasCompletedOnboarding),
    };
  });
}

export function formatAnnouncementTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Recently";
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
