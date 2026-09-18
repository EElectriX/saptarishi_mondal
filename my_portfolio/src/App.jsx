import React from 'react';
import Navbar from './components/Navbar';
import HeroAnimation from './components/HeroAnimation';
import Skill from './components/Skill';
import Project from './components/Project';
import Contact from './components/Contact';

// Note: About & Education are embedded inside HeroAnimation as scroll-driven panels.
// They transition in/out over the sticky canvas background as part of the hero scroll sequence.
// Skill, Project, and Contact remain as standard standalone sections below.

export default function App() {
  return (
    <div className="w-full min-h-screen bg-black text-white selection:bg-[#38bdf8]/30 selection:text-white">
      {/* Fixed Navigation Bar */}
      <Navbar />

      <main className="w-full">
        {/* Hero Section — includes About & Education as scroll-driven panels */}
        <HeroAnimation />

        {/* Anchor targets for nav scroll (section ids still needed) */}
        <div id="skill" />
        <Skill />

        <div id="project" />
        <Project />

        <div id="contact" />
        <Contact />
      </main>
    </div>
  );
}
