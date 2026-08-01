
import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    
    if (href === '/contact') {
      navigate('/contact');
    } else {
      const [path, id] = href.split('#');
      
      if (path === '/' && id) {
        navigate('/');
        setTimeout(() => {
          const targetElement = document.getElementById(id);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const quickLinks = [
    { name: 'Home', href: '/#' },
    { name: 'Projects', href: '/#projects' },
    { name: 'About', href: '/#about' },
    { name: 'Expertise', href: '/#expertise' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, name: 'GitHub', url: 'https://github.com/lloyd-ryan' },
    { icon: <Linkedin size={20} />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/lloyd-ryan-reyes-32456b29a/' },
    { icon: <span className="text-xl font-bold leading-none">f</span>, name: 'Facebook', url: 'https://www.facebook.com/lloydryan.reyes.28/' },
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: 'lloydryanreyes@gmail.com', href: 'mailto:lloydryanreyes@gmail.com' },
    { icon: <MapPin size={16} />, text: 'Philippines' },
  ];

  return (
    <footer className="bg-[#090A0A] border-t border-white/10 pt-14 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <p className="text-2xl font-bold text-white tracking-wider mb-4">
              <span className="text-accent-purple">&lt;</span>
              LLOYD RYAN REYES
              <span className="text-accent-purple">/&gt;</span>
            </p>
            <p className="text-gray-400 mb-6">
              Software Engineer crafting innovative solutions for the modern web.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-accent-purple hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-semibold text-white mb-6">Quick Links</p>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="text-gray-400 hover:text-accent-purple transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-accent-purple group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-semibold text-white mb-6">Services</p>
            <ul className="space-y-4">
              <li><span className="text-gray-400">Full-Stack Development</span></li>
              <li><span className="text-gray-400">AI/ML Solutions</span></li>
              <li><span className="text-gray-400">IoT Systems</span></li>
              <li><span className="text-gray-400">UI/UX Design</span></li>
              <li><span className="text-gray-400">System Architecture</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-semibold text-white mb-6">Get In Touch</p>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-400">
                  <div className="text-accent-purple">{info.icon}</div>
                  {info.href ? (
                    <a href={info.href} className="text-sm hover:text-white transition-colors">{info.text}</a>
                  ) : (
                    <span className="text-sm">{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} LLOYD RYAN REYES. All Rights Reserved.
            </p>
            <a href="mailto:lloydryanreyes@gmail.com" className="text-gray-500 hover:text-accent-purple transition-colors text-sm">
              lloydryanreyes@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
