import { writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
  const filePath = join(__dirname, 'files', 'fresh.txt');
  
  try {
    await writeFile(filePath, 'I am fresh and young', { flag: 'wx' });
  } catch (error) {
    throw new Error('FS operation failed');
  }
};

await create();