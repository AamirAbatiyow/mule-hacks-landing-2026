import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Users,
  Calendar,
  Trophy,
  LogOut,
  Menu,
  X,
  User,
  Code2,
  MessageSquare,
  FileText,
  Bell,
  QrCode,
  UserPlus,
  UserMinus,
  Send,
  ExternalLink,
  Award,
  DollarSign,
  HelpCircle,
  Building2,
} from 'lucide-react';
import QRCode from 'react-qr-code';
import {
  getAnnouncements,
  formatAnnouncementTime,
  type StoredAnnouncement,
} from '@/lib/hackathonStorage';
import { day1, day2 } from '@/data/schedule';

export function DashboardPage() {
  const [currentView, setCurrentView] = useState('checkin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'checkin', label: 'Check-In', icon: QrCode },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'team', label: 'My Team', icon: Users },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-brand">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full z-50 bg-[#000000]/90 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-white" />
            <span className="font-bold text-white">Mule Hacks</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-[#000000]/90 backdrop-blur-xl border-r border-white/10 pt-20"
          >
            <nav className="flex flex-col h-full">
              <div className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      currentView === item.id
                        ? 'bg-[#000000] text-white'
                        : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/5 hover:text-white transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-40 w-64 bg-[#000000]/90 backdrop-blur-xl border-r border-white/20">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Code2 className="w-8 h-8 text-white" />
              <span className="font-bold text-xl text-white">Mule Hacks</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  currentView === item.id
                    ? 'bg-[#000000] text-white shadow-lg'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/5 hover:text-white transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === 'checkin' && <CheckInView user={user} />}
              {currentView === 'announcements' && <AnnouncementsView />}
              {currentView === 'team' && <TeamView user={user} />}
              {currentView === 'resources' && <ResourcesView />}
              {currentView === 'profile' && <ProfileView user={user} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function CheckInView({ user }: { user: any }) {
  const qrValue = `MULEHACKS2026-${user?.email || 'user'}`;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl text-white mb-2">Event Check-In</h1>
        <p className="text-white/80">Show this QR code at registration</p>
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <QRCode
            value={qrValue}
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">Scan Code ID</p>
          <p className="text-gray-900 font-mono text-xs bg-gray-100 px-4 py-2 rounded-lg inline-block">
            {qrValue}
          </p>
        </div>
      </motion.div>

      <div className="bg-[#000000]/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-4">
        <h3 className="text-xl text-white mb-4">Your Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Name</p>
            <p className="text-white">{user?.name || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Email</p>
            <p className="text-white">{user?.email || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">University</p>
            <p className="text-white">{user?.university || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-1">Team</p>
            <p className="text-white">{user?.teamName || 'No team yet'}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#000000] rounded-xl p-6">
        <h3 className="text-white text-lg mb-2">Important Reminder</h3>
        <p className="text-white/90">
          Keep this QR code accessible during the event. You'll need it for check-in, meals, and swag pickup.
        </p>
      </div>
    </div>
  );
}

function AnnouncementsView() {
  const [announcements, setAnnouncements] = useState<StoredAnnouncement[]>(() => getAnnouncements());

  useEffect(() => {
    const sync = () => setAnnouncements(getAnnouncements());
    sync();
    window.addEventListener('mulehacks-storage', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('mulehacks-storage', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const [expandedAnnouncement, setExpandedAnnouncement] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  const handleAddComment = (announcementId: string) => {
    if (commentText[announcementId]?.trim()) {
      alert('Comment posted! (This is a demo - actual posting will be implemented)');
      setCommentText({ ...commentText, [announcementId]: '' });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl text-white mb-2">Announcements</h1>
        <p className="text-white/80">Stay updated with the latest news and updates</p>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#000000]/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:border-white/50 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl text-white mb-2">{announcement.title}</h3>
                <p className="text-white/90 mb-3">{announcement.message}</p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span>Posted by {announcement.author}</span>
                  <span>•</span>
                  <span>{formatAnnouncementTime(announcement.createdAt)}</span>
                </div>
              </div>
              <Bell className="w-5 h-5 text-white flex-shrink-0" />
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
              <button
                onClick={() =>
                  setExpandedAnnouncement(
                    expandedAnnouncement === announcement.id ? null : announcement.id
                  )
                }
                className="text-white hover:text-white/80 text-sm flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                {announcement.comments.length} Comments
              </button>

              <AnimatePresence>
                {expandedAnnouncement === announcement.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    {announcement.comments.map((comment, idx) => (
                      <div key={idx} className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm">{comment.author.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm mb-1">{comment.author}</p>
                            <p className="text-white/90 text-sm">{comment.message}</p>
                            <p className="text-white/70 text-xs mt-1">{comment.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-2 mt-3">
                      <input
                        type="text"
                        value={commentText[announcement.id] || ''}
                        onChange={(e) =>
                          setCommentText({ ...commentText, [announcement.id]: e.target.value })
                        }
                        placeholder="Add a comment..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddComment(announcement.id);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(announcement.id)}
                        className="bg-[#000000] hover:bg-[#000000] text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(187,0,0,0.5),0_0_30px_rgba(187,0,0,0.3)] hover:shadow-[0_0_25px_rgba(221,0,0,0.6),0_0_50px_rgba(221,0,0,0.4)]"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TeamView({ user }: { user: any }) {
  const [hasTeam, setHasTeam] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teamCode, setTeamCode] = useState('');

  const myTeam = {
    name: 'Code Crushers',
    code: 'CC2026',
    members: [
      { name: user?.name || 'You', role: 'Team Lead', email: user?.email },
      { name: 'Alex Johnson', role: 'Developer', email: 'alex@example.com' },
      { name: 'Sarah Williams', role: 'Designer', email: 'sarah@example.com' },
    ],
  };

  const otherTeams = [
    { name: 'Hack Heroes', members: 4, project: 'AI-powered task manager' },
    { name: 'Debug Dragons', members: 3, project: 'Smart home automation' },
    { name: 'Pixel Pirates', members: 4, project: 'Educational game platform' },
    { name: 'Code Warriors', members: 2, project: 'Health tracking app' },
  ];

  if (!hasTeam) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl sm:text-4xl text-white mb-2">My Team</h1>
          <p className="text-white/80">Form or join a team to collaborate</p>
        </div>

        <div className="bg-[#000000]/30 backdrop-blur-sm border border-white/20 rounded-xl p-12 text-center">
          <Users className="w-20 h-20 text-white/50 mx-auto mb-6" />
          <h3 className="text-2xl text-white mb-3">You're not on a team yet</h3>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Teams can have up to 4 members. Create a new team or join an existing one to start collaborating!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setShowCreateModal(true);
                setTimeout(() => {
                  alert('Team created! (Demo mode)');
                  setShowCreateModal(false);
                  setHasTeam(true);
                }, 1000);
              }}
              className="bg-[#000000] hover:bg-[#000000] text-white px-8 py-3 rounded-lg transition-all flex items-center gap-2 justify-center shadow-[0_0_20px_rgba(187,0,0,0.5),0_0_40px_rgba(187,0,0,0.3),0_0_60px_rgba(187,0,0,0.2)] hover:shadow-[0_0_30px_rgba(221,0,0,0.6),0_0_60px_rgba(221,0,0,0.4),0_0_80px_rgba(221,0,0,0.3)]"
            >
              <UserPlus className="w-5 h-5" />
              Create Team
            </button>
            <button
              onClick={() => {
                setShowJoinModal(true);
                setTimeout(() => {
                  if (teamCode) {
                    alert('Joined team! (Demo mode)');
                    setShowJoinModal(false);
                    setHasTeam(true);
                  }
                }, 1000);
              }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-lg transition-all flex items-center gap-2 justify-center"
            >
              <Users className="w-5 h-5" />
              Join Team
            </button>
          </div>

          {showJoinModal && (
            <div className="mt-6 p-6 bg-white/5 rounded-lg border border-white/10 max-w-md mx-auto">
              <p className="text-white mb-3">Enter Team Code</p>
              <input
                type="text"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value)}
                placeholder="e.g., CC2026"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          )}
        </div>

        <div className="bg-[#6b0000]/30 border border-white/20 rounded-xl p-6">
          <h3 className="text-white text-lg mb-2 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-white" />
            Team Tips
          </h3>
          <ul className="text-white/90 space-y-2 text-sm">
            <li>• Teams work best with diverse skill sets</li>
            <li>• Communicate your project idea clearly</li>
            <li>• Make sure all members can commit to the full 24 hours</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl text-white mb-2">My Team</h1>
        <p className="text-white/80">Collaborate and compete together</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#6b0000]/30 border border-white/20 rounded-xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl text-white mb-2">{myTeam.name}</h3>
              <p className="text-white">Team Code: {myTeam.code}</p>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to leave this team?')) {
                  alert('Left team! (Demo mode)');
                  setHasTeam(false);
                }
              }}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
            >
              <UserMinus className="w-4 h-4" />
              Leave Team
            </button>
          </div>

          <div className="space-y-3">
            {myTeam.members.map((member, idx) => (
              <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#000000] flex items-center justify-center">
                    <span className="text-white">{member.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white">{member.name}</p>
                    <p className="text-sm text-white/80">{member.role}</p>
                  </div>
                  {idx === 0 && (
                    <span className="bg-[#000000] text-white text-xs px-2 py-1 rounded">You</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-lg transition-all flex items-center gap-2 justify-center">
            <UserPlus className="w-5 h-5" />
            Invite Team Member
          </button>
        </div>

        <div className="bg-[#000000]/30 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h3 className="text-xl text-white mb-4">Other Teams</h3>
          <div className="space-y-3">
            {otherTeams.map((team, idx) => (
              <div key={idx} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white mb-1">{team.name}</p>
                    <p className="text-sm text-white/80 mb-2">{team.members} members</p>
                    <p className="text-sm text-white/90">{team.project}</p>
                  </div>
                  <Users className="w-5 h-5 text-white/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourcesView() {
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const resources = [
    {
      id: 'sponsors',
      title: 'Sponsors',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl text-white mb-4">Our Sponsors</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl text-white/90 mb-3">Platinum Sponsors</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {['TechCorp', 'InnovateLabs', 'CodeBase'].map((sponsor, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-lg p-6 text-center"
                  >
                    <p className="text-white text-xl">{sponsor}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl text-white/90 mb-3">Gold Sponsors</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {['StartupHub', 'DataStream', 'CloudNine', 'DevTools'].map((sponsor, i) => (
                  <div
                    key={i}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 text-center"
                  >
                    <p className="text-white">{sponsor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'schedule',
      title: 'Schedule',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl text-white mb-4">Event Schedule</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl text-white mb-4">Day 1 - October 3</h3>
              <div className="space-y-2">
                {day1.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-2 border-b border-white/5">
                    <span className="text-gray-400 whitespace-nowrap">{item.time}</span>
                    <span className="text-white">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl text-white mb-4">Day 2 - October 4</h3>
              <div className="space-y-2">
                {day2.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-2 border-b border-white/5">
                    <span className="text-gray-400 whitespace-nowrap">{item.time}</span>
                    <span className="text-white">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'prizes',
      title: 'Prizes',
      icon: Trophy,
      color: 'from-red-500 to-red-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl text-white mb-4">Prizes & Awards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { place: '1st Place', prize: '$5,000', icon: '🥇', color: 'from-red-400 to-red-600' },
              { place: '2nd Place', prize: '$3,000', icon: '🥈', color: 'from-gray-300 to-gray-500' },
              { place: '3rd Place', prize: '$2,000', icon: '🥉', color: 'from-orange-400 to-orange-600' },
            ].map((prize, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-red-500/20 hover:border-red-500 transition-all">
                <div className="text-5xl mb-4">{prize.icon}</div>
                <h3 className={`text-xl mb-2 bg-gradient-to-r ${prize.color} bg-clip-text text-transparent`}>
                  {prize.place}
                </h3>
                <p className="text-3xl text-white">{prize.prize}</p>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Best AI/ML Project', prize: '$1,000' },
              { title: 'Best Hardware Hack', prize: '$1,000' },
              { title: 'Best Beginner Project', prize: '$500' },
              { title: 'Most Creative Solution', prize: '$500' },
            ].map((special, i) => (
              <div
                key={i}
                className="bg-[#000000]/30 border border-white/20 rounded-lg p-4 flex justify-between hover:bg-red-500/20 hover:border-red-500 transition-all"
              >
                <span className="text-white">{special.title}</span>
                <span className="text-white">{special.prize}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: HelpCircle,
      color: 'from-red-500 to-red-600',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Who can participate?',
                a: 'Any high school or college student is welcome! Whether you\'re a first-time hacker or a seasoned pro, we\'d love to have you.',
              },
              {
                q: 'How much does it cost?',
                a: 'Mule Hacks is completely free! We\'ll provide meals, snacks, swag, and prizes.',
              },
              {
                q: 'What should I bring?',
                a: 'Bring your laptop, charger, and anything else you need to work on your project.',
              },
              {
                q: 'Do I need a team?',
                a: 'Teams can be up to 4 people. You can come with a team or form one at the event. Solo hackers are also welcome!',
              },
              {
                q: 'What can I build?',
                a: 'Anything! Web apps, mobile apps, games, AI/ML projects, developer tools, and more—the sky\'s the limit.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-red-500/20 hover:border-red-500 transition-all">
                <h3 className="text-lg text-white mb-2">{faq.q}</h3>
                <p className="text-white/80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  if (selectedResource) {
    const resource = resources.find((r) => r.id === selectedResource);
    if (resource) {
      return (
        <div className="space-y-6 max-w-6xl mx-auto">
          <button
            onClick={() => setSelectedResource(null)}
            className="text-white hover:text-white/80 flex items-center gap-2 transition-colors"
          >
            ← Back to Resources
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8"
          >
            {resource.content}
          </motion.div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl text-white mb-2">Resources</h1>
        <p className="text-white/80">Quick access to important hackathon information</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <motion.button
            key={resource.id}
            onClick={() => setSelectedResource(resource.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#000000]/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:border-white/50 transition-all group"
          >
            <div
              className={`w-16 h-16 rounded-full bg-[#000000] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
            >
              <resource.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg text-white mb-2">{resource.title}</h3>
            <p className="text-sm text-white/80 flex items-center justify-center gap-1">
              View Details
              <ExternalLink className="w-4 h-4" />
            </p>
          </motion.button>
        ))}
      </div>

      <div className="bg-[#000000] rounded-xl p-6">
        <h3 className="text-white text-lg mb-2">Need Help?</h3>
        <p className="text-white/90 mb-4">
          Can't find what you're looking for? Reach out to our team at hello@mulehacks.com
        </p>
        <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-all">
          Contact Support
        </button>
      </div>
    </div>
  );
}

function ProfileView({ user }: { user: any }) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl text-white">Profile</h1>
      <div className="bg-[#000000]/30 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-[#000000] flex items-center justify-center">
            <span className="text-3xl text-white">{user?.name?.charAt(0) || 'U'}</span>
          </div>
          <div>
            <h2 className="text-2xl text-white">{user?.name || 'User'}</h2>
            <p className="text-white/80">{user?.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-1">University</label>
            <p className="text-white">{user?.university || 'Not specified'}</p>
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-1">Major</label>
            <p className="text-white">{user?.major || 'Not specified'}</p>
          </div>
          <div>
            <label className="block text-white/80 text-sm mb-1">Year</label>
            <p className="text-white capitalize">{user?.year || 'Not specified'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
