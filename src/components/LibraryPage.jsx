import React from 'react';
import { Play } from 'lucide-react';
import { MOCK_SERIES_LIST } from './sampleData';

function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full rounded-full bg-neutral-800">
      <div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600" style={{ width: `${value}%` }} />
    </div>
  );
}

function Card({ s }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40">
      <div className="h-36 w-full overflow-hidden">
        <img src={s.cover} alt={s.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4 space-y-2">
        <div className="text-sm font-semibold truncate">{s.title}</div>
        <div className="text-xs text-neutral-400 truncate">{s.author}</div>
        <ProgressBar value={Math.min(100, Math.floor((s.views % 100) ))} />
        <div className="pt-1 flex justify-between items-center">
          <span className="text-xs text-neutral-400">Progress</span>
          <button className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-xs hover:bg-white/10">
            <Play size={14} /> Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <section>
      <h1 className="text-xl font-bold">Library</h1>
      <div className="mt-4 flex gap-2 text-xs">
        <button className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-orange-300">Currently Reading</button>
        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Completed</button>
        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Plan to Read</button>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {MOCK_SERIES_LIST.map((s) => (
          <Card key={s.id} s={s} />
        ))}
      </div>
    </section>
  );
}
