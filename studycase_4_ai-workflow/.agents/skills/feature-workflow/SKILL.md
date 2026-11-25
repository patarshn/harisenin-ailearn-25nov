---
name: feature-workflow
description: Workflow 5 tahap (Prompt, Plan, Human Review, Development, Test & Verify) untuk mengerjakan fitur atau perubahan non-trivial. Gunakan setiap kali user meminta fitur baru, perubahan perilaku, atau refactor.
---

# Skill: feature-workflow

## Tahap 1 — Pahami Prompt
- Ulangi tujuan dengan kalimatmu sendiri.
- Baca file yang relevan. Sebutkan file yang kamu baca.
- Kalau ada yang ambigu, tanyakan — jangan menebak.

## Tahap 2 — Plan
Tulis plan ke file `PLAN.md` dengan format:

```markdown
# Plan: <nama fitur>
## Tujuan
## API Contract (request, response sukses, response error)
## Edge Cases (minimal 5)
## File yang diubah
## Test yang akan ditulis
## Risiko / pertanyaan terbuka
```

## Tahap 3 — Human Review (STOP)
Berhenti. Minta user me-review `PLAN.md`. **Jangan lanjut menulis kode sampai user bilang setuju.**
Kalau user minta revisi, update `PLAN.md` lalu minta review lagi.

## Tahap 4 — Development
- Tulis test dulu dari daftar di plan, lalu implementasi.
- Perubahan kecil dan bertahap. Jangan ubah hal di luar plan.

## Tahap 5 — Test & Verify
- Jalankan `npm run verify`.
- Gagal? Baca error → perbaiki (balik ke Tahap 4). Kalau ternyata plan-nya salah → balik ke Tahap 2.
- Laporan akhir: output `npm run verify`, ringkasan diff, dan item plan yang belum selesai (jika ada).
