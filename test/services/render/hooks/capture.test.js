'use strict';

const assert = require('assert');
const capture = require('../../../../src/services/render/hooks/capture.js');

describe('render capture hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    capture()(mockHook);

    assert.ok(mockHook.capture);
  });
});
