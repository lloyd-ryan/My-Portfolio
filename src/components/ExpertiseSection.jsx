
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Network, Palette, Boxes } from 'lucide-react';

const ExpertiseSection = () => {
  const expertiseAreas = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Full-Stack Development',
      description: 'Building end-to-end web applications with modern frameworks and best practices for scalability and performance.',
      techStack: ['React', 'Node.js', 'TypeScript', 'Next.js', 'Express'],
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI/ML Solutions',
      description: 'Implementing intelligent systems with machine learning models, natural language processing, and predictive analytics.',
      techStack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'scikit-learn'],
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: 'IoT Systems',
      description: 'Developing connected device ecosystems with real-time data processing and cloud integration.',
      techStack: ['MQTT', 'WebSockets', 'AWS IoT', 'Raspberry Pi', 'Arduino'],
      color: 'from-teal-500 to-green-500',
      borderColor: 'border-teal-500/30',
      bgColor: 'bg-teal-500/10',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Creating intuitive, accessible interfaces with modern design principles and user-centered approaches.',
      techStack: ['Figma', 'TailwindCSS', 'Framer Motion', 'Material-UI', 'Storybook'],
      color: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-500/30',
      bgColor: 'bg-pink-500/10',
    },
    {
      icon: <Boxes className="w-8 h-8" />,
      title: 'System Architecture',
      description: 'Designing robust, scalable architectures using microservices, cloud infrastructure, and DevOps practices.',
      techStack: ['AWS', 'Docker', 'Kubernetes', 'Microservices', 'CI/CD'],
      color: 'from-indigo-500 to-blue-500',
      borderColor: 'border-indigo-500/30',
      bgColor: 'bg-indigo-500/10',
    },
  ];

  return (
    <section id="expertise" className="py-20 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Core <span className="text-accent-purple">Expertise</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Specialized skills and technologies I use to bring innovative solutions to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border ${area.borderColor} hover:border-opacity-60 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
              style={{
                boxShadow: '0 0 0 rgba(0,0,0,0)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 40px rgba(147, 114, 255, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
              }}
            >
              {/* Icon with Gradient Background */}
              <div className={`inline-flex p-4 rounded-xl ${area.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${area.color}`}>
                  {area.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors">
                {area.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {area.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {area.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Decorative Corner Element */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${area.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
