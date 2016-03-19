'use strict';

const assert = require('assert');
const checkCache = require('../../../../src/services/render/hooks/checkCache.js');

describe('render checkCache hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };
    
    checkCache()(mockHook);
    
    assert.ok(mockHook.checkCache);
  });
});
