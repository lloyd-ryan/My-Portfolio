
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { assetUrl } from '@/lib/assets';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '/#' },
    { name: 'Projects', href: '/projects' },
    { name: 'About', href: '/about' },
    { name: 'Expertise', href: '/#expertise' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    
    if (href === '/contact' || href === '/projects' || href === '/about') {
      navigate(href);
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
    
    if (isOpen) {
      setIsOpen(false);
    }
  };
  
  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0C0D0D]/80 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-accent-purple/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <Link to="/" onClick={handleHomeClick} className="text-2xl font-bold text-white tracking-wider hover:text-accent-purple transition-colors">
            LLOYD RYAN REYES
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={handleSmoothScroll} 
                className="text-gray-300 hover:text-white transition-colors relative group font-medium"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-accent-purple transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Button asChild variant="outline" className="border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 hover:text-white rounded-full font-semibold">
              <a href={assetUrl('REYES - PORTFOLIO.pdf')} target="_blank" rel="noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Detailed Portfolio
              </a>
            </Button>
            <Button asChild
              className="bg-accent-purple/20 text-accent-purple hover:bg-accent-purple hover:text-white border-2 border-accent-purple rounded-full font-semibold group transition-all duration-300"
            >
              <a href={assetUrl('REYES - RESUME.pdf')} download>
                <Download className="mr-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-y-0.5" />
                Download Resume
              </a>
            </Button>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#0C0D0D] z-50 md:hidden"
          >
            <div className="container mx-auto px-6 h-full flex flex-col">
              <div className="flex justify-between items-center h-20">
                <Link to="/" onClick={handleHomeClick} className="text-2xl font-bold text-white tracking-wider">
                  LLOYD RYAN REYES
                </Link>
                <button onClick={() => setIsOpen(false)} className="text-white">
                  <X size={28} />
                </button>
              </div>
              
              <nav className="flex-grow flex flex-col justify-center items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={handleSmoothScroll}
                    className="text-3xl font-semibold text-gray-300 hover:text-accent-purple transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
              
              <div className="py-8 flex flex-col gap-4">
                <Button asChild variant="outline" className="border-white/15 text-white w-full text-lg py-6 rounded-full">
                  <a href={assetUrl('REYES - PORTFOLIO.pdf')} target="_blank" rel="noreferrer" onClick={() => setIsOpen(false)}>
                    <FileText className="mr-2 h-5 w-5" />
                    Detailed Portfolio
                  </a>
                </Button>
                <Button asChild
                  className="bg-accent-purple text-white hover:bg-accent-purple/90 w-full text-lg py-6 rounded-full group"
                >
                  <a href={assetUrl('REYES - RESUME.pdf')} download onClick={() => setIsOpen(false)}>
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
