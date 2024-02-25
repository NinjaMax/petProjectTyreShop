module.exports = {
  apps: [
    {
      name: 'app',
      script: 'main.ts',
      args: './main.ts',
      watch: true,
      exec_mode: 'fork',
      ignore_watch: ['node_modules', 'client'],
      interpreter: 'node',
      interpreter_args:
        '--require ts-node/register --require tsconfig-paths/register',
      env: {
        NODE_ENV: 'dev-config',
      },
    },
  ],
};
