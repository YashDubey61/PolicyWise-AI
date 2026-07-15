import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdf-parse', '@napi-rs/canvas'],
  experimental: {
    // Allow server actions and streaming
  },
};

export default nextConfig;
