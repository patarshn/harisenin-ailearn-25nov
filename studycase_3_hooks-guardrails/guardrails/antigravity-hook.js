// Hook Antigravity. Dipanggil dari .agents/hooks.json.
// Input: JSON via stdin ({ toolCall: { name, args }, ... }).
// Output PreToolUse: { decision: "allow" | "deny", reason }. Output PostToolUse: {}.
const { execFileSync } = require('node:child_process');
const { isSensitivePath, checkCommand, findSecrets } = require('./policy');

const FILE_ARG_KEYS = ['AbsolutePath', 'TargetFile'];

function preToolUse({ name, args = {} }) {
  const filePath = FILE_ARG_KEYS.map((k) => args[k]).find(Boolean);
  if (filePath && isSensitivePath(filePath)) {
    return { decision: 'deny', reason: `File sensitif diblokir guardrail: ${filePath}` };
  }
  if (name === 'run_command') {
    const reason = checkCommand(args.CommandLine);
    if (reason) return { decision: 'deny', reason };
  }
  // Blokir agent yang mencoba MENULIS secret ke file.
  if (name !== 'view_file' && name !== 'run_command') {
    const secrets = findSecrets(JSON.stringify(args).replace(/\\n/g, '\n'));
    if (secrets.length) {
      return { decision: 'deny', reason: 'Terdeteksi hardcoded secret. Pakai process.env + .env.example.' };
    }
  }
  return { decision: 'allow' };
}

function postToolUse({ args = {} }) {
  const file = args.TargetFile || args.AbsolutePath;
  if (file && file.endsWith('.js')) {
    try {
      execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
    } catch (err) {
      process.stderr.write(`[guardrail] Syntax error di ${file}:\n${err.stderr}\n`);
    }
  }
  return {};
}

let raw = '';
process.stdin.on('data', (chunk) => (raw += chunk));
process.stdin.on('end', () => {
  const input = JSON.parse(raw || '{}');
  const toolCall = input.toolCall || {};
  const result = process.argv[2] === 'post' ? postToolUse(toolCall) : preToolUse(toolCall);
  if (result.decision === 'deny') process.stderr.write(`[guardrail] DENY ${toolCall.name}: ${result.reason}\n`);
  process.stdout.write(JSON.stringify(result));
});
