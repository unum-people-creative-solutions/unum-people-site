import type { NextConfig } from "next";
import { lpPlanos } from "./src/lib/links";

const nextConfig: NextConfig = {
  // /servicos deixou de existir: a oferta vive na vitrine do LP Builder.
  // Destino fixo (sem parâmetros vindos da requisição), então não há redirecionamento aberto.
  async redirects() {
    return [
      {
        source: '/servicos',
        destination: lpPlanos(),
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
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
