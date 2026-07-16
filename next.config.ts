import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse'],
  experimental: {
    // Allow server actions and streaming
  },
};

export default nextConfig;
