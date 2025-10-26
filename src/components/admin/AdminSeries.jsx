import React, { useMemo, useState } from 'react';
import { MOCK_SERIES_LIST } from '../sampleData';
import { Pencil, Trash2 } from 'lucide-react';

function TableRow({ s, onEdit }) {
  return (
    <tr className="border-b border-neutral-800 hover:bg-white/5">
      <td className="p-3"><img src={s.cover} alt={s.title} className="h-10 w-10 rounded object-cover" /></td>
      <td className="p-3 text-sm font-medium">{s.title}</td>
      <td className="p-3 text-sm text-neutral-300">{s.author}</td>
      <td className="p-3 text-xs"><span className={`rounded px-2 py-0.5 ${s.status==='Ongoing'?'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30':'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'}`}>{s.status}</span></td>
      <td className="p-3 text-xs text-neutral-400">{s.genres.join(', ')}</td>
      <td className="p-3 text-right">
        <button onClick={()=>onEdit(s)} className="mr-2 inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-xs hover:bg-white/10"><Pencil size={14} /> Edit</button>
        <button className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-xs hover:bg-white/10 text-red-300"><Trash2 size={14} /> Delete</button>
      </td>
    </tr>
  );
}

export default function AdminSeries() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(()=>
    MOCK_SERIES_LIST.filter(s=>
      (!query || s.title.toLowerCase().includes(query.toLowerCase()) || s.author.toLowerCase().includes(query.toLowerCase())) &&
      (status==='All' || s.status===status)
    )
  ,[query, status]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Series Management</h1>

      <div className="flex flex-wrap gap-2">
        <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search series..." className="w-56 rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none" />
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none">
          <option>All</option>
          <option>Ongoing</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="overflow-auto rounded-2xl border border-neutral-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-neutral-900/60">
            <tr>
              <th className="p-3">Cover</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Status</th>
              <th className="p-3">Genre</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s)=> (
              <TableRow key={s.id} s={s} onEdit={setEditing} />
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="text-sm font-semibold mb-3">Edit Series</div>
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6">
            <div>
              <img src={editing.cover} alt={editing.title} className="h-40 w-40 rounded-xl object-cover ring-1 ring-neutral-800" />
            </div>
            <form className="grid grid-cols-1 gap-3">
              <input defaultValue={editing.title} className="rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none" />
              <input defaultValue={editing.author} className="rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none" />
              <input defaultValue={editing.genres.join(', ')} className="rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none" />
              <div className="flex gap-2">
                <select defaultValue={editing.status} className="rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none">
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
                <input type="number" defaultValue={2024} className="w-32 rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none" />
                <select defaultValue={'EN'} className="w-32 rounded-xl bg-neutral-900/70 px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none">
                  <option>EN</option>
                  <option>TR</option>
                </select>
              </div>
              <div className="pt-2">
                <button type="button" onClick={()=>window.setTimeout(()=>alert('Saved (mock)'), 100)} className="rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 px-4 py-2 text-sm font-semibold hover:brightness-110">Save</button>
                <button type="button" onClick={()=>{}} className="ml-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
