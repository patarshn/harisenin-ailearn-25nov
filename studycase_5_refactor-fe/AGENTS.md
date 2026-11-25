# AGENTS.md — User Table (React + Vite + TypeScript)

## Commands
- Dev: `npm run dev` (http://localhost:5173)
- Typecheck: `npm run typecheck`
- **Verify (wajib sebelum selesai): `npm run verify`** (typecheck + build)

## Struktur Target
```
src/
├── types/        # interface & type (User, SortDir, dll)
├── hooks/        # custom hooks: data fetching & state logic (tanpa JSX)
├── components/   # komponen presentational kecil
└── UserTable.tsx # komposisi
```

## Aturan Refactor
- Dilarang `any`. Buat `interface` / `type` di `src/types/`.
- Satu file maksimal ±150 baris.
- **Public contract tidak boleh berubah**: `UserTable` tetap default export dengan props `title` dan `pageSize`. `main.tsx` tidak perlu diubah.
- Perilaku UI tidak boleh berubah (filter, sort, pagination, tampilan) kecuali user meminta perbaikan bug.
- Jangan tambah dependency baru (tidak ada UI library / state library).
- Refactor bertahap: satu langkah per perubahan, jalankan `npm run verify` tiap langkah.
