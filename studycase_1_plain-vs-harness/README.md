> Klasifikasi: INTERNAL

# Studycase 1 — Plain Agent vs Harness Agent

**Materi:** Slide 6–8 (Vibe Coding → Structured Engineering, Generative vs Agentic AI, Plain vs Harness Agent)

## Project ini untuk apa?

Dua folder berisi **kode yang sama persis** (Todo API kecil):

| Folder | Isi | Mewakili |
|---|---|---|
| `plain/` | `server.js` saja | **Plain Agent**: LLM + tools, tanpa context project |
| `harness/` | `server.js` + `AGENTS.md` + test | **Harness Agent**: LLM + context/rules + verifikasi otomatis |

Kamu kasih **prompt yang sama** ke agent di kedua folder, lalu bandingkan hasilnya. Biasanya versi `harness/`:
- mengikuti format error yang sama (`{ error: { code, message } }`)
- memvalidasi `:id` dan mengembalikan 404
- menulis test dan menjalankan `npm test` sebelum bilang selesai

Model LLM-nya sama. Bedanya ada di **harness**.

## Cara Menjalankan

```bash
# versi plain
cd plain
npm install
npm start            # http://localhost:3000/todos

# versi harness
cd ../harness
npm install
npm start
npm test             # 3 test harus lulus
```

Cek cepat:
```bash
curl http://localhost:3000/todos
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"title":"Belajar"}'
```

## Cara Demo

1. Buka `plain/` sebagai workspace di Antigravity / OpenCode → jalankan prompt di `prompt-to-try.md`.
2. Buka `harness/` sebagai workspace **terpisah** (session baru) → jalankan prompt yang sama.
3. Bandingkan pakai checklist di `prompt-to-try.md`.

> Penting: buka `plain/` dan `harness/` sebagai workspace masing-masing, jangan folder `studycase_1` sekaligus — supaya agent di `plain/` tidak ikut membaca `harness/AGENTS.md`.

## Kekurangan yang disengaja

- `plain/` tidak punya test → agent tidak punya cara memverifikasi pekerjaannya.
- Belum ada endpoint update/delete — itu tugas agent di prompt.
