import React, { useMemo, useState } from 'react';
import { MOCK_COMMENTS } from '../sampleData';

export default function AdminModeration() {
  const [type, setType] = useState('All');
  const [status, setStatus] = useState('All');
  const [active, setActive] = useState(null);

  const rows = useMemo(()=>
    MOCK_COMMENTS.filter(r=>
      (type==='All' || r.type===type) && (status==='All' || r.status===status)
    )
  ,[type,status]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Moderation</h1>

      <div className="flex gap-2">
        <select value={type} onChange={(e)=>setType(e.target.value)} className="rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none">
          <option>All</option>
          <option>Comment</option>
          <option>Series</option>
          <option>User</option>
        </select>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none">
          <option>All</option>
          <option>Pending</option>
          <option>Reviewed</option>
        </select>
      </div>

      <div className="overflow-auto rounded-2xl border border-neutral-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-neutral-900/60">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Excerpt</th>
              <th className="p-3">When</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r)=> (
              <tr key={r.id} className="border-b border-neutral-800 hover:bg-white/5">
                <td className="p-3">{r.user}</td>
                <td className="p-3 text-xs">{r.type}</td>
                <td className="p-3 text-xs"><span className={`rounded px-2 py-0.5 ${r.status==='Pending'?'bg-amber-500/10 text-amber-200 border border-amber-500/30':'bg-emerald-500/10 text-emerald-200 border border-emerald-500/30'}`}>{r.status}</span></td>
                <td className="p-3 truncate max-w-[280px] text-neutral-300">{r.content}</td>
                <td className="p-3 text-xs text-neutral-400">{r.ts}</td>
                <td className="p-3 text-right">
                  <button onClick={()=>setActive(r)} className="rounded bg-white/5 px-2 py-1 text-xs hover:bg-white/10">Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={()=>setActive(null)}>
          <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-5" onClick={(e)=>e.stopPropagation()}>
            <div className="text-sm font-semibold">Report Details</div>
            <div className="mt-3 text-sm">
              <div><span className="text-neutral-400">User:</span> {active.user}</div>
              <div><span className="text-neutral-400">Type:</span> {active.type}</div>
              <div><span className="text-neutral-400">Series:</span> {active.series}</div>
              <div><span className="text-neutral-400">Chapter:</span> {active.chapter}</div>
              <div className="mt-2 rounded-xl border border-neutral-800 bg-neutral-900/60 p-3">{active.content}</div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Hide</button>
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Approve</button>
              <button className="rounded-xl bg-red-600/80 px-4 py-2 text-sm hover:bg-red-600">Ban User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
