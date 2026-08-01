
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { Star, Quote, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SocialProof = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO at TechCorp',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      content: 'LLOYD RYAN REYES delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are outstanding.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager at InnovateLabs',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      content: 'Working with LLOYD RYAN REYES was a game-changer for our AI project. He brought innovative solutions and delivered ahead of schedule.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'CTO at DataFlow',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      content: 'LLOYD RYAN REYES\'s expertise in system architecture helped us scale from 100 to 10,000+ users seamlessly. Highly recommended!',
      rating: 5,
    },
  ];

  const stats = [
    { label: 'Projects Completed', value: 50, suffix: '+' },
    { label: 'Years Experience', value: 8, suffix: '+' },
    { label: 'Satisfied Clients', value: 35, suffix: '+' },
    { label: 'Code Commits', value: 5000, suffix: '+' },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, name: 'GitHub', url: '#' },
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', url: '#' },
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', url: '#' },
  ];

  const handleSocialClick = () => {
    toast({
      title: "Feature Not Implemented 🚧",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0C0D0D] via-[#111213] to-[#0C0D0D]">
      <div className="container mx-auto px-6">
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedStat key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client <span className="text-accent-purple">Testimonials</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            What clients say about working with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10 hover:border-accent-purple/30 transition-all duration-300 hover:scale-105"
            >
              <Quote className="w-8 h-8 text-accent-purple mb-4" />
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-accent-purple/30"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">Connect with me on social media</p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                onClick={handleSocialClick}
                variant="outline"
                size="lg"
                className="border-2 border-accent-purple/30 hover:bg-accent-purple/10 text-white rounded-full"
              >
                {social.icon}
                <span className="ml-2">{social.name}</span>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Animated Stat Component
const AnimatedStat = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      motionValue.set(stat.value);
    }
  }, [isInView, stat.value, motionValue, hasAnimated]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="text-center bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-6 border border-white/10 hover:border-accent-purple/30 transition-all duration-300"
    >
      <p className="text-4xl md:text-5xl font-bold text-accent-purple mb-2">
        {displayValue}{stat.suffix}
      </p>
      <p className="text-gray-400">{stat.label}</p>
    </motion.div>
  );
};

export default SocialProof;
