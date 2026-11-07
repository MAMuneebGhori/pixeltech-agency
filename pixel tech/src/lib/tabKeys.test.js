import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextTabIndex } from './tabKeys.js';

test('arrows move and wrap; Home/End jump; other keys are ignored', () => {
  assert.equal(nextTabIndex('ArrowRight', 0, 3), 1);
  assert.equal(nextTabIndex('ArrowRight', 2, 3), 0);
  assert.equal(nextTabIndex('ArrowLeft', 0, 3), 2);
  assert.equal(nextTabIndex('ArrowDown', 1, 4), 2);
  assert.equal(nextTabIndex('ArrowUp', 0, 4), 3);
  assert.equal(nextTabIndex('Home', 2, 3), 0);
  assert.equal(nextTabIndex('End', 0, 3), 2);
  assert.equal(nextTabIndex('Enter', 1, 3), null);
});
