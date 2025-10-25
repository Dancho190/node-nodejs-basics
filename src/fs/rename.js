import { rename as fsRename } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const renameFile = async () => {
  const oldPath = join(__dirname, 'files', 'oldName.txt');
  const newPath = join(__dirname, 'files', 'newName.txt');

  try {
    await fsRename(oldPath, newPath);
    console.log('Файл переименован');
  } catch (error) {
    console.error('Файл не переименован:', error.message);
  }
};

await renameFile();