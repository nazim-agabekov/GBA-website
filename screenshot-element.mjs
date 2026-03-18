import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const selector = process.argv[3] || '#pricing';
const label = process.argv[4] || 'element';
const width = parseInt(process.argv[5] || '390');
const screenshotDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const existing = fs.readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'));
let num = 1;
for (const f of existing) {
  const match = f.match(/screenshot-(\d+)/);
  if (match) num = Math.max(num, parseInt(match[1]) + 1);
}

const filename = `screenshot-${num}-${label}.png`;
const filepath = path.join(screenshotDir, filename);

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width, height: 844, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  const el = await page.$(selector);
  if (el) {
    await el.scrollIntoView();
    await page.evaluate(() => new Promise(r => setTimeout(r, 500)));
    await page.screenshot({ path: filepath });
  } else {
    console.log('Element not found: ' + selector);
  }

  await browser.close();
  console.log(`Saved: ${filepath}`);
})();
