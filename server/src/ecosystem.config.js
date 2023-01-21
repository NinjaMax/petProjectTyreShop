module.exports = {
  apps : [{
    name: 'main',
    script: './main.ts',
    watch: true,
    ignore_watch: ['node_modules', 'client'],
    watch_delay: 1000,
    node_args: ["--harmony", "dev --port=4000"],
    interpreter: 'C:/Users/Work/AppData/Local/nodejs/node',
    interpreter_args: "--harmony", 
    env: {
      PORT: 'PORT',
    },
    
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }, 
  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
