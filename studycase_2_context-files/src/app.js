const express = require('express');
const notesRouter = require('./routes/notes.router');

const app = express();
app.use(express.json());
app.use('/notes', notesRouter);

app.use((req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route tidak ditemukan' } });
});

module.exports = app;
