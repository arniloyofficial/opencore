/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Explicitly use Pages Router — prevents conflicts with App Router
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
