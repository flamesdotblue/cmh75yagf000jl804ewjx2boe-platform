import React from 'react';

export default function HomeQuickNav({ active, onNavigate, onQuickRead }) {
  const items = [
    { key: 'home', label: 'Home' },
    { key: 'series', label: 'Series' },
    { key: 'reader', label: 'Reader' },
    { key: 'library', label: 'Library' },
    { key: 'profile', label: 'Profile' },
    { key: 'admin', label: 'Admin' },
  ];

  return (
    <div className="border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => onNavigate(it.key)}
              className={`rounded-lg px-3 py-2 transition ${active === it.key ? 'bg-white/10 ring-1 ring-white/10' : 'hover:bg-white/5'}`}
            >
              {it.label}
            </button>
          ))}
          <div className="mx-2 h-5 w-px bg-neutral-800" />
          <button
            onClick={onQuickRead}
            className="rounded-lg px-3 py-2 transition bg-gradient-to-tr from-orange-500 to-red-600 text-sm font-semibold hover:brightness-110"
          >
            Quick Read
          </button>
        </div>
      </div>
    </div>
  );
}
