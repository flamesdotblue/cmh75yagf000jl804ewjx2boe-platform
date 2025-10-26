import React, { useMemo, useState } from 'react';
import { ChevronRight, Star, BookmarkPlus } from 'lucide-react';

function GenreChip({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-neutral-300 ring-1 ring-white/10">
      {label}
    </span>
  );
}

function Card({ item, index, ranked }) {
  return (
    <div className="group relative flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-neutral-800 hover:ring-neutral-700 transition">
      <div className="relative h-40 overflow-hidden">
        <img src={item.cover} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {ranked && (
          <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-amber-300 ring-1 ring-white/10">
            #{index + 1}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">{item.title}</h3>
            <p className="truncate text-xs text-neutral-400">{item.author}</p>
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-amber-400">
            <Star size={14} />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.genres.map((g) => (
            <GenreChip key={g} label={g} />
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-1">
          <button className="text-xs font-medium text-orange-400 hover:text-orange-300 transition">Read</button>
          <button className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2 py-1 text-xs hover:bg-white/10 transition">
            <BookmarkPlus size={14} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SectionRow({ title, items, ranked = false, accent = 'from-orange-500/20 via-red-500/20 to-transparent' }) {
  const [activeGenre, setActiveGenre] = useState('All');
  const genres = useMemo(() => {
    const set = new Set();
    items.forEach((i) => i.genres.forEach((g) => set.add(g)));
    return ['All', ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    if (activeGenre === 'All') return items;
    return items.filter((i) => i.genres.includes(activeGenre));
  }, [items, activeGenre]);

  return (
    <section>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGenre(g)}
                className={`rounded-full border px-3 py-1 text-xs transition ${activeGenre === g ? 'border-orange-500/50 bg-orange-500/10 text-orange-300' : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10'}`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <a href="#" className="group inline-flex items-center gap-1 text-sm text-neutral-300 hover:text-white transition">
          View all <ChevronRight size={18} className="transition group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className={`pointer-events-none relative mt-6 h-10 w-full bg-gradient-to-r ${accent} rounded-2xl blur-2xl`} />

      <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="hidden-scrollbar flex gap-4">
          {filtered.map((item, idx) => (
            <Card key={item.id} item={item} index={idx} ranked={ranked} />
          ))}
        </div>
      </div>
    </section>
  );
}
