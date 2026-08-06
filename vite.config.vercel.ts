import { defineConfig } from "vite";
import vinext from "vinext";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/postcss";

// Vercel needs Nitro's server output instead of the Cloudflare Workers plugin.
process.env.NITRO_PRESET ??= "vercel";

export default defineConfig({
  plugins: [vinext(), nitro()],
  css: { postcss: { plugins: [tailwindcss()] } },
});
