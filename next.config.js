/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'static.tildacdn.pro' },
      { protocol: 'https', hostname: 'thb.tildacdn.pro' },
    ],
  },
}

module.exports = nextConfig
