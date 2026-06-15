import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Testimonial from './components/Testimonial/Testimonial';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ChatWidget from './components/Chatwidget/Chatwidget';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Portfolio />
      <About />
      <Testimonial />
      <Services />
      <Contact />
      <Footer />

      {/* AI Concierge — fixed position, renders above everything */}
      <ChatWidget />
    </div>
  );
}

export default App;