// Dipanggil dari .githooks/pre-commit. Berlaku untuk agent apa pun (dan manusia).
const { execFileSync } = require('node:child_process');
const { isSensitivePath, findSecrets } = require('./policy');

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });

const staged = git('diff', '--cached', '--name-only', '--diff-filter=ACM').split('\n').filter(Boolean);
const problems = [];

for (const file of staged) {
  if (isSensitivePath(file)) {
    problems.push(`${file}: file sensitif tidak boleh di-commit`);
    continue;
  }
  const content = git('show', `:${file}`);
  for (const line of findSecrets(content)) problems.push(`${file}: kemungkinan secret → ${line}`);
}

if (problems.length) {
  console.error('❌ Commit diblokir guardrail:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  console.error('Pindahkan secret ke .env. False positive? tambahkan komentar "guardrail:allow" di baris itu.');
  process.exit(1);
}
console.log('✅ Guardrail: tidak ada secret / file sensitif di staged files.');
