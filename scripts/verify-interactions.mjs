import {createRequire} from 'node:module';
import os from 'node:os';
import path from 'node:path';
const require=createRequire(import.meta.url);
const {chromium}=require(path.join(os.tmpdir(),'valcotal-browser-tools/node_modules/playwright-core'));
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
try{
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await page.goto('http://localhost:3100',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>document.fonts.ready);
  await page.getByRole('button',{name:'الشريحة التالية',exact:true}).click();
  const nextWorks=await page.locator('.hero h1').innerText();
  await page.locator('.hero').evaluate(el=>{
    el.dispatchEvent(new TouchEvent('touchstart',{bubbles:true,touches:[new Touch({identifier:0,target:el,clientX:250})]}));
    el.dispatchEvent(new TouchEvent('touchend',{bubbles:true,changedTouches:[new Touch({identifier:0,target:el,clientX:110})]}));
  });
  const swipeWorks=await page.locator('.hero h1').innerText();
  await page.getByRole('button',{name:'فتح القائمة'}).click();
  await page.keyboard.press('Escape');
  const escapeClosesMenu=!await page.locator('#main-nav').isVisible();
  await page.locator('#sectors').scrollIntoViewIfNeeded();
  await page.screenshot({path:'.qa/mobile-services.png'});
  await page.locator('.engineering').scrollIntoViewIfNeeded();
  await page.screenshot({path:'.qa/mobile-engineering.png'});
  await page.getByRole('button',{name:'استكشف كل المنشورات (51)'}).click();
  const articleCount=await page.locator('.article-card').count();
  await page.setViewportSize({width:768,height:1024});
  await page.locator('#process').scrollIntoViewIfNeeded();
  await page.screenshot({path:'.qa/tablet-process.png'});
  const tabletOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  console.log(JSON.stringify({nextWorks,swipeWorks,escapeClosesMenu,articleCount,tabletOverflow},null,2));
}finally{await browser.close();}
