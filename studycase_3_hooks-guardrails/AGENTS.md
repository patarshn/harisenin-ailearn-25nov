# AGENTS.md — Guardrails Demo API

## Project
API kecil (Express) yang membaca konfigurasi dari `.env`. Fokus project ini adalah **guardrails**, bukan fiturnya.

## Commands
- Install: `npm install`
- Run: `cp .env.example .env && npm start`
- Test: `npm test`

## Aturan (soft guardrail — instruksi untuk agent)
- Jangan membaca atau mengubah `.env`, `*.pem`, `*.key`, folder `secrets/`.
- Jangan hardcode API key / password / token. Pakai `process.env.NAMA_VAR` dan dokumentasikan di `.env.example`.
- Jangan jalankan `rm -rf`, `git push`, `git reset --hard`, atau `DROP`.
- Aturan di `guardrails/` hanya boleh diubah atas permintaan eksplisit user.

> Aturan di atas hanya **instruksi** — agent bisa saja melanggarnya.
> Penegakan deterministiknya ada di `.agents/hooks.json` (Antigravity), `opencode.json` (OpenCode), dan `.githooks/pre-commit` (git).
