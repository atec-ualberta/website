import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";

const src = resolve(__dirname, "src");
const pages = ["index", "about", "projects", "team", "resources", "contact"];
const headshotTypes = ["png", "jpg", "jpeg", "webp"];

// "Brian Sanchez" -> images/headshots/brian_sanchez.png if that file exists, else the placeholder.
// Matches ignoring case (Brian_Sanchez.JPG works too): macOS ignores case but the Linux build server doesn't.
function headshot(name) {
  const wanted = name.trim().toLowerCase().split(/\s+/).join("_");
  const file = readdirSync(resolve(src, "images/headshots")).find((f) => {
    const dot = f.lastIndexOf(".");
    return f.slice(0, dot).toLowerCase() === wanted && headshotTypes.includes(f.slice(dot + 1).toLowerCase());
  });
  return file ? `images/headshots/${file}` : "images/avatar-placeholder.png";
}

// https://vitejs.dev/config/
export default defineConfig({
  // The website lives in src/; config and tooling stay at the repo root
  root: src,
  // Relative asset paths, so the build works on the custom domain and on github.io/website/
  base: "./",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    // Shared head, header and footer live in src/partials/ and are included with {{> name}}
    handlebars({
      partialDirectory: resolve(src, "partials"),
      // Read on every page render, so edits to team.json show up on refresh
      context: () => ({
        team: JSON.parse(readFileSync(resolve(src, "data/team.json"), "utf8")),
      }),
      helpers: {
        eq: (a, b) => a === b,
        headshot,
      },
    }),
  ],
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page, resolve(src, `${page}.html`)]),
      ),
    },
  },
});
