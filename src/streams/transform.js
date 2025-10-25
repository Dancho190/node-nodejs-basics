import { Transform } from 'stream';

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversed = chunk.toString().split('').reverse().join('');
      callback(null, reversed); // Переворачиваем полученный инпут
    }
  });
  
  process.stdin.pipe(reverseTransform).pipe(process.stdout);
  
  return new Promise((resolve, reject) => {
    process.stdin.on('end', resolve); 
    process.stdin.on('error', reject);
  });
};

await transform();