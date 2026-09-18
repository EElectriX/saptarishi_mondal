import React, { useState } from 'react';

export default function Skill() {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillsData = [
    {
      name: 'Art Direction',
      category: 'direction',
      level: '95%',
      description: 'Conceptualizing aesthetic themes, mood boards, set design, and overseeing visual coherence across campaigns.',
      icon: '🎨',
    },
    {
      name: 'Visual Storytelling',
      category: 'direction',
      level: '98%',
      description: 'Transforming narrative scripts and brand philosophies into compelling pictorial sequences and emotional beats.',
      icon: '📖',
    },
    {
      name: 'Cinematography',
      category: 'camera',
      level: '92%',
      description: 'Mastery over camera motion, focal lengths, framing composition, and high-speed motion capture.',
      icon: '🎥',
    },
    {
      name: 'Color Grading',
      category: 'post',
      level: '94%',
      description: 'Custom LUT creation, ACES color management, and cinematic tone curve manipulation in DaVinci Resolve.',
      icon: '🌈',
    },
    {
      name: 'Lighting Design',
      category: 'camera',
      level: '96%',
      description: 'Shaping dramatic chiaroscuro, rim lights, practicals, soft bounce keys, and LED volume environments.',
      icon: '💡',
    },
    {
      name: 'Photo Editing & Retouching',
      category: 'post',
      level: '97%',
      description: 'High-end frequency separation, composite manipulation, dodge & burn, and fine-art print prep.',
      icon: '✨',
    },
    {
      name: 'Set & Location Scouting',
      category: 'direction',
      level: '90%',
      description: 'Architectural alignment, golden hour angle mapping, and spatial coordination for complex shoots.',
      icon: '📍',
    },
    {
      name: 'Creative Team Leadership',
      category: 'direction',
      level: '94%',
      description: 'Mentoring talent, harmonizing wardrobe, HMUA, sound, and lighting departments on set.',
      icon: '👥',
    },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skill" className="relative py-28 px-6 sm:px-10 bg-[#08090d] text-white border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#38bdf8] block mb-2">
              03. Expertise
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Skills & <span className="text-[#38bdf8]">Craft</span>
            </h2>
          </div>

          {/* Filter Badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'direction', label: 'Direction & Narrative' },
              { id: 'camera', label: 'Camera & Lighting' },
              { id: 'post', label: 'Post-Production' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#38bdf8] text-black shadow-[0_0_12px_rgba(56,189,248,0.5)]'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#38bdf8]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#38bdf8]/5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#38bdf8] px-2.5 py-1 rounded-full bg-[#38bdf8]/10">
                    {skill.level}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#38bdf8] transition-colors mb-2">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-[#38bdf8] transition-all duration-700 ease-out"
                    style={{ width: skill.level }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
