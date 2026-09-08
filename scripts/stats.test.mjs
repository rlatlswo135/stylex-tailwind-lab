import { test } from "node:test";
import assert from "node:assert/strict";
import { summarize } from "../src/shared/stats.mjs";
test("median and nearest-rank p95 preserve outliers without mutating samples", () => {
  const input = [100, 1, 4, 2];
  assert.deepEqual(summarize(input), {
    samples: 4,
    median: 3,
    p95: 100,
    min: 1,
    max: 100,
  });
  assert.deepEqual(input, [100, 1, 4, 2]);
});
test("empty and odd-sized sample sets", () => {
  assert.equal(summarize([]), null);
  assert.equal(summarize([3, 1, 2]).median, 2);
});
