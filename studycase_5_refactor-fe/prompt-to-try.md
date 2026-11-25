# Prompt to Try — Studycase 5

## Prompt 1 — Analisis dulu (jangan langsung ubah)

```
Analisis src/UserTable.tsx. Buat daftar: (1) semua penggunaan any, (2) tanggung jawab yang tercampur di komponen ini, (3) bug yang kamu temukan. Usulkan struktur file hasil refactor. Jangan ubah file dulu.
```

## Prompt 2 — Prompt terarah dari slide 24

```
Ekstrak logika pagination dan filter dari UserTable.tsx ke custom hook useUserFilter.ts. Pertahankan props contract utama tanpa mengubah perilaku render.
```

## Prompt 3 — Strict typing

```
Hapus semua tipe any di src/. Buat interface User dan tipe lain yang dibutuhkan di src/types/user.ts. Jalankan npm run verify.
```

## Prompt 4 — Atomic components

```
Pecah UserTable.tsx menjadi komponen kecil di src/components/: SearchBar, FilterSelect, UserRow, StatusBadge, Pagination. Pisahkan fetch data ke hook useUsers. Setiap file maksimal 150 baris. Props contract UserTable (title, pageSize) tidak boleh berubah. Jalankan npm run verify setelah tiap langkah.
```

## Prompt 5 — Perbaiki bug (perubahan perilaku = minta izin)

```
Kalau hasil filter kosong, pagination menampilkan "halaman 1 dari 0" dan tombol Next masih aktif. Perbaiki bug ini dengan perubahan sekecil mungkin.
```

## Checklist Review

- [ ] `grep -rn "any" src/` → tidak ada `: any` / `<any>`
- [ ] `main.tsx` tidak berubah
- [ ] Search, filter, sort, pagination masih jalan sama persis di browser
- [ ] Tidak ada dependency baru di `package.json`
- [ ] `npm run verify` hijau

## Pembanding: Pure vibe coding

Coba juga di session baru:
```
Rapikan UserTable.tsx
```
Bandingkan hasilnya dengan prompt terarah. Mana yang lebih mudah di-review?
