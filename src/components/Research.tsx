import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { RESEARCH_TRACKS, type ResearchCategory } from '../data/siteContent';
import { Reveal } from './Reveal';

type FilterOption = 'All' | ResearchCategory;
const FILTERS: FilterOption[] = ['All', 'Publications', 'Experiments', 'Prototypes'];

export function Research() {
  const [filter, setFilter] = useState<FilterOption>('All');

  const visibleTracks =
    filter === 'All'
      ? RESEARCH_TRACKS
      : RESEARCH_TRACKS.filter((track) => track.category === filter);

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="relative border-t border-white/10 bg-[#0C0D12] py-28 text-[#F5F6FA] sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3">
                <span className="h-2 w-2 bg-[#5843FF]" aria-hidden="true" />
                <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9CA3B4] uppercase">
                  03 / Research &amp; Innovation
                </span>
              </div>
              <h2
                id="research-heading"
                className="font-display mt-5 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl"
              >
                Exploring what comes next.
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-[#B4BAC8] sm:text-base">
                OWYRON is committed to disciplined experimentation, foundational research, and the
                gradual development of new technological capabilities. This framework establishes a
                living home for our forthcoming publications, experimental studies, and engineering
                prototypes.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Track Filter Bar */}
        <div
          role="tablist"
          aria-label="Research track categories"
          className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((option) => {
              const active = filter === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(option)}
                  className={`font-mono-tech px-3.5 py-1.5 text-xs tracking-wider uppercase transition-colors ${
                    active
                      ? 'bg-[#3815FC] text-white'
                      : 'border border-white/10 bg-transparent text-[#9CA3B4] hover:border-white/30 hover:text-white'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          <span className="font-mono-tech text-[11px] tracking-widest text-[#666D80] uppercase">
            Open Research Index — {visibleTracks.length}{' '}
            {visibleTracks.length === 1 ? 'Track' : 'Tracks'}
          </span>
        </div>

        {/* Structured Research Slots */}
        <div className="grid grid-cols-1 divide-y divide-white/10 border-b border-white/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {visibleTracks.map((track) => (
            <article
              key={track.id}
              className="flex flex-col justify-between py-9 lg:px-8 lg:first:pl-0 lg:last:pr-0"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono-tech text-xs text-[#666D80]">{track.code}</span>
                  <span className="font-mono-tech inline-flex items-center gap-2 border border-white/12 px-2.5 py-0.5 text-[11px] tracking-wider text-[#B4BAC8] uppercase">
                    <span
                      className={`h-1.5 w-1.5 ${
                        track.status === 'Active Exploration' ? 'bg-[#5843FF]' : 'bg-white/40'
                      }`}
                      aria-hidden="true"
                    />
                    {track.status}
                  </span>
                </div>

                <h3 className="font-display mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {track.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[#9CA3B4]">{track.scope}</p>
              </div>

              <div className="mt-8 border-t border-white/8 pt-5">
                <span className="font-mono-tech block text-[11px] tracking-widest text-[#666D80] uppercase">
                  Designated Scope
                </span>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {track.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="border border-white/10 bg-[#060608] px-2.5 py-1 text-xs text-[#D1D5DF]"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Honest transparent notice & collaboration link */}
        <div className="mt-10 flex flex-col items-start justify-between gap-6 border border-white/10 bg-[#060608] p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="max-w-2xl">
            <span className="font-mono-tech text-[11px] tracking-[0.2em] text-[#5843FF] uppercase">
              Research Transparency
            </span>
            <p className="mt-2 text-sm leading-relaxed text-[#B4BAC8]">
              As an independent technology company, OWYRON publishes technical notes and prototype
              documentation only when work reaches substantive maturity. Researchers and engineers
              interested in early dialogue are welcome to reach out.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center gap-2.5 border border-white/20 px-5 py-3 text-xs font-medium tracking-wider text-white uppercase transition-colors hover:border-[#5843FF] hover:bg-[#3815FC]/15"
          >
            <span>Research Enquiries</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

