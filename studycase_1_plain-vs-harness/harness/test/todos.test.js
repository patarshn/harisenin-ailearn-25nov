const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const app = require('../server');

let server;
let baseUrl;

before(() => {
  server = app.listen(0);
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('GET /todos returns list', async () => {
  const res = await fetch(`${baseUrl}/todos`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body.data));
});

test('POST /todos creates todo', async () => {
  const res = await fetch(`${baseUrl}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Tulis test dulu' }),
  });
  assert.equal(res.status, 201);
  const body = await res.json();
  assert.equal(body.data.title, 'Tulis test dulu');
  assert.equal(body.data.done, false);
});

test('POST /todos rejects empty title with standard error', async () => {
  const res = await fetch(`${baseUrl}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: '   ' }),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.error.code, 'VALIDATION_ERROR');
});
