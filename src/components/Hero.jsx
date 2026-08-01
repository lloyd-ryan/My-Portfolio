
import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Mail, Download, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { assetUrl } from '@/lib/assets';

/* ── Typewriter ── */
const roles = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'Systems Architect',
  'Tech Innovator',
];
const useTypewriter = (words, speed = 80, pause = 1800) => {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, display.length + 1));
        if (display.length + 1 === word.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setDisplay(word.slice(0, display.length - 1));
        if (display.length === 0) { setDeleting(false); setIdx(i => i + 1); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [display, deleting, idx, words, speed, pause]);
  return display;
};

/* ── Floating Chip ── */
const Chip = ({ children, delay, className }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5, type: 'spring' }}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${className}`}
  >
    {children}
  </motion.span>
);

/* ── Particle dot ── */
const Particle = ({ style }) => (
  <motion.span
    className="absolute w-1.5 h-1.5 rounded-full bg-accent-purple/60 pointer-events-none"
    style={style}
    animate={{ opacity: [1, 0], scale: [1, 0], y: [0, -30] }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  />
);

const Hero = () => {
  const navigate = useNavigate();
  const role = useTypewriter(roles);

  /* Magnetic photo */
  const photoRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 120, damping: 20 });
  const y = useSpring(rawY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(y, [-20, 20], [6, -6]);
  const rotateY = useTransform(x, [-20, 20], [-6, 6]);

  const handleMouseMove = (e) => {
    const rect = photoRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * 0.25);
    rawY.set((e.clientY - cy) * 0.25);
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  /* Cursor particles */
  const [particles, setParticles] = useState([]);
  const particleTimer = useRef(null);
  const heroRef = useRef(null);
  const handleHeroMouseMove = (e) => {
    clearTimeout(particleTimer.current);
    particleTimer.current = setTimeout(() => { }, 100);
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const id = Date.now();
    setParticles(p => [...p.slice(-12), { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  useEffect(() => {
    const cleanup = setInterval(() => setParticles(p => p.filter(pt => Date.now() - pt.id < 900)), 200);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0C0D0D]"
    >
      {/* ── Gradient mesh bg ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent-purple/8 rounded-full blur-[140px] -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-700/6 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-accent-purple/20 to-transparent" />
        {/* grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#9372FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Cursor particles */}
      {particles.map(pt => (
        <Particle key={pt.id} style={{ left: pt.x, top: pt.y }} />
      ))}

      <div className="container mx-auto px-6 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* ── LEFT: Text Content ── */}
          <div className="order-2 lg:order-1">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent-purple/10 border border-accent-purple/30 rounded-full mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-[#c5b8ff] uppercase tracking-widest font-semibold">Available for New Projects</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="text-gray-500 text-sm uppercase tracking-[0.3em] mb-2 font-medium">Hi, I'm</p>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.1] mb-3 tracking-tight">
                <span className="block text-white">Lloyd Ryan</span>
                <span
                  className="block text-transparent bg-clip-text pb-3"
                  style={{ backgroundImage: 'linear-gradient(135deg, #9372FF 0%, #c084fc 50%, #818cf8 100%)' }}
                >
                  Reyes
                </span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-[2px] bg-accent-purple" />
              <p className="text-xl md:text-2xl font-medium text-gray-300">
                {role}
                <span className="inline-block w-[3px] h-6 bg-accent-purple ml-1 align-middle animate-pulse" />
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Crafting innovative digital ecosystems that bridge complex problems with elegant, scalable solutions.
              Specialised in full-stack development, AI/IoT integration, and modern web technologies.
            </motion.p>

            {/* Skill chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              <Chip delay={0.55} className="border-blue-500/30 bg-blue-500/10 text-blue-300">
                Laravel · PHP
              </Chip>
              <Chip delay={0.60} className="border-accent-purple/30 bg-accent-purple/10 text-purple-300">
                React · Vue
              </Chip>
              <Chip delay={0.65} className="border-amber-500/30 bg-amber-500/10 text-amber-300">
                Full-Stack
              </Chip>
              <Chip delay={0.70} className="border-teal-500/30 bg-teal-500/10 text-teal-300">
                MySQL · IoT
              </Chip>
              <Chip delay={0.75} className="border-sky-500/30 bg-sky-500/10 text-sky-300">
                Flutter · Dart
              </Chip>
              <Chip delay={0.80} className="border-rose-500/30 bg-rose-500/10 text-rose-300">
                Inertia.js
              </Chip>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={() => navigate('/projects')}
                size="lg"
                className="bg-accent-purple hover:bg-accent-purple/90 text-white font-bold px-8 py-6 text-base rounded-full group shadow-lg shadow-accent-purple/30 transition-all duration-300 hover:shadow-accent-purple/50 hover:scale-105"
              >
                View Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate('/contact')}
                size="lg"
                variant="outline"
                className="border-2 border-white/20 hover:border-accent-purple/60 hover:bg-accent-purple/10 text-white px-8 py-6 text-base rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 mt-8"
            >
              <span className="text-xs text-gray-600 uppercase tracking-widest">Connect</span>
              <div className="flex-1 h-px bg-white/10" />
              {[
                { icon: Github, href: 'https://github.com/lloyd-ryan', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/lloyd-ryan-reyes-32456b29a/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:lloydryanreyes@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-gray-400 hover:text-accent-purple hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Photo ── */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, type: 'spring', stiffness: 80 }}
              className="relative"
            >
              {/* Rotating border ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-18px] rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 60%, rgba(147,114,255,0.6) 80%, transparent 100%)',
                  filter: 'blur(6px)',
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-12px] rounded-full"
                style={{
                  background: 'conic-gradient(from 180deg, transparent 70%, rgba(192,132,252,0.4) 90%, transparent 100%)',
                  filter: 'blur(4px)',
                }}
              />

              {/* Photo card with 3D tilt */}
              <motion.div
                ref={photoRef}
                style={{ x, y, rotateX, rotateY, transformPerspective: 800 }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-accent-purple/20 cursor-none group"
              >
                <img
                  src={assetUrl('barong.jpg')}
                  alt="Lloyd Ryan Reyes in Barong Tagalog"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle colour overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent-purple/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute -right-4 top-10 md:-right-10 bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-2xl font-black text-white">2+</p>
                <p className="text-xs text-gray-400">Years Coding</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, type: 'spring' }}
                className="absolute -left-4 bottom-16 md:-left-10 bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 shadow-xl"
              >
                <p className="text-2xl font-black text-white">10+</p>
                <p className="text-xs text-gray-400">Projects Built</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, type: 'spring' }}
                className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-accent-purple/20 backdrop-blur-xl border border-accent-purple/40 rounded-full px-5 py-2 shadow-xl flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-accent-purple rounded-full animate-pulse" />
                <span className="text-xs text-purple-200 font-semibold whitespace-nowrap">Open to Opportunities</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-5 h-9 border-2 border-accent-purple/40 rounded-full flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-accent-purple rounded-full"
            />
          </motion.div>
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">Scroll</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
