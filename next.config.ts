
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  reactStrictMode: true,
  images: {
    domains: ['maps.googleapis.com'],  // Allow images from Google Maps API
  },
};

export default nextConfig;