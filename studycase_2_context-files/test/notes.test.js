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

test('GET /notes returns list', async () => {
  const res = await fetch(`${baseUrl}/notes`);
  assert.equal(res.status, 200);
  assert.ok(Array.isArray((await res.json()).data));
});

test('GET /notes/:id returns 404 for unknown note', async () => {
  const res = await fetch(`${baseUrl}/notes/999`);
  assert.equal(res.status, 404);
  assert.equal((await res.json()).error.code, 'NOTE_NOT_FOUND');
});

test('GET /notes/:id returns 400 for invalid id', async () => {
  const res = await fetch(`${baseUrl}/notes/abc`);
  assert.equal(res.status, 400);
});

test('POST /notes creates note', async () => {
  const res = await fetch(`${baseUrl}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Baru', content: 'isi' }),
  });
  assert.equal(res.status, 201);
  assert.equal((await res.json()).data.title, 'Baru');
});
