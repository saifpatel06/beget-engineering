/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // When media moves to the CMS / CodeIgniter server, add its host here:
    // remotePatterns: [{ protocol: "https", hostname: "cms.your-domain.com" }],
  },
};

module.exports = nextConfig;
