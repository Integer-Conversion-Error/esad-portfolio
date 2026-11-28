// Run against `npm run preview`. Optional screenshots: PORTFOLIO_SHOTS_DIR.
// Uses Playwright Chromium, or an installed browser via PLAYWRIGHT_EXECUTABLE_PATH.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

const base = process.argv[2] || "http://localhost:4321";
const shots = process.env.PORTFOLIO_SHOTS_DIR;
const slugs = ["hack-the-nest", "home-intercom", "legend-flooring", "raindrop-web", "kaya-auto", "hugging-stocks", "law-buddy", "home-security-node", "home-media-server"];
const paths = ["/", ...slugs.map((slug) => `/projects/${slug}/`)];
const projectOrder = [
  "raindropticon", "parkopticon", "legend-flooring", "hack-the-nest", "home-intercom",
  "raindrop-web", "put-it-down", "home-media-server", "autoscraper", "kaya-auto",
  "home-security-node", "budg-it", "notesplicer", "hugging-stocks", "law-buddy",
];
const privateRepoNames = ["home-intercom", "intercom-node-kicad", "legend-flooring", "Raindrop-Web", "Raindrop-Website", "Kaya-Auto", "Hugging-Stocks-2", "Law-Buddy", "home-security-node", "home-media-server"];
const results = [];
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });
if (shots) await mkdir(shots, { recursive: true });

try {
  for (const width of [320, 390, 768, 1440]) {
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
        assert.equal((await page.locator("#tp-hero-title").innerText()).replace(/\s+/g, " "), "Building for the real world");
        assert.deepEqual(await page.locator(".tp > section[id]").evaluateAll((sections) => sections.map((section) => section.id)), ["record", "projects", "about", "resume", "contact"]);
        assert.deepEqual(await page.locator(".tp-projects article").evaluateAll((projects) => projects.map((project) => project.id)), projectOrder);
        assert.equal(await page.locator("#work").count(), 1, "legacy work anchor remains valid");
        assert.equal(await page.locator(".tp-side").count(), 0, "one complete project collection");
        assert.equal(await page.locator(".tp-history-row .organization-logo img").count(), 5, "organization logo for each job");
        assert.equal(await page.locator(".tp-history-identity h3").evaluateAll((headings) => headings.every((heading) => heading.scrollWidth <= heading.clientWidth + 1)), true, "company names fit narrow viewports");
        assert.deepEqual(await page.locator(".tp-hero-records a").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href"))), ["#raindropticon", "#parkopticon", "#home-intercom"]);
        assert.equal(await page.locator("[data-tool]").count(), 40, "all tools remain available");
        await page.locator('[data-tools-filter="data"]').click();
        await page.locator('[data-tool="Power BI"]').focus();
        await page.keyboard.press("Enter");
        assert.equal(await page.locator("[data-tools-selected]").innerText(), "Power BI", "tools respond to keyboard selection");
        assert.equal(await page.locator('[data-tools-links] a[href="#experience-infrastructure-canada"]').count(), 1, "Power BI links to documented experience");
        await page.locator('[data-tools-filter="hardware"]').click();
        await page.locator('[data-tool="ESP32"]').click();
        assert.deepEqual((await page.locator("[data-tools-links] a").evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href")))).sort(), ["#home-intercom", "#home-security-node", "#parkopticon"]);
        await page.locator('[data-tool="Arduino"]').click();
        assert.equal(await page.locator("[data-tools-context]").innerText(), "Not covered in these project write-ups.", "related projects do not imply confirmed tool usage");
        assert.equal(await page.locator("[data-tools-links]").isVisible(), false);
        await page.locator('[data-tools-filter="languages"]').click();
        await page.locator('[data-tool="Python"]').click();
        if (width > 680) await page.locator('[data-tools-filter="all"]').click();
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
        await page.waitForURL((url) => url.hash === "#project-content");
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
    else {
      assert.equal(await page.locator(".tp-projects article").count(), 15, "all projects work without JavaScript");
      assert.equal(await page.locator("[data-tool]").count(), 40, "all tools readable without JavaScript");
      assert.equal(await page.locator("[data-tool]:enabled").count(), 0, "no nonfunctional interactive controls without JavaScript");
      assert.equal(await page.locator("[data-tools-links] a").count(), 6, "project links available without JavaScript");
    }
    results.push({ path, javaScript: false, status: "passed" });
    await page.close();
  }
  await noScript.close();
  const sitemap = await (await fetch(new URL("/sitemap-0.xml", base))).text();
  for (const slug of slugs) assert.ok(sitemap.includes(`/projects/${slug}`), `${slug}: in sitemap`);
  assert.ok(!sitemap.includes("/projects/raindropticon"));
  console.log(`Passed ${results.length} route/viewport checks, internal links, anchors, metadata, sitemap, project ordering, tools interaction, mobile menu, and no-JavaScript content.`);
  if (shots) await writeFile(join(shots, "checks.json"), JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
