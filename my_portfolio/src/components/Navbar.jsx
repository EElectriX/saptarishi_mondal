import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // 1. Detect scroll position within Hero sequence
      const homeEl = document.getElementById('home');
      if (homeEl) {
        const rect = homeEl.getBoundingClientRect();
        // If the viewport intersects the hero sequence container
        if (rect.top <= 200 && rect.bottom > 200) {
          const totalScrollable = homeEl.offsetHeight - window.innerHeight;
          const p = totalScrollable > 0 ? -rect.top / totalScrollable : 0;
          if (p < 0.65) {
            setActiveSection('home');
          } else if (p < 0.88) {
            setActiveSection('about');
          } else {
            setActiveSection('education');
          }
          return;
        }
      }

      // 2. Detect standard sections below hero
      const sections = ['skill', 'project', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);

    // If target is inside the scroll-driven hero sequence
    const homeEl = document.getElementById('home');
    if (homeEl && (id === 'home' || id === 'about' || id === 'education')) {
      const totalScrollable = homeEl.offsetHeight - window.innerHeight;
      let targetProgress = 0;
      if (id === 'home') targetProgress = 0;
      else if (id === 'about') targetProgress = 0.78; // perfectly reveals About panel
      else if (id === 'education') targetProgress = 0.96; // perfectly reveals Education panel

      const targetY = homeEl.offsetTop + targetProgress * totalScrollable;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      return;
    }

    // Standard sections below
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' },
    { label: 'Skill', id: 'skill' },
    { label: 'Project', id: 'project' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-1.5 focus:outline-none cursor-pointer"
        >
          <span>Saptarshi</span>
          <span className="text-[#38bdf8]">Mondal</span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm tracking-wide transition-all relative py-1 focus:outline-none cursor-pointer ${
                  isActive
                    ? 'text-[#38bdf8] font-medium'
                    : 'text-gray-300 hover:text-white font-normal'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#38bdf8] rounded-full shadow-[0_0_8px_#38bdf8]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions: Get in touch & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('contact')}
            className="group flex items-center gap-2.5 sm:gap-3 bg-white text-gray-900 rounded-full pl-4 sm:pl-5 pr-1.5 py-1.5 font-medium text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] cursor-pointer"
          >
            <span>Get in touch</span>
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs sm:text-sm transition-transform duration-300 group-hover:translate-x-0.5 shadow-md">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/15"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-5 space-y-3 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left py-2 text-base transition-colors ${
                  isActive
                    ? 'text-[#38bdf8] font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
