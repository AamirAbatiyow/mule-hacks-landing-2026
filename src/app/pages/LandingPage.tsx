import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trophy, Users, ChevronRight, Sparkles, Code2, Zap, Award, Clock, MapPin, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import organizers from '@/data/organizers.json';

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand">
      {/* Hero Section */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Code2 className="w-8 h-8 text-white" />
              <span className="font-bold text-xl text-white">Mule Hacks</span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex gap-6"
            >
              <a href="#schedule" className="text-white/80 hover:text-white transition-colors">Schedule</a>
              <a href="#prizes" className="text-white/80 hover:text-white transition-colors">Prizes</a>
              <a href="#sponsors" className="text-white/80 hover:text-white transition-colors">Sponsors</a>
              <a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/20 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <a
                  href="#schedule"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white/80 hover:text-white transition-colors py-2"
                >
                  Schedule
                </a>
                <a
                  href="#prizes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white/80 hover:text-white transition-colors py-2"
                >
                  Prizes
                </a>
                <a
                  href="#sponsors"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white/80 hover:text-white transition-colors py-2"
                >
                  Sponsors
                </a>
                <a
                  href="#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white/80 hover:text-white transition-colors py-2"
                >
                  FAQ
                </a>
                {/* Registration currently disabled - original link preserved for future use
                <Link to="/auth?mode=register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-[#6b0000] hover:bg-[#8b0000] text-white px-6 py-3 rounded-lg transition-all mt-2">
                    Register Now
                  </button>
                </Link>
                */}
                <button
                  disabled
                  className="w-full bg-[#6b0000] hover:bg-[#8b0000] text-white px-6 py-3 rounded-lg transition-all mt-2"
                >
                  Registration will open soon
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Tech Background Graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Floating Circuit Elements */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 left-[2%] md:left-[2%] w-72 h-56 border-2 border-white/20 rounded-lg"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-[3%] md:right-[3%] w-32 h-32 border-2 border-white/20 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-40 left-[25%] md:left-[15%] w-56 h-28 border-2 border-white/20"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-10 right-[18%] md:right-[8%] w-64 h-44 border-2 border-white/20 rotate-45"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-[50%] md:left-[40%] w-24 h-48 border-2 border-white/15 rounded-lg rotate-12"
          />

          {/* Semi-solid shapes - Red Triangles */}
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -8, 0]
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-32 left-[10%] md:left-[5%] w-64 h-36 bg-[#cf202e]/15 rotate-45"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          <motion.div
            animate={{
              y: [0, -18, 0],
              x: [0, -12, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-60 right-[10%] md:right-[5%] w-56 h-56 bg-white/5 border-2 border-white/15 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, 22, 0],
              rotate: [0, 12, 0]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[45%] right-[10%] md:right-[5%] w-20 h-28 bg-[#8b0000]/20"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-[20%] left-[8%] md:left-[3%] w-44 h-52 bg-[#b51c28]/18 rotate-30"
            style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)' }}
          />
          <motion.div
            animate={{
              y: [0, 18, 0],
              rotate: [0, -6, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[15%] right-[8%] md:right-[3%] w-48 h-24 bg-[#6b0000]/25 rotate-12"
            style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }}
          />
          <motion.div
            animate={{
              y: [0, -24, 0],
              x: [0, -8, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-[70%] md:right-[60%] w-28 h-28 bg-white/4 border-2 border-white/12 rounded-full"
          />

          {/* Additional Triangles */}
          <motion.div
            animate={{
              y: [0, -16, 0],
              rotate: [0, 8, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[60%] left-[25%] md:left-[15%] w-32 h-20 bg-[#cf202e]/12"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          <motion.div
            animate={{
              y: [0, 14, 0],
              x: [0, 12, 0]
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[25%] left-[60%] md:left-[55%] w-56 h-32 bg-[#8b0000]/16 rotate-[-20deg]"
            style={{ clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)' }}
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-[35%] right-[7%] md:right-[2%] w-36 h-44 bg-[#b51c28]/14"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
          />
          <motion.div
            animate={{
              y: [0, -12, 0],
              x: [0, -10, 0]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[70%] right-[55%] md:right-[45%] w-28 h-36 bg-[#6b0000]/18 rotate-[60deg]"
            style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)' }}
          />
          <motion.div
            animate={{
              y: [0, 16, 0],
              rotate: [0, 6, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-[50%] left-[75%] md:left-[70%] w-20 h-32 bg-[#cf202e]/20"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
          <motion.div
            animate={{
              y: [0, -18, 0],
              x: [0, 8, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[80%] left-[30%] md:left-[25%] w-40 h-28 bg-[#8b0000]/22 rotate-[-45deg]"
            style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-white">
              Mule Hacks 2026
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
              Build. Innovate. Transform the Future.
            </p>

            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join us for 24 hours of coding, creativity, and collaboration. Connect with fellow hackers, learn from industry experts, and bring your ideas to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {/* Registration currently disabled - original link preserved for future use
              <Link to="/auth?mode=register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#6b0000] hover:bg-[#8b0000] text-white px-8 py-4 rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(107,0,0,0.5),0_0_40px_rgba(107,0,0,0.3),0_0_60px_rgba(107,0,0,0.2)] hover:shadow-[0_0_30px_rgba(139,0,0,0.6),0_0_60px_rgba(139,0,0,0.4),0_0_80px_rgba(139,0,0,0.3)] transition-all"
                >
                  Register Now
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
              */}
              <button
                disabled
                className="bg-[#6b0000] hover:bg-[#8b0000] text-white px-8 py-4 rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(107,0,0,0.5),0_0_40px_rgba(107,0,0,0.3),0_0_60px_rgba(107,0,0,0.2)] hover:shadow-[0_0_30px_rgba(139,0,0,0.6),0_0_60px_rgba(139,0,0,0.4),0_0_80px_rgba(139,0,0,0.3)] transition-all"
              >
                Registration will open soon
              </button>

              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-white" />
                  <span>October 3-4, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-white" />
                  <span>Warrensburg, MO</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Users, label: "TBD", color: "from-red-500 to-orange-500" }, // "500+ Hackers"
                { icon: Trophy, label: "TBD", color: "from-orange-500 to-yellow-500" }, // "$10K Prizes"
                { icon: Clock, label: "TBD", color: "from-yellow-500 to-red-500" }, // "24 Hours"
                { icon: Zap, label: "TBD", color: "from-red-500 to-pink-500" }, // "30+ Mentors"
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg p-4"
                >
                  <div className={`w-12 h-12 rounded-full bg-black flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 relative overflow-hidden">
        {/* Animated background letters and numbers */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {[...Array(20)].map((_, i) => {
            const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            const randomSize = 40 + Math.random() * 80;
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomDelay = Math.random() * 5;
            const randomDuration = 10 + Math.random() * 10;

            return (
              <motion.div
                key={i}
                className="absolute text-white/30 font-mono font-bold will-change-transform"
                style={{
                  fontSize: `${randomSize}px`,
                  left: `${randomX}%`,
                  top: `${randomY}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.15, 0.3],
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  delay: randomDelay,
                  ease: "linear"
                }}
              >
                {randomChar}
              </motion.div>
            );
          })}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-white">Event Schedule</h2>
            <p className="text-white/80">Plan your hackathon weekend</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Day 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/30 border border-white/20 rounded-xl p-6"
            >
              <h3 className="text-2xl mb-6 text-white">Day 1 - October 3</h3>
              <div className="space-y-4">
                {/* Schedule TBD - original items preserved below for future use
                {[
                  { time: "9:00 AM", event: "Registration & Check-in" },
                  { time: "10:00 AM", event: "Opening Ceremony" },
                  { time: "11:00 AM", event: "Hacking Begins!" },
                  { time: "12:00 PM", event: "Lunch" },
                  { time: "2:00 PM", event: "Workshop: Intro to AI" },
                  { time: "6:00 PM", event: "Dinner" },
                  { time: "8:00 PM", event: "Mini Games & Activities" },
                  { time: "12:00 AM", event: "Midnight Snacks" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 text-white/90">
                    <span className="text-white font-mono min-w-24">{item.time}</span>
                    <span>{item.event}</span>
                  </div>
                ))}
                */}
                <p className="text-white/80 italic">TBD - Schedule coming soon</p>
              </div>
            </motion.div>

            {/* Day 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black/30 border border-white/20 rounded-xl p-6"
            >
              <h3 className="text-2xl mb-6 text-white">Day 2 - October 4</h3>
              <div className="space-y-4">
                {/* Schedule TBD - original items preserved below for future use
                {[
                  { time: "8:00 AM", event: "Breakfast" },
                  { time: "11:00 AM", event: "Hacking Ends" },
                  { time: "11:30 AM", event: "Project Submissions Due" },
                  { time: "12:00 PM", event: "Lunch" },
                  { time: "1:00 PM", event: "Judging Begins" },
                  { time: "3:00 PM", event: "Final Presentations" },
                  { time: "4:30 PM", event: "Awards Ceremony" },
                  { time: "5:30 PM", event: "Closing & Farewell" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 text-white/90">
                    <span className="text-white font-mono min-w-24">{item.time}</span>
                    <span>{item.event}</span>
                  </div>
                ))}
                */}
                <p className="text-white/80 italic">TBD - Schedule coming soon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section id="prizes" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-white">Prizes & Awards</h2>
            <p className="text-white/80">Compete for amazing prizes</p>
          </motion.div>

          {/* Prizes TBD - original podium and special categories preserved below for future use
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                place: "1st Place",
                prize: "$5,000",
                color: "from-yellow-400 to-yellow-600",
                icon: "🥇",
              },
              {
                place: "2nd Place",
                prize: "$3,000",
                color: "from-gray-300 to-gray-500",
                icon: "🥈",
              },
              {
                place: "3rd Place",
                prize: "$2,000",
                color: "from-orange-400 to-orange-600",
                icon: "🥉",
              },
            ].map((prize, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center hover:border-white/50 transition-all"
              >
                <div className="text-6xl mb-4">{prize.icon}</div>
                <h3 className="text-2xl mb-2 text-white">
                  {prize.place}
                </h3>
                <p className="text-4xl text-white mb-4">{prize.prize}</p>
                <p className="text-white/80">Cash Prize</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-2 gap-6"
          >
            {[
              { title: "Best AI/ML Project", prize: "$1,000" },
              { title: "Best Hardware Hack", prize: "$1,000" },
              { title: "Best Beginner Project", prize: "$500" },
              { title: "Most Creative Solution", prize: "$500" },
            ].map((special, i) => (
              <div
                key={i}
                className="bg-black/30 border border-white/20 rounded-lg p-6 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg text-white mb-1">{special.title}</h4>
                  <p className="text-white/80 text-sm">Special Category</p>
                </div>
                <div className="text-2xl text-white">{special.prize}</div>
              </div>
            ))}
          </motion.div>
          */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-12 text-center"
          >
            <p className="text-2xl text-white/80 italic">TBD - Prizes coming soon</p>
          </motion.div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-white">Our Sponsors</h2>
            <p className="text-white/80">Thank you to our amazing sponsors</p>
          </motion.div>

          <div className="space-y-8">
            {/* Platinum Sponsors */}
            <div>
              <h3 className="text-center text-xl text-white/90 mb-6">Platinum Sponsors</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {["TechCorp", "InnovateLabs", "CodeBase"].map((sponsor, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-8 flex items-center justify-center h-32 hover:border-white/50 transition-all"
                  >
                    <span className="text-2xl text-white">{sponsor}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gold Sponsors */}
            <div>
              <h3 className="text-center text-xl text-white/90 mb-6">Gold Sponsors</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {["StartupHub", "DataStream", "CloudNine", "DevTools"].map((sponsor, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 flex items-center justify-center h-24 hover:border-white/50 transition-all"
                  >
                    <span className="text-lg text-white">{sponsor}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-white/80">Got questions? We've got answers</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Who can participate?",
                a: "Any college student is welcome! Whether you're a first-time hacker or a seasoned pro, we'd love to have you.",
              },
              {
                q: "How much does it cost?",
                a: "Mule Hacks is completely free! We'll provide meals, snacks, swag, and prizes.",
              },
              {
                q: "What should I bring?",
                a: "Bring your laptop, charger, and any hardware you want to hack with. Don't forget a valid student ID!",
              },
              {
                q: "Do I need a team?",
                a: "Teams can be up to 4 people. You can come with a team or form one at the event. Solo hackers are also welcome!",
              },
              {
                q: "What can I build?",
                a: "Anything! Web apps, mobile apps, hardware projects, games, AI/ML projects - the sky's the limit.",
              },
              {
                q: "Will there be travel reimbursement?",
                a: "We offer travel reimbursement for students coming from other universities. Details will be sent after registration.",
              },
            ].map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Organizers Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl mb-4 text-white">Meet the Organizers</h2>
            <p className="text-white/80">The team making it all happen</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {organizers.map((organizer, i) => (
              <motion.div
                key={organizer.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:border-white/50 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">{organizer.avatar}</span>
                </div>
                <h3 className="text-lg text-white mb-1">{organizer.name}</h3>
                <p className="text-sm text-white/80">{organizer.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-black rounded-2xl p-12"
        >
          <h2 className="text-4xl mb-4 text-white">Ready to Join Mule Hacks?</h2>
          <p className="text-xl text-white/90 mb-8">
            Register now and be part of the most exciting hackathon in Missouri!
          </p>
          {/* Registration currently disabled - original link preserved for future use
          <Link to="/auth">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#6b0000] hover:bg-[#8b0000] text-white px-10 py-4 rounded-lg inline-flex items-center gap-2 shadow-[0_0_20px_rgba(107,0,0,0.5),0_0_40px_rgba(107,0,0,0.3),0_0_60px_rgba(107,0,0,0.2)] hover:shadow-[0_0_30px_rgba(139,0,0,0.6),0_0_60px_rgba(139,0,0,0.4),0_0_80px_rgba(139,0,0,0.3)] transition-all"
            >
              Register Now
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </Link>
          */}
          <button
            disabled
            className="bg-[#6b0000] hover:bg-[#8b0000] text-white px-10 py-4 rounded-lg inline-flex items-center gap-2 shadow-[0_0_20px_rgba(107,0,0,0.5),0_0_40px_rgba(107,0,0,0.3),0_0_60px_rgba(107,0,0,0.2)] hover:shadow-[0_0_30px_rgba(139,0,0,0.6),0_0_60px_rgba(139,0,0,0.4),0_0_80px_rgba(139,0,0,0.3)] transition-all"
          >
            Registration will open soon
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-white/80">
          <p className="mb-2">© 2026 Mule Hacks - University of Central Missouri</p>
          <p className="text-sm">Questions? Email us at hello@mulehacks.com</p>
        </div>
      </footer>
    </div>
  );
}

// Interactive FAQ Component
function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:border-white/50 transition-all"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left group"
      >
        <h3 className="text-lg text-white group-hover:text-[#d4af37] transition-colors pr-4">
          {faq.q}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-white/80 group-hover:text-[#d4af37] transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-white/80 border-t border-white/10 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

