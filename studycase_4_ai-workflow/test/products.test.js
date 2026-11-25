const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;
let baseUrl;

before(() => {
  server = app.listen(0);
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('GET /products returns all products', async () => {
  const res = await fetch(`${baseUrl}/products`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).data.length, 7);
});

test('GET /products/:id returns 404 for unknown product', async () => {
  const res = await fetch(`${baseUrl}/products/999`);
  assert.equal(res.status, 404);
  assert.equal((await res.json()).error.code, 'PRODUCT_NOT_FOUND');
});
