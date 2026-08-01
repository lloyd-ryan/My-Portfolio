
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -20
  }
};
const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};
const ContactInfoBlock = ({
  title,
  lines,
  delay
}) => <motion.div initial={{
  opacity: 0,
  y: 20
}} animate={{
  opacity: 1,
  y: 0
}} transition={{
  duration: 0.5,
  delay
}} className="mb-8">
    <h3 className="uppercase text-sm text-gray-400 mb-2 tracking-widest">{title}</h3>
    <div className="space-y-1">
      {lines.map((line, index) => <p key={index} className="text-lg text-gray-200">{line}</p>)}
    </div>
  </motion.div>;
const Contact = () => {
  return <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <Helmet>
        <title>Connect With LLOYD RYAN REYES - Innovative Solutions</title>
        <meta name="description" content="Reach out to LLOYD RYAN REYES for innovative software engineering solutions and project inquiries." />
      </Helmet>
      <section className="bg-[#0C0D0D] text-white py-32 sm:py-40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column */}
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }}>
              <h1 className="text-6xl md:text-8xl font-bold text-white uppercase mb-6 leading-tight">
                Connect <span className="text-accent-purple">with me</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-sm mb-16">
                I'm LLOYD RYAN REYES. Let's build something extraordinary together!
              </p>
              <motion.div className="flex items-center gap-8" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.5,
              delay: 1
            }}>
                  <a href="https://www.linkedin.com/in/lloyd-ryan-reyes-32456b29a/" target="_blank" rel="noreferrer" className="text-lg text-gray-300 hover:text-accent-purple transition-colors duration-300">LinkedIn</a>
                  <a href="https://github.com/lloyd-ryan" target="_blank" rel="noreferrer" className="text-lg text-gray-300 hover:text-accent-purple transition-colors duration-300">GitHub</a>
                  <a href="https://www.facebook.com/lloydryan.reyes.28/" target="_blank" rel="noreferrer" className="text-lg text-gray-300 hover:text-accent-purple transition-colors duration-300">Facebook</a>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div>
                  <ContactInfoBlock title="Project Inquiries" lines={["lloydryanreyes@gmail.com"]} delay={0.4} />
                  <ContactInfoBlock title="Social" lines={["LinkedIn · GitHub · Facebook"]} delay={0.6} />
                </div>
                <div>
                  <ContactInfoBlock title="Location" lines={["Philippines"]} delay={0.5} />
                </div>
              </div>

              <motion.div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111213] shadow-2xl shadow-black/30" initial={{
              opacity: 0,
              y: 30
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.8
            }}>
                <iframe
                  title="Lloyd Ryan Reyes location on Google Maps"
                  src="https://www.google.com/maps?q=6.510870,125.247008&z=15&output=embed"
                  className="w-full h-[340px] md:h-[400px] border-0 grayscale-[20%] contrast-[95%]"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-white/10">
                  <div>
                    <p className="text-sm font-semibold text-white">My location</p>
                    <p className="text-xs text-gray-500">View the exact location on Google Maps</p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/gybqHoQEsZ71TvREA"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-sm font-semibold text-accent-purple hover:text-white transition-colors"
                  >
                    Open map ↗
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>;
};
export default Contact;
