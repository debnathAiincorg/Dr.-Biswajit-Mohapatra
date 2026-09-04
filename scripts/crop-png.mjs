/*
 * Lossless PNG cropper, no dependencies.
 *
 * Written for one job that has to be auditable: redacting personal data out of
 * a proof image before it is published. dr/linkdin2/Independent Director
 * Certification.png carries "Applicant Email: <his personal gmail>" along the
 * bottom of the certificate, and the site deliberately publishes no personal
 * address. The crop removes that strip and keeps the parts that make the
 * document evidence -- issuing body, name, credential ID, date and signature.
 *
 * Kept in the repo rather than run once and thrown away so that the published
 * asset can be regenerated from the untouched original, and so anyone can see
 * exactly what was removed and what was not:
 *
 *   node scripts/crop-png.mjs <in.png> <out.png> <x> <y> <width> <height>
 *
 * Decodes 8-bit truecolour (colour type 2) non-interlaced PNGs only, which is
 * what the source file is. It refuses anything else rather than guessing, and
 * re-encodes with filter type 0 on every scanline -- larger than an optimised
 * encoder would produce, but the output is a master in image-src/, not a
 * served asset, and the build pipeline re-encodes it anyway.
 */

import fs from 'node:fs';
import zlib from 'node:zlib';

const PNG_SIGNATURE = Buffer.from('89504e470d0a1a0a', 'hex');

function readChunks(buffer) {
  if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error('Not a PNG.');
  const chunks = [];
  let offset = 8;
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString('latin1');
    chunks.push({ type, data: buffer.subarray(offset + 8, offset + 8 + length) });
    if (type === 'IEND') break;
    offset += 12 + length;
  }
  return chunks;
}

/** Undo per-scanline filtering into a flat RGB buffer. */
function decode(buffer) {
  const chunks = readChunks(buffer);
  const header = chunks.find((chunk) => chunk.type === 'IHDR')?.data;
  if (!header) throw new Error('No IHDR.');

  const width = header.readUInt32BE(0);
  const height = header.readUInt32BE(4);
  const [bitDepth, colourType, , , interlace] = [header[8], header[9], header[10], header[11], header[12]];
  if (bitDepth !== 8 || colourType !== 2 || interlace !== 0) {
    throw new Error(`Only 8-bit non-interlaced truecolour is supported (got depth ${bitDepth}, type ${colourType}, interlace ${interlace}).`);
  }

  const bpp = 3;
  const stride = width * bpp;
  const raw = zlib.inflateSync(
    Buffer.concat(chunks.filter((chunk) => chunk.type === 'IDAT').map((chunk) => chunk.data)),
  );
  const pixels = Buffer.alloc(height * stride);

  let read = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[read];
    read += 1;
    const line = raw.subarray(read, read + stride);
    read += stride;
    const row = pixels.subarray(y * stride, (y + 1) * stride);
    const previous = y > 0 ? pixels.subarray((y - 1) * stride, y * stride) : null;

    for (let i = 0; i < stride; i += 1) {
      const left = i >= bpp ? row[i - bpp] : 0;
      const up = previous ? previous[i] : 0;
      const upLeft = previous && i >= bpp ? previous[i - bpp] : 0;
      let value = line[i];
      if (filter === 1) value += left;
      else if (filter === 2) value += up;
      else if (filter === 3) value += (left + up) >> 1;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const dLeft = Math.abs(p - left);
        const dUp = Math.abs(p - up);
        const dUpLeft = Math.abs(p - upLeft);
        value += dLeft <= dUp && dLeft <= dUpLeft ? left : dUp <= dUpLeft ? up : upLeft;
      } else if (filter !== 0) throw new Error(`Unknown filter ${filter} on row ${y}.`);
      row[i] = value & 0xff;
    }
  }

  return { width, height, stride, pixels };
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'latin1');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type, 'latin1'), data])), 8 + data.length);
  return out;
}

function encode(width, height, pixels) {
  const stride = width * 3;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 2;
  return Buffer.concat([
    PNG_SIGNATURE,
    chunk('IHDR', header),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const [input, output, ...rest] = process.argv.slice(2);
const [x, y, cropWidth, cropHeight] = rest.map(Number);

if (!input || !output || rest.length !== 4 || rest.some((n) => !Number.isInteger(Number(n)))) {
  console.error('Usage: node scripts/crop-png.mjs <in.png> <out.png> <x> <y> <width> <height>');
  process.exit(2);
}

const source = decode(fs.readFileSync(input));
if (x < 0 || y < 0 || x + cropWidth > source.width || y + cropHeight > source.height) {
  console.error(
    `Crop ${cropWidth}x${cropHeight}+${x}+${y} falls outside the ${source.width}x${source.height} source.`,
  );
  process.exit(1);
}

const outStride = cropWidth * 3;
const cropped = Buffer.alloc(cropHeight * outStride);
for (let row = 0; row < cropHeight; row += 1) {
  const start = (y + row) * source.stride + x * 3;
  source.pixels.copy(cropped, row * outStride, start, start + outStride);
}

fs.writeFileSync(output, encode(cropWidth, cropHeight, cropped));
console.log(
  `${input} ${source.width}x${source.height}  ->  ${output} ${cropWidth}x${cropHeight}  (removed ${source.height - cropHeight} rows, ${source.width - cropWidth} columns)`,
);
