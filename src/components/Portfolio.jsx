import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { assetUrl } from '@/lib/assets';

const Portfolio = () => (
  <section id="projects" className="py-24 bg-[#0C0D0D]">
    <div className="container mx-auto px-6">
      <div className="flex flex-wrap justify-between items-end gap-8 mb-16">
        <div className="w-full lg:w-1/2">
          <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-sm mb-4 uppercase">Portfolio</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight uppercase">
            Software built for <span className="text-accent-purple">real operations</span>
          </h2>
        </div>
        <div className="w-full lg:w-1/3">
          <p className="text-lg text-gray-400">
            Selected web and mobile systems for coffee innovation, institutional operations, publishing, inventory, and field services.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: (index % 3) * 0.08 }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-[#111318]"
          >
            <div className="aspect-[4/3] p-2 bg-[#0A0B0D]">
              <img className="w-full h-full object-contain rounded-xl" alt={project.title} src={assetUrl(project.image)} />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-accent-purple mb-2">{project.category}</p>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{project.description}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link to="/projects" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-accent-purple text-white font-semibold hover:bg-accent-purple/90 transition-colors">
          Explore all project details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default Portfolio;
