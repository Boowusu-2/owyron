import { VISION_PILLARS } from '../data/siteContent';
import { Reveal } from './Reveal';

export function Vision() {
  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="relative overflow-hidden border-t border-black/10 bg-[#F8F9FB] py-28 text-[#060608] sm:py-36"
    >
      {/* Subtle geometric meridian graphic in top-right corner */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 opacity-[0.07]"
      >
        <circle cx="200" cy="200" r="190" stroke="#060608" strokeWidth="1" />
        <circle cx="200" cy="200" r="130" stroke="#3815FC" strokeWidth="1.2" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="#060608" strokeWidth="1" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#060608" strokeWidth="1" />
      </svg>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3">
              <span className="h-2 w-2 bg-[#3815FC]" aria-hidden="true" />
              <span className="font-mono-tech text-xs font-medium tracking-[0.2em] text-[#4B5563] uppercase">
                04 / Long-Term Vision
              </span>
            </div>

            <h2
              id="vision-heading"
              className="font-display mt-6 text-3xl font-semibold tracking-[-0.035em] text-[#060608] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.06]"
            >
              Building beyond today&apos;s limitations.
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#374151] sm:text-xl sm:leading-relaxed">
              Lasting technological progress does not come from shortcuts. OWYRON is built around a
              long-term commitment to contribute meaningfully to the future of intelligence and
              engineering through continuous learning, rigorous research, deliberate experimentation,
              and disciplined execution.
            </p>
          </div>
        </Reveal>

        {/* Four foundational pillars */}
        <div className="mt-20 grid grid-cols-1 border-t border-black/15 sm:grid-cols-2 lg:grid-cols-4">
          {VISION_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.index}
              className={`py-8 sm:pr-7 ${
                idx > 0 ? 'border-t border-black/10 sm:border-t-0 lg:border-l lg:pl-7' : ''
              } ${idx === 2 ? 'sm:border-t sm:border-black/10 lg:border-t-0' : ''} ${
                idx === 1 || idx === 3 ? 'sm:border-l sm:border-black/10 sm:pl-7' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-tech text-xs font-semibold tracking-widest text-[#3815FC]">
                  {pillar.index}
                </span>
                <span className="h-px w-8 bg-black/15" aria-hidden="true" />
              </div>

              <h3 className="font-display mt-5 text-lg font-semibold tracking-tight text-[#060608]">
                {pillar.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

