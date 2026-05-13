import Hero from './sections/Hero';
import About from './sections/About';
import Discover from './sections/Discover';
import Facilities from './sections/Facilities';
import Nearby from './sections/Nearby';
import Location from './sections/Location';
import Footer from './sections/Footer';

export default function App() {
  return (
    <main className="min-h-screen pb-4">
      <Hero/>
      <About/>
      <Discover/>
      <Facilities/>
      <Nearby/>
      <Location/>
      <Footer/>
    </main>
  );
}
