import fs from 'node:fs';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const reactSnapshotPath = path.join(
  __dirname,
  '../figma-kit/src/__image_snapshots__/',
);
const svelteSnapshotPath = path.join(__dirname, '../src/__image_snapshots__/');

for (const file of fs.readdirSync(reactSnapshotPath)) {
  const reactImg = PNG.sync.read(
    fs.readFileSync(path.join(reactSnapshotPath, file)),
  );
  const svelteImg = PNG.sync.read(
    fs.readFileSync(path.join(svelteSnapshotPath, file)),
  );

  const { width, height } = reactImg;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    reactImg.data,
    svelteImg.data,
    diff.data,
    width,
    height,
    {
      threshold: 0.1,
    },
  );

  console.log(`Difference in ${file}: ${numDiffPixels} pixels`);

  if (numDiffPixels > 0) {
    fs.writeFileSync(
      path.join(__dirname, `../diff_${file}`),
      PNG.sync.write(diff),
    );
  }
}
