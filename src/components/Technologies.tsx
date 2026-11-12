import { useState } from 'react';
import { TECHNOLOGY_DOMAINS } from '../data/siteContent';
import { DomainSchematic } from './DomainSchematic';
import { Reveal } from './Reveal';

export function Technologies() {
  const [activeDomainId, setActiveDomainId] = useState<string>(TECHNOLOGY_DOMAINS[0].id);

  const activeDomain =
    TECHNOLOGY_DOMAINS.find((d) => d.id === activeDomainId) ?? TECHNOLOGY_DOMAINS[0];

  return (
    <section
      id="technologies"
      aria-labelledby="technologies-heading"
      className="relative border-t border-white/10 bg-[#060608] py-28 text-[#F5F6FA] sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-3">
                <span className="h-2 w-2 bg-[#5843FF]" aria-hidden="true" />
                <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9CA3B4] uppercase">
                  02 / Technologies
                </span>
              </div>
              <h2
                id="technologies-heading"
                className="font-display mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl"
              >
                Core Technological Disciplines
              </h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[#9CA3B4] sm:text-base">
              Our engineering and exploration span four interconnected pillars, bridging foundational
              machine intelligence with resilient distributed infrastructure and emerging hardware.
            </p>
          </div>
        </Reveal>

        <div className="mt-4 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial domain list (no rounded feature cards) */}
          <div className="divide-y divide-white/10 border-b border-white/10 lg:col-span-7">
            {TECHNOLOGY_DOMAINS.map((domain) => {
              const isSelected = domain.id === activeDomainId;
              return (
                <article
                  key={domain.id}
                  className={`group relative py-9 transition-colors duration-200 ${
                    isSelected ? 'bg-white/[0.015]' : ''
                  }`}
                >
                  {/* Active left hairline accent */}
                  <div
                    aria-hidden="true"
                    className={`absolute top-0 bottom-0 left-0 w-0.5 transition-colors duration-300 ${
                      isSelected ? 'bg-[#5843FF]' : 'bg-transparent group-hover:bg-white/25'
                    }`}
                  />

                  <div className="pl-5 sm:pl-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setActiveDomainId(domain.id)}
                        onMouseEnter={() => setActiveDomainId(domain.id)}
                        aria-expanded={isSelected}
                        className="text-left focus-visible:outline-offset-4"
                      >
                        <div className="flex items-baseline gap-4">
                          <span
                            className={`font-mono-tech text-xs transition-colors ${
                              isSelected ? 'text-[#5843FF]' : 'text-[#666D80]'
                            }`}
                          >
                            {domain.index}
                          </span>
                          <h3 className="font-display text-2xl font-semibold tracking-tight text-white transition-colors group-hover:text-white sm:text-3xl">
                            {domain.title}
                          </h3>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveDomainId(domain.id)}
                        className={`font-mono-tech text-[11px] tracking-widest uppercase transition-colors ${
                          isSelected ? 'text-[#5843FF]' : 'text-[#666D80] hover:text-white'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Inspect'}
                      </button>
                    </div>

                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#9CA3B4] sm:text-base">
                      {domain.summary}
                    </p>

                    {/* Clean editorial capability list */}
                    <ul
                      aria-label={`${domain.title} capabilities`}
                      className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2.5 border-t border-white/8 pt-5 sm:grid-cols-2"
                    >
                      {domain.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-center gap-3 text-sm text-[#D1D5DF]"
                        >
                          <span
                            className={`h-1 w-1 shrink-0 transition-colors ${
                              isSelected ? 'bg-[#5843FF]' : 'bg-white/35'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Mobile-only inline schematic preview when selected */}
                    {isSelected && (
                      <div className="mt-6 border border-white/10 bg-[#0C0D12] p-4 lg:hidden">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-mono-tech text-[11px] tracking-widest text-[#9CA3B4] uppercase">
                            Architecture Schematic
                          </span>
                          <span className="font-mono-tech text-[11px] text-[#5843FF]">
                            {domain.index} / 04
                          </span>
                        </div>
                        <div className="aspect-[3/2] w-full">
                          <DomainSchematic type={domain.diagramType} />
                        </div>
                        <p className="font-mono-tech mt-2 text-xs text-[#9CA3B4]">
                          {domain.architectureNote}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Desktop sticky architectural schematic frame */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 border border-white/10 bg-[#0C0D12] p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono-tech block text-[11px] tracking-[0.18em] text-[#666D80] uppercase">
                    System Topology
                  </span>
                  <span className="font-display mt-1 block text-lg font-medium text-white">
                    {activeDomain.title}
                  </span>
                </div>
                <span className="font-mono-tech border border-white/10 px-2.5 py-1 text-xs text-[#5843FF]">
                  {activeDomain.index} / 04
                </span>
              </div>

              <div className="relative my-6 aspect-[3/2] w-full border border-white/5 bg-[#060608]">
                <DomainSchematic type={activeDomain.diagramType} />
              </div>

              <div className="border-t border-white/10 pt-5">
                <span className="font-mono-tech block text-[11px] tracking-[0.18em] text-[#666D80] uppercase">
                  Architectural Focus
                </span>
                <p className="mt-2 text-sm leading-relaxed text-[#B4BAC8]">
                  {activeDomain.architectureNote}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {TECHNOLOGY_DOMAINS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setActiveDomainId(d.id)}
                      className={`font-mono-tech border px-2.5 py-1 text-[11px] transition-colors ${
                        d.id === activeDomainId
                          ? 'border-[#5843FF] bg-[#3815FC]/15 text-white'
                          : 'border-white/10 text-[#666D80] hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {d.index}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

