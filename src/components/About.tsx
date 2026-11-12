import { ABOUT_PRINCIPLES } from '../data/siteContent';
import { OwyronLogo } from './OwyronLogo';
import { Reveal } from './Reveal';

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-t border-black/10 bg-[#F8F9FB] py-28 text-[#060608] sm:py-36"
    >
      <div
        className="bg-architectural-grid-light pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left column: section index & brand mark */}
            <div className="flex flex-col justify-between lg:col-span-4">
              <div>
                <div className="inline-flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#3815FC]" aria-hidden="true" />
                  <span className="font-mono-tech text-xs font-medium tracking-[0.2em] text-[#4B5563] uppercase">
                    01 / About OWYRON
                  </span>
                </div>
                <p className="mt-4 max-w-xs text-xs leading-relaxed tracking-wide text-[#525866]">
                  An independent technology company dedicated to foundational inquiry and systems
                  engineering.
                </p>
              </div>

              <div className="mt-12 hidden border-t border-black/10 pt-8 lg:block">
                <OwyronLogo variant="stacked" theme="light" size="sm" className="opacity-90" />
              </div>
            </div>

            {/* Right column: editorial statement */}
            <div className="lg:col-span-8">
              <h2
                id="about-heading"
                className="font-display text-3xl font-semibold tracking-[-0.03em] text-[#060608] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
              >
                Technology should move humanity forward.
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#374151] sm:text-xl sm:leading-relaxed">
                OWYRON exists to explore, engineer and create technology that expands what is
                possible. Through research, experimentation and engineering, we work towards
                developing intelligent systems and innovative solutions that address real-world
                challenges.
              </p>

              {/* Editorial principles grid */}
              <div className="mt-16 grid grid-cols-1 border-t border-black/12 sm:grid-cols-3">
                {ABOUT_PRINCIPLES.map((principle, idx) => (
                  <div
                    key={principle.index}
                    className={`py-8 sm:pr-8 ${
                      idx > 0 ? 'border-t border-black/10 sm:border-t-0 sm:border-l sm:pl-8' : ''
                    }`}
                  >
                    <span className="font-mono-tech text-xs font-medium tracking-widest text-[#3815FC]">
                      {principle.index}
                    </span>
                    <h3 className="font-display mt-3 text-base font-semibold tracking-tight text-[#060608]">
                      {principle.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563]">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

