import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'api.microlink.io',
      'unumpeople.com.br',
      'www.unumpeople.com.br'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
      {
        protocol: 'https',
        hostname: 'unumpeople.com.br',
      },
      {
        protocol: 'https',
        hostname: 'www.unumpeople.com.br',
      },
    ],
  },
};

export default nextConfig;
