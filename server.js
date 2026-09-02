const { spawn } = require('node:child_process');

const child = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['next', 'start', '-p', process.env.PORT || '3000'],
  { stdio: 'inherit', shell: true }
);

child.on('exit', (code) => process.exit(code ?? 0));