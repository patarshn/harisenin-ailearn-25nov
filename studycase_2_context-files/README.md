> Klasifikasi: INTERNAL

# Studycase 2 — Context & Instruction Files

**Materi:** Slide 10–11 (AGENTS.md vs Instruction.md vs SKILL.md, AI Skills dalam praktik)

## Project ini untuk apa?

Notes API kecil (Express, in-memory) yang dilengkapi **3 jenis file context** untuk AI agent:

| File | Analogi | Isi | Kapan dibaca |
|---|---|---|---|
| [`AGENTS.md`](AGENTS.md) | Peta & tata tertib | Arsitektur, command, batasan agent | Otomatis tiap awal sesi |
| [`Instruction.md`](Instruction.md) | Standar coding | Penamaan, JSDoc typing, format response | Selalu saat menulis kode |
| [`.agents/skills/add-endpoint/SKILL.md`](.agents/skills/add-endpoint/SKILL.md) | Buku SOP khusus | Langkah + checklist tambah endpoint | On-demand, hanya saat task relevan |

### Bagaimana tiap tool membaca file ini

| | Antigravity | OpenCode |
|---|---|---|
| `AGENTS.md` | ✅ otomatis | ✅ otomatis |
| `Instruction.md` | via rujukan di `AGENTS.md` | ✅ via `opencode.json` → `"instructions"` + rujukan di `AGENTS.md` |
| `.agents/skills/*/SKILL.md` | ✅ otomatis (dimuat saat relevan) | ✅ otomatis (dimuat saat relevan) |

`Instruction.md` bukan nama file standar. Supaya terbaca oleh semua tool, `AGENTS.md` secara eksplisit bilang "baca `Instruction.md`".

## Cara Menjalankan

```bash
npm install
npm start      # http://localhost:3000/notes
npm test       # 4 test harus lulus
```

```bash
curl http://localhost:3000/notes
curl http://localhost:3000/notes/1
curl -X POST http://localhost:3000/notes -H "Content-Type: application/json" -d '{"title":"Hai","content":"isi"}'
```

## Cara Demo

1. Buka folder ini sebagai workspace di Antigravity / OpenCode.
2. Ikuti `prompt-to-try.md`.
3. Perhatikan: apakah agent menyebut/menggunakan skill `add-endpoint`? Apakah mengikuti penamaan & format di `Instruction.md`?

## Kekurangan yang disengaja

- Belum ada `PATCH` dan `DELETE` → bahan untuk skill `add-endpoint`.
- Belum ada fitur search → bahan untuk menguji apakah agent tetap patuh `Instruction.md` tanpa skill.

## Bonus: skill komunitas (slide 11)

Caveman (hemat token), Ponytail (senior code style), dan Antislop (UI bersih) adalah contoh preset `SKILL.md` buatan komunitas. Cara pakainya sama: taruh foldernya di `.agents/skills/<nama>/SKILL.md`. Selalu baca isi skill pihak ketiga sebelum dipasang — skill adalah instruksi yang akan dijalankan agent.
