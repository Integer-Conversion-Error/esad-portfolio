// Run against `npm run preview`. Optional screenshots: PORTFOLIO_SHOTS_DIR.
// Uses Playwright Chromium, or an installed browser via PLAYWRIGHT_EXECUTABLE_PATH.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:4321";
const shots = process.env.PORTFOLIO_SHOTS_DIR;
const slugs = ["home-intercom", "legend-flooring", "raindrop-web", "kaya-auto", "hugging-stocks", "law-buddy", "home-security-node", "home-media-server"];
const paths = ["/", ...slugs.map((slug) => `/projects/${slug}/`)];
const privateRepoNames = ["home-intercom", "intercom-node-kicad", "legend-flooring", "Raindrop-Web", "Raindrop-Website", "Kaya-Auto", "Hugging-Stocks-2", "Law-Buddy", "home-security-node", "home-media-server"];
const results = [];
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });
if (shots) await mkdir(shots, { recursive: true });

try {
  for (const width of [390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    for (const path of paths) {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(new URL(path, base).href, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, path);
      assert.equal(await page.locator("h1").count(), 1, `${path}: one h1`);
      const overflowing = await page.evaluate(() => [...document.body.querySelectorAll("*")].filter((el) => {
        const bounds = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return bounds.width > 0 && style.visibility !== "hidden" && style.display !== "none" && (bounds.right > innerWidth + 1 || bounds.left < -1) && !el.matches(".tp-skip, .study-skip, .tp-drawer, .tp-drawer *");
      }).map((el) => `${el.tagName}.${el.className}`));
      assert.deepEqual(overflowing, [], `${path} at ${width}px: horizontal overflow`);
      assert.deepEqual(errors, [], `${path}: browser errors`);
      for (const image of await page.locator("img").all()) assert.ok(await image.evaluate((el) => el.complete && el.naturalWidth > 0), `${path}: image loads`);

      const links = await page.locator("a[href]").evaluateAll((elements) => elements.map((el) => el.getAttribute("href")));
      for (const href of new Set(links)) {
        assert.ok(!privateRepoNames.some((repo) => href.toLowerCase().startsWith(`https://github.com/integer-conversion-error/${repo.toLowerCase()}`)), `${path}: private repository link`);
        if (!href.startsWith("/") && !href.startsWith("#")) continue;
        const target = new URL(href, page.url());
        const linkResponse = await context.request.get(target.href);
        assert.equal(linkResponse.status(), 200, `${path}: ${href}`);
        if (target.hash) {
          const html = await linkResponse.text();
          const id = decodeURIComponent(target.hash.slice(1));
          assert.ok(html.includes(`id="${id}"`), `${path}: anchor ${href}`);
        }
      }
      if (path === "/") {
        for (const slug of slugs) assert.ok(links.includes(`/projects/${slug}/`), `${slug}: linked from home`);
        assert.ok(links.includes("https://raindropticon.com"), "approved Raindropticon apex URL");
        assert.ok(!links.includes("https://www.raindropticon.com"), "Raindropticon www link removed");
        assert.ok(!links.includes("/projects/raindropticon/"), "no Raindropticon case study");
        if (width === 390) {
          await page.locator("[data-tp-menu]").click();
          assert.equal(await page.locator("[data-tp-menu]").getAttribute("aria-expanded"), "true");
          await page.keyboard.press("Escape");
          assert.equal(await page.locator("[data-tp-menu]").getAttribute("aria-expanded"), "false");
        }
      } else {
        const slug = path.split("/")[2];
        const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
        assert.equal(canonical, `https://esadkaya.ca/projects/${slug}/`);
        for (const id of ["purpose", "contribution", "architecture", "challenge", "outcome", "technologies"]) assert.equal(await page.locator(`#${id}`).count(), 1);
        await page.keyboard.press("Tab");
        assert.equal(await page.locator(".study-skip").evaluate((el) => el === document.activeElement), true);
        await page.keyboard.press("Enter");
        assert.equal(new URL(page.url()).hash, "#project-content");
        if (shots) {
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.screenshot({ path: join(shots, `${slug}-${width}.png`), fullPage: true });
        }
      }
      const fonts = await page.evaluate(() => [...document.fonts].filter((font) => font.status === "loaded").map((font) => font.family));
      results.push({ path, width, status: "passed", loadedFonts: [...new Set(fonts)] });
      await page.close();
    }
    await context.close();
  }

  const noScript = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  for (const path of paths) {
    const page = await noScript.newPage();
    await page.goto(new URL(path, base).href);
    await page.locator("h1").waitFor({ state: "visible" });
    if (path !== "/") assert.ok((await page.locator("#outcome").innerText()).length > 80);
    results.push({ path, javaScript: false, status: "passed" });
    await page.close();
  }
  await noScript.close();
  const sitemap = await (await fetch(new URL("/sitemap-0.xml", base))).text();
  for (const slug of slugs) assert.ok(sitemap.includes(`/projects/${slug}`), `${slug}: in sitemap`);
  assert.ok(!sitemap.includes("/projects/raindropticon"));
  console.log(`Passed ${results.length} route/viewport checks, internal links, anchors, metadata, sitemap, mobile menu, and no-JavaScript content.`);
  if (shots) await writeFile(join(shots, "checks.json"), JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
