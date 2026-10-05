import { getServices } from "../src/lib/api";

// Served at /sitemap.xml. Update NEXT_PUBLIC_SITE_URL in .env before launch so
// the URLs below point at the real domain (see .env.example and README.md).
const staticPaths = ["", "/about", "/projects", "/contact", "/request-quote"];

const buildXml = (baseUrl, urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.begetengineering.com").replace(
    /\/$/,
    ""
  );
  const services = await getServices();
  const urls = [...staticPaths, ...services.map((service) => `/services/${service.slug}`)];

  res.setHeader("Content-Type", "application/xml");
  res.write(buildXml(baseUrl, urls));
  res.end();

  return { props: {} };
};

export default Sitemap;
