import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_SERIES_LIST } from './sampleData';

export default function SearchDropdown({ query, onClose, onSelect }) {
  const q = (query || '').toLowerCase();
  const results = !q ? [] : MOCK_SERIES_LIST.filter((s)=> s.title.toLowerCase().includes(q) || s.author.toLowerCase().includes(q)).slice(0,5);
  return (
    <div className="absolute left-0 right-0 top-10 z-40 rounded-xl border border-neutral-800 bg-neutral-900 shadow-xl">
      {results.length === 0 ? (
        <div className="p-4 text-sm text-neutral-400">No results</div>
      ) : (
        <ul className="divide-y divide-neutral-800">
          {results.map((s)=> (
            <li key={s.id} className="hover:bg-white/5 transition">
              <Link to={`/`} onClick={()=>onSelect?.(s)} className="flex items-center gap-3 p-3">
                <img src={s.cover} alt={s.title} className="h-10 w-10 rounded object-cover" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{s.title}</div>
                  <div className="truncate text-xs text-neutral-400">{s.author}</div>
                </div>
                <div className="ml-auto hidden sm:block text-[11px] text-neutral-400">{s.status} • {s.year}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="p-2 text-[11px] text-neutral-500 text-right">
        <button onClick={onClose} className="hover:text-neutral-300">Close</button>
      </div>
    </div>
  );
}
