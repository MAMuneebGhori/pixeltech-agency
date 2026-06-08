import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import Testimonials from './pages/Testimonials';
import About from './pages/About';
import HelpCenter from './pages/HelpCenter';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import CookieConsent from './components/CookieConsent';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-ink font-body selection:bg-accent selection:text-white relative">
        <ScrollToTop />
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
        <Chatbot />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
