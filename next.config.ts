import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['api.microlink.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
    ],
  },
};

export default nextConfig;
