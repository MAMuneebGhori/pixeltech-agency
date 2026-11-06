import { Helmet } from 'react-helmet';

export default function SEO({ title, description, url }) {
  const defaultTitle = "AI Receptionist for Med Spas | Pixeltech Agency";
  const defaultDescription = "An AI receptionist and lead-reactivation system for med spas. Answers calls, replies to texts and DMs, and books patients into your calendar.";
  const siteUrl = "https://pixeltech.agency"; // Update with final domain

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | Pixeltech Agency` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="og:title" content={title ? `${title} | Pixeltech Agency` : defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />

      {/* Twitter */}
      <meta property="twitter:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="twitter:title" content={title ? `${title} | Pixeltech Agency` : defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
}
