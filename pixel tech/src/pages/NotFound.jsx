import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// DESIGN.md: no glow orbs, gradient text or entrance animation; the page says what happened and offers the way back.
export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center pt-3xl pb-2xl bg-bg">
      <SEO title="Page not found" description="The page you are looking for does not exist." />
      <div className="container-page">
        <p className="font-mono text-mut mb-md tabular-nums">404</p>
        <h1 className="text-display-s max-w-[20ch] mb-lg">This page doesn’t exist.</h1>
        <p className="text-lead text-mut max-w-[48ch] mb-xl">The link may be old, or the address may be mistyped.</p>
        <div className="flex flex-col sm:flex-row gap-sm">
          <Link to="/" className="btn-primary">Back to the home page</Link>
          <Link to="/booking" className="btn-secondary">Book a 15-min ROI audit</Link>
        </div>
      </div>
    </main>
  );
}
