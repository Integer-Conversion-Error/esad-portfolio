// Playwright screenshot helper — captures the live dev server at multiple
// desktop viewports and saves full-page + section screenshots.
//
// Usage: node scripts/screenshot.mjs [baseUrl]

import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.argv[2] || "http://localhost:4321";
const OUT_DIR = "/tmp/portfolio-shots";
const VIEWPORTS = [
  { name: "1280x800",  width: 1280, height: 800  },
  { name: "1440x900",  width: 1440, height: 900  },
  { name: "1920x1080", width: 1920, height: 1080 },
];

const PAGES = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog/" },
  { name: "blog-post", path: "/blog/hydrogen-diesel/" },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    executablePath: "/root/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n=== Viewport: ${vp.name} ===`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        reducedMotion: "reduce", // freeze animations for stable shots
      });

      for (const page of PAGES) {
        const url = `${BASE}${page.path}`;
        console.log(`  -> ${url}`);
        const tab = await context.newPage();
        await tab.goto(url, { waitUntil: "networkidle", timeout: 20000 });
        // Let page layout and font loading settle.
        await tab.waitForTimeout(800);

        // Full page
        const fullPath = join(OUT_DIR, `${page.name}-${vp.name}-full.png`);
        await tab.screenshot({ path: fullPath, fullPage: true });
        console.log(`     full:    ${fullPath}`);

        // Section-specific screenshots
        if (page.name === "home") {
          for (const sel of [
            "section.tp-hero",
            "section.tp-work",
            "section.tp-record",
            "section.tp-about",
            "section.tp-toolbox",
            "section.tp-resume",
            "section.tp-side",
            "section.tp-contact",
          ]) {
            const el = await tab.$(sel);
            if (el) {
              const out = join(OUT_DIR, `${page.name}-${vp.name}-${sel.replace(/[^a-z0-9]/gi, "-")}.png`);
              await el.screenshot({ path: out });
              console.log(`     ${sel}: ${out}`);
            }
          }

          // Also: scroll to each project card and snap it
          const projects = await tab.$$("article.tp-project");
          for (let i = 0; i < projects.length; i++) {
            await projects[i].scrollIntoViewIfNeeded();
            await tab.waitForTimeout(300);
            const out = join(OUT_DIR, `${page.name}-${vp.name}-project-${i + 1}.png`);
            await projects[i].screenshot({ path: out });
            console.log(`     project ${i + 1}: ${out}`);
          }
        }

        if (page.name === "blog-post") {
          const article = await tab.$("article.post");
          if (article) {
            const out = join(OUT_DIR, `${page.name}-${vp.name}-article.png`);
            await article.screenshot({ path: out });
            console.log(`     article: ${out}`);
          }
          // references ol specifically
          const ol = await tab.$("article.post ol");
          if (ol) {
            const out = join(OUT_DIR, `${page.name}-${vp.name}-references.png`);
            await ol.screenshot({ path: out });
            console.log(`     references: ${out}`);
          }
        }

        await tab.close();
      }

      await context.close();
    }
  } finally {
    await browser.close();
  }

  console.log(`\nAll screenshots saved to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
