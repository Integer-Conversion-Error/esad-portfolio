// Zoom into the role bullets of the first experience entry to inspect rendering
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir("/tmp/portfolio-shots", { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "/root/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome",
  args: ["--no-sandbox"],
});
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// Scroll to the timeline section
await page.evaluate(() => {
  document.querySelector("section.timeline")?.scrollIntoView({ behavior: "instant" });
});
await page.waitForTimeout(800);

// Screenshot the full timeline section
await page.locator("section.timeline").screenshot({ path: "/tmp/portfolio-shots/zoom-timeline-full.png" });

// Screenshot just the first role
await page.locator(".role").first().screenshot({ path: "/tmp/portfolio-shots/zoom-first-role.png" });

// Screenshot just the first role-bullet
await page.locator(".role-bullet").first().screenshot({ path: "/tmp/portfolio-shots/zoom-first-bullet.png" });

// Get computed widths of the bullet + its bounding box
const data = await page.evaluate(() => {
  const bullet = document.querySelector(".role-bullet");
  const r = bullet.getBoundingClientRect();
  const cs = getComputedStyle(bullet);
  // Walk up parents and report
  const chain = [];
  let el = bullet.parentElement;
  while (el && chain.length < 8) {
    const er = el.getBoundingClientRect();
    chain.push({
      tag: el.tagName,
      cls: el.className,
      width: Math.round(er.width),
      left: Math.round(er.left),
      paddingLeft: getComputedStyle(el).paddingLeft,
    });
    el = el.parentElement;
  }
  return {
    bullet: { width: Math.round(r.width), left: Math.round(r.left), height: Math.round(r.height), fontSize: cs.fontSize, lineHeight: cs.lineHeight, whiteSpace: cs.whiteSpace, wordBreak: cs.wordBreak, overflowWrap: cs.overflowWrap, hyphens: cs.hyphens },
    parentChain: chain,
  };
});
console.log(JSON.stringify(data, null, 2));

await browser.close();
