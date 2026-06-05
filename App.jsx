import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MedicalCursor from './components/MedicalCursor';
import MobileBottomBar from './components/MobileBottomBar';
import { WhatsAppIc } from './components/icons';
import Hero from './sections/Hero';
import About from './sections/About';
import Discover from './sections/Discover';
import Facilities from './sections/Facilities';
import Nearby from './sections/Nearby';
import Location from './sections/Location';
import Footer from './sections/Footer';
import ThankYou from './pages/ThankYou';

function Home() {
  return (
    <>
      <main className="min-h-screen pb-28 lg:pb-4">
        <Hero/>
        <About/>
        <Discover/>
        <Facilities/>
        <Nearby/>
        <Location/>
        <Footer/>
      </main>
      <MobileBottomBar />
      {/* Desktop floating WhatsApp button */}
      <a
        href="https://wa.me/919090546363"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden lg:flex fixed bottom-8 right-8 z-9998 w-14 h-14 rounded-full items-center justify-center"
        style={{
          background: '#25D366',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
        }}
      >
        <WhatsAppIc s={28} c="#fff" />
      </a>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MedicalCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}
