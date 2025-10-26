import React, { useEffect, useRef, useState } from 'react';
import { Home, Library, Search, User, Bell, Gauge, Upload, Shield, BarChart3 } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';
import NotificationsDropdown from './NotificationsDropdown';

export default function NavBar() {
  const [query, setQuery] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (openSearch) inputRef.current?.focus();
  }, [openSearch]);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600" />
            <span className="text-lg font-semibold tracking-tight">MangaFlow</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-2 text-sm text-neutral-300">
          <NavLink to="/" end className={({isActive})=>`inline-flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'}`}>
            <Home size={18} /> Home
          </NavLink>
          <NavLink to="/library" className={({isActive})=>`inline-flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'}`}>
            <Library size={18} /> Library
          </NavLink>
          <NavLink to="/profile" className={({isActive})=>`inline-flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'}`}>
            <User size={18} /> Profile
          </NavLink>
          <NavLink to="/admin" className={({isActive})=>`inline-flex items-center gap-2 rounded-md px-3 py-2 transition ${isActive ? 'text-white bg-white/10' : 'hover:text-white hover:bg-white/5'}`}>
            <Gauge size={18} /> Admin
          </NavLink>
        </nav>

        <div className="flex flex-1 md:flex-none" />

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search series, authors..."
              value={query}
              onChange={(e)=>{setQuery(e.target.value); setOpenSearch(true);}}
              onFocus={()=>setOpenSearch(true)}
              className="w-56 rounded-xl bg-neutral-900/70 pl-9 pr-3 py-2 text-sm placeholder:text-neutral-500 outline-none ring-1 ring-neutral-800 focus:ring-orange-500/50 transition"
            />
            {openSearch && (
              <SearchDropdown query={query} onClose={()=>setOpenSearch(false)} onSelect={(item)=>{setOpenSearch(false); setQuery(''); navigate('/');}} />
            )}
          </div>
          <NotificationsDropdown>
            <button className="relative rounded-xl p-2 hover:bg-white/5 transition" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500"></span>
            </button>
          </NotificationsDropdown>
          <Link to="/profile" className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 hover:bg-white/10 transition">
            <User size={18} />
            <span className="hidden sm:inline">Profile</span>
          </Link>
        </div>
      </div>

      <div className="md:hidden border-t border-neutral-800 px-4 py-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search series, authors..."
            className="w-full rounded-xl bg-neutral-900/70 pl-9 pr-3 py-2 text-sm placeholder:text-neutral-500 outline-none ring-1 ring-neutral-800 focus:ring-orange-500/50 transition"
          />
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-neutral-300">
          <Link to="/" className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:text-white hover:bg-white/5 transition">
            <Home size={16} /> Home
          </Link>
          <Link to="/library" className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:text-white hover:bg-white/5 transition">
            <Library size={16} /> Library
          </Link>
          <Link to="/admin" className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:text-white hover:bg-white/5 transition">
            <Upload size={16} /> Upload
          </Link>
          <Link to="/admin/moderation" className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:text-white hover:bg-white/5 transition">
            <Shield size={16} /> Mod
          </Link>
          <Link to="/admin/analytics" className="inline-flex items-center gap-2 rounded-md px-3 py-2 hover:text-white hover:bg-white/5 transition">
            <BarChart3 size={16} /> Analytics
          </Link>
        </div>
      </div>
    </header>
  );
}
