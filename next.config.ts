import type { NextConfig } from "next";
import * as packageJson from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
};

const { version } = packageJson;

export { version };
export default nextConfig;
