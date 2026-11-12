import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../data/siteContent';
import { OwyronLogo } from './OwyronLogo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#060608]/92 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60] focus:bg-[#3815FC] focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <a
          href="#home"
          onClick={handleLinkClick}
          className="inline-flex items-center focus-visible:outline-offset-4"
          aria-label="OWYRON Home"
        >
          <OwyronLogo variant="horizontal" theme="dark" size="sm" />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative py-1 text-sm tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-[#9CA3B4] hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-1 h-px transition-opacity duration-200 ${
                        isActive ? 'bg-[#5843FF] opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="h-4 w-px bg-white/15" aria-hidden="true" />

          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 border border-white/20 bg-white/[0.03] px-4 py-2 text-xs font-medium tracking-wider text-white uppercase transition-all duration-200 hover:border-[#5843FF] hover:bg-[#3815FC]/15"
          >
            <span>Connect</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#9CA3B4] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-colors hover:border-white/35 md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-white/10 bg-[#060608] px-6 pt-6 pb-10 md:hidden"
        >
          <nav aria-label="Mobile Navigation">
            <ul className="divide-y divide-white/10 border-b border-white/10">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between py-4 text-base font-medium transition-colors"
                    >
                      <span className={isActive ? 'text-white' : 'text-[#9CA3B4]'}>
                        {item.label}
                      </span>
                      <span className="font-mono-tech text-xs text-[#666D80]">
                        0{idx + 1}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="flex w-full items-center justify-between border border-[#5843FF]/60 bg-[#3815FC]/15 px-5 py-3.5 text-xs font-medium tracking-widest text-white uppercase transition-colors hover:bg-[#3815FC]/25"
              >
                <span>Initiate Dialogue</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

