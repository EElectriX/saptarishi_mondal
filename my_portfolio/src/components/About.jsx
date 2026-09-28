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
              Full-Stack Developer & ML Enthusiast
            </strong>{' '}
            pursuing B.Tech in Information Technology at Kalyani Government Engineering College.
          </p>
          <p>
            I architect and engineer modern web applications, combining intuitive, responsive interfaces with resilient backend architectures. My focus spans scalable full-stack development with <strong>React.js</strong>, <strong>Django</strong>, and <strong>Flask</strong>, alongside practical integration of Machine Learning and Deep Learning models (XGBoost, CNNs) for real-world impact.
          </p>
          <p className="text-base text-gray-400">
            Backed by a strong problem-solving foundation with 100+ LeetCode challenges solved, high-ranking competitive milestones (WBJEE JELET GMR 67), and proven production deployments, I build clean, high-performance software systems.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 pt-4 mt-4 border-t border-white/10">
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-white">GMR 67</span>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">
                WBJEE JELET Rank
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-[#38bdf8]">100+</span>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">
                LeetCode Solved
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-white">7.61</span>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">
                B.Tech CGPA
              </span>
            </div>
            <div>
              <span className="block text-3xl sm:text-4xl font-extrabold text-white">8.5</span>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-mono">
                Diploma CGPA
              </span>
            </div>
          </div>
        </div>

        {/* Highlights Card */}
        <div className="lg:col-span-5">
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 backdrop-blur-sm space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
              Core Engineering Pillars
            </h3>
            {[
              {
                title: 'Full-Stack Web Development',
                desc: 'Building responsive SPAs using React & Tailwind CSS, backed by robust RESTful APIs in Django & Flask.',
              },
              {
                title: 'Applied AI & Machine Learning',
                desc: 'Deploying predictive models (XGBoost) and Computer Vision architectures (CNNs) into production apps.',
              },
              {
                title: 'Databases & Secure APIs',
                desc: 'Proficient in PostgreSQL, MySQL, SQLite schema design, seamless data migrations, and JWT authentication.',
              },
              {
                title: 'Algorithmic Problem Solving',
                desc: 'Strong foundation in core data structures, algorithms, and computational efficiency.',
              },
            ].map((p, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
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
