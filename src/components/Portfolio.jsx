
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { assetUrl } from '@/lib/assets';
const projects = [{
  id: 1,
  slug: 'social-media-app',
  title: 'BrewNiversity POS',
  description: 'A point-of-sale platform created for BrewNiversity.',
  imgKey: 'BrewNiversity POS'
}, {
  id: 2,
  slug: 'fintech-dashboard',
  title: 'iStockCard',
  description: 'A modern inventory and stock-card management solution.',
  imgKey: 'iStockCard'
}, {
  id: 3,
  slug: 'digital-marketing-agency-site',
  title: 'CoffeeForLife NewsRoom',
  description: 'A newsroom and publishing experience for CoffeeForLife.',
  imgKey: 'CoffeeForLife NewsRoom'
}];
const Portfolio = () => {
  const navigate = useNavigate();
  const handleProjectClick = slug => {
    navigate(`/project/${slug}`);
  };
  return <section id="portfolio" className="py-24 bg-[#0C0D0D]">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-end gap-8 mb-16">
          <div className="w-full lg:w-1/2">
            <div className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-sm mb-4 uppercase">
              Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight uppercase">
              Explore our portfolio of <span className="text-accent-purple">creative solutions</span>
            </h2>
          </div>
          <div className="w-full lg:w-1/3">
            <p className="text-lg text-gray-400">
              Explore our portfolio full of creative solutions, from branding and web design to marketing campaigns that drive results.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleProjectClick('social-media-app')}>
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="BrewNiversity POS" src={assetUrl('BrewNiversity POS.png')} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">BrewNiversity POS</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleProjectClick('fintech-dashboard')}>
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="iStockCard" src={assetUrl('iStockCard.png')} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">iStockCard</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer" onClick={() => handleProjectClick('digital-marketing-agency-site')}>
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="CoffeeForLife NewsRoom" src={assetUrl('CoffeeForLife NewsRoom.png')} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">CoffeeForLife NewsRoom</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Portfolio;
