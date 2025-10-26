import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// пожайлуста,используйте node src/hash/calcHash.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const hash = createHash('sha256'); // создает хэш обьект
  
  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath); // Читаем файл в потоке
    
    stream.on('data', (chunk) => {
      hash.update(chunk);
    });
    
    stream.on('end', () => {
      const hexHash = hash.digest('hex');
      console.log(hexHash);
      resolve(hexHash);
    });
    
    stream.on('error', (error) => {
      reject(error);
    });
  });
};

await calculateHash();