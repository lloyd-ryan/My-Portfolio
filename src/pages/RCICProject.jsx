
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight, ExternalLink, Globe, ShoppingCart, Users, Coffee,
  BookOpen, Newspaper, FlaskConical, Monitor, ChevronLeft, ChevronRight,
  X, ZoomIn, Code2, Database, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { assetUrl } from '@/lib/assets';

/* ──────────────────────── data ──────────────────────── */
const BRAND = '#C8860A';
const BRAND_LIGHT = '#E5A020';
const BRAND_GLOW = 'rgba(200,134,10,0.15)';

const subsystems = [
  {
    key: 'cms',
    label: 'CMS',
    name: 'Content Management System',
    icon: Newspaper,
    color: '#C8860A',
    bg: 'rgba(200,134,10,0.08)',
    border: 'rgba(200,134,10,0.25)',
    description: 'A fully-featured editorial suite powering every page of the RCIC platform. Manages news articles, events, training schedules, research publications, and media assets — all through a role-based admin dashboard.',
    tech: ['Laravel', 'Blade', 'MySQL', 'TinyMCE', 'FilePond'],
    image: assetUrl('rcic-cms.png'),
    screen: assetUrl('news.png'),
  },
  {
    key: 'pos',
    label: 'POS',
    name: 'Point of Sale',
    icon: ShoppingCart,
    color: '#7C5C3E',
    bg: 'rgba(124,92,62,0.08)',
    border: 'rgba(124,92,62,0.25)',
    description: 'A touch-friendly POS system built for the RCIC Coffee Museum café and training lab. Handles product catalog, order-taking, receipts, and end-of-day sales reports — fully offline-capable.',
    tech: ['Laravel', 'Alpine.js', 'SQLite', 'Thermal Print API'],
    image: assetUrl('rcic-pos-cupscore.png'),
    screen: assetUrl('rcic website home page.png'),
  },
  {
    key: 'conexus',
    label: 'CONEXUS',
    name: 'Expert Network Hub',
    icon: Users,
    color: '#2E7D32',
    bg: 'rgba(46,125,50,0.08)',
    border: 'rgba(46,125,50,0.25)',
    description: 'A searchable directory of Subject Matter Experts (SMEs) supporting RCIC programs. Includes profiles, expertise tags, affiliation info, and a booking/inquiry flow for partnerships and consultations.',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'Algolia'],
    image: assetUrl('pool of experts.png'),
    screen: assetUrl('pool of experts.png'),
  },
  {
    key: 'cupscore',
    label: 'CUPSCORE',
    name: 'Coffee Grading Platform',
    icon: Coffee,
    color: '#8B3A0F',
    bg: 'rgba(139,58,15,0.08)',
    border: 'rgba(139,58,15,0.25)',
    description: 'A digital Q-grading / cupping platform that digitises the SCA cupping protocol. Cuppers score fragrance, aroma, body, acidity, and aftertaste — the system aggregates results into certified PDF reports.',
    tech: ['Laravel', 'React', 'Chart.js', 'PDF Generation'],
    image: assetUrl('rcic-ecosystem.png'),
    screen: assetUrl('research intelligence.png'),
  },
];

const screenshots = [
  { src: assetUrl('rcic website home page.png'), label: 'Homepage — Brewing Excellence Through Innovation' },
  { src: assetUrl('about rcic.png'), label: 'About RCIC — Empowering the Philippine Coffee Industry' },
  { src: assetUrl('news.png'), label: 'Newsroom — News & Articles' },
  { src: assetUrl('pool of experts.png'), label: 'CONEXUS — Subject Matter Experts Directory' },
  { src: assetUrl('research intelligence.png'), label: 'Research Intelligence — 316M+ Global Studies' },
  { src: assetUrl('museum.png'), label: 'Coffee Museum — Philippine Heritage Trail' },
  { src: assetUrl('brewniversity.png'), label: 'BrewNiversity — Barista Training & Certification' },
];

const stats = [
  { value: '5',    suffix: '',    label: 'Integrated Sub-Systems',    icon: Layers },
  { value: '316',  suffix: 'M+',  label: 'Research Records Indexed',  icon: FlaskConical },
  { value: '10',   suffix: '+',   label: 'Modules Built',             icon: Code2 },
  { value: '100',  suffix: '%',   label: 'Filipino Heritage',         icon: Coffee },
];

