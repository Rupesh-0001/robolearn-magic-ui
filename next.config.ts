import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['avatar.vercel.sh'],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Transpile packages that might have issues with Next.js
  transpilePackages: ['@neondatabase/serverless'],
};

export default nextConfig;
