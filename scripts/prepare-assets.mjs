import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { createHash } from 'node:crypto';

const root = 'C:/Users/m7ame/Downloads/Valcotal';
const out = path.resolve('public/media');
fs.mkdirSync(out, { recursive: true });
const files = [];
function walk(dir) { for (const d of fs.readdirSync(dir,{withFileTypes:true})) { const p=path.join(dir,d.name); if(d.isDirectory()) walk(p); else if(/\.(jpe?g|png)$/i.test(d.name)) files.push(p); } }
walk(path.join(root,'تعديلات جديدة'));
const unique = [...new Map(files.map(f=>[createHash('sha1').update(fs.readFileSync(f)).digest('hex'),f])).values()];
const selected = unique.slice(0,160);
for(let i=0;i<selected.length;i++) await sharp(selected[i]).resize(900,700,{fit:'inside'}).jpeg({quality:80}).toFile(path.join(out,`project-${String(i+1).padStart(3,'0')}.jpg`));
const tile=async(f,i)=>({input:await sharp(f).resize(145,105,{fit:'cover'}).composite([{input:Buffer.from(`<svg width="145" height="105"><rect x="0" y="79" width="48" height="26" fill="#071b26"/><text x="6" y="98" font-size="17" fill="white">${i+1}</text></svg>`),left:0,top:0}]).png().toBuffer(),left:(i%8)*145,top:Math.floor(i/8)*105});
for(let start=0;start<selected.length;start+=80){const group=selected.slice(start,start+80); await sharp({create:{width:1160,height:Math.ceil(group.length/8)*105,channels:3,background:'#fff'}}).composite(await Promise.all(group.map((f,i)=>tile(f,start+i)))).png().toFile(path.resolve(`contact-${start/80+1}.png`));}
const feed=await (await fetch('https://valcotal.blogspot.com/feeds/posts/default?alt=json&max-results=500')).json();
const decode=s=>s||'';
const posts=feed.feed.entry.map(e=>{const html=decode(e.content?.$t);return {title:decode(e.title.$t),date:e.published.$t.slice(0,10),url:e.link.find(l=>l.rel==='alternate')?.href,html,images:[...html.matchAll(/https?:\/\/[^"' ]+?\.(?:jpg|jpeg|png)/gi)].map(x=>x[0])}});
fs.mkdirSync('data',{recursive:true}); fs.writeFileSync('data/articles.json',JSON.stringify(posts,null,2));
const logo=path.resolve('public/VALCOTAL Gradient Tech Logo.png');
const image=sharp(logo); const meta=await image.metadata(); const raw=await image.ensureAlpha().raw().toBuffer({resolveWithObject:true});
const {data,info}=raw; const bg=[data[0],data[1],data[2]];for(let i=0;i<data.length;i+=4){const dist=Math.max(Math.abs(data[i]-bg[0]),Math.abs(data[i+1]-bg[1]),Math.abs(data[i+2]-bg[2]));data[i+3]=dist<18?0:Math.min(255,(dist-18)*6);}
await sharp(data,{raw:info}).trim().png().toFile(path.resolve('public/logo-transparent.png'));
console.log(JSON.stringify({images:selected.length,posts:posts.length,logo:meta}));
