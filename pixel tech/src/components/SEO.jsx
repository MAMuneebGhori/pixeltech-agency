import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ title, description, url }) {
  const defaultTitle = "Pixeltech Agency | Predictable Growth Systems";
  const defaultDescription = "Turn the leads your clinic already pays for into booked appointments with our automated follow-up infrastructure.";
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
