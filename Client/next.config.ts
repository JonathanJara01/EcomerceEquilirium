import type { NextConfig } from "next";
import path from "node:path";

// Define la raíz real del backend para evitar que Turbopack detecte mal el workspace.
const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
