/**
 * Post-build script that generates index.html for the SPA entry point.
 * Reads the built assets from dist/client/ and creates the HTML shell.
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { readdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLIENT_DIR = join(__dirname, "..", "dist", "client");

async function main() {
  if (!existsSync(CLIENT_DIR)) {
    console.error("dist/client/ not found. Run `vite build` first.");
    process.exit(1);
  }

  const files = await readdir(join(CLIENT_DIR, "assets"));

  // Find the main entry JS (index-*.js, NOT a route file)
  const mainJs = files.find(
    (f) => f.startsWith("index-") && f.endsWith(".js"),
  );
  // Find the CSS file
  const mainCss = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));

  if (!mainJs) {
    console.error("No index-*.js entry found in dist/client/assets/");
    process.exit(1);
  }

  const html = `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>PREKLEAD — AI Business OS</title>
    <meta name="description" content="AI отвечает клиентам в Telegram, Instagram и WhatsApp. Inbox, CRM и аналитика в одной системе." />
    <meta name="author" content="PREKLEAD" />
    <meta property="og:title" content="PREKLEAD — AI Business OS" />
    <meta property="og:description" content="AI Business OS для роста продаж. Inbox, CRM, аналитика и автоответы." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" />
    ${mainCss ? `<link rel="stylesheet" href="/assets/${mainCss}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${mainJs}"></script>
  </body>
</html>`;

  writeFileSync(join(CLIENT_DIR, "index.html"), html);
  console.log("✓ Generated index.html in dist/client/");
}

main().catch(console.error);
