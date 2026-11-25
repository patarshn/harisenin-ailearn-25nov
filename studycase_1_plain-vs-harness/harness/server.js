const express = require('express');

const app = express();
app.use(express.json());

let nextId = 3;
const todos = [
  { id: 1, title: 'Belajar AGENTS.md', done: false },
  { id: 2, title: 'Coba OpenCode', done: true },
];

app.get('/todos', (req, res) => {
  res.json({ data: todos });
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'title wajib diisi' } });
  }
  const todo = { id: nextId++, title: title.trim(), done: false };
  todos.push(todo);
  res.status(201).json({ data: todo });
});

if (require.main === module) {
  app.listen(3000, () => console.log('Todo API on http://localhost:3000'));
}

module.exports = app;
