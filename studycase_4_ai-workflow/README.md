> Klasifikasi: INTERNAL

# Studycase 4 — AI-First Dev Workflow

**Materi:** Slide 13 (Prompt → Plan → Human Review → Development → Test & Verify), Slide 14 (Pipeline verifikasi sebelum merge)

## Project ini untuk apa?

Product catalog API kecil. Kamu akan menambah fitur **filter + pagination** dengan workflow 5 tahap, bukan langsung "bikinin dong".

| Tahap | Siapa | Output |
|---|---|---|
| 1. Prompt | Kamu | Tujuan + batasan + file context |
| 2. Plan | Agent | `PLAN.md` (contract, edge cases, file, test) |
| 3. Human Review | **Kamu** | Approve / revisi plan — jangan dilewati |
| 4. Development | Agent | Test + kode |
| 5. Test & Verify | Agent + kamu | `npm run verify` hijau + review diff |

Workflow ini ditulis sebagai skill di [`.agents/skills/feature-workflow/SKILL.md`](.agents/skills/feature-workflow/SKILL.md) dan diwajibkan oleh [`AGENTS.md`](AGENTS.md), sehingga berlaku di Antigravity maupun OpenCode.

Pipeline verifikasi (slide 14) versi mini:

| Stage | Di project ini |
|---|---|
| Linter & Types | `npm run lint` (ESLint) |
| SAST / dependency audit | `npm audit` (manual) |
| Automated Tests | `npm test` |
| Human Diff Review | `git diff` — kamu yang review |

## Cara Menjalankan

```bash
npm install
npm start          # http://localhost:3000/products
npm run verify     # lint + test
```

## Cara Demo

Ikuti `prompt-to-try.md` tahap demi tahap. Tips: pakai mode **Planning** di Antigravity atau mode **Plan** di OpenCode (Tab) untuk tahap 1–3.

## Kekurangan yang disengaja

- `GET /products` mengembalikan semua data tanpa filter/pagination.
- `GET /products/:id` tidak memvalidasi `id` (`/products/abc` → 404, harusnya 400).
- Belum ada test untuk edge cases.
