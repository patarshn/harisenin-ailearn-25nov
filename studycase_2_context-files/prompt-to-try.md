# Prompt to Try — Studycase 2

## Prompt 1 — Cek agent paham context

```
Jelaskan arsitektur project ini dan aturan coding yang harus kamu ikuti. Jangan ubah file apa pun.
```

Yang diharapkan: agent menyebut alur `router → validator → controller`, format `{ data } / { error }`, dan aturan JSDoc dari `Instruction.md`.

## Prompt 2 — Trigger skill `add-endpoint`

```
Tambahkan endpoint untuk menghapus note berdasarkan id.
```

Yang diharapkan (sesuai SKILL.md):
- Agent menulis rencana dulu (method, path, error case, file yang diubah)
- `DELETE /notes/:id` → `204`, `404 NOTE_NOT_FOUND`, `400 INVALID_ID`
- Reuse `validateIdParam`
- Test baru + `npm test` dijalankan

## Prompt 3 — Tanpa skill, apakah tetap patuh Instruction.md?

```
Tambahkan fitur pencarian note berdasarkan kata kunci di title.
```

Cek: nama function camelCase diawali kata kerja? Validasi query ada di `validators/`? Ada JSDoc?

## Prompt 4 — Eksperimen: hapus context

1. Rename `Instruction.md` → `Instruction.md.bak` (dan hapus `"instructions"` di `opencode.json` untuk OpenCode).
2. Buka session baru, ulangi Prompt 3.
3. Bandingkan hasilnya. Setelah selesai, kembalikan nama file.

## Prompt 5 — Bikin skill sendiri

```
Buatkan SKILL.md baru di .agents/skills/write-test/ berisi SOP menulis test untuk endpoint di project ini, mengikuti gaya test/notes.test.js.
```
