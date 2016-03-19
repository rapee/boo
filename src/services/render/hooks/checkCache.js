'use strict';

// src/services/render/hooks/checkCache.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');
const moment = require('moment');
const defaults = {};
const cache_age = 60; // minutes

module.exports = function (options) {
  options = Object.assign({}, defaults, options);

  return function (hook, next) {
    const url = hook.params.query.url;
    const $sort = hook.params.query.$sort;

    if (!url) {
      next(new errors.BadRequest('Missing required url'));
      return;
    }

    hook.checkCache = true;
    const app = hook.app;
    const renderService = app.service('/renders');

    const result = hook.result;
    if (result.data.length > 0) {
      // if cache hit
      if (moment().diff(result.data[0].created_at, 'minutes') < cache_age) {
        hook.result = result.data[0];
        hook.result.cache = true;
        next();
        return;
      }
      // otherwise, stale!
    }
    // if stale cache or cache miss
    renderService.create({ url: url }, (err, render) => {
      if (err) {
        next(err);
        return;
      }
      hook.result = render;
      hook.result.cache = false;
      next();
    });
  };
};
