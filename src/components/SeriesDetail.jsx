import React, { useMemo, useState } from 'react';
import { BookmarkPlus, Share2, Star, ArrowUpDown, Play, ChevronDown } from 'lucide-react';

function GenreChip({ label }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-neutral-300 ring-1 ring-white/10">
      {label}
    </span>
  );
}

function RatingDonut({ value = 4.6 }) {
  const percent = Math.min(100, Math.max(0, (value / 5) * 100));
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="flex items-center gap-3">
      <svg width="72" height="72" viewBox="0 0 72 72" className="drop-shadow">
        <circle cx="36" cy="36" r={radius} stroke="#262626" strokeWidth="8" fill="none" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          stroke="url(#grad)"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
      <div>
        <div className="text-2xl font-extrabold leading-none">{value.toFixed(1)}</div>
        <div className="text-xs text-neutral-400">Average rating</div>
      </div>
    </div>
  );
}

function ChapterRow({ chapter, onRead }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3 hover:bg-neutral-900 transition">
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{chapter.title}</div>
        <div className="text-xs text-neutral-400">{chapter.date}</div>
      </div>
      <button
        onClick={() => onRead(chapter.id)}
        className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium hover:bg-white/10 transition"
      >
        <Play size={14} /> Read
      </button>
    </div>
  );
}

export default function SeriesDetail({ series, onReadChapter, continueInfo }) {
  const [showMore, setShowMore] = useState(false);
  const [sortNewest, setSortNewest] = useState(true);

  const sortedChapters = useMemo(() => {
    const list = [...series.chapters];
    list.sort((a, b) => (sortNewest ? (a.date < b.date ? 1 : -1) : (a.date > b.date ? 1 : -1)));
    return list;
  }, [series.chapters, sortNewest]);

  return (
    <section className="relative">
      <div className="relative h-64 w-full overflow-hidden rounded-2xl ring-1 ring-neutral-800">
        <img src={series.cover} alt={series.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-neutral-950" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{series.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-neutral-300">
                <span>By {series.author}</span>
                <span className="mx-1 text-neutral-600">•</span>
                <span>{series.year}</span>
                <span className="mx-1 text-neutral-600">•</span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300 text-xs">{series.status}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {series.genres.map((g) => (
                  <GenreChip key={g} label={g} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 px-4 py-2 text-sm font-semibold hover:brightness-110">
                <Star size={16} /> Rate
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10">
                <BookmarkPlus size={16} /> Follow
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8">
        <div>
          <h2 className="text-lg font-bold">Synopsis</h2>
          <p className={`mt-3 text-neutral-300 ${showMore ? '' : 'line-clamp-3'}`}>{series.synopsis}</p>
          <button
            onClick={() => setShowMore((s) => !s)}
            className="mt-2 inline-flex items-center gap-1 text-sm text-neutral-300 hover:text-white"
          >
            Show {showMore ? 'less' : 'more'} <ChevronDown size={16} className={`transition ${showMore ? 'rotate-180' : ''}`} />
          </button>

          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-lg font-bold">Chapters</h2>
            <button
              onClick={() => setSortNewest((v) => !v)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
              title="Toggle sort order"
            >
              <ArrowUpDown size={14} /> {sortNewest ? 'Newest → Oldest' : 'Oldest → Newest'}
            </button>
          </div>

          {continueInfo && (
            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
              <div className="text-sm text-amber-200">Continue reading</div>
              <div className="text-sm text-amber-100 font-medium mt-1">{continueInfo.chapter.title}</div>
              <div className="mt-3">
                <button
                  onClick={() => onReadChapter(continueInfo.chapter.id, true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-orange-500 to-red-600 px-3 py-2 text-xs font-semibold hover:brightness-110"
                >
                  <Play size={14} /> Continue ({continueInfo.mode === 'webtoon' ? `scroll` : `page ${continueInfo.pageIndex + 1}`})
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-3">
            {sortedChapters.map((ch) => (
              <ChapterRow key={ch.id} chapter={ch} onRead={onReadChapter} />)
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-300">Rating</div>
              <div className="inline-flex items-center gap-1 text-amber-400">
                <Star size={16} /> {series.rating.toFixed(1)}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <RatingDonut value={series.rating} />
              <div className="text-xs text-neutral-400">
                <div>5★ {Math.round(series.ratingBreakdown[0])}%</div>
                <div>4★ {Math.round(series.ratingBreakdown[1])}%</div>
                <div>3★ {Math.round(series.ratingBreakdown[2])}%</div>
                <div>2★ {Math.round(series.ratingBreakdown[3])}%</div>
                <div>1★ {Math.round(series.ratingBreakdown[4])}%</div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="text-sm text-neutral-300">Actions</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10">Add to Library</button>
              <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10">Share</button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
