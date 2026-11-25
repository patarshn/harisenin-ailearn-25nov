> Klasifikasi: INTERNAL

# Studycase 3 — Hooks & AI Guardrails

**Materi:** Slide 12 (Hooks & AI Guardrails), Slide 28–29 (kebocoran data & sanitasi credential)

## Project ini untuk apa?

Menunjukkan beda **soft guardrail** (instruksi di `AGENTS.md`, bisa dilanggar agent) dan **hard guardrail** (hook/permission yang dijalankan oleh tool atau git, tidak bisa "dinegosiasi" oleh LLM).

Aplikasinya cuma API `/health` yang membaca `.env`. Yang penting adalah folder `guardrails/` dan file konfigurasi agent.

## Peta Guardrail

| Lapisan | File | Tool | Yang dicegah |
|---|---|---|---|
| Soft (instruksi) | `AGENTS.md` | Semua | Semua aturan, tapi hanya "diminta" |
| Pre-Tool Hook | `.agents/hooks.json` → `guardrails/antigravity-hook.js pre` | Antigravity | Baca/tulis `.env`/`*.pem`, `rm -rf`, `git push`, menulis hardcoded secret |
| Post-Tool Hook | `.agents/hooks.json` → `guardrails/antigravity-hook.js post` | Antigravity | Cek syntax (`node --check`) setelah file `.js` diedit |
| Permission | `opencode.json` → `permissions` | OpenCode | Baca/edit `.env`, `*.pem`, `rm -rf`, `git push` |
| Pre-Commit | `.githooks/pre-commit` → `guardrails/scan-staged.js` | Git (agent apa pun & manusia) | Commit file sensitif / secret |

Semua aturan ada di satu file: [`guardrails/policy.js`](guardrails/policy.js) — dipakai bersama oleh hook Antigravity dan pre-commit.

```
Agent mau jalan tool ──► PreToolUse hook ──► deny? ──► diblokir + alasan dikirim ke agent
                                 │ allow
                                 ▼
                          Tool dieksekusi ──► PostToolUse hook (syntax check)
                                 ▼
                     git commit ──► pre-commit (secret scan) ──► gagal? commit ditolak
```

## Cara Menjalankan

```bash
npm install
cp .env.example .env
npm start        # http://localhost:3000/health
npm test         # test untuk policy & hook (4 test)
```

### Aktifkan pre-commit hook (opsional, berlaku untuk seluruh repo)

Jalankan dari **root repo**:

```bash
git config core.hooksPath studycase_3_hooks-guardrails/.githooks
# matikan lagi:
git config --unset core.hooksPath
```

Uji:
```bash
echo "const apiKey = 'abcdefgh12345';" > studycase_3_hooks-guardrails/src/leak.js  # guardrail:allow
git add studycase_3_hooks-guardrails/src/leak.js
git commit -m "test"     # ❌ ditolak guardrail
git reset studycase_3_hooks-guardrails/src/leak.js && rm studycase_3_hooks-guardrails/src/leak.js
```

### Antigravity
Buka folder ini sebagai workspace. Hook di `.agents/hooks.json` otomatis terbaca (cek di CLI dengan `/hooks`).

### OpenCode
`cd studycase_3_hooks-guardrails && opencode`. Permission di `opencode.json` otomatis terbaca.

## Cara Demo

Ikuti `prompt-to-try.md`: minta agent membaca `.env`, menghapus folder, dan hardcode API key → lihat guardrail mana yang menangkap.

## Catatan penting

- Hook Antigravity dijalankan dengan path relatif (`node guardrails/...`). Kalau hook tidak jalan, ganti `command` di `.agents/hooks.json` dengan path absolut.
- Format `permissions` di `opencode.json` mengikuti OpenCode V2. Kalau kamu memakai OpenCode versi lama (V1), formatnya berbeda — cek [docs permissions](https://opencode.ai/docs/permissions/).
- Shell blocklist itu **best effort**. Agent bisa membaca `.env` lewat cara lain (`node -e "..."`, `grep`, dll). Karena itu guardrail berlapis: hook + permission + pre-commit + `.gitignore` + jangan pernah simpan secret production di laptop.
- Secret scanner di sini regex sederhana untuk demo. Untuk project nyata pakai [Gitleaks](https://github.com/gitleaks/gitleaks).

## Kekurangan yang disengaja

- Regex secret bisa false positive/negative — bahan diskusi kenapa butuh tool khusus.
- PostToolUse hanya cek syntax, belum lint/test — coba minta agent menambahkannya (lihat prompt-to-try).
