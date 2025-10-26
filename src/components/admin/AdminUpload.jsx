import React, { useState } from 'react';

export default function AdminUpload() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Idle');

  const simulateUpload = () => {
    setStatus('Uploading');
    setProgress(0);
    let p = 0;
    const t = setInterval(()=>{
      p += Math.random()*20;
      if (p >= 100) { p = 100; clearInterval(t); setStatus('Complete'); }
      setProgress(Math.floor(p));
    }, 400);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Upload</h1>
      <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/40 p-8 text-center">
        <div className="text-sm text-neutral-300">Drag & drop images, ZIP, or RAR here</div>
        <div className="mt-2 text-xs text-neutral-500">or click to browse</div>
        <div className="mt-4 flex justify-center">
          <button onClick={simulateUpload} className="rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 px-4 py-2 text-sm font-semibold hover:brightness-110">Start mock upload</button>
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-neutral-800">
          <div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 text-xs text-neutral-400">{status} {progress}%</div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 space-y-3">
          <div className="text-sm font-semibold">Chapter Info</div>
          <input placeholder="Chapter Title" className="w-full rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none" />
          <input placeholder="Chapter Number" className="w-full rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none" />
          <select className="w-full rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none">
            <option>Crimson Shards</option>
            <option>Neon Echo</option>
            <option>Moonlit Vale</option>
          </select>
          <input type="date" className="w-full rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none" />
          <label className="inline-flex items-center gap-2 text-xs text-neutral-300">
            <input type="checkbox" className="accent-orange-500" /> Premium / Locked
          </label>
        </div>
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="text-sm font-semibold">Upload Queue</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li>chapter-10.zip — {progress}%</li>
            <li>chapter-09.zip — Complete</li>
            <li>chapter-08.zip — Complete</li>
          </ul>
          <div className="mt-4 text-right">
            <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Cancel</button>
            <button type="button" className="ml-2 rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 px-4 py-2 text-sm font-semibold hover:brightness-110">Publish</button>
          </div>
        </div>
      </form>
    </div>
  );
}
