'use strict';

// src/services/render/hooks/capture.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};


module.exports = (options) => {
  options = Object.assign({}, defaults, options);

  return (hook, next) => {
    const url = hook.data.url;

    if (!url) {
      return next(new Error('Missing required url'));
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

    childProcess.execFile(binPath, childArgs, (err, stdout, stderr) => {
      if (err) return next(err);
      if (stderr) return next(new Error(stderr));
      // capture success
      hook.data = {
        url: url,
        mime: 'text/html',
        content: stdout,
        created_at: new Date
      };
      next();
    });
  };
};
