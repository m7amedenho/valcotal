import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.tmpdir(), 'valcotal-browser-tools/node_modules/playwright-core'));

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  
  // We want to capture the preloader immediately before it fades out
  // Or pause the page before fade
  await page.goto('http://localhost:3210', { waitUntil: 'commit' });
  await page.screenshot({ path: 'C:/Users/m7ame/OneDrive/Desktop/valcotal/.qa/preloader-desktop.png' });
  
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3210', { waitUntil: 'commit' });
  await mobile.screenshot({ path: 'C:/Users/m7ame/OneDrive/Desktop/valcotal/.qa/preloader-mobile.png' });
  
  await browser.close();
  console.log('Screenshots captured successfully!');
}

main().catch(console.error);
