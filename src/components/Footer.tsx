import { ENQUIRY_CHANNELS, NAV_ITEMS, TECHNOLOGY_DOMAINS } from '../data/siteContent';
import { OwyronLogo } from './OwyronLogo';

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060608] text-[#9CA3B4]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <a href="#home" aria-label="OWYRON Home" className="inline-flex items-start gap-1">
              <OwyronLogo variant="horizontal" theme="dark" size="md" />
              <span
                className="font-sans text-[11px] leading-none font-medium text-[#9CA3B4]"
                aria-hidden="true"
              >
                &reg;
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#9CA3B4]">
              OWYRON is an independent technology company focused on artificial intelligence,
              intelligent systems, software engineering, and emerging technologies for the future.
            </p>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-2">
            <h3 className="font-mono-tech text-[11px] tracking-[0.2em] text-white uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-[#9CA3B4] transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology focus areas column */}
          <div className="lg:col-span-3">
            <h3 className="font-mono-tech text-[11px] tracking-[0.2em] text-white uppercase">
              Technologies
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {TECHNOLOGY_DOMAINS.map((domain) => (
                <li key={domain.id}>
                  <a
                    href="#technologies"
                    className="text-[#9CA3B4] transition-colors hover:text-white"
                  >
                    {domain.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact channels */}
          <div className="lg:col-span-3">
            <h3 className="font-mono-tech text-[11px] tracking-[0.2em] text-white uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-xs">
              {ENQUIRY_CHANNELS.map((channel) => (
                <li key={channel.id}>
                  <span className="block text-[#D1D5DF]">{channel.title}</span>
                  {channel.email ? (
                    <a
                      href={`mailto:${channel.email}`}
                      className="font-mono-tech mt-0.5 block text-[#9CA3B4] transition-colors hover:text-white"
                    >
                      {channel.email}
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="font-mono-tech mt-0.5 block text-[#666D80] transition-colors hover:text-white"
                    >
                      Enquiry form &rarr;
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#9CA3B4] sm:flex-row sm:items-center">
          <p>
            &copy; {CURRENT_YEAR} OWYRON<sup className="ml-0.5 text-[10px]">&reg;</sup>. All rights
            reserved.
          </p>
          <p className="font-mono-tech tracking-wider text-[#666D80] uppercase">
            Engineering Intelligence &middot; Building Tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
}
