# Instruction.md — Coding Standards

> Standar coding. Selalu berlaku saat agent menulis/mengedit kode.

## Penamaan
- File: `kebab-case` + suffix layer → `notes.router.js`, `notes.controller.js`, `notes.validator.js`.
- Function: `camelCase`, diawali kata kerja → `listNotes`, `createNote`, `validateIdParam`.
- Error code: `UPPER_SNAKE_CASE` → `NOTE_NOT_FOUND`, `VALIDATION_ERROR`.

## Typing (JavaScript + JSDoc)
- Project ini JS, tapi wajib JSDoc untuk data shape (`@typedef`) dan handler (`@type {import('express').RequestHandler}`).
- Dilarang memakai `@type {any}` / `{*}`. Definisikan `@typedef` kalau perlu tipe baru.

## Response Format
- Sukses: `{ "data": <object | array> }`
- Error: `{ "error": { "code": "UPPER_SNAKE_CASE", "message": "Bahasa Indonesia singkat" } }`
- Status code: `200` read, `201` create, `204` delete (tanpa body), `400` input invalid, `404` tidak ditemukan.

## Aturan Layer
- Validasi input **hanya** di `validators/`. Controller boleh menganggap input sudah valid.
- Controller tidak boleh `require` router.
- Jangan pakai `var`. Pakai `const`, `let` hanya jika memang di-reassign.
- Jangan `console.log` di controller (hanya di `server.js`).

## Test
- Setiap endpoint: 1 test happy path + 1 test per error case (400/404).
- Pakai `fetch` bawaan Node ke server di port acak (`app.listen(0)`), lihat `test/notes.test.js`.
