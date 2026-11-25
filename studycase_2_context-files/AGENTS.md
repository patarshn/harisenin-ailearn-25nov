# AGENTS.md — Notes API

> Peta & tata tertib project. Dibaca otomatis oleh agent di awal sesi.

## Arsitektur

```
src/
├── app.js                      # setup express + 404 handler
├── server.js                   # entry point (listen)
├── routes/*.router.js          # mapping URL → validator → controller
├── validators/*.validator.js   # validasi req.params / req.body
└── controllers/*.controller.js # logic + data in-memory
test/*.test.js                  # Node built-in test runner
```

Alur request: `router → validator → controller`. Tidak ada database (array in-memory).

## Commands

| Tujuan | Command |
|---|---|
| Install | `npm install` |
| Run | `npm start` (port 3000) |
| Test | `npm test` |

## Wajib dibaca

**Sebelum menulis atau mengedit kode, baca dan patuhi `Instruction.md`** (coding standards project ini).

Untuk menambah endpoint baru, ikuti skill `add-endpoint` (`.agents/skills/add-endpoint/SKILL.md`).

## Batasan Agent

- Jangan tambah dependency baru tanpa izin.
- Jangan ubah response endpoint yang sudah ada (public contract).
- Jangan baca/ubah `.env` atau file credential.
- Selesai = `npm test` hijau. Tunjukkan output test-nya.
