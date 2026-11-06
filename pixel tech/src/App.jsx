import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Home stays in the main bundle (it's the landing page); other routes and the cookie banner load on demand.
const CookieConsent = lazy(() => import('./components/CookieConsent'));
const Booking = lazy(() => import('./pages/Booking'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg text-ink font-body selection:bg-accent selection:text-white relative">
        <ScrollToTop />
        <TopNavBar />
        <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* D3: old pages now live as home sections. */}
          <Route path="/how-it-works" element={<Navigate to="/#how-it-works" replace />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/proof" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <Footer />
        <Suspense fallback={null}><CookieConsent /></Suspense>
      </div>
    </Router>
  );
}

export default App;
