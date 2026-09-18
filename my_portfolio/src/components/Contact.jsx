import React, { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-10 bg-[#08090d] text-white border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#38bdf8] block mb-2">
            05. Collaboration
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Let's Create <span className="text-[#38bdf8]">Together</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base max-w-xl leading-relaxed">
            Have a project, commercial inquiry, or directorial commission? Get in touch and let's craft an unforgettable visual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Email Inquiries</span>
                  <a href="mailto:saptarshi.mondal@example.com" className="text-base font-semibold text-white hover:text-[#38bdf8] transition-colors mt-0.5 block">
                    saptarshi.mondal@example.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#38bdf8]/10 text-[#38bdf8] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Location & Travel</span>
                  <p className="text-base font-semibold text-white mt-0.5">
                    Mumbai & Global Available
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Direct Networks</span>
                <div className="flex items-center gap-3">
                  {['GitHub', 'LinkedIn', 'Instagram', 'Behance'].map((net) => (
                    <a
                      key={net}
                      href={`#${net.toLowerCase()}`}
                      className="text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/10 transition-all"
                    >
                      {net}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-sm shadow-2xl">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Dispatched</h3>
                  <p className="text-gray-400 text-sm">
                    Thank you for reaching out. Saptarshi will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block mb-2">
                      Project Type / Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Commercial Campaign Direction"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-300 uppercase tracking-wider block mb-2">
                      Message & Scope
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, and vision..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-[#0284c7] to-[#38bdf8] text-white font-semibold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:scale-[1.01] cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-4">
          <p>© {new Date().getFullYear()} Saptarshi Mondal. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Crafted with precision</span>
            <span className="text-[#38bdf8]">•</span>
            <span>Direction & Narrative</span>
          </p>
        </div>
      </div>
    </section>
  );
}
