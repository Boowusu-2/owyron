import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#060608] pt-24 pb-10"
    >
      {/* Subtle precision background grid */}
      <div className="bg-architectural-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      {/* Abstract computational lattice visual */}
      <HeroCanvas />

      {/* Bottom fade for clean transition */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#060608] to-transparent"
        aria-hidden="true"
      />

      {/* Main hero focal content */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="max-w-3xl">
          <div className="animate-fade-rise mb-8 inline-flex items-center gap-3 border-l-2 border-[#3815FC] pl-3.5">
            <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9CA3B4] uppercase">
              OWYRON — Artificial Intelligence &amp; Advanced Engineering
            </span>
          </div>

          <h1
            id="hero-heading"
            className="animate-fade-rise-delay-1 font-display text-4xl font-semibold tracking-[-0.035em] text-white sm:text-6xl lg:text-[4.5rem] lg:leading-[1.03]"
          >
            Engineering Intelligence.
            <br />
            <span className="text-[#9CA3B4]">Building Tomorrow.</span>
          </h1>

          <p className="animate-fade-rise-delay-2 mt-8 max-w-xl text-base leading-relaxed text-[#B4BAC8] sm:text-lg sm:leading-relaxed">
            OWYRON is an independent technology company exploring the possibilities of artificial
            intelligence and advanced engineering to build intelligent solutions for a changing
            world.
          </p>

          <div className="animate-fade-rise-delay-3 mt-11 flex flex-wrap items-center gap-4">
            <a
              href="#technologies"
              className="group inline-flex items-center gap-3 bg-white px-6 py-3.5 text-sm font-medium tracking-wide text-[#060608] transition-all duration-200 hover:bg-[#3815FC] hover:text-white"
            >
              <span>Explore Our Technologies</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href="#about"
              className="group inline-flex items-center gap-2.5 border border-white/20 bg-[#060608]/60 px-6 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-200 hover:border-white/50 hover:bg-white/[0.04]"
            >
              <span>About OWYRON</span>
              <ArrowDownRight className="h-4 w-4 text-[#9CA3B4] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Minimalist structural index strip */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6 sm:grid-cols-4">
          {[
            { code: '01', label: 'Artificial Intelligence' },
            { code: '02', label: 'Intelligent Systems' },
            { code: '03', label: 'Software Engineering' },
            { code: '04', label: 'Emerging Technologies' },
          ].map((item) => (
            <a
              key={item.code}
              href="#technologies"
              className="group flex items-baseline justify-between gap-2 border-l border-white/10 pl-3 transition-colors hover:border-[#5843FF]"
            >
              <span className="text-xs font-medium tracking-wide text-[#B4BAC8] transition-colors group-hover:text-white">
                {item.label}
              </span>
              <span className="font-mono-tech text-[11px] text-[#666D80] transition-colors group-hover:text-[#5843FF]">
                {item.code}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

