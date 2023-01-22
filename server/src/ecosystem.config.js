module.exports = {
  apps : [{
    name: 'app',
    script: 'ts-node',
    args: './main.ts',
    //watch: true,
    ignore_watch: ['node_modules', 'client'],
    //watch_delay: 1000,
    //node_args: ["port=4000"],
    interpreter: 'node',
    //interpreter_args: "--harmony", 
    env: {
      PORT: '4000',
      NODE_ENV: "development",
      version: '0.0.1'
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
