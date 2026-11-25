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

const login = async (username, password) => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return (await res.json()).data.token;
};

// Test ini lulus — dan itulah masalahnya: test hanya cek happy path.
test('budi bisa melihat invoice miliknya', async () => {
  const token = await login('budi', 'budi123');
  const res = await fetch(`${baseUrl}/invoices`, { headers: { Authorization: `Bearer ${token}` } });
  assert.equal(res.status, 200);
  assert.equal((await res.json()).data.length, 2);
});

test('tanpa token → 401', async () => {
  const res = await fetch(`${baseUrl}/invoices/101`);
  assert.equal(res.status, 401);
});
