import { createRoot } from 'react-dom/client';
import UserTable from './UserTable';

createRoot(document.getElementById('root')!).render(<UserTable title="Daftar User" pageSize={5} />);
