import { useEffect } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Research } from './components/Research';
import { Technologies } from './components/Technologies';
import { Vision } from './components/Vision';
import { ENV } from './config/env';

export function App() {
  useEffect(() => {
    if (!ENV.siteUrl) return;

    const normalizedUrl = ENV.siteUrl.replace(/\/+$/, '');

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = normalizedUrl;

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = normalizedUrl;
  }, []);

  return (
    <div className="min-h-screen bg-[#060608] text-[#F5F6FA]">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Technologies />
        <Research />
        <Vision />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
