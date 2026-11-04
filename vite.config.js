import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { resolve } from "path";

const pages = ["index", "about", "projects", "team", "resources", "contact"];

// https://vitejs.dev/config/
export default defineConfig({
  // Relative asset paths, so the build works on the custom domain and on github.io/website/
  base: "./",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    // Shared head, header and footer live in partials/ and are included with {{> name}}
    handlebars({
      partialDirectory: resolve(__dirname, "partials"),
      helpers: {
        eq: (a, b) => a === b,
      },
    }),
  ],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page, resolve(__dirname, `${page}.html`)]),
      ),
    },
  },
});
