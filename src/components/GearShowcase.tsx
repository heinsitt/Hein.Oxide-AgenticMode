import React, { useState } from 'react';
import { Camera, Layers, Box, Compass, ArrowUpRight } from 'lucide-react';
import { GEAR_ITEMS, GearItem } from '../data/gear';

interface GearShowcaseProps {
  onSelectFilmById?: (id: string) => void;
}

export const GearShowcase: React.FC<GearShowcaseProps> = () => {
  const [activeGearId, setActiveGearId] = useState<string>('mavic-air-2');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const activeGear = GEAR_ITEMS.find((g) => g.id === activeGearId) || GEAR_ITEMS[0];

  return (
    <section id="gear" aria-labelledby="gear-heading" className="py-24 sm:py-32 relative">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.25em] uppercase text-[#d9803f] mb-3">
              <span className="w-5 h-px bg-[#d9803f]" aria-hidden="true" />
              Equipment Arsenal
            </div>
            <h2 id="gear-heading" className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#f3ede2] font-normal tracking-tight">
              Tools that carry the <em className="italic text-[#d9803f] font-light">vision.</em>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#f3ede2]/65 max-w-xl">
              Compact, rugged, and road-tested setups engineered to withstand oceanic salt winds and tropical humidity.
            </p>
          </div>

          {/* Toggle between Interactive Gallery & Specs Matrix */}
          <div className="flex items-center p-1 bg-[#0d1411] border border-white/10 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === 'cards'
                  ? 'bg-[#d9803f] text-[#07090a] font-semibold'
                  : 'text-[#f3ede2]/70 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Interactive Gallery</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-[#d9803f] text-[#07090a] font-semibold'
                  : 'text-[#f3ede2]/70 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Specs Matrix</span>
            </button>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <div>
            {/* Desktop Dynamic Accordion + Mobile Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[540px]">
              {GEAR_ITEMS.map((gear) => {
                const isActive = gear.id === activeGearId;
                return (
                  <div
                    key={gear.id}
                    onClick={() => setActiveGearId(gear.id)}
                    onMouseEnter={() => setActiveGearId(gear.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setActiveGearId(gear.id);
                      }
                    }}
                    aria-label={`View specs for ${gear.name}`}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border ${
                      isActive
                        ? 'md:col-span-2 border-[#d9803f] shadow-2xl'
                        : 'md:col-span-1 border-white/10 hover:border-white/30'
                    } min-h-[320px] md:min-h-0 flex flex-col justify-end p-6 bg-[#07090a]`}
                  >
                    {/* Background Gear Image */}
                    <img
                      src={gear.image}
                      alt={gear.name}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                        isActive ? 'scale-105' : 'scale-100 opacity-70 hover:opacity-90'
                      }`}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        isActive
                          ? 'bg-gradient-to-t from-black/95 via-black/60 to-black/20'
                          : 'bg-gradient-to-t from-black/90 via-black/50 to-transparent'
                      }`}
                    />

                    {/* Content Details */}
                    <div className="relative z-10">
                      <div className="text-[10px] tracking-[0.25em] uppercase text-[#d9803f] font-semibold mb-1">
                        {gear.category}
                      </div>
                      <h3 className="font-serif text-2xl font-normal text-white">
                        {gear.name}
                      </h3>
                      <div className="text-xs text-[#e9be86] mt-0.5 font-medium">
                        {gear.role}
                      </div>

                      {/* Expanded Details when Active */}
                      {isActive && (
                        <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in duration-300 space-y-3">
                          <p className="text-xs text-[#f3ede2]/80 leading-relaxed max-w-md">
                            {gear.summary}
                          </p>

                          {/* Quick Spec Highlights */}
                          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                            {gear.specs.slice(0, 4).map((spec, idx) => (
                              <div key={idx} className="bg-black/40 p-2 rounded-lg border border-white/5">
                                <span className="text-white/50 block text-[10px]">{spec.label}</span>
                                <span className="text-white font-mono font-medium truncate block">{spec.value}</span>
                              </div>
                            ))}
                          </div>

                          {/* Featured Films */}
                          <div className="flex items-center gap-1.5 text-[11px] text-[#f3ede2]/60 pt-1">
                            <span className="text-white/40">Featured in:</span>
                            <span className="text-white font-medium">{gear.featuredIn.join(' · ')}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Filmmaker Field Insight Callout for Active Gear */}
            <div className="mt-8 p-6 rounded-2xl bg-[#0d1411] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-wider text-[#d9803f] font-mono font-medium">
                  Field Notes · {activeGear.name}
                </div>
                <p className="text-sm italic font-serif text-[#f3ede2]/90 max-w-2xl leading-relaxed">
                  "{activeGear.filmmakerThoughts}"
                </p>
              </div>

              {activeGear.id === 'mavic-air-2' && (
                <a
                  href="#studio-3d"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d9803f] hover:bg-[#c56e2f] text-[#07090a] font-semibold text-xs tracking-wider uppercase transition-colors shrink-0 shadow-md"
                >
                  <Box className="w-4 h-4" />
                  <span>Inspect in 3D Studio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ) : (
          /* Technical Matrix / Specs Comparison Table */
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d1411]">
            <table className="w-full text-left text-xs" aria-label="Camera gear comparison table">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-[#f3ede2]/60 uppercase tracking-wider font-mono text-[11px]">
                  <th className="p-4 sm:p-5">Equipment</th>
                  <th className="p-4 sm:p-5">Sensor / Optics</th>
                  <th className="p-4 sm:p-5">Resolution / FPS</th>
                  <th className="p-4 sm:p-5">Stabilization</th>
                  <th className="p-4 sm:p-5">Endurance</th>
                  <th className="p-4 sm:p-5">Primary Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans">
                {GEAR_ITEMS.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                        />
                        <div>
                          <div className="font-serif text-sm font-medium text-white">{item.name}</div>
                          <div className="text-[10px] text-[#d9803f] uppercase font-mono">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-[#f3ede2]/80 font-mono">
                      {item.specs.find((s) => s.label.includes('Sensor') || s.label.includes('Lens'))?.value || 'Custom'}
                    </td>
                    <td className="p-4 sm:p-5 text-[#f3ede2]/80 font-mono tabular-nums">
                      {item.specs.find((s) => s.label.includes('Resolution') || s.label.includes('Video'))?.value || '4K'}
                    </td>
                    <td className="p-4 sm:p-5 text-[#f3ede2]/80">
                      {item.specs.find((s) => s.label.includes('Gimbal') || s.label.includes('Autofocus'))?.value || 'Mechanical'}
                    </td>
                    <td className="p-4 sm:p-5 text-[#f3ede2]/80 font-mono tabular-nums">
                      {item.specs.find((s) => s.label.includes('Flight') || s.label.includes('Battery'))?.value || 'N/A'}
                    </td>
                    <td className="p-4 sm:p-5 text-[#e9be86]">
                      {item.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
