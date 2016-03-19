'use strict';
const render = require('./render');
const authentication = require('./authentication');
const user = require('./user');

module.exports = function () {
  const app = this;


  app.configure(authentication);
  app.configure(user);
  app.configure(render);
};
