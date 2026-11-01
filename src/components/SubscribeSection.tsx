import React, { useState } from 'react';
import { Youtube, Mail, CheckCircle, ArrowRight, Video, FileText, Send } from 'lucide-react';

interface SubscribeSectionProps {
  reducedMotion: boolean;
}

export const SubscribeSection: React.FC<SubscribeSectionProps> = ({ reducedMotion }) => {
  const [inquiryType, setInquiryType] = useState<'licensing' | 'dispatch'>('licensing');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="subscribe" aria-labelledby="subscribe-heading" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background Video / Poster */}
      <div className="absolute inset-0 z-0">
        {!reducedMotion && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/aistudio/subscribe-poster_351da314.jpg"
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/assets/aistudio/subscribe-bg_8b332d63.mp4" type="video/mp4" />
          </video>
        )}

        <img
          src="/assets/aistudio/subscribe-poster_351da314.jpg"
          alt="Coastal flight background"
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover ${
            reducedMotion ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Deep Dark Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,9,10,0.94) 0%, rgba(7,9,10,0.85) 45%, rgba(7,9,10,0.98) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Statement & Channels */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase text-[#d9803f] mb-3">
                <span className="w-5 h-px bg-[#d9803f]" aria-hidden="true" />
                Collaborations & Dispatches
              </div>
              <h2
                id="subscribe-heading"
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] text-[#f3ede2] tracking-tight [text-wrap:balance]"
              >
                Licensing, field notes & <em className="italic text-[#d9803f] font-light">quiet horizons.</em>
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-[#f3ede2]/80 max-w-xl">
              Original 4K aerial master footage of Kyaukphyu, Point Beach, and the Arakan archipelago is available for documentary, cultural, and environmental productions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href="https://www.youtube.com/@heinoxide5128?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-[#0d1411] border border-white/10 hover:border-[#d9803f]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                    <span>OFFICIAL CHANNEL</span>
                    <Youtube className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="font-serif text-lg text-white group-hover:text-[#d9803f] transition-colors">
                    YouTube Community
                  </div>
                  <div className="text-xs text-[#f3ede2]/60 mt-1">
                    110 Subscribers · 22 Cinematic Films
                  </div>
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#d9803f] flex items-center gap-1">
                  <span>Subscribe</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </a>

              <a
                href="https://www.facebook.com/planet.heinoxide"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl bg-[#0d1411] border border-white/10 hover:border-[#d9803f]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-2">
                    <span>DIRECT NETWORK</span>
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                  <div className="font-serif text-lg text-white group-hover:text-[#d9803f] transition-colors">
                    Facebook Dispatch
                  </div>
                  <div className="text-xs text-[#f3ede2]/60 mt-1">
                    Behind-the-scenes logs from Rakhine
                  </div>
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#d9803f] flex items-center gap-1">
                  <span>Follow Page</span>
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Production Inquiry & Dispatch Card */}
          <div className="lg:col-span-6 bg-[#0d1411] border border-white/10 rounded-2xl p-6 sm:p-8 relative">
            <div className="flex items-center gap-1 p-1 bg-black/60 border border-white/10 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setInquiryType('licensing')}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  inquiryType === 'licensing'
                    ? 'bg-[#d9803f] text-[#07090a] font-semibold'
                    : 'text-[#f3ede2]/70 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Footage Licensing</span>
              </button>
              <button
                type="button"
                onClick={() => setInquiryType('dispatch')}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  inquiryType === 'dispatch'
                    ? 'bg-[#d9803f] text-[#07090a] font-semibold'
                    : 'text-[#f3ede2]/70 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Field Dispatch</span>
              </button>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h3 className="font-serif text-lg text-white font-medium">Inquiry Received</h3>
                <p className="text-xs text-emerald-200/90 leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. Hein Sitt Htun will review your note and respond directly with footage availability or dispatches.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-3 px-4 py-2 rounded-lg bg-emerald-900/60 text-xs text-white hover:bg-emerald-900 transition-colors"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="inquiry-email" className="block text-xs font-mono uppercase tracking-wider text-[#e9be86] mb-1.5">
                    Your Contact Email
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="director@production.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/30 focus:border-[#d9803f] focus:outline-none focus:ring-1 focus:ring-[#d9803f]"
                  />
                </div>

                {inquiryType === 'licensing' && (
                  <div>
                    <label htmlFor="inquiry-details" className="block text-xs font-mono uppercase tracking-wider text-[#e9be86] mb-1.5">
                      Production / Location Requirements
                    </label>
                    <textarea
                      id="inquiry-details"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify film titles, required footage duration, or custom coastal shoot in Rakhine..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-white/30 focus:border-[#d9803f] focus:outline-none focus:ring-1 focus:ring-[#d9803f]"
                    />
                  </div>
                )}

                {error && <p className="text-xs text-red-400">{error}</p>}

                <div className="pt-2 flex items-center justify-between gap-4">
                  <span className="text-[11px] text-white/40">
                    Direct reply from Hein Sitt Htun · Zero spam
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#d9803f] hover:bg-[#c56e2f] text-[#07090a] font-semibold text-xs tracking-wider uppercase transition-colors shrink-0 flex items-center gap-2 shadow-md active:scale-95"
                  >
                    <span>{inquiryType === 'licensing' ? 'Request License' : 'Join Dispatch'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
