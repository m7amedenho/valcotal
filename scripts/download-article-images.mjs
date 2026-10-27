import fs from 'node:fs';
import sharp from 'sharp';
const file='data/articles.json';
const posts=JSON.parse(fs.readFileSync(file,'utf8'));
for(const post of posts) post.cover=null;
fs.mkdirSync('public/media/articles',{recursive:true});
let count=0;
async function download(i){
  const url=posts[i].images?.[0];
  if(!url) return;
  try{
    const response=await fetch(url,{signal:AbortSignal.timeout(10000)});
    if(!response.ok) return;
    const bytes=Buffer.from(await response.arrayBuffer());
    const dest=`public/media/articles/article-${String(i+1).padStart(2,'0')}.jpg`;
    await sharp(bytes).resize(800,600,{fit:'inside'}).jpeg({quality:80}).toFile(dest);
    posts[i].cover='/'+dest.replaceAll('\\','/').replace(/^public\//,'');
    count++;
  }catch{}
}
await Promise.all(posts.map((_,i)=>download(i)));
fs.writeFileSync(file,JSON.stringify(posts,null,2));
console.log(`Downloaded ${count} article covers`);
