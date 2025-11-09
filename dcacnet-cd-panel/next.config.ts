import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization to reduce routes
  images: {
    unoptimized: true,
  },

  webpack: (config, { isServer }) => {
    // Add WASM support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    return config;
  },
};

export default nextConfig;
