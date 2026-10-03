import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function processFlower() {
  const inputPath = 'C:/Users/USER/.gemini/antigravity-ide/brain/5faf9230-20d8-467e-b8f4-876bcc851f8b/botanical_pink_peony_1791010718288.jpg';
  const outPng = 'f:/wedsites templates/project 8 - glass theme/public/assets/flower.png';
  const outWebp = 'f:/wedsites templates/project 8 - glass theme/public/assets/flower.webp';

  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Background is pure/near white. Compute alpha based on distance from white (255,255,255)
  // for watercolor, watercolor wash can be translucent.
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Lightness / distance from white
    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);
    const diffFromWhite = 255 - minVal;

    // Thresholds
    if (r > 248 && g > 248 && b > 248) {
      data[i + 3] = 0; // completely transparent
    } else if (r > 235 && g > 235 && b > 235) {
      // smooth alpha feather near white
      const factor = (255 - ((r + g + b) / 3)) / (255 - 235);
      data[i + 3] = Math.round(Math.min(255, Math.max(0, factor * 255)));
    } else {
      data[i + 3] = 255;
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
  .png({ quality: 100 })
  .toFile(outPng);

  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
  .webp({ quality: 95, alphaQuality: 100 })
  .toFile(outWebp);

  console.log('Successfully saved transparent flower assets!');
}

processFlower().catch(console.error);
