module.exports = {
  apps : [{
    name: 'app',
    script: 'main.ts',
    args: './main.ts',
    //cwd: '/server',
    watch: true,
    watch: ['./main.ts'],
    exec_mode: 'fork',
    ignore_watch: ['node_modules', 'client'],
    //watch_delay: 1000,
    //node_args: ["port=4000", "version=0.0.1"],
    //node_args: [ "version=0.0.1"],
    interpreter: 'node',
    interpreter_args: '--require ts-node/register --require tsconfig-paths/register',
    //interpreter_args: "--harmony", 
    env: {
      //PORT: '4000',
      NODE_ENV: "dev-config",
      //host: 'localhost',
      //version: '0.0.1'
    },
    
  }, 
  // {
  //   script: './main.ts',
  //   watch: ['./main.ts']
  // }, 
  ],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
