import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const scriptPath = join(__dirname, 'files', 'script.js');
  
  const childProcess = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit']
  });
  
  // Pipe stdin от родителя к ребенку
  process.stdin.pipe(childProcess.stdin);
  
  // Pipe stdout от ребенка к родителю
  childProcess.stdout.pipe(process.stdout);
  
  childProcess.on('error', (error) => {
    console.error('Child process error:', error);
  });
  
  return childProcess;
};

// Example usage
const args = process.argv.slice(2);
spawnChildProcess(args);