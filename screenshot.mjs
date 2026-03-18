import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const screenshotDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

// Find next screenshot number
const existing = fs.readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'));
let num = 1;
for (const f of existing) {
  const match = f.match(/screenshot-(\d+)/);
  if (match) num = Math.max(num, parseInt(match[1]) + 1);
}

const filename = label ? `screenshot-${num}-${label}.png` : `screenshot-${num}.png`;
const filepath = path.join(screenshotDir, filename);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Mobile viewport
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => new Promise(r => setTimeout(r, 1000)));
  await page.screenshot({ path: filepath.replace('.png', '-mobile.png'), fullPage: true });

  // Desktop viewport
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await page.evaluate(() => new Promise(r => setTimeout(r, 1000)));
  await page.screenshot({ path: filepath.replace('.png', '-desktop.png'), fullPage: true });

  await browser.close();
  console.log(`Screenshots saved:\n  ${filepath.replace('.png', '-mobile.png')}\n  ${filepath.replace('.png', '-desktop.png')}`);
})();
