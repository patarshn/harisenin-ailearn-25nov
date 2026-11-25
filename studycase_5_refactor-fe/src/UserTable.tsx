// ⚠️ SENGAJA DIBUAT MONOLITH untuk latihan refactor.
// Masalah: tipe `any`, fetch + filter + sort + pagination + UI tercampur dalam 1 komponen.
import { useEffect, useState } from 'react';

export default function UserTable(props: any) {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const pageSize = props.pageSize || 10;

  useEffect(() => {
    setLoading(true);
    fetch('/users.json')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat user: ' + res.status);
        return res.json();
      })
      .then((data: any) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // filter
  let filtered = users.filter((u: any) => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (role !== 'all' && u.role !== role) return false;
    if (status !== 'all' && u.status !== status) return false;
    return true;
  });

  // sort
  filtered = filtered.sort((a: any, b: any) => {
    let x = a[sortBy];
    let y = b[sortBy];
    if (typeof x === 'string') x = x.toLowerCase();
    if (typeof y === 'string') y = y.toLowerCase();
    if (x < y) return sortDir === 'asc' ? -1 : 1;
    if (x > y) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  // pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  function handleSort(col: any) {
    if (sortBy === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
  }

  function badgeColor(s: any) {
    if (s === 'active') return '#16a34a';
    if (s === 'inactive') return '#6b7280';
    if (s === 'pending') return '#d97706';
    return '#000';
  }

  if (loading) return <p style={{ fontFamily: 'sans-serif', padding: 24 }}>Loading...</p>;
  if (error) return <p style={{ fontFamily: 'sans-serif', padding: 24, color: 'red' }}>{error}</p>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22 }}>{props.title}</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          placeholder="Cari nama / email..."
          value={search}
          onChange={(e: any) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{ padding: 8, flex: 1, minWidth: 200 }}
        />
        <select
          value={role}
          onChange={(e: any) => {
            setRole(e.target.value);
            setPage(1);
          }}
          style={{ padding: 8 }}
        >
          <option value="all">Semua role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        <select
          value={status}
          onChange={(e: any) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          style={{ padding: 8 }}
        >
          <option value="all">Semua status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
            {['name', 'email', 'role', 'status', 'joinedAt'].map((col) => (
              <th key={col} onClick={() => handleSort(col)} style={{ padding: 8, cursor: 'pointer', userSelect: 'none' }}>
                {col} {sortBy === col ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageItems.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 16, textAlign: 'center', color: '#6b7280' }}>
                Tidak ada user
              </td>
            </tr>
          )}
          {pageItems.map((u: any) => (
            <tr key={u.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: 8 }}>{u.name}</td>
              <td style={{ padding: 8 }}>{u.email}</td>
              <td style={{ padding: 8 }}>{u.role}</td>
              <td style={{ padding: 8 }}>
                <span
                  style={{
                    background: badgeColor(u.status),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: 999,
                    fontSize: 12,
                  }}
                >
                  {u.status}
                </span>
              </td>
              <td style={{ padding: 8 }}>{new Date(u.joinedAt).toLocaleDateString('id-ID')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <span style={{ color: '#6b7280', fontSize: 14 }}>
          {filtered.length} user · halaman {page} dari {totalPages}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{ padding: '6px 12px' }}>
            ‹ Prev
          </button>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={{ padding: '6px 12px' }}>
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
}
