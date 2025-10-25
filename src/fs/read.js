import { createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, 'files', 'fileToRead.txt'); // создаёт абсолютный путь
  const readStream = createReadStream(filePath, 'utf-8'); // открывает поток для чтения
  
  readStream.pipe(process.stdout); // направляет поток из файла
  
  return new Promise((resolve, reject) => {
    readStream.on('end', resolve); // Читает файлы
    readStream.on('error', reject);
  });
};

await read();