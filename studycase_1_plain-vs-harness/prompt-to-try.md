# Prompt to Try — Studycase 1

Jalankan prompt yang **sama persis** di workspace `plain/` dan `harness/` (session baru untuk masing-masing).

## Prompt 1 — Fitur baru (pure vibe coding)

```
Tambahkan endpoint untuk update dan hapus todo.
```

Prompt ini sengaja singkat dan tanpa context (gaya "pure vibe coding"), untuk melihat seberapa banyak harness membantu.

## Prompt 2 — Minta bukti

Setelah agent bilang selesai, kirim:

```
Buktikan endpoint yang kamu buat sudah benar. Tunjukkan hasil test-nya.
```

## Checklist Perbandingan

| Cek | plain/ | harness/ |
|---|---|---|
| Format error konsisten `{ error: { code, message } }`? | | |
| `PATCH/PUT /todos/abc` (id bukan angka) → 400? | | |
| `DELETE /todos/999` (tidak ada) → 404? | | |
| Validasi `title` kosong / `done` bukan boolean? | | |
| Menulis test baru? | | |
| Menjalankan test sebelum bilang selesai? | | |
| Menambah dependency yang tidak perlu? | | |

## Diskusi

- Di `plain/`, siapa yang menentukan format error? (jawaban: tebakan model)
- Di `harness/`, aturan mana di `AGENTS.md` yang paling berpengaruh?
- Kalau agent tetap melanggar `AGENTS.md`, apa solusinya? → lanjut ke **studycase_3** (hooks = guardrail deterministik, bukan sekadar instruksi).
