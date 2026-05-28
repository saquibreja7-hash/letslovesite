import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      {
        source: "/auth/action",
        destination: "/auth-action.html",
      },
      {
        source: "/__/auth/action",
        destination: "/auth-action.html",
      },
    ];
  },
};

export default nextConfig;
