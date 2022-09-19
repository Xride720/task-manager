const concurrently = require('concurrently');
const { result } = concurrently(
  [
    'cd ./server',
    { 
      command: 'dev', 
      name: 'dev',
      cwd: path.resolve(__dirname, './server'), 
    },
    { 
      command: 'generate', 
      name: 'generate',
      cwd: path.resolve(__dirname, './server'), 
    },
    "cd ../client-app",
    { 
      command: 'start', 
      name: 'start',
      cwd: path.resolve(__dirname, './client-app'), 
    },
    { 
      command: 'generate', 
      name: 'generate',
      cwd: path.resolve(__dirname, './client-app'), 
    },
  ],
  {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 3,
    cwd: path.resolve(__dirname, 'scripts'),
  }
);
result.then(success, failure);