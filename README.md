> Klasifikasi: INTERNAL (ubah ke PUBLIC sebelum repo dibagikan ke peserta)

# Sample Project — Full-stack Optimization, Vibe Coding & AI Guardrails

Repo pendamping kelas **harisenin Bootcamp Full-Stack Web Developer** (25 November 2026).
Berisi 8 studi kasus kecil yang **sengaja tidak sempurna** — tujuannya supaya kamu bisa langsung praktik prompting ke AI agent dan melihat efek context, guardrails, dan workflow.

AI agent yang dipakai di contoh: **Google Antigravity** dan **OpenCode** (keduanya bisa gratis).
Semua konfigurasi agent ada **di dalam folder studycase masing-masing** — tidak ada yang perlu dipasang di luar repo ini.

## Daftar Studi Kasus

| Folder | Materi | Kamu akan belajar |
|---|---|---|
| [studycase_1_plain-vs-harness](studycase_1_plain-vs-harness/) | Plain Agent vs Harness Agent | Prompt sama, hasil beda karena ada `AGENTS.md` + test |
| [studycase_2_context-files](studycase_2_context-files/) | AGENTS.md, Instruction.md, SKILL.md | Cara menyusun 3 file context untuk AI agent |
| [studycase_3_hooks-guardrails](studycase_3_hooks-guardrails/) | Hooks & AI Guardrails | Blokir baca `.env`, blokir `rm -rf`, scan secret sebelum commit |
| [studycase_4_ai-workflow](studycase_4_ai-workflow/) | Prompt → Plan → Review → Dev → Test | Workflow 5 tahap + pipeline verifikasi (lint + test) |
| [studycase_5_refactor-fe](studycase_5_refactor-fe/) | Refactoring Frontend | Pecah komponen React monolith + hapus tipe `any` |
| [studycase_6_refactor-be](studycase_6_refactor-be/) | Refactoring Backend | Pecah fat controller ke service layer tanpa merusak contract |
| [studycase_7_crossfile-bug](studycase_7_crossfile-bug/) | Debugging lintas file + dokumentasi | Context pack, root cause analysis, generate README/OpenAPI/Mermaid |
| [studycase_8_security-hallucination](studycase_8_security-hallucination/) | Security, Privacy & Hallucination | Temukan hardcoded secret, IDOR, phantom package, boundary bug |

Urutan disarankan: 1 → 8 (mengikuti urutan slide), tapi tiap folder berdiri sendiri.

## Prasyarat

- **Node.js 20+** (`node -v`)
- Salah satu AI agent:
  - [Google Antigravity](https://antigravity.google/) (IDE)
  - [OpenCode](https://opencode.ai/) (terminal)

## Cara Pakai (berlaku untuk semua folder)

1. **Buka satu folder studycase sebagai workspace**, bukan root repo.
   - Antigravity: `File → Open Folder → studycase_X_...`
   - OpenCode: `cd studycase_X_... && opencode`

   Kenapa? Agent membaca `AGENTS.md` dari folder yang dibuka (dan parent-nya). Kalau buka root, context antar studycase bisa tercampur.
2. Baca `README.md` di folder itu → jalankan project.
3. Buka `prompt-to-try.md` → copy-paste prompt ke agent → bandingkan hasilnya.

## Peta File Konfigurasi Agent

| File | Dibaca oleh | Fungsi |
|---|---|---|
| `AGENTS.md` | Antigravity, OpenCode | Project contract: arsitektur, command, batasan |
| `Instruction.md` | Semua (karena dirujuk dari `AGENTS.md`); OpenCode juga via `opencode.json` → `instructions` | Coding standards |
| `.agents/skills/<nama>/SKILL.md` | Antigravity, OpenCode | SOP modular, dimuat on-demand |
| `.agents/hooks.json` | Antigravity | Lifecycle hooks (PreToolUse / PostToolUse) |
| `opencode.json` | OpenCode | Permissions (deny/ask/allow) & instructions |
| `.githooks/pre-commit` | Git (agent apa pun) | Guardrail terakhir sebelum commit |

> Format konfigurasi tool AI berubah cepat. Contoh di repo ini mengikuti dokumentasi per November 2026 — kalau ada yang tidak jalan, cek docs terbaru: [Antigravity](https://antigravity.google/docs) · [OpenCode](https://opencode.ai/docs).

## Catatan

- Semua data in-memory (tanpa database) supaya bisa langsung jalan.
- Semua "secret" di repo ini **dummy** dan bertuliskan `DUMMY`. Jangan pernah commit secret asli.
- Bug dan kekurangan di tiap project **disengaja** — lihat bagian "Kekurangan yang disengaja" di README tiap folder.
