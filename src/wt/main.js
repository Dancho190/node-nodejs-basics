import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ранньте node src/wt/main.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
  const numCPUs = cpus().length;
  const workerPath = join(__dirname, 'worker.js');
  
  const createWorkerPromise = (workerNumber) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerPath);
      const dataToSend = 10 + workerNumber;
      
      worker.on('message', (result) => {   // Когда worker отправит результат
        if (result && result.error) {
          resolve({ status: 'error', data: null });
        } else {
          resolve({ status: 'resolved', data: result });
        }
        worker.terminate();
      });
      
      worker.on('error', () => {
        resolve({ status: 'error', data: null });
        worker.terminate();
      });
      
      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
      
      worker.postMessage(dataToSend);
    });
  };
  
  const workerPromises = [];
  for (let i = 0; i < numCPUs; i++) {
    workerPromises.push(createWorkerPromise(i));
  }
  
  const allResults = await Promise.all(workerPromises);
  console.log(allResults);
};

await performCalculations();