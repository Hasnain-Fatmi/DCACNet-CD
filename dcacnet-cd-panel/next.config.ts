import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization for better compatibility
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
