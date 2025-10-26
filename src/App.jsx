import React, { useState } from 'react';
import NavBar from './components/NavBar';
import AdminPanel from './components/AdminPanel';
import LibraryPage from './components/LibraryPage';
import ProfilePage from './components/ProfilePage';

export default function App() {
  const [view, setView] = useState('admin'); // 'admin' | 'library' | 'profile'

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <NavBar />

      <div className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => setView('admin')} className={`rounded-lg px-3 py-2 transition ${view === 'admin' ? 'bg-white/10 ring-1 ring-white/10' : 'hover:bg-white/5'}`}>Admin Panel</button>
            <button onClick={() => setView('library')} className={`rounded-lg px-3 py-2 transition ${view === 'library' ? 'bg-white/10 ring-1 ring-white/10' : 'hover:bg-white/5'}`}>Library</button>
            <button onClick={() => setView('profile')} className={`rounded-lg px-3 py-2 transition ${view === 'profile' ? 'bg-white/10 ring-1 ring-white/10' : 'hover:bg-white/5'}`}>Profile</button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {view === 'admin' && <AdminPanel />}
        {view === 'library' && <LibraryPage />}
        {view === 'profile' && <ProfilePage />}
      </main>
    </div>
  );
}
