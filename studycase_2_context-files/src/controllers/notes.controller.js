/**
 * @typedef {Object} Note
 * @property {number} id
 * @property {string} title
 * @property {string} content
 * @property {string} createdAt ISO 8601
 */

/** @type {Note[]} */
const notes = [
  { id: 1, title: 'Agenda kelas', content: 'AGENTS.md, Instruction.md, SKILL.md', createdAt: '2026-11-25T01:00:00.000Z' },
];
let nextId = 2;

/** @type {import('express').RequestHandler} */
function listNotes(req, res) {
  res.json({ data: notes });
}

/** @type {import('express').RequestHandler} */
function getNote(req, res) {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) {
    return res.status(404).json({ error: { code: 'NOTE_NOT_FOUND', message: 'Note tidak ditemukan' } });
  }
  res.json({ data: note });
}

/** @type {import('express').RequestHandler} */
function createNote(req, res) {
  /** @type {Note} */
  const note = {
    id: nextId++,
    title: req.body.title.trim(),
    content: req.body.content ?? '',
    createdAt: new Date().toISOString(),
  };
  notes.push(note);
  res.status(201).json({ data: note });
}

module.exports = { listNotes, getNote, createNote };
