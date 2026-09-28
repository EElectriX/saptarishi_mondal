import React from 'react';

/**
 * Education content — rendered as a scroll panel inside HeroAnimation's sticky viewport.
 */
export function EducationContent() {
  const academicList = [
    {
      year: '2022 — 2026',
      degree: 'B.Tech in Information Technology',
      institution: 'Kalyani Government Engineering College',
      description:
        'Rigorous coursework in Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, and Full-Stack Web Technologies.',
      badge: 'CGPA: 7.61',
    },
    {
      year: '2021 — 2023',
      degree: 'Diploma in Electronics & Telecommunication Engineering',
      institution: 'Jnan Chandra Ghosh Polytechnic',
      description:
        'Comprehensive grounding in digital logic, microprocessors, signal processing, embedded systems, and telecommunication hardware.',
      badge: 'CGPA: 8.5 (Distinction)',
    },
    {
      year: '2020',
      degree: 'Higher Secondary (Class XII)',
      institution: 'Barisha Purba Para High School',
      description:
        'Completed higher secondary science curriculum in Mathematics, Physics, Chemistry, and Computer Applications.',
      badge: '79.6%',
    },
    {
      year: '2017',
      degree: 'Madhyamik (Class X)',
      institution: 'Behala Arrya Vidyamandir',
      description:
        'Completed secondary education with strong fundamentals in Mathematics and Natural Sciences.',
      badge: '71.7%',
    },
  ];

  const achievements = [
    {
      title: 'Scored GMR 67 in WBJEE JELET',
      issuer: 'West Bengal Joint Entrance Examination',
      year: '2022',
      badge: 'Top 0.5%',
      desc: 'Achieved General Merit Rank (GMR) 67 across West Bengal for direct lateral entry admission to B.Tech.',
    },
    {
      title: '100+ LeetCode Problems Solved',
      issuer: 'leetcode.com/u/ElectriX',
      year: 'Continuous',
      badge: 'Algorithms',
      desc: 'Consistent problem solving focusing on Data Structures, Algorithms, Hash Maps, Dynamic Programming, and Graph traversal.',
    },
    {
      title: 'Full-Stack & Applied AI Specialization',
      issuer: 'React · Django · Flask · CNN · XGBoost',
      year: 'Active',
      badge: 'Full-Stack',
      desc: 'Hands-on practical development of intelligent web applications with real-time API integrations and cloud deployments.',
    },
  ];

  return (
    <div className="w-full min-h-full flex flex-col justify-center max-w-6xl mx-auto px-6 sm:px-10 py-8 lg:py-12">
      {/* Section Header */}
      <div className="mb-6 lg:mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#38bdf8] block mb-2">
          02. Academic Background
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Education & <span className="text-[#38bdf8]">Achievements</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Degrees Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative pl-6 border-l border-white/10 space-y-8">
            {academicList.map((item, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#08090d] border-2 border-[#38bdf8] group-hover:scale-125 transition-transform" />
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider">
                    {item.year}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] font-semibold border border-[#38bdf8]/20">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white">{item.degree}</h4>
                <p className="text-sm text-gray-300 font-medium mt-0.5">{item.institution}</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Honors & Competitive Milestones */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xl font-semibold text-white tracking-wide mb-6 flex items-center gap-2">
            <span className="text-[#38bdf8]">★</span> Honors & Competitive Ranks
          </h3>
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#38bdf8]/30 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-white text-base">{item.title}</h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300 shrink-0">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs text-[#38bdf8] font-mono mt-0.5">{item.issuer}</p>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative bg-[#050608] text-white border-t border-white/5">
      <EducationContent />
    </section>
  );
}
