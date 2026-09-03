// Inspect computed widths of timeline elements to find what's constraining the column
import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/root/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome",
  args: ["--no-sandbox"],
});
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });

const data = await page.evaluate(() => {
  const inspect = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return { found: false };
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      found: true,
      width: Math.round(r.width),
      left: Math.round(r.left),
      paddingLeft: cs.paddingLeft,
      paddingRight: cs.paddingRight,
      marginLeft: cs.marginLeft,
      display: cs.display,
      position: cs.position,
      flexDirection: cs.flexDirection,
      gridTemplateColumns: cs.gridTemplateColumns,
    };
  };
  return {
    section: inspect("section.timeline"),
    container: inspect("section.timeline > .container"),
    railWrap: inspect(".rail-wrap"),
    rail: inspect(".rail"),
    entries: inspect(".entries"),
    yearBlock: inspect(".year-block"),
    roleList: inspect(".role-list"),
    role: inspect(".role"),
    roleBody: inspect(".role-body"),
    roleBullet: inspect(".role-bullet"),
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
