// ساخت فاوآیکون و لوگو از فایل‌های منبع در assets/brand/
// اجرا: node scripts/build-icons.mjs
// ورودی: assets/brand/icon.webp (نماد ذره‌بین) و assets/brand/logo.webp (لوگوی کامل با نوشته)
import sharp from "sharp";
import fs from "node:fs";

const SRC_ICON = "assets/brand/icon.webp";
const SRC_LOGO = "assets/brand/logo.webp";
const clear = { r: 0, g: 0, b: 0, alpha: 0 };
const white = { r: 255, g: 255, b: 255, alpha: 1 };

// نماد را از حاشیه خالی جدا می‌کنیم و در یک مربع با حاشیه کم می‌گذاریم
const trimmed = await sharp(SRC_ICON).trim().toBuffer();
const { width: tw, height: th } = await sharp(trimmed).metadata();
const side = Math.round(Math.max(tw, th) * 1.04);
const square = await sharp({ create: { width: side, height: side, channels: 4, background: clear } })
  .composite([{ input: trimmed, gravity: "center" }])
  .png()
  .toBuffer();

const png = (size, bg = clear) =>
  sharp(square).resize(size, size, { fit: "contain", background: bg }).flatten(bg.alpha === 1 ? { background: bg } : false).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();

// گوگل: مربع و ضلع مضرب ۴۸ پیکسل (۴۸، ۹۶، ۱۹۲ ...)
for (const s of [48, 96, 192]) fs.writeFileSync(`public/favicon-${s}x${s}.png`, await png(s));
// iOS پس‌زمینه شفاف را مشکی نشان می‌دهد؛ برای apple-touch-icon پس‌زمینه سفید
const pad = await sharp(square).resize(150, 150).toBuffer();
fs.writeFileSync(
  "public/apple-touch-icon.png",
  await sharp({ create: { width: 180, height: 180, channels: 4, background: white } }).composite([{ input: pad, gravity: "center" }]).png().toBuffer()
);
// لوگوی مربعی برای اسکیمای Organization و manifest
fs.writeFileSync("public/images/logo-square-512.png", await png(512));

// favicon.ico با تصاویر PNG داخلی ۱۶، ۳۲ و ۴۸
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map((s) => png(s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(imgs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += imgs[i].length;
  return e;
});
fs.writeFileSync("public/favicon.ico", Buffer.concat([header, ...dir, ...imgs]));

// لوگوی کامل برای هدر: ارتفاع ۱۵۰ پیکسل (برای نمایش ۵۰ پیکسلی روی صفحه‌های رتینا)
await sharp(SRC_LOGO).trim().resize({ height: 150 }).webp({ quality: 90, alphaQuality: 100 }).toFile("public/images/logo-kojahast.webp");
await sharp(SRC_LOGO).trim().resize({ height: 300 }).png({ compressionLevel: 9 }).toFile("public/images/logo-kojahast.png");

console.log("icons built");
