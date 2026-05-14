import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MedicalCursor from './components/MedicalCursor';
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
      <main className="min-h-screen pb-4">
        <Hero/>
        <About/>
        <Discover/>
        <Facilities/>
        <Nearby/>
        <Location/>
        <Footer/>
      </main>
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
