import React, { useState } from 'react';

export default function Skill() {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillsData = [
    // Languages
    {
      name: 'Python',
      category: 'languages',
      level: '92%',
      description: 'Core backend, scripting, ML model development with NumPy, Pandas, Scikit-Learn, and Deep Learning.',
      icon: '🐍',
    },
    {
      name: 'JavaScript (ES6+)',
      category: 'languages',
      level: '90%',
      description: 'Modern asynchronous programming, DOM manipulation, functional programming, and web APIs.',
      icon: '⚡',
    },
    {
      name: 'SQL',
      category: 'languages',
      level: '88%',
      description: 'Complex queries, schema normalization, indexing, joins, aggregations, and performance tuning.',
      icon: '🗄️',
    },
    {
      name: 'Java',
      category: 'languages',
      level: '80%',
      description: 'Object-oriented programming, data structures, and foundational algorithms.',
      icon: '☕',
    },

    // Frontend
    {
      name: 'React.js & Vite',
      category: 'frontend',
      level: '94%',
      description: 'Component architecture, custom hooks, dynamic rendering, and ultra-fast Vite tooling.',
      icon: '⚛️',
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      level: '95%',
      description: 'Utility-first modern responsive interfaces, custom design tokens, dark mode, and sleek aesthetics.',
      icon: '🎨',
    },
    {
      name: 'State Management (Redux & Context)',
      category: 'frontend',
      level: '88%',
      description: 'Global state flow, Context API for localization/multilingual state, and predictable stores.',
      icon: '🔄',
    },
    {
      name: 'HTML5 & Modern CSS3',
      category: 'frontend',
      level: '96%',
      description: 'Semantic markup, accessibility (a11y), responsive layouts (Flexbox & CSS Grid), and smooth keyframes.',
      icon: '🌐',
    },

    // Backend & APIs
    {
      name: 'Django & Django REST Framework',
      category: 'backend',
      level: '90%',
      description: 'Scalable MVC architectures, ORM modeling, serializers, viewsets, and secure endpoint design.',
      icon: '🎸',
    },
    {
      name: 'Flask',
      category: 'backend',
      level: '88%',
      description: 'Lightweight microservices, ML model inference APIs, and flexible RESTful routing.',
      icon: '🧪',
    },
    {
      name: 'RESTful APIs & JWT Auth',
      category: 'backend',
      level: '92%',
      description: 'Token-based authentication, request validation, CORS management, and robust error handling.',
      icon: '🔐',
    },

    // Databases & ML
    {
      name: 'PostgreSQL & MySQL',
      category: 'data_ml',
      level: '88%',
      description: 'Production relational databases, ACID transactions, migrations, and cloud hosting integration.',
      icon: '🐘',
    },
    {
      name: 'Machine Learning (XGBoost & CNN)',
      category: 'data_ml',
      level: '85%',
      description: 'Tabular prediction with XGBoost and image-based Computer Vision diagnosis using Convolutional Neural Networks.',
      icon: '🤖',
    },
    {
      name: 'SQLite & Oracle SQL',
      category: 'data_ml',
      level: '86%',
      description: 'Lightweight development databases and enterprise database querying and relational management.',
      icon: '📊',
    },

    // Tools & Deployment
    {
      name: 'Git & GitHub',
      category: 'tools',
      level: '94%',
      description: 'Version control, multi-branch workflows, collaborative code reviews, and open-source management.',
      icon: '🐙',
    },
    {
      name: 'Postman & API Testing',
      category: 'tools',
      level: '90%',
      description: 'Endpoint testing, mock servers, automated environment variable switching, and payload debugging.',
      icon: '📬',
    },
    {
      name: 'Render & Cloud Deployment',
      category: 'tools',
      level: '88%',
      description: 'Full-stack production deployment, environment variables, live build pipelines, and production databases.',
      icon: '🚀',
    },
    {
      name: 'Jupyter & Google Colab',
      category: 'tools',
      level: '90%',
      description: 'Exploratory data analysis, interactive model prototyping, GPU training, and visualization.',
      icon: '📓',
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
              03. Technical Stack
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Skills & <span className="text-[#38bdf8]">Expertise</span>
            </h2>
          </div>

          {/* Filter Badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Tech' },
              { id: 'languages', label: 'Languages' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend & APIs' },
              { id: 'data_ml', label: 'Databases & ML' },
              { id: 'tools', label: 'Tools & DevOps' },
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
