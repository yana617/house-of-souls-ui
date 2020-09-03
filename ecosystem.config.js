module.exports = {
  apps: [{
    name: 'house-of-souls-ui',
    script: 'npm',
    args: 'start',
    watch: './house-of-souls-ui',
  }],

  deploy: {
    production: {
      user: 'root',
      host: '167.71.63.10',
      ref: 'origin/master',
      repo: 'git@github.com:yana617/house-of-souls-ui.git',
      path: '/var/www/house-of-souls-ui',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'rm -rf /var/www/house-of-souls-ui/',
    },
  },
};
