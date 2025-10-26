import React from 'react';
import { MOCK_SERIES_LIST } from '../sampleData';

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
      <div className="text-xs text-neutral-400">{title}</div>
      <div className="mt-2 text-2xl font-extrabold">{value}</div>
    </div>
  );
}

function Bar({ label, value, max }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-neutral-300">
        <span className="truncate pr-2">{label}</span>
        <span className="text-neutral-400">{value}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-neutral-800">
        <div className="h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const totals = { series: 128, chapters: 2380, users: 53040, pending: 23 };
  const topSeries = [...MOCK_SERIES_LIST].sort((a,b)=>b.views-a.views);
  const maxViews = Math.max(...topSeries.map(s=>s.views));

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Series" value={totals.series} />
        <StatCard title="Total Chapters" value={totals.chapters} />
        <StatCard title="Total Users" value={totals.users.toLocaleString()} />
        <StatCard title="Pending Reports" value={totals.pending} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">Top series by views</div>
          <div className="mt-4 space-y-3">
            {topSeries.map((s)=> (
              <Bar key={s.id} label={s.title} value={s.views} max={maxViews} />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">User activity (mock)</div>
          <div className="mt-4 h-48 rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:100%_24px] relative overflow-hidden">
            <div className="absolute inset-4">
              <svg viewBox="0 0 400 140" className="h-full w-full">
                <defs>
                  <linearGradient id="gradLine" x1="0" x2="1">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <polyline fill="none" stroke="url(#gradLine)" strokeWidth="3" points="0,120 40,110 80,95 120,100 160,80 200,70 240,60 280,65 320,50 360,55 400,40" />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-neutral-400">Daily active users (visual only)</div>
        </div>
      </div>
    </div>
  );
}
