import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, ArrowDown, Youtube } from 'lucide-react';

interface HeroProps {
  onOpenReel: () => void;
  reducedMotion: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReel, reducedMotion }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    // Ping-pong reverse loop implementation for desktop
    const isMobile = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isMobile) {
      video.loop = true;
      video.playbackRate = 0.9;
      video.play().catch(() => {});
      return;
    }

    let mode: 'forward' | 'reverse' = 'forward';
    let lastT: number | null = null;
    let animFrame: number;
    const EPS = 0.08;

    const reverseStep = (now: number) => {
      if (mode !== 'reverse') {
        lastT = null;
        return;
      }
      if (lastT === null) {
        lastT = now;
        animFrame = requestAnimationFrame(reverseStep);
        return;
      }
      const dt = (now - lastT) / 1000;
      lastT = now;
      const next = video.currentTime - dt;
      if (next <= 0) {
        video.currentTime = 0;
        mode = 'forward';
        lastT = null;
        video.play().catch(() => {});
        return;
      }
      video.currentTime = next;
      animFrame = requestAnimationFrame(reverseStep);
    };

    const handleTimeUpdate = () => {
      if (mode === 'forward' && video.duration && video.currentTime >= video.duration - EPS) {
        mode = 'reverse';
        video.pause();
        lastT = null;
        animFrame = requestAnimationFrame(reverseStep);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      cancelAnimationFrame(animFrame);
    };
  }, [reducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="hero"
      aria-label="Hero Showcase"
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col justify-between bg-[#07090a] pt-24 sm:pt-28 pb-12"
    >
      {/* Background Video / Static Poster */}
      <div className="absolute inset-0 z-0">
        {!reducedMotion && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover scale-[1.02] transition-opacity duration-1000"
            autoPlay
            muted
            playsInline
            poster="/assets/aistudio/hero-poster_9e7f73d8.jpg"
            onLoadedData={() => setVideoLoaded(true)}
            aria-hidden="true"
          >
            <source src="/assets/aistudio/hero-drone_7ad9b874.mp4" type="video/mp4" />
          </video>
        )}

        {/* Fallback & Poster layer */}
        <img
          src="/assets/aistudio/hero-poster_9e7f73d8.jpg"
          alt="Aerial drone flight over coastal waters"
          fetchPriority="high"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            reducedMotion || !videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Cinematic Vignette & Deep Shadow Gradients */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 100%, rgba(7,9,10,0.95) 0%, rgba(7,9,10,0.2) 50%, rgba(7,9,10,0.85) 100%), linear-gradient(180deg, rgba(7,9,10,0.8) 0%, rgba(7,9,10,0.2) 30%, rgba(7,9,10,0.4) 70%, rgba(7,9,10,0.98) 100%)'
          }}
        />
      </div>

      {/* Video Play/Pause floating controller in bottom corner */}
      {!reducedMotion && (
        <button
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause background hero video' : 'Play background hero video'}
          className="absolute bottom-28 right-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/80 hover:text-white hover:bg-black/80 transition-all focus-visible:ring-2 focus-visible:ring-[#d9803f]"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span className="hidden sm:inline">{isPlaying ? 'Pause Aerial Loop' : 'Play Aerial Loop'}</span>
        </button>
      )}

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 w-full my-auto flex flex-col items-center text-center">
        {/* Anti-Slop Unboxed Editorial Kicker */}
        <div className="flex items-center gap-2 text-xs font-medium tracking-[0.28em] uppercase text-[#e9be86] mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <span>Arakan Coastlines</span>
          <span aria-hidden="true" className="text-[#d9803f]">·</span>
          <span>Aerial Cinematography</span>
          <span aria-hidden="true" className="text-[#d9803f]">·</span>
          <span>Kyaukphyu</span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-serif font-normal leading-[0.95] tracking-tight text-[clamp(2.8rem,8.5vw,7.5rem)] text-[#f3ede2] max-w-5xl [text-wrap:balance]">
          Heino <em className="italic text-[#d9803f] font-light">Xide</em>
        </h1>

        {/* Subtitle / Philosophy */}
        <p className="mt-6 max-w-2xl text-[16px] sm:text-lg md:text-xl leading-relaxed text-[#f3ede2]/75 font-serif italic [text-wrap:balance]">
          "The world is originally in peace."
        </p>
        <p className="mt-2 text-xs sm:text-sm tracking-wide text-[#f3ede2]/60 font-sans max-w-md">
          A dedicated visual archive of quiet horizons, tide lines, and forgotten shores across Kyaukphyu, Rakhine State.
        </p>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenReel}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#d9803f] hover:bg-[#c56e2f] text-[#07090a] font-semibold text-xs sm:text-[13px] tracking-[0.14em] uppercase transition-all shadow-lg hover:shadow-[#d9803f]/25 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#d9803f]"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Showreel
          </button>

          <a
            href="#studio-3d"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14221a] hover:bg-[#1c3225] border border-[#d9803f]/40 text-[#f3ede2] font-medium text-xs sm:text-[13px] tracking-[0.14em] uppercase transition-all hover:border-[#d9803f] focus-visible:ring-2 focus-visible:ring-[#d9803f]"
          >
            <span>Launch 3D Drone Studio</span>
          </a>

          <a
            href="#films"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs sm:text-[13px] tracking-[0.14em] uppercase transition-all hover:border-white/30 focus-visible:ring-2 focus-visible:ring-[#d9803f]"
          >
            Browse Films
          </a>

          <a
            href="https://www.youtube.com/@heinoxide5128"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3.5 text-[#f3ede2]/65 hover:text-white transition-colors text-xs sm:text-[13px] tracking-[0.12em] uppercase"
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span className="tabular-nums">110 Subscribers</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      {/* KPI Proof Strip & Scroll Prompt */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 px-6 rounded-2xl bg-[#0d1411]/70 backdrop-blur-md border border-white/10 text-center">
          <div>
            <div className="font-serif text-xl sm:text-2xl text-white font-normal tabular-nums">22+</div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-[#f3ede2]/60 mt-0.5">Films Released</div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl text-white font-normal tabular-nums">110</div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-[#f3ede2]/60 mt-0.5">Subscribers</div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl text-white font-normal">4K UHD</div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-[#f3ede2]/60 mt-0.5">Cinematic Quality</div>
          </div>
          <div>
            <div className="font-serif text-xl sm:text-2xl text-[#d9803f] font-normal">Kyaukphyu</div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-[#f3ede2]/60 mt-0.5">Arakan Coast</div>
          </div>
        </div>

        {/* Subtle Wind flow line */}
        <div className="relative h-[1px] w-full bg-white/10 overflow-hidden mt-6">
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-[#d9803f] to-transparent animate-wind" />
        </div>

        {/* Scroll anchor */}
        <div className="flex justify-center mt-4">
          <a
            href="#films"
            aria-label="Scroll to featured films"
            className="flex flex-col items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-[#f3ede2]/50 hover:text-[#d9803f] transition-colors"
          >
            <span>Explore</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
