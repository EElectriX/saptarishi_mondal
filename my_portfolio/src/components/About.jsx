import React from 'react';

/**
 * About content — rendered as a scroll panel inside HeroAnimation's sticky viewport.
 * No wrapper <section> here — the section wrapper is applied in HeroAnimation.
 */
export function AboutContent() {
  return (
    <div className="w-full min-h-full flex flex-col justify-center max-w-6xl mx-auto px-6 sm:px-10 py-8 lg:py-12">
      {/* Section Header */}
      <div className="mb-6 lg:mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#38bdf8] block mb-2">
          01. Narrative
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          About <span className="text-[#38bdf8]">Me</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Main Bio Text */}
        <div className="lg:col-span-7 space-y-5 text-gray-300 text-lg leading-relaxed">
          <p className="text-xl sm:text-2xl font-light text-white leading-snug">
            I am a{' '}
            <strong className="font-semibold text-[#38bdf8]">
              Creative Director & Visual Storyteller
            </strong>{' '}
            focused on cinematic imagery, commercial photography, and brand world-building.
          </p>
          <p>
            With over a decade behind the camera and in the creative chair, I sculpt light and
            narrative to deliver high-impact visual experiences. From concept development to the
            final frame, my work bridges raw human emotion with striking contemporary aesthetic
            precision.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-white">8+</span>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">
                Years Experience
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#38bdf8]">120+</span>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">
                Projects Directed
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-white">15+</span>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">
                Awards & Honors
              </span>
            </div>
          </div>
        </div>

        {/* Highlights Card */}
        <div className="lg:col-span-5">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 backdrop-blur-sm space-y-5 shadow-2xl">
            <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
              Creative Pillars
            </h3>
            {[
              {
                title: 'Cinematic Visual Language',
                desc: 'Mastery over dynamic range, color harmony, and composition engineered for lasting emotional imprint.',
              },
              {
                title: 'End-to-End Creative Direction',
                desc: 'Guiding lighting directors, set designers, and post-production artists into a cohesive vision.',
              },

            ].map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="font-semibold text-white text-base">{p.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Standard standalone About section for direct use in App.jsx
 * (kept for non-animated builds / fallback)
 */
export default function About() {
  return (
    <section id="about" className="relative bg-[#08090d] text-white border-t border-white/5 overflow-hidden">
      <AboutContent />
    </section>
  );
}
