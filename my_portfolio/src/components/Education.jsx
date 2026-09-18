import React from 'react';

/**
 * Education content — rendered as a scroll panel inside HeroAnimation's sticky viewport.
 */
export function EducationContent() {
  const academicList = [
    {
      year: '2020 — 2022',
      degree: 'Master of Fine Arts (MFA) in Cinematography & Visual Arts',
      institution: 'National Institute of Design / Film & Media Arts',
      description:
        'Advanced studies in lighting design, directorial narrative, large format cinematography, and aesthetic semiotics.',
      badge: 'Honor Graduate',
    },
    {
      year: '2016 — 2020',
      degree: 'Bachelor of Design (B.Des) in Visual Communication & Photography',
      institution: 'School of Arts & Design',
      description:
        'Comprehensive foundation in visual grammar, darkroom techniques, digital imaging workflows, and brand identity systems.',
      badge: 'First Class with Distinction',
    },
  ];

  const certifications = [
    {
      title: 'DaVinci Resolve Certified Colorist',
      issuer: 'Blackmagic Design',
      year: '2023',
    },
    {
      title: 'Advanced Lighting & Grip Direction',
      issuer: 'American Society of Cinematographers (ASC Masterclass)',
      year: '2022',
    },
    {
      title: 'Commercial Fashion & Editorial Photography',
      issuer: 'Magnum Photos Workshop',
      year: '2021',
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
          Education & <span className="text-[#38bdf8]">Credentials</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Degrees Timeline */}
        <div className="lg:col-span-7 space-y-8">
          <div className="relative pl-6 border-l border-white/10 space-y-10">
            {academicList.map((item, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#08090d] border-2 border-[#38bdf8]" />
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider">
                    {item.year}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-medium">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white">{item.degree}</h4>
                <p className="text-sm text-gray-400 font-medium mt-1">{item.institution}</p>
                <p className="text-sm text-gray-400/90 mt-3 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-xl font-semibold text-white tracking-wide mb-6">
            Specialized Certifications
          </h3>
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4"
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
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white text-base">{cert.title}</h4>
                  <span className="text-xs font-mono text-gray-500">{cert.year}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{cert.issuer}</p>
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
