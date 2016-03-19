'use strict';

const checkCache = require('./checkCache');
const capture = require('./capture');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [
    capture()
  ],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [
    checkCache()
  ],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
