import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, mkdir } from "node:fs/promises";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

function contentType(fp) {
  const ext = path.extname(fp).toLowerCase();
  return (
    {
      ".html": "text/html; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".otf": "font/otf",
      ".ttf": "font/ttf",
      ".woff": "font/woff",
      ".woff2": "font/woff2",
      ".json": "application/json; charset=utf-8",
    }[ext] || "application/octet-stream"
  );
}

// Petit serveur statique (pour que les modules + assets chargent correctement)
const server = http.createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    const rel = urlPath === "/" ? "/statistics.html" : urlPath;

    // anti path traversal
    const fp = path.resolve(ROOT, "." + rel);
    if (!fp.startsWith(ROOT)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    const data = await readFile(fp);
    res.writeHead(200, { "Content-Type": contentType(fp) });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();

const gh = process.env.GITHUB_USERNAME ?? "JohnDoe";
const mc = process.env.MINECRAFT_USERNAME ?? "Steve";
const outPath = path.join(ROOT, "exports", "minecraft-stats.png");

const url =
  `http://127.0.0.1:${port}/statistics.html` +
  `?github=${encodeURIComponent(gh)}` +
  `&minecraft=${encodeURIComponent(mc)}`;

await mkdir(path.dirname(outPath), { recursive: true });

const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

  // Attendre que le tableau soit rempli
  await page.waitForFunction(
    () => document.querySelectorAll(".stat-row").length > 0,
    { timeout: 60000 }
  );

  // Attendre que les images du panel soient chargées
  await page.waitForFunction(() => {
    const panel = document.querySelector(".stats-panel");
    if (!panel) return false;
    const imgs = [...panel.querySelectorAll("img")];
    return imgs.every((img) => img.complete && img.naturalWidth > 0);
  });

  // Attendre que les polices soient prêtes (si supporté)
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  const panel = await page.$(".stats-panel");
  if (!panel) throw new Error("Impossible de trouver .stats-panel");

  await panel.screenshot({ path: outPath });
  console.log(`OK -> ${outPath}`);
} finally {
  await browser.close();
  server.close();
}

