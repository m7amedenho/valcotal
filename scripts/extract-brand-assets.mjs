import fs from 'node:fs';
import sharp from 'sharp';
const src='C:/Users/m7ame/Downloads/Valcotal/images 2';
const out='public/brand';fs.mkdirSync(out,{recursive:true});
for(let i=1;i<=12;i++)await sharp(`${src}/Artboard ${i}.png`).resize({width:1100}).webp({quality:78}).toFile(`${out}/artboard-${i}.webp`);
const factor=2480/1334;
const crops=[
  [8,'delemar',55,795,205,195],[8,'dawlia',272,795,220,195],[8,'alumil',55,1000,205,195],[8,'mac',273,1000,218,195],
  [8,'saint-gobain',540,795,180,195],[8,'greiche',735,795,170,195],[8,'arab-union',540,1000,365,195],[8,'madar',945,795,350,195],[8,'nile',945,1000,350,195],
  [11,'abo-donkol',975,615,310,135],[11,'alfath',595,610,355,135],[11,'askar',645,785,260,200],[11,'pharco',45,795,170,185],[11,'medizen',220,795,175,185],[11,'altahrir',405,795,180,185],[11,'shahnaz',985,785,295,195],
  [11,'alex',45,1010,330,240],[11,'protec',395,1010,295,240],[11,'falcon',710,1010,295,240],[11,'tu',1030,1010,260,240]
];
for(const [board,name,x,y,w,h] of crops){
  await sharp(`${src}/Artboard ${board}.png`).extract({left:Math.round(x*factor),top:Math.round(y*factor),width:Math.round(w*factor),height:Math.round(h*factor)}).resize({width:430}).webp({quality:88}).toFile(`${out}/${name}.webp`);
}
console.log(`Exported ${crops.length} logo crops and 12 artboards`);
