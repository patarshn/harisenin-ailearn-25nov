> Klasifikasi: INTERNAL

# Studycase 5 — Refactoring Layer Frontend

**Materi:** Slide 23–24 (AI Autocomplete vs AI Agent, Memecah UI Monolith)

## Project ini untuk apa?

Satu komponen React [`src/UserTable.tsx`](src/UserTable.tsx) (±200 baris) yang menangani **semuanya**: fetch data, search, filter role/status, sort, pagination, dan tampilan. Banyak tipe `any`.

Target refactor (slide 24):
- **Strict typing** — ganti `any` dengan `interface User`, dll.
- **Custom hooks** — pisahkan logika fetch & filter dari tampilan (`useUsers`, `useUserFilter`).
- **Atomic components** — pecah jadi `SearchBar`, `UserRow`, `StatusBadge`, `Pagination`.

Data user di `public/users.json` adalah data **palsu** (`userXX@example.com`).

## Cara Menjalankan

```bash
npm install
npm run dev        # buka http://localhost:5173
npm run verify     # typecheck + build
```

## Cara Demo

1. Jalankan app, coba search / filter / sort / pagination — ingat perilakunya.
2. Ikuti `prompt-to-try.md`.
3. Setelah refactor, cek lagi di browser: perilaku harus **sama persis**.

### Autocomplete vs Agent (slide 23)
- **Autocomplete / inline edit** (Tab di Antigravity editor): cocok untuk mengganti satu `any` jadi tipe, atau ekstrak function kecil seperti `badgeColor`.
- **Agent**: cocok untuk memecah file jadi hooks + komponen di banyak file sekaligus.

## Kekurangan yang disengaja

- Semua `any` (props, state, event, data).
- Logic dan UI tercampur, inline style di mana-mana.
- **Bug tersembunyi:** kalau hasil filter kosong, teks jadi "halaman 1 dari 0" dan tombol **Next masih aktif**. Lihat apakah agent menemukannya, dan apakah agent bertanya dulu sebelum memperbaikinya (karena itu mengubah perilaku).
- Tanggal ditampilkan memakai `new Date('YYYY-MM-DD')` → diparse sebagai UTC, bisa bergeser di timezone tertentu.
