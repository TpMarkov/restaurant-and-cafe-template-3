/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external Unsplash hosts used by the template images.
    // Using explicit hostnames prevents unexpected upstream fetch issues during deploy.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
