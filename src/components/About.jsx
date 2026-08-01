import React from 'react';
import { motion } from 'framer-motion';
import { assetUrl } from '@/lib/assets';

const certificates = [
  {
    title: 'BrewNiversity POS Copyright',
    file: 'BrewNiversity POS Copyright.png',
    description: 'Copyright registration for the BrewNiversity sales, inventory, and performance tracking system.',
  },
  {
    title: 'CoffeeForLife',
    file: 'CoffeeForLife.png',
    description: 'Copyright certificate for the CoffeeForLife digital platform and newsroom experience.',
  },
  {
    title: 'ConeXus OMS',
    file: 'ConeXus OMS.png',
    description: 'Copyright certificate for the ConeXus operations management system.',
  },
];

const About = () => (
  <section id="about" className="py-24 bg-[#0C0D0D] overflow-hidden">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mb-14"
      >
        <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-sm mb-5 uppercase">
          Copyright Certificates
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white uppercase">
          Original systems, <span className="text-accent-purple">protected work</span>
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed">
          These certificates recognize the original software systems developed for coffee education,
          publishing, inventory, and operations management.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {certificates.map((certificate, index) => (
          <motion.article
            key={certificate.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: index * 0.1 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#111213]"
          >
            <div className="aspect-[210/297] bg-white p-2">
              <img
                className="w-full h-full object-contain"
                src={assetUrl(certificate.file)}
                alt={`${certificate.title} copyright certificate`}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{certificate.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{certificate.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default About;
