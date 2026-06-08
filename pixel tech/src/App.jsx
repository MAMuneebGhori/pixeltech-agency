import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import HowItWorks from './pages/HowItWorks';
import Pricing from './pages/Pricing';
import TestimonialsPage from './pages/TestimonialsPage';
import About from './pages/About';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import CookieConsent from './components/CookieConsent';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-ink font-body selection:bg-accent selection:text-white relative">
        <ScrollToTop />
        <TopNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/proof" element={<TestimonialsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Chatbot />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
