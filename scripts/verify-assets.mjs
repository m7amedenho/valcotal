import fs from 'node:fs';

const html = fs.readFileSync('C:/Users/m7ame/OneDrive/Desktop/valcotal/.next/server/app/index.html', 'utf8');

console.log('--- OG METADATA ---');
const ogMatches = html.match(/<meta[^>]+property="og:[^>]+>/g) || [];
ogMatches.forEach(m => console.log(m));

console.log('\n--- TWITTER METADATA ---');
const twMatches = html.match(/<meta[^>]+name="twitter:[^>]+>/g) || [];
twMatches.forEach(m => console.log(m));

console.log('\n--- ICONS ---');
const iconMatches = html.match(/<link[^>]+rel="(?:icon|apple-touch-icon|shortcut icon)"[^>]+>/g) || [];
iconMatches.forEach(m => console.log(m));

console.log('\n--- PRELOADER FOUND ---');
console.log(html.includes('id="site-preloader"') ? 'YES, found!' : 'NO');
