import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center pt-[100px] bg-bg relative overflow-hidden">
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      
      {/* Abstract Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[600px] mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[6rem] md:text-[8rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-white/20 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            System Not Found
          </h2>
          <p className="text-mut text-lg mb-10 max-w-[400px] mx-auto leading-relaxed">
            It looks like this page is missing. Don't worry, our automated systems are still running perfectly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm">
              Return Home
            </Link>
            <Link to="/booking" className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-line bg-card hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 font-bold text-sm">
              Book a Call
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
