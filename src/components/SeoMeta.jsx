import React from "react";
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://3d7tech.com";
const LOGO_URL = `${BASE_URL}/images/logo/Big.png`;
const SITE_NAME = "3D7 Technologies";
const TWITTER_HANDLE = "@3d7techdotcom";
const DEFAULT_DESCRIPTION =
  "We specialise in crafting cutting-edge AI systems tailored to your unique business requirements. Transform your vision into reality with 3D7 Technologies.";

/**
 * Renders Open Graph and Twitter Card meta tags for social sharing.
 * Uses the 3D7 Technologies logo for all page previews.
 * @param {string} title - Page title (e.g. "About Us | 3D7 Technologies")
 * @param {string} [description] - Page description for social preview
 * @param {string} [path] - Path for canonical/og:url (e.g. "/aboutUs")
 */
function SeoMeta({ title, description = DEFAULT_DESCRIPTION, path = "" }) {
  const url = path ? `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}` : BASE_URL + "/";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={LOGO_URL} />
      <meta property="og:image:alt" content="3D7 Technologies Logo" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={LOGO_URL} />
      <meta name="twitter:image:alt" content="3D7 Technologies Logo" />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default SeoMeta;
