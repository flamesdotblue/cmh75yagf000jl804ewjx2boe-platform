import React, { useMemo, useState } from 'react';
import { Play, BookmarkCheck, CheckCircle2 } from 'lucide-react';

function Progress({ value }) {
  return (
    <div className="h-2 rounded bg-neutral-800 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-orange-500 to-red-600" style={{ width: `${value}%` }} />
    </div>
  );
}

function SeriesCard({ item }) {
  return (
    <div className="group rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden hover:ring-1 hover:ring-neutral-700 transition">
      <div className="h-40 overflow-hidden">
        <img src={item.cover} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-sm font-semibold">{item.title}</div>
            <div className="text-xs text-neutral-400">{item.author}</div>
          </div>
          {item.done ? (
            <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-300 ring-1 ring-emerald-500/20"><CheckCircle2 size={12}/> Completed</span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[10px] text-neutral-300 ring-1 ring-white/10"><BookmarkCheck size={12}/> {item.plan ? 'Plan' : 'Reading'}</span>
          )}
        </div>
        <Progress value={item.progress} />
        <div className="text-[11px] text-neutral-400">{item.progress}% • {item.current}</div>
        <div className="pt-1">
          <button className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"><Play size={14}/> Continue</button>
        </div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  const [tab, setTab] = useState('Reading');
  const items = useMemo(() => ([
    { id: 1, title: 'Crimson Shards', author: 'A. Kuro', cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop', progress: 64, current: 'Ch. 10 · Pg 12', done: false, plan: false },
    { id: 2, title: 'Neon Echo', author: 'R. Sato', cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop', progress: 100, current: 'Completed', done: true, plan: false },
    { id: 3, title: 'Glass Garden', author: 'U. Ame', cover: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=600&auto=format&fit=crop', progress: 0, current: 'Queued', done: false, plan: true },
    { id: 4, title: 'Moonlit Vale', author: 'E. Aria', cover: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop', progress: 32, current: 'Ch. 8 · Pg 4', done: false, plan: false },
  ]), []);

  const filtered = items.filter((i) => tab === 'Reading' ? (!i.done && !i.plan) : tab === 'Completed' ? i.done : i.plan);

  return (
    <section>
      <div className="flex items-center gap-2">
        {['Reading', 'Completed', 'Plan to Read'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-full border px-3 py-1.5 text-xs transition ${tab === t ? 'border-orange-500/50 bg-orange-500/10 text-orange-300' : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10'}`}>{t}</button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((item) => <SeriesCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}
