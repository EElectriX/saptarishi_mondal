import React, { useState } from 'react';

export default function Project() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'Celestial Horizons',
      category: 'editorial',
      year: '2026',
      role: 'Creative Director & Cinematographer',
      description: 'An ethereal sci-fi fashion editorial capturing deep space aesthetics, high contrast chiaroscuro, and cosmic atmospheres.',
      image: '/hero_page_animation/ezgif-frame-001.png',
      tags: ['Fashion', 'Cinematography', 'High Concept'],
    },
    {
      title: 'Neon Odyssey',
      category: 'commercial',
      year: '2025',
      role: 'Visual Director & Colorist',
      description: 'Futuristic urban night series emphasizing saturated anamorphic flares, cyberpunk reflections, and atmospheric mist.',
      image: '/hero_page_animation/ezgif-frame-045.png',
      tags: ['Commercial', 'Nightscape', 'Anamorphic'],
    },
    {
      title: 'Silent Velocity',
      category: 'automotive',
      year: '2025',
      role: 'Art Director & Lead Photographer',
      description: 'High-speed track campaign featuring next-generation hypercars, sculptured studio lighting, and dynamic motion blur.',
      image: '/hero_page_animation/ezgif-frame-090.png',
      tags: ['Automotive', 'Studio Lighting', 'Motion'],
    },
    {
      title: 'Elysian Portraits',
      category: 'editorial',
      year: '2024',
      role: 'Creative Director',
      description: 'Intimate, emotional character portraits exploring vulnerability, natural window key lights, and deep shadow play.',
      image: '/hero_page_animation/ezgif-frame-135.png',
      tags: ['Editorial', 'Portraits', 'Natural Light'],
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
              04. Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Featured <span className="text-[#38bdf8]">Projects</span>
            </h2>
          </div>

          {/* Project Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'editorial', label: 'Editorial' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'automotive', label: 'Automotive' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-[#38bdf8]/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#38bdf8]/10 flex flex-col justify-between"
            >
              {/* Image Preview with Aspect Ratio */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/50">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 right-4 text-xs font-mono font-medium px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white">
                  {project.year}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono uppercase tracking-wider text-[#38bdf8] px-2.5 py-0.5 rounded-full bg-[#38bdf8]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-[#38bdf8] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400 mb-3">{project.role}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors">
                  <span className="font-mono">Explore Campaign</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#38bdf8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
