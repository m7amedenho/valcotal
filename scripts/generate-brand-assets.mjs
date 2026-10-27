import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = 'C:/Users/m7ame/OneDrive/Desktop/valcotal';
const publicDir = path.join(projectRoot, 'public');
const appDir = path.join(projectRoot, 'app');

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(count, 4); // number of images

  let offset = 6 + (16 * count);
  const dirEntries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    offset += item.buffer.length;
    dirEntries.push(entry);
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buffer)]);
}

async function run() {
  console.log('Generating brand assets...');

  const gradLogoPath = path.join(publicDir, 'VALCOTAL Gradient Tech Logo.png');
  const transLogoPath = path.join(publicDir, 'logo-transparent.png');

  // 1. Social Sharing & WhatsApp Preview (OG Image)
  // Standard 1200x630
  const ogWidth = 1200;
  const ogHeight = 630;

  // For the OG image, we display the VALCOTAL Gradient Tech Logo clearly
  const logoForOg = await sharp(gradLogoPath)
    .trim()
    .resize(950, 480, { fit: 'inside' })
    .toBuffer();

  const ogImage = await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: logoForOg,
        gravity: 'center'
      }
    ])
    .jpeg({ quality: 90 })
    .toBuffer();

  const ogImagePng = await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: logoForOg,
        gravity: 'center'
      }
    ])
    .png({ quality: 90, compressionLevel: 8 })
    .toBuffer();

  console.log('OG JPEG size:', ogImage.length, 'bytes');
  console.log('OG PNG size:', ogImagePng.length, 'bytes');

  fs.writeFileSync(path.join(publicDir, 'og-image.jpg'), ogImage);
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogImagePng);
  fs.writeFileSync(path.join(publicDir, 'valcotal-og.png'), ogImagePng);
  fs.writeFileSync(path.join(appDir, 'opengraph-image.png'), ogImagePng);
  fs.writeFileSync(path.join(appDir, 'twitter-image.png'), ogImagePng);

  // 2. Favicons & Web Icons
  const squareSize = 512;
  const logoSquareFit = await sharp(transLogoPath)
    .resize(460, 460, { fit: 'inside' })
    .toBuffer();

  const icon512 = await sharp({
    create: {
      width: squareSize,
      height: squareSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: logoSquareFit,
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  const icon192 = await sharp(icon512).resize(192, 192).png().toBuffer();
  const icon48 = await sharp(icon512).resize(48, 48).png().toBuffer();
  const icon32 = await sharp(icon512).resize(32, 32).png().toBuffer();
  const icon16 = await sharp(icon512).resize(16, 16).png().toBuffer();

  const apple180 = await sharp(gradLogoPath)
    .trim()
    .resize(150, 150, { fit: 'inside' })
    .toBuffer();
  
  const appleTouch = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([{ input: apple180, gravity: 'center' }])
    .png()
    .toBuffer();

  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: icon16 },
    { width: 32, height: 32, buffer: icon32 },
    { width: 48, height: 48, buffer: icon48 },
  ]);

  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'icon.png'), icon32);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleTouch);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

  console.log('All brand icon assets generated successfully!');
}

run().catch(console.error);
