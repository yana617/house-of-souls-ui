module.exports = {
  deploy: {
    production: {
      user: 'root',
      host: '167.71.63.10',
      ref: 'origin/master',
      repo: 'git@github.com:yana617/house-of-souls-ui.git',
      path: '/var/www/house-of-souls-ui',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build',
      'pre-setup': 'rm -rf /var/www/house-of-souls-ui/',
    },
  },
};
