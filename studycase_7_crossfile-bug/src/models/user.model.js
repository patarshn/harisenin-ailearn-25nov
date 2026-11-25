// Pengganti tabel users. Password plain text hanya untuk demo — di dunia nyata wajib di-hash (bcrypt/argon2).
const users = [
  { id: 1, username: 'budi', password: 'budi123' },
  { id: 2, username: 'sari', password: 'sari123' },
];

function findUserByCredentials(username, password) {
  return users.find((u) => u.username === username && u.password === password) || null;
}

module.exports = { findUserByCredentials };
