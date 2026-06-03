import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unumpeople.com.br',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.unumpeople.com.br',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
