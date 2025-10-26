import React from 'react';

function Donut({ value=68 }) {
  const r = 40; const c = 2*Math.PI*r; const off = c - c*(value/100);
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28">
      <circle cx="50" cy="50" r={r} stroke="#1f2937" strokeWidth="12" fill="none" />
      <circle cx="50" cy="50" r={r} stroke="url(#g)" strokeWidth="12" fill="none" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" transform="rotate(-90 50 50)" />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <text x="50" y="54" textAnchor="middle" className="fill-white text-sm">{value}%</text>
    </svg>
  );
}

function BarGroup({ items }) {
  const max = Math.max(...items.map(i=>i.value));
  return (
    <div className="space-y-2">
      {items.map((i)=>{
        const pct = Math.round(i.value/max*100);
        return (
          <div key={i.label}>
            <div className="flex items-center justify-between text-xs text-neutral-300">
              <span>{i.label}</span><span className="text-neutral-400">{i.value}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-neutral-800">
              <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" style={{ width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AdminAnalytics() {
  const popularity = [
    { label: 'Crimson Shards', value: 120340 },
    { label: 'Neon Echo', value: 90340 },
    { label: 'Moonlit Vale', value: 55010 },
  ];

  const reads = [
    { label: 'Ch. 10', value: 12400 },
    { label: 'Ch. 9', value: 11200 },
    { label: 'Ch. 8', value: 9800 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Analytics (Visual Mockup)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">Series popularity</div>
          <div className="mt-4"><BarGroup items={popularity} /></div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">Chapter reads</div>
          <div className="mt-4"><BarGroup items={reads} /></div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 grid place-items-center">
          <div>
            <div className="text-sm font-semibold text-center">Users by activity</div>
            <div className="mt-3 flex justify-center"><Donut value={72} /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5"><div className="text-xs text-neutral-400">Active users</div><div className="text-2xl font-extrabold mt-2">3,420</div></div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5"><div className="text-xs text-neutral-400">New signups</div><div className="text-2xl font-extrabold mt-2">540</div></div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5"><div className="text-xs text-neutral-400">Avg. session</div><div className="text-2xl font-extrabold mt-2">12m</div></div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5"><div className="text-xs text-neutral-400">Retention</div><div className="text-2xl font-extrabold mt-2">68%</div></div>
      </div>
    </div>
  );
}
