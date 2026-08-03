import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code2, Database, Smartphone, Award, Briefcase, GraduationCap } from 'lucide-react';

const highlights = [
  { icon: Code2, title: '6+ software systems', text: 'Web and mobile solutions developed for government and academic institutions.' },
  { icon: Award, title: '6 registered copyrights', text: 'Original software work protected through Philippine copyright registration.' },
  { icon: Briefcase, title: 'Applied experience', text: 'Student Assistant experience with the Davao del Sur Provincial Capitol and Regional Coffee Innovation Center.' },
  { icon: GraduationCap, title: 'BS Information Technology', text: 'Graduate of Davao del Sur State College, class of 2025–2026.' },
];

const skills = [
  ['Languages', 'PHP · Java · JavaScript · Dart'],
  ['Frameworks', 'Laravel · Flutter · Bootstrap · Inertia.js'],
  ['Data', 'MySQL · Database Design · Data Analytics'],
  ['Development', 'REST APIs · Git · GitHub · VS Code · Postman'],
  ['Design', 'System Analysis · UI/UX · Figma · Technical Documentation'],
  ['Specialties', 'Full-Stack Web · Mobile Apps · IoT · Digital Transformation'],
];

const AboutPage = () => (
  <section className="min-h-screen bg-[#0C0D0D] text-white pt-32 pb-24">
    <Helmet>
      <title>About — Lloyd Ryan Reyes</title>
      <meta name="description" content="Professional background, development philosophy, experience, and technical expertise of Lloyd Ryan Reyes." />
    </Helmet>
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start mb-20">
        <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-sm uppercase tracking-[0.3em] text-accent-purple mb-4">About me</p>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-7">
            Building software for <span className="text-accent-purple">real-world impact</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            I am Lloyd Ryan G. Reyes, a Bachelor of Science in Information Technology graduate passionate about developing reliable software solutions that improve organizational efficiency and solve practical problems.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            My experience includes web-based and mobile information systems built with Laravel, Flutter, PHP, Dart, JavaScript, and MySQL. I work across requirements analysis, database architecture, interface design, backend development, API integration, testing, deployment, and technical documentation.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-white/10 bg-[#111213] p-8">
          <Database className="w-9 h-9 text-accent-purple mb-5" />
          <h2 className="text-2xl font-bold mb-4">Development philosophy</h2>
          <p className="text-gray-400 leading-relaxed mb-5">
            Every successful solution begins with understanding users and the problems they encounter. I translate requirements into structured databases, clear workflows, and modular systems that can grow over time.
          </p>
          <p className="text-gray-400 leading-relaxed">
            My process follows Rapid Application Development through iterative prototyping, stakeholder feedback, testing, and continuous refinement.
          </p>
        </motion.div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {highlights.map(({ icon: Icon, title, text }) => (
          <article key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <Icon className="w-6 h-6 text-accent-purple mb-4" />
            <h2 className="font-bold text-lg mb-2">{title}</h2>
            <p className="text-sm text-gray-400 leading-relaxed">{text}</p>
          </article>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-3 mb-8">
          <Smartphone className="text-accent-purple" />
          <h2 className="text-3xl font-bold uppercase">Technical expertise</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/10 p-6">
              <p className="text-xs uppercase tracking-widest text-accent-purple mb-2">{label}</p>
              <p className="text-gray-300">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutPage;
