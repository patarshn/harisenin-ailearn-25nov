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

test('POST /auth/login returns token', async () => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'budi', password: 'budi123' }),
  });
  assert.equal(res.status, 200);
  assert.ok((await res.json()).data.token);
});

test('POST /auth/login rejects wrong password', async () => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'budi', password: 'salah' }),
  });
  assert.equal(res.status, 401);
});
