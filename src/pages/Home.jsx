
import React from 'react';
import { Helmet } from 'react-helmet';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import AboutSection from '@/components/About';
import ExpertiseSection from '@/components/ExpertiseSection';
import SocialProof from '@/components/SocialProof';
import CTA from '@/components/CTA';
import SectionAnimator from '@/components/SectionAnimator';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Lloyd Ryan Reyes Portfolio - Innovative Tech Solutions</title>
        <meta
          name="description"
          content="Full-stack software engineer specializing in web development, AI/ML solutions, IoT systems, and modern tech architecture. Building innovative solutions for complex problems."
        />
      </Helmet>

      <Hero />
      <SectionAnimator><Portfolio /></SectionAnimator>
      <AboutSection />
      <SectionAnimator><ExpertiseSection /></SectionAnimator>
      <SectionAnimator><SocialProof /></SectionAnimator>
      <SectionAnimator><CTA /></SectionAnimator>
    </>
  );
};

export default Home;
