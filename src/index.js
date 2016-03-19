'use strict';

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

server.on('listening', () => {
  console.log(require('../branding'));
  console.log('------ boo started ------');
  console.log('      env : ' + app.get('env'));
  console.log('      url : ' + app.get('host'));
  console.log('     port : ' + port);
  console.log('     tips : press ctrl+c to stop');
});
