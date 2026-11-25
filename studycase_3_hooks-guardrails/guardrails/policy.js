// Satu sumber aturan guardrail, dipakai oleh hook Antigravity dan git pre-commit.
const path = require('node:path');

/** File yang tidak boleh dibaca/diubah agent. */
function isSensitivePath(filePath = '') {
  const base = path.basename(filePath);
  if (base === '.env.example') return false;
  return (
    base === '.env' ||
    base.startsWith('.env.') ||
    /\.(pem|key)$/.test(base) ||
    /\.sql$/.test(base) && /dump/i.test(base) ||
    /(^|[\\/])(secrets|customer-exports)[\\/]/.test(filePath)
  );
}

const BLOCKED_COMMANDS = [
  { pattern: /\brm\s+-[a-z]*(rf|fr)/i, reason: 'rm -rf diblokir. Hapus file satu per satu dan minta approval.' },
  { pattern: /\bgit\s+push\b/i, reason: 'git push wajib dilakukan manusia.' },
  { pattern: /\bgit\s+reset\s+--hard\b/i, reason: 'git reset --hard bisa menghapus pekerjaan.' },
  { pattern: /\bdrop\s+(table|database)\b/i, reason: 'DROP wajib human-in-the-loop.' },
  { pattern: /\.env(?!\.example)\b/, reason: 'Akses .env lewat shell diblokir.' },
];

/** @returns {string | null} alasan diblokir, atau null kalau aman */
function checkCommand(command = '') {
  const hit = BLOCKED_COMMANDS.find((rule) => rule.pattern.test(command));
  return hit ? hit.reason : null;
}

// ponytail: regex sederhana untuk demo. Di project nyata pakai Gitleaks.
const SECRET_PATTERNS = [
  /AKIA[0-9A-Z]{16}/,
  /\bsk-[A-Za-z0-9_-]{16,}/,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /(api[_-]?key|secret|password|token)["']?\s*[:=]\s*["'][^"'\s]{8,}["']/i,
];
const ALLOW_MARKER = 'guardrail:allow';

/** @returns {string[]} baris yang terdeteksi berisi secret */
function findSecrets(text = '') {
  return text
    .split('\n')
    .filter((line) => !line.includes(ALLOW_MARKER))
    .filter((line) => SECRET_PATTERNS.some((p) => p.test(line)))
    .map((line) => line.trim().slice(0, 80));
}

module.exports = { isSensitivePath, checkCommand, findSecrets };
