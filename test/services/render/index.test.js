'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('render service', () => {
  it('registered the renders service', () => {
    assert.ok(app.service('renders'));
  });
});
