import type { NextConfig } from "next";
import { LEGACY_REDIRECTS } from "./src/lib/legacyRoutes";

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