/* ──────────────────────── helpers ──────────────────────── */
const pageVariants = {
  initial: { opacity: 0 },
  in:      { opacity: 1 },
  out:     { opacity: 0 },
};

/* Parallax wrapper */
const ParallaxSection = ({ children, offset = 60 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rawY = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

/* ──────────────────────── main component ──────────────────────── */
const RCICProject = () => {
  const [activeTab, setActiveTab]       = useState('cms');
  const [lightbox, setLightbox]         = useState(null); // index or null
  const [galleryIdx, setGalleryIdx]     = useState(0);
  const [hoveredStat, setHoveredStat]   = useState(null);
  const heroRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* Scroll-driven hero parallax */
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroBgY = useTransform(heroProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.08]);

  const active = subsystems.find(s => s.key === activeTab);

  const prevScreenshot = () => setLightbox(i => (i - 1 + screenshots.length) % screenshots.length);
  const nextScreenshot = () => setLightbox(i => (i + 1) % screenshots.length);

  /* Keyboard nav for lightbox */
  useEffect(() => {
    const handler = (e) => {
      if (lightbox === null) return;
      if (e.key === 'ArrowRight') nextScreenshot();
      if (e.key === 'ArrowLeft') prevScreenshot();
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return (
    <motion.div
      initial="initial" animate="in" exit="out"
      variants={pageVariants} transition={{ duration: 0.6 }}
      className="bg-[#0C0D0D] text-white"
    >
      <Helmet>
        <title>RCIC Ecosystem — Regional Coffee Innovation Center · Lloyd Ryan Reyes</title>
        <meta name="description" content="A full-stack web ecosystem for the Regional Coffee Innovation Center — CMS, POS, CONEXUS, and CUPSCORE, built with Laravel and React." />
      </Helmet>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Parallax screenshot bg */}
        <motion.div
          style={{ y: heroBgY, scale: heroScale }}
          className="absolute inset-0 origin-center"
        >
          <img
            src={assetUrl('rcic website home page.png')}
            alt="RCIC Website"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,13,13,0.55) 0%, rgba(12,13,13,0.85) 60%, #0C0D0D 100%)' }} />
        </motion.div>

        {/* Amber glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${BRAND_GLOW} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(147,114,255,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-6 pb-24 pt-40">
          {/* Sub-system badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {['CMS', 'POS', 'CONEXUS', 'CUPSCORE'].map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i, type: 'spring' }}
                className="px-4 py-1.5 rounded-full text-xs font-black tracking-[0.2em] border backdrop-blur-sm"
                style={{ color: BRAND_LIGHT, borderColor: `rgba(200,134,10,0.35)`, background: `rgba(200,134,10,0.08)` }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl xl:text-9xl font-black tracking-tighter leading-none mb-6"
          >
            <span className="block text-white">RCIC</span>
            <span className="block" style={{ color: BRAND_LIGHT }}>Ecosystem</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap items-center gap-6 max-w-2xl"
          >
            <p className="text-gray-300 text-lg leading-relaxed flex-1 min-w-[240px]">
              A cohesive, full-stack digital platform empowering the{' '}
              <strong className="text-white">Regional Coffee Innovation Center</strong> — from content
              publishing to coffee grading, all in one ecosystem.
            </p>
            <div className="flex gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full font-bold px-6 group"
                style={{ background: BRAND, boxShadow: `0 0 24px rgba(200,134,10,0.35)` }}
              >
                <a href="#gallery" onClick={e => { e.preventDefault(); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  View Gallery <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-5 h-8 border-2 rounded-full flex items-start justify-center p-1.5"
              style={{ borderColor: `rgba(200,134,10,0.5)` }}
            >
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
            </motion.div>
            <span className="text-xs text-gray-600 uppercase tracking-widest">Scroll to explore</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section className="py-20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${BRAND_GLOW} 0%, transparent 70%)` }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredStat(i)}
                onHoverEnd={() => setHoveredStat(null)}
                className="text-center cursor-default relative group"
              >
                <motion.div
                  animate={{ scale: hoveredStat === i ? 1.08 : 1 }}
                  className="inline-flex flex-col items-center"
                >
                  <s.icon className="w-6 h-6 mb-3 transition-colors" style={{ color: hoveredStat === i ? BRAND_LIGHT : '#4B5563' }} />
                  <div className="text-4xl md:text-5xl font-black leading-none" style={{ color: BRAND_LIGHT }}>
                    {s.value}<span className="text-2xl">{s.suffix}</span>
                  </div>
                  <div className="text-gray-500 text-sm mt-2 font-medium">{s.label}</div>
                </motion.div>
                {hoveredStat === i && (
                  <motion.div
                    layoutId="stat-highlight"
                    className="absolute inset-[-16px] rounded-2xl border"
                    style={{ borderColor: `rgba(200,134,10,0.2)`, background: `rgba(200,134,10,0.04)` }}
                    transition={{ type: 'spring', bounce: 0.25 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CHALLENGE / SOLUTION ═══════════════════ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-black tracking-[0.3em] mb-4" style={{ color: BRAND }}>— THE CHALLENGE</p>
              <h2 className="text-3xl md:text-4xl font-black leading-tight mb-6">
                Unifying a fragmented coffee industry platform
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                RCIC needed a unified digital home covering public outreach, content publishing, on-site sales,
                expert networking, and scientific coffee grading — each with distinct user roles, workflows,
                and data models. Isolated tools would have created information silos and maintenance nightmares.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl">
                <ParallaxSection offset={30}>
                  <img src={assetUrl('about rcic.png')} alt="About RCIC — Empowering Philippine Coffee" className="w-full object-cover" />
                </ParallaxSection>
              </div>
              {/* Accent corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl" style={{ background: `linear-gradient(135deg, ${BRAND}, transparent)`, opacity: 0.3 }} />
            </motion.div>
          </div>

          {/* Solution strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-20 rounded-3xl p-8 md:p-12 border relative overflow-hidden"
            style={{ borderColor: `rgba(200,134,10,0.2)`, background: `linear-gradient(135deg, rgba(200,134,10,0.06) 0%, rgba(12,13,13,0) 60%)` }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${BRAND_GLOW} 0%, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
            <p className="text-xs font-black tracking-[0.3em] mb-4" style={{ color: BRAND }}>— THE SOLUTION</p>
            <h3 className="text-3xl md:text-4xl font-black mb-4">One ecosystem. Five tightly-integrated systems.</h3>
            <p className="text-gray-300 leading-relaxed text-lg max-w-3xl">
              A shared Laravel monorepo with a common authentication & permission layer, a unified design
              language derived from RCIC's warm-coffee brand identity, and clean API boundaries between
              sub-modules. Each system operates independently yet shares users, media, and event data
              through a central service layer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ SUB-SYSTEM EXPLORER ═══════════════════ */}
      <section className="py-24 bg-white/[0.015] border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-black tracking-[0.3em] mb-4" style={{ color: BRAND }}>— SUB-SYSTEMS</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Behind the scenes</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Four specialised admin tools, each addressing a distinct operational need of RCIC.</p>
          </motion.div>

          {/* Tab rail */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {subsystems.map((s, i) => (
              <motion.button
                key={s.key}
                onClick={() => setActiveTab(s.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 overflow-hidden"
                style={{
                  background: activeTab === s.key ? s.color : 'rgba(255,255,255,0.04)',
                  color: activeTab === s.key ? '#fff' : '#6B7280',
                  border: `1.5px solid ${activeTab === s.key ? s.color : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: activeTab === s.key ? `0 0 20px ${s.color}40` : 'none',
                }}
              >
                {s.label}
              </motion.button>
            ))}
          </div>

          {/* Tab panel */}
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border"
                style={{ borderColor: active.border }}
              >
                {/* Left: content */}
                <div className="p-8 md:p-12 flex flex-col justify-center" style={{ background: active.bg }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${active.color}20` }}>
                      <active.icon className="w-5 h-5" style={{ color: active.color }} />
                    </div>
                    <span className="text-xs font-black tracking-[0.25em]" style={{ color: active.color }}>{active.label}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{active.name}</h3>
                  <p className="text-gray-300 leading-relaxed mb-8 text-base">{active.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {active.tech.map(t => (
                      <span key={t} className="px-3 py-1.5 text-xs font-semibold rounded-full border"
                        style={{ color: active.color, borderColor: active.border, background: 'rgba(0,0,0,0.25)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: screenshot */}
                <div
                  className="relative overflow-hidden cursor-zoom-in min-h-[280px] group"
                  onClick={() => {
                    const idx = screenshots.findIndex(s => s.src === active.screen);
                    setLightbox(idx >= 0 ? idx : 0);
                  }}
                >
                  <motion.img
                    key={active.key + '-img'}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={active.screen}
                    alt={active.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════ SCREENSHOT GALLERY ═══════════════════ */}
      <section id="gallery" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-black tracking-[0.3em] mb-4" style={{ color: BRAND }}>— GALLERY</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Every screen, crafted</h2>
            <p className="text-gray-500">Click any screenshot to inspect it up close</p>
          </motion.div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {screenshots.map((shot, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                className={`relative cursor-zoom-in group overflow-hidden rounded-xl border border-white/8 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? '16/9' : '4/3' }}
                onClick={() => setLightbox(i)}
              >
                <img
                  src={shot.src}
                  alt={shot.label}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <p className="text-white text-xs font-semibold leading-snug">{shot.label}</p>
                </motion.div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ MAIN SITE MODULES ═══════════════════ */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-black tracking-[0.3em] mb-4" style={{ color: BRAND }}>— MAIN WEBSITE</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4">What the public sees</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { img: assetUrl('research intelligence.png'), icon: FlaskConical, title: 'Research Intelligence', desc: '316M+ global studies · 117M+ researchers · live scholarly data engine' },
              { img: assetUrl('brewniversity.png'), icon: BookOpen, title: 'BrewNiversity', desc: 'Online training courses and certification management for baristas' },
              { img: assetUrl('museum.png'), icon: Globe, title: 'Coffee Museum', desc: 'Digital exhibits and interactive heritage trail of Philippine coffee' },
              { img: assetUrl('news.png'), icon: Newspaper, title: 'Newsroom', desc: 'Articles, events, training announcements — all section-filtered' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl overflow-hidden border border-white/8 cursor-pointer hover:border-[#C8860A]/40 transition-all duration-500 hover:shadow-2xl"
                style={{ '--hover-shadow': `0 25px 60px rgba(200,134,10,0.15)` }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 25px 60px rgba(200,134,10,0.15)`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                onClick={() => setLightbox(screenshots.findIndex(s => s.src === item.img))}
              >
                <div className="aspect-video overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6 bg-gradient-to-b from-white/[0.03] to-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-5 h-5" style={{ color: BRAND }} />
                    <h3 className="font-black text-white text-lg">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TECH STACK ═══════════════════ */}
      <section className="py-24 bg-white/[0.015] border-y border-white/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-black tracking-[0.3em] mb-4" style={{ color: BRAND }}>— TECH STACK</p>
            <h2 className="text-4xl md:text-5xl font-black mb-12">Built with the right tools</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              'Laravel 11', 'PHP 8.3', 'MySQL', 'React',
              'Alpine.js', 'Blade', 'TailwindCSS', 'TinyMCE',
              'Chart.js', 'Livewire', 'Vite', 'Algolia',
              'FilePond', 'SQLite', 'PDF Generator',
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.12, borderColor: BRAND, color: BRAND_LIGHT }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="px-5 py-2.5 rounded-full text-sm font-semibold border border-white/10 bg-white/4 text-gray-300 cursor-default transition-colors duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${BRAND_GLOW} 0%, transparent 65%)` }} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Want something<br />
              <span style={{ color: BRAND_LIGHT }}>like this?</span>
            </h2>
            <p className="text-gray-400 text-xl mb-12 max-w-xl mx-auto">
              Let's build a cohesive digital ecosystem tailored to your organisation's unique needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild size="lg"
                className="rounded-full font-black text-lg py-7 px-12 group transition-all duration-300 hover:scale-105"
                style={{ background: BRAND, boxShadow: `0 0 32px rgba(200,134,10,0.4)` }}
              >
                <Link to="/contact">
                  Let's Talk <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild size="lg" variant="outline"
                className="rounded-full font-bold text-lg py-7 px-12 border-white/15 hover:border-white/30 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 group"
              >
                <Link to="/#projects">
                  <ArrowRight className="mr-2 w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Back to Projects
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ LIGHTBOX ═══════════════════ */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prevScreenshot(); }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
              className="max-w-6xl w-full mx-16 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src={screenshots[lightbox].src}
                alt={screenshots[lightbox].label}
                className="w-full object-cover"
              />
              <div className="bg-black/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
                <p className="text-white text-sm font-semibold">{screenshots[lightbox].label}</p>
                <p className="text-gray-500 text-xs">{lightbox + 1} / {screenshots.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); nextScreenshot(); }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-lg scrollbar-hide px-2">
              {screenshots.map((shot, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setLightbox(i); }}
                  className={`flex-shrink-0 w-16 h-10 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    i === lightbox ? 'border-[#C8860A] scale-110' : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={shot.src} alt={shot.label} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RCICProject;
