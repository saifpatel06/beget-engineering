import Head from "next/head";
import site from "../../data/site";
import { banners } from "../../data/images";

// Central place for per-page SEO: title, meta description, canonical URL,
// Open Graph / Twitter cards, and sitewide LocalBusiness structured data
// (name, address and phone, so Google can show Beget Engineering correctly
// in search and maps results). Every page should render <Seo /> once.
const Seo = ({ title, description, image = banners.home.src, path = "" }) => {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name}: ${site.tagline}`;
  const metaDescription = description || site.description;
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  const canonical = baseUrl ? `${baseUrl}${path}` : undefined;
  const { contact } = site;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    description: site.description,
    ...(baseUrl && { url: baseUrl, image, logo: `${baseUrl}/images/logo.png` }),
    telephone: contact.phone,
    email: contact.email,
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      addressLocality: contact.city,
      addressRegion: contact.region,
      postalCode: contact.postalCode,
      addressCountry: contact.country,
    },
    sameAs: site.social.filter((item) => item.href && item.href !== "#").map((item) => item.href),
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={`${site.name} logo and project photography`} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />

      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
};

export default Seo;
