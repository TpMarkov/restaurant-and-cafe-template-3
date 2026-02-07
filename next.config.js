/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Keep image optimization disabled for remote stock images to avoid upstream fetch errors during deploy.
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
