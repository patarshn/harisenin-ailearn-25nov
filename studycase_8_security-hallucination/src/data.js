// Data palsu. Anggap tabel users & invoices.
const users = [
  { id: 1, username: 'budi', password: 'budi123' },
  { id: 2, username: 'sari', password: 'sari123' },
];

const invoices = [
  { id: 101, ownerId: 1, customer: { name: 'PT Contoh Satu' }, amount: 1500000, issuedAt: '2026-11-01T00:30:00+07:00' },
  { id: 102, ownerId: 1, customer: { name: 'CV Contoh Dua' }, amount: 750000, issuedAt: '2026-11-15T10:00:00+07:00' },
  { id: 201, ownerId: 2, customer: null, amount: 9900000, issuedAt: '2026-10-31T23:30:00+07:00' },
];

module.exports = { users, invoices };
