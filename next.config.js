/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'], // Replace with your allowed domains
  },
};

module.exports = nextConfig;