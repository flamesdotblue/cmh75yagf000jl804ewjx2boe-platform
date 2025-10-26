import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Gauge, Book, Upload, Shield, BarChart3 } from 'lucide-react';

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
      <aside className="h-full rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4">
        <div className="text-sm font-semibold mb-3">Admin Panel</div>
        <nav className="flex flex-col gap-1 text-sm">
          <NavLink end to="/admin" className={({isActive})=>`inline-flex items-center gap-2 rounded-lg px-3 py-2 ${isActive?'bg-white/10':'hover:bg-white/5'}`}>
            <Gauge size={16} /> Dashboard
          </NavLink>
          <NavLink to="/admin/series" className={({isActive})=>`inline-flex items-center gap-2 rounded-lg px-3 py-2 ${isActive?'bg-white/10':'hover:bg-white/5'}`}>
            <Book size={16} /> Series Management
          </NavLink>
          <NavLink to="/admin/upload" className={({isActive})=>`inline-flex items-center gap-2 rounded-lg px-3 py-2 ${isActive?'bg-white/10':'hover:bg-white/5'}`}>
            <Upload size={16} /> Upload
          </NavLink>
          <NavLink to="/admin/moderation" className={({isActive})=>`inline-flex items-center gap-2 rounded-lg px-3 py-2 ${isActive?'bg-white/10':'hover:bg-white/5'}`}>
            <Shield size={16} /> Moderation
          </NavLink>
          <NavLink to="/admin/analytics" className={({isActive})=>`inline-flex items-center gap-2 rounded-lg px-3 py-2 ${isActive?'bg-white/10':'hover:bg-white/5'}`}>
            <BarChart3 size={16} /> Analytics
          </NavLink>
        </nav>
      </aside>
      <section className="min-h-[60vh]">
        <Outlet />
      </section>
    </div>
  );
}
