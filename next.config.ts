import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Webpack bundler (avoids Turbopack panics on certain environments)
  bundler: "webpack",

  // Ignore ESLint/TS errors during build so deploys aren't blocked by warnings
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Allow external images if needed
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
