'use strict';

// src/services/render/hooks/capture.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const errors = require('feathers-errors');
const defaults = {};

module.exports = (options) => {
  options = Object.assign({}, defaults, options);

  return (hook, next) => {
    const url = hook.data.url;

    if (!url) {
      next(new errors.BadRequest('Missing required url'));
      return;
    }

    // PhatomJS
    const path = require('path');
    const childProcess = require('child_process');
    const phantomjs = require('phantomjs-prebuilt');
    const binPath = phantomjs.path;
    const childArgs = [
      path.join(__dirname, '../../../phantomjs', 'capture.js'),
      url
    ];

    const start = Date.now();
    childProcess.execFile(binPath, childArgs, (err, stdout, stderr) => {
      if (err) return next(err);
      if (stderr) return next(new Error(stderr));
      // capture success
      let data;
      try {
        data = JSON.parse(stdout);
      } catch (err2) {
        err = err2;
      }
      // unrecognized data
      if (!data || err) {
        hook.data = null;
        next(new errors.GeneralError(err));
      } else if (data.response.status >= 200 && data.response.status < 300) {
        // success
        hook.data = {
          url: url,
          mime: 'text/html',
          content: data.html,
          time: Date.now() - start,
          created_at: new Date
        };
        next();
      } else {
        // fail
        hook.data = null;
        if (data.response.status === 400) {
          next(new errors.BadRequest({ code: data.response.status }));
        } else if (data.response.status === 401) {
          next(new errors.NotAuthenticated({ code: data.response.status }));
        } else if (data.response.status === 403) {
          next(new errors.Forbidden({ code: data.response.status }));
        } else if (data.response.status === 404) {
          next(new errors.NotFound({ code: data.response.status }));
        } else if (data.response.status === 408) {
          next(new errors.Timeout({ code: data.response.status }));
        } else if (data.response.status === 503) {
          next(new errors.Unavailable({ code: data.response.status }));
        } else {
          next(new errors.GeneralError({ code: data.response.status }));
        }
      }
    });
  };
};
