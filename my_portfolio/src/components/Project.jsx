import React, { useState } from 'react';

export default function Project() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'Farm360',
      subtitle: 'Smart Agriculture & Crop Disease Prediction',
      category: 'ml_ai',
      year: '2024',
      role: 'Full-Stack Developer & ML Engineer',
      description:
        'A comprehensive smart agriculture web platform using React.js (Context API) and a Flask REST API backend. Integrates ML (XGBoost) and Deep Learning (CNN) models for crop health and disease prediction with real-time Weather API integration and multilingual support.',
      image: '/hero_page_animation/ezgif-frame-001.png',
      github: 'https://github.com/EElectriX/Farm360',
      live: null,
      tags: ['React.js', 'Flask', 'XGBoost', 'CNN', 'Weather API', 'Multilingual'],
    },
    {
      title: 'Bapan Photography',
      subtitle: 'Photography Portfolio & Client Booking Platform',
      category: 'fullstack',
      year: '2024 — 2025',
      role: 'Frontend Architect & UI Developer',
      description:
        'Built a high-performance responsive photography portfolio with React, Vite, and Tailwind CSS. Features dynamic gallery filtering, lightbox viewer, markdown-powered journal, testimonials, scroll-based animations, and a booking form with API endpoint integration.',
      image: '/hero_page_animation/ezgif-frame-045.png',
      github: 'https://github.com/EElectriX/bapanphotography_version2',
      live: 'https://bapanphotography.in',
      tags: ['React.js', 'Vite', 'Tailwind CSS', 'React Router', 'Markdown', 'Live Domain'],
    },
    {
      title: 'Multi-User To-Do Application',
      subtitle: 'Task Management & Productivity Workspace',
      category: 'fullstack',
      year: '2024',
      role: 'Backend & Full-Stack Developer',
      description:
        'A multi-user full-stack to-do application with Django, HTML5, CSS3, and JavaScript featuring secure user authentication, responsive UI, database migration from SQLite3 to PostgreSQL, and production deployment on Render.',
      image: '/hero_page_animation/ezgif-frame-090.png',
      github: 'https://github.com/EElectriX/multi_user_todo_list',
      live: null,
      tags: ['Django', 'PostgreSQL', 'SQLite3', 'JWT & Auth', 'Render Deployment'],
    },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="project" className="relative py-28 px-6 sm:px-10 bg-[#050608] text-white border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#38bdf8] block mb-2">
              04. Featured Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Engineering <span className="text-[#38bdf8]">Projects</span>
            </h2>
          </div>

          {/* Project Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'ml_ai', label: 'AI & Machine Learning' },
              { id: 'fullstack', label: 'Full-Stack & Web' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFilter(item.id)}
                className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                  filter === item.id
                    ? 'bg-[#38bdf8] text-black shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-[#38bdf8]/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#38bdf8]/10 flex flex-col justify-between"
            >
              {/* Image Preview with Aspect Ratio */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-black/40 to-transparent" />
                <span className="absolute top-4 right-4 text-xs font-mono font-medium px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white">
                  {project.year}
                </span>
                <span className="absolute bottom-3 left-4 text-xs font-mono text-[#38bdf8] font-semibold bg-black/60 backdrop-blur px-2.5 py-0.5 rounded">
                  {project.subtitle}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono uppercase tracking-wider text-[#38bdf8] px-2 py-0.5 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#38bdf8] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mb-3">{project.role}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Actions & Links */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>Source Code</span>
                  </a>

                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#38bdf8] hover:text-white transition-colors bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 px-3 py-1.5 rounded-lg border border-[#38bdf8]/30"
                    >
                      <span>Live Site</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-gray-500">
                      Flask / Django App
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
