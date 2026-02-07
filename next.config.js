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
    // Disable Next.js image optimization for remote images during build/deploy.
    // This avoids Vercel/infra attempting to fetch and optimize remote images
    // at build time which can lead to 404/503 errors for some hosts.
    unoptimized: true,
  },
};

module.exports = nextConfig;
