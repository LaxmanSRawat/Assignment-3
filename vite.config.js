import { defineConfig } from "vite";

export default defineConfig({
  root: "frontend",
  base: "./",
  // Vite exposes only VITE_* values. RPC/private-key variables stay server-side.
  envDir: process.cwd(),
  build: { outDir: "../dist", emptyOutDir: true },
});
