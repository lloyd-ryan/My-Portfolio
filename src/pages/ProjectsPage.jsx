import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { assetUrl } from '@/lib/assets';

const ProjectsPage = () => (
  <section className="min-h-screen bg-[#0C0D0D] text-white pt-32 pb-24">
    <Helmet>
      <title>Projects — Lloyd Ryan Reyes</title>
      <meta name="description" content="Software systems developed by Lloyd Ryan Reyes for coffee innovation, inventory, operations, publishing, and mobile services." />
    </Helmet>
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mb-16">
        <p className="text-sm uppercase tracking-[0.3em] text-accent-purple mb-4">Selected work</p>
        <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6">
          Systems built for <span className="text-accent-purple">real operations</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl">
          Web and mobile information systems developed for government, academic, and coffee-industry environments—with a focus on reliable workflows, useful data, and maintainable architecture.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: (index % 2) * 0.08 }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-[#111213]"
          >
            <div className="aspect-video bg-[#0A0B0D] p-3">
              <img src={assetUrl(project.image)} alt={project.title} className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="p-7">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent-purple mb-2">{project.category}</p>
                  <h2 className="text-2xl font-bold">{project.title}</h2>
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-gray-400 leading-relaxed mb-5">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">{technology}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsPage;

