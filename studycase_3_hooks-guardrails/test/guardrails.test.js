const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { isSensitivePath, checkCommand, findSecrets } = require('../guardrails/policy');

// Secret palsu disusun dari potongan string supaya file test ini tidak ikut terdeteksi scanner.
const FAKE_KEY = 'sk-' + 'DUMMYDUMMYDUMMYDUMMY';

test('isSensitivePath', () => {
  assert.equal(isSensitivePath('/app/.env'), true);
  assert.equal(isSensitivePath('/app/.env.production'), true);
  assert.equal(isSensitivePath('/app/certs/server.pem'), true);
  assert.equal(isSensitivePath('/app/secrets/db.txt'), true);
  assert.equal(isSensitivePath('/app/.env.example'), false);
  assert.equal(isSensitivePath('/app/src/server.js'), false);
});

test('checkCommand', () => {
  assert.ok(checkCommand('rm -rf node_modules'));
  assert.ok(checkCommand('rm -fr /'));
  assert.ok(checkCommand('git push origin main'));
  assert.ok(checkCommand('cat .env'));
  assert.ok(checkCommand('mysql -e "DROP TABLE users"'));
  assert.equal(checkCommand('npm test'), null);
  assert.equal(checkCommand('cat .env.example'), null);
  assert.equal(checkCommand('rm old.txt'), null);
});

test('findSecrets', () => {
  assert.equal(findSecrets(`const key = '${FAKE_KEY}';`).length, 1);
  assert.equal(findSecrets(`apiKey: "${'abcdefgh' + '12345'}"`).length, 1);
  assert.equal(findSecrets(`const key = process.env.PAYMENT_API_KEY;`).length, 0);
  assert.equal(findSecrets(`const key = '${FAKE_KEY}'; // guardrail:allow`).length, 0);
});

function runHook(mode, toolCall) {
  const hook = path.join(__dirname, '../guardrails/antigravity-hook.js');
  const out = spawnSync(process.execPath, [hook, mode], { input: JSON.stringify({ toolCall }), encoding: 'utf8' });
  return JSON.parse(out.stdout);
}

test('antigravity hook: deny .env read, deny rm -rf, deny hardcoded secret, allow normal', () => {
  assert.equal(runHook('pre', { name: 'view_file', args: { AbsolutePath: '/w/.env' } }).decision, 'deny');
  assert.equal(runHook('pre', { name: 'run_command', args: { CommandLine: 'rm -rf src' } }).decision, 'deny');
  assert.equal(
    runHook('pre', { name: 'write_to_file', args: { TargetFile: '/w/a.js', CodeContent: `const k = '${FAKE_KEY}';` } }).decision,
    'deny',
  );
  assert.equal(runHook('pre', { name: 'run_command', args: { CommandLine: 'npm test' } }).decision, 'allow');
  assert.deepEqual(runHook('post', { name: 'write_to_file', args: { TargetFile: '/w/a.md' } }), {});
});
