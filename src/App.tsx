import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Research } from './components/Research';
import { Technologies } from './components/Technologies';
import { Vision } from './components/Vision';

export function App() {
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
