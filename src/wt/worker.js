import { parentPort } from 'worker_threads'; // объект для коммуникации с главным потоком
// Worker Threads это способ выполнять JS в потоках
if (!parentPort) {
  process.exit(1);
}
// Реализуем фибоначчи рекурсией
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  parentPort.on('message', (n) => { 
    try {
      const result = nthFibonacci(n);
      parentPort.postMessage(result);
    } catch (error) {
      parentPort.postMessage({ error: error.message });
    }
  });
};

sendResult();