import React, { useMemo, useState } from 'react';
import { LayoutDashboard, BookCopy, Upload, ShieldCheck, BarChart3, Search, Filter, Edit3, Trash2, Save, ChevronDown, CheckCircle2, XCircle, Ban, Image as ImageIcon } from 'lucide-react';

function SidebarItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`w-full inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${active ? 'bg-white/10 text-white' : 'text-neutral-300 hover:bg-white/5 hover:text-white'}`}>
      <Icon size={16} /> {label}
    </button>
  );
}

function StatCard({ title, value, accent = 'from-orange-500 to-red-600' }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4">
      <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${accent} mb-3"`} />
      <div className="text-xs text-neutral-400">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

function MiniBar({ values }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-1 h-20">
      {values.map((v, i) => (
        <div key={i} className="flex-1 rounded bg-gradient-to-t from-neutral-700 to-neutral-300" style={{ height: `${(v / max) * 100}%` }} />
      ))}
    </div>
  );
}

function MiniLine({ values }) {
  const max = Math.max(...values, 1);
  return (
    <div className="h-20 w-full relative">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polyline
          fill="none"
          stroke="url(#grad)"
          strokeWidth="2"
          points={values.map((v, i) => `${(i / (values.length - 1)) * 100},${100 - (v / max) * 100}`).join(' ')}
        />
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Series" value="128" accent="from-fuchsia-500 to-purple-500" />
        <StatCard title="Total Chapters" value="1,942" accent="from-emerald-500 to-teal-500" />
        <StatCard title="Total Users" value="58,210" />
        <StatCard title="Pending Reports" value="23" accent="from-sky-500 to-cyan-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Top Series by Views</div>
            <BarChart3 size={16} className="text-neutral-400" />
          </div>
          <div className="mt-4 space-y-3 text-sm">
            {[['Crimson Shards', 82], ['Neon Echo', 67], ['Moonlit Vale', 49], ['Glass Garden', 38]].map(([name, pct]) => (
              <div key={name}>
                <div className="flex items-center justify-between"><span className="text-neutral-300">{name}</span><span className="text-neutral-400">{pct}%</span></div>
                <div className="mt-1 h-2 rounded bg-neutral-800">
                  <div className="h-full rounded bg-gradient-to-r from-orange-500 to-red-600" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">Chapters per Series</div>
          <div className="mt-4"><MiniBar values={[12, 6, 24, 18, 9, 16, 21, 7]} /></div>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">User Activity Over Time</div>
          <div className="mt-4"><MiniLine values={[5, 9, 7, 11, 18, 12, 21, 16, 24, 22, 27, 31]} /></div>
        </div>
      </div>
    </div>
  );
}

function TableHeader({ children }) {
  return <div className="grid grid-cols-[56px_1.3fr_1fr_110px_1fr_140px] gap-3 px-3 py-2 text-xs text-neutral-400">{children}</div>;
}

function SeriesManagementView() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const data = useMemo(() => ([
    { id: 1, cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=300&auto=format&fit=crop', title: 'Crimson Shards', author: 'A. Kuro', status: 'Ongoing', genres: ['Action', 'Fantasy'] },
    { id: 2, cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=300&auto=format&fit=crop', title: 'Neon Echo', author: 'R. Sato', status: 'Completed', genres: ['Sci-Fi', 'Drama'] },
    { id: 3, cover: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=300&auto=format&fit=crop', title: 'Glass Garden', author: 'U. Ame', status: 'Ongoing', genres: ['Slice of Life'] },
  ]), []);

  const filtered = data.filter((row) => (status === 'All' || row.status === status) && (row.title.toLowerCase().includes(query.toLowerCase()) || row.author.toLowerCase().includes(query.toLowerCase())));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title or author" className="w-64 rounded-xl bg-neutral-900/60 pl-9 pr-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50" />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="appearance-none w-44 rounded-xl bg-neutral-900/60 pl-9 pr-8 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50">
            <option>All</option>
            <option>Ongoing</option>
            <option>Completed</option>
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 overflow-hidden">
        <TableHeader>
          <div>Cover</div>
          <div>Title</div>
          <div>Author</div>
          <div>Status</div>
          <div>Genre</div>
          <div>Actions</div>
        </TableHeader>
        <div className="divide-y divide-neutral-800">
          {filtered.map((row) => (
            <div key={row.id} className="grid grid-cols-[56px_1.3fr_1fr_110px_1fr_140px] gap-3 items-center px-3 py-3 text-sm">
              <img src={row.cover} alt="cover" className="h-12 w-12 rounded object-cover ring-1 ring-neutral-800" />
              <div className="font-medium">{row.title}</div>
              <div className="text-neutral-300">{row.author}</div>
              <div>
                <span className={`rounded-md border px-2 py-0.5 text-xs ${row.status === 'Ongoing' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-neutral-600 bg-neutral-800 text-neutral-300'}`}>{row.status}</span>
              </div>
              <div className="text-neutral-300 truncate">{row.genres.join(', ')}</div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"><Edit3 size={14}/> Edit</button>
                <button className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"><Trash2 size={14}/> Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
        <div className="text-sm font-semibold">Edit Series</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5">
          <div>
            <div className="relative aspect-[3/4] rounded-xl ring-1 ring-neutral-800 overflow-hidden">
              <img src={filtered[0]?.cover} alt="preview" className="h-full w-full object-cover" />
            </div>
            <button className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs hover:bg-white/10"><ImageIcon size={14}/> Change Cover</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-neutral-400">Title</label>
              <input className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50" defaultValue={filtered[0]?.title || ''} />
            </div>
            <div>
              <label className="text-xs text-neutral-400">Author</label>
              <input className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50" defaultValue={filtered[0]?.author || ''} />
            </div>
            <div>
              <label className="text-xs text-neutral-400">Genres (comma separated)</label>
              <input className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50" defaultValue={filtered[0]?.genres.join(', ') || ''} />
            </div>
            <div>
              <label className="text-xs text-neutral-400">Status</label>
              <select className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50">
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-neutral-400">Year</label>
              <input type="number" className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50" defaultValue={2025} />
            </div>
            <div>
              <label className="text-xs text-neutral-400">Language</label>
              <select className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50">
                <option>English (EN)</option>
                <option>Türkçe (TR)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 px-4 py-2 text-sm font-semibold hover:brightness-110"><Save size={16}/> Save</button>
        </div>
      </div>
    </div>
  );
}

function UploadView() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error

  const simulateUpload = () => {
    setStatus('uploading');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus('success');
          return 100;
        }
        return p + 8;
      });
    }, 150);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/30 p-8 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-white/5 ring-1 ring-white/10 grid place-items-center">
          <Upload />
        </div>
        <div className="mt-3 text-sm font-semibold">Drag & drop images or archives (ZIP / RAR)</div>
        <div className="text-xs text-neutral-400">You can upload single or batch pages. Max 200MB.</div>
        <div className="mt-5 flex items-center justify-center gap-2">
          <button onClick={simulateUpload} className="rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20">Select Files</button>
          <button onClick={simulateUpload} className="rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 px-4 py-2 text-sm font-semibold hover:brightness-110">Start Upload</button>
        </div>
        {status !== 'idle' && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>{status === 'uploading' ? 'Uploading…' : status === 'success' ? 'Completed' : 'Error'}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded bg-neutral-800 overflow-hidden">
              <div className={`h-full transition-all ${status === 'error' ? 'bg-red-500' : 'bg-gradient-to-r from-orange-500 to-red-600'}`} style={{ width: `${progress}%` }} />
            </div>
            {status === 'success' && <div className="mt-3 text-xs text-emerald-300">Upload complete. 24 files processed.</div>}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 space-y-3">
          <div className="text-sm font-semibold">Chapter Info</div>
          <div>
            <label className="text-xs text-neutral-400">Chapter Title</label>
            <input className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50" placeholder="e.g., Chapter 23 · Nightfall" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-neutral-400">Chapter Number</label>
              <input type="number" className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50" placeholder="23" />
            </div>
            <div>
              <label className="text-xs text-neutral-400">Series</label>
              <select className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50">
                <option>Crimson Shards</option>
                <option>Neon Echo</option>
                <option>Glass Garden</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-neutral-400">Release Date</label>
              <input type="date" className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50" />
            </div>
            <div className="flex items-end gap-2">
              <input id="premium" type="checkbox" className="h-4 w-4 accent-orange-500" />
              <label htmlFor="premium" className="text-sm">Premium / Locked</label>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">Summary</div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-3">
              <div className="text-xs text-neutral-400">Files</div>
              <div className="text-lg font-bold">24 pages</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-3">
              <div className="text-xs text-neutral-400">Size</div>
              <div className="text-lg font-bold">148 MB</div>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 px-4 py-2 text-sm font-semibold hover:brightness-110">Publish Chapter</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModerationView() {
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('Pending');
  const rows = useMemo(() => ([
    { id: 1001, user: 'luna', type: 'Comment', status: 'Pending', snippet: 'I think this chapter was too rushed...' },
    { id: 1002, user: 'argon', type: 'User', status: 'Pending', snippet: 'Report: spam account' },
    { id: 1003, user: 'mira', type: 'Series', status: 'Reviewed', snippet: 'Inaccurate tags for Neon Echo' },
  ]), []);

  const filtered = rows.filter((r) => (type === 'All' || r.type === type) && (status === 'All' || r.status === status));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50">
          <option>All</option>
          <option>Comment</option>
          <option>Series</option>
          <option>User</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50">
          <option>Pending</option>
          <option>Reviewed</option>
          <option>All</option>
        </select>
      </div>

      <div className="rounded-2xl border border-neutral-800 overflow-hidden">
        <div className="grid grid-cols-[80px_1fr_120px_120px_180px] gap-3 px-3 py-2 text-xs text-neutral-400">
          <div>ID</div>
          <div>Snippet</div>
          <div>User</div>
          <div>Type</div>
          <div>Actions</div>
        </div>
        <div className="divide-y divide-neutral-800">
          {filtered.map((r) => (
            <div key={r.id} className="grid grid-cols-[80px_1fr_120px_120px_180px] gap-3 items-center px-3 py-3">
              <div className="text-sm text-neutral-400">#{r.id}</div>
              <div className="text-sm truncate">{r.snippet}</div>
              <div className="text-sm text-neutral-300">{r.user}</div>
              <div><span className={`rounded-md border px-2 py-0.5 text-xs ${r.type === 'Comment' ? 'border-sky-500/30 bg-sky-500/10 text-sky-300' : r.type === 'User' ? 'border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'}`}>{r.type}</span></div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"><CheckCircle2 size={14}/> Approve</button>
                <button className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"><XCircle size={14}/> Hide</button>
                <button className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1.5 text-xs hover:bg-white/10"><Ban size={14}/> Ban</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
        <div className="text-sm font-semibold">Details</div>
        <div className="mt-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-sm text-neutral-300">
          Select a row to preview full comment and user profile. (Visual only)
        </div>
      </div>
    </div>
  );
}

function Donut({ value = 62, size = 120, stroke = 12, from = '#22c55e', to = '#14b8a6' }) {
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={radius} stroke="#262626" strokeWidth={stroke} fill="none" />
      <defs>
        <linearGradient id="donutGrad" x1="0" x2="1">
          <stop offset="0%" stopColor={from} /><stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <circle cx={size/2} cy={size/2} r={radius} stroke="url(#donutGrad)" strokeWidth={stroke} fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-white" style={{ fontSize: 14, fontWeight: 700 }}>{value}%</text>
    </svg>
  );
}

function AnalyticsView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
        <div className="text-sm font-semibold">Series Popularity</div>
        <div className="mt-4 grid grid-cols-2 gap-4 items-center">
          <Donut value={72} />
          <div className="text-sm text-neutral-300 space-y-2">
            <div className="flex items-center justify-between"><span>Crimson Shards</span><span className="text-neutral-400">72%</span></div>
            <div className="flex items-center justify-between"><span>Neon Echo</span><span className="text-neutral-400">58%</span></div>
            <div className="flex items-center justify-between"><span>Glass Garden</span><span className="text-neutral-400">41%</span></div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
        <div className="text-sm font-semibold">Chapter Reads</div>
        <div className="mt-4"><MiniBar values={[12, 19, 27, 22, 16, 30, 25, 34, 29, 40]} /></div>
      </div>
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
        <div className="text-sm font-semibold">Users by Activity</div>
        <div className="mt-4"><MiniLine values={[3,5,7,6,9,8,12,11,15,14,18,17]} /></div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3"><div className="text-neutral-400">Active</div><div className="text-lg font-bold">12,431</div></div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3"><div className="text-neutral-400">New</div><div className="text-lg font-bold">1,023</div></div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3"><div className="text-neutral-400">Churn</div><div className="text-lg font-bold">214</div></div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [section, setSection] = useState('Dashboard');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
      <aside className="h-full rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4">
        <div className="text-xs text-neutral-400 mb-2">Admin</div>
        <SidebarItem icon={LayoutDashboard} label="Dashboard" active={section === 'Dashboard'} onClick={() => setSection('Dashboard')} />
        <SidebarItem icon={BookCopy} label="Series Management" active={section === 'Series Management'} onClick={() => setSection('Series Management')} />
        <SidebarItem icon={Upload} label="Upload" active={section === 'Upload'} onClick={() => setSection('Upload')} />
        <SidebarItem icon={ShieldCheck} label="Moderation" active={section === 'Moderation'} onClick={() => setSection('Moderation')} />
        <SidebarItem icon={BarChart3} label="Analytics" active={section === 'Analytics'} onClick={() => setSection('Analytics')} />
      </aside>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">{section}</h1>
        </div>
        {section === 'Dashboard' && <DashboardView />}
        {section === 'Series Management' && <SeriesManagementView />}
        {section === 'Upload' && <UploadView />}
        {section === 'Moderation' && <ModerationView />}
        {section === 'Analytics' && <AnalyticsView />}
      </section>
    </div>
  );
}
