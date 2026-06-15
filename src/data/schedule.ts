export interface ScheduleItem {
  time: string;
  event: string;
}

export const day1: ScheduleItem[] = [
  { time: '1:30 PM', event: 'Check-In Opens' },
  { time: '2:00 PM', event: 'Opening Ceremony' },
  { time: '2:30 PM', event: 'Hacking Begins 🚀' },
  { time: '3:00 PM', event: 'Team Formation Session' },
  { time: '5:00 PM', event: 'Workshop #1' },
  { time: '6:00 PM', event: 'Dinner 🍕' },
  { time: '8:00 PM', event: 'Workshop #2 / Sponsor Tech Talk' },
  { time: '10:00 PM', event: 'Fun Event: Minute-to-Win-It Challenge 🎉' },
  { time: '12:00 AM', event: 'Midnight Snack 🌙' },
];

export const day2: ScheduleItem[] = [
  { time: '2:00 AM', event: 'Mario Kart / Smash Bros Tournament 🎮' },
  { time: '8:00 AM', event: 'Breakfast 🥯' },
  { time: '10:00 AM', event: 'Workshop #3' },
  { time: '12:00 PM', event: 'Lunch 🍽' },
  { time: '1:00 PM', event: 'Final Hour Warning' },
  { time: '2:00 PM', event: 'Hacking Ends 🛑' },
  { time: '2:00 PM', event: 'Project Presentations' },
  { time: '3:00 PM', event: 'Judging & Networking' },
  { time: '4:00 PM', event: 'Awards Ceremony 🏆' },
];
