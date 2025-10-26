import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib'; // встроенный модуль Node
import { join } from 'path';
import { dirname } from 'path';
import { pipeline } from 'stream/promises';

// Распаковываем archive.gz обратно в fileToCompress.tx

const __dirname = dirname(__filename);

const decompress = async () => {
  const inputPath = join(__dirname, 'files', 'archive.gz');
  const outputPath = join(__dirname, 'files', 'fileToCompress.txt');
  
  const readStream = createReadStream(inputPath);
  const gunzip = createGunzip();
  const writeStream = createWriteStream(outputPath);
  
  await pipeline(readStream, gunzip, writeStream);
};

await decompress();