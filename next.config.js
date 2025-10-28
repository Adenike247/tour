/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.course-api.com'],
  },
  // Add these for better deployment
  trailingSlash: false,
  output: 'standalone', // Or 'export' if using static export
};

module.exports = nextConfig;