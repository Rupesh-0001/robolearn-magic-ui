import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['avatar.vercel.sh'],
  },
  // Transpile packages that might have issues with Next.js
  transpilePackages: ['@neondatabase/serverless'],
};

export default nextConfig;
