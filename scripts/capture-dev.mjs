import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.tmpdir(), 'valcotal-browser-tools/node_modules/playwright-core'));

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'C:/Users/m7ame/OneDrive/Desktop/valcotal/.qa/dev-preloader.png' });
  
  await browser.close();
  console.log('Dev screenshot captured!');
}

main().catch(console.error);
