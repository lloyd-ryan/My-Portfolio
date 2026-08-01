
import React from 'react';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleSocialClick = () => {
    toast({
      title: "Feature Not Implemented 🚧",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

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
    { icon: <Github size={20} />, name: 'GitHub', url: 'https://github.com/lloydryanreyes' },
    { icon: <Linkedin size={20} />, name: 'LinkedIn', url: 'https://linkedin.com/in/lloydryanreyes' },
    { icon: <Twitter size={20} />, name: 'Twitter', url: 'https://twitter.com/lloydryanreyes' },
  ];

  const contactInfo = [
    { icon: <Mail size={16} />, text: 'lloydryanreyes@email.com' },
    { icon: <Phone size={16} />, text: '+1 (555) 123-4567' },
    { icon: <MapPin size={16} />, text: 'San Francisco, CA' },
  ];

  return (
    <footer className="bg-[#0C0D0D] border-t border-white/10 pt-16 pb-8">
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
                <button
                  key={social.name}
                  onClick={handleSocialClick}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-accent-purple hover:border-accent-purple/50 hover:bg-accent-purple/10 transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </button>
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
                  <span className="text-sm">{info.text}</span>
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
            <div className="flex gap-6 text-sm">
              <button onClick={handleSocialClick} className="text-gray-500 hover:text-accent-purple transition-colors">
                Privacy Policy
              </button>
              <button onClick={handleSocialClick} className="text-gray-500 hover:text-accent-purple transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
