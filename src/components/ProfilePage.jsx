import React, { useState } from 'react';
import { User, Edit3, Save } from 'lucide-react';

export default function ProfilePage() {
  const [bio, setBio] = useState('Storyteller and night reader.');
  const [lang, setLang] = useState('EN');
  const [theme, setTheme] = useState('Dark');
  const [editing, setEditing] = useState(false);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
      <aside className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-white/5 ring-1 ring-white/10 grid place-items-center">
            <User />
          </div>
          <div>
            <div className="text-lg font-bold">@aurora</div>
            <div className="text-xs text-neutral-400">Joined Apr 2024</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3"><div className="text-neutral-400">Following</div><div className="text-lg font-bold">42</div></div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3"><div className="text-neutral-400">Chapters</div><div className="text-lg font-bold">1,238</div></div>
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-3"><div className="text-neutral-400">Comments</div><div className="text-lg font-bold">187</div></div>
        </div>

        <div className="mt-6">
          <div className="text-xs text-neutral-400">Badges</div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-amber-500/10 text-amber-300 text-[11px] px-2 py-0.5 ring-1 ring-amber-500/20">Early Bird</span>
            <span className="rounded-full bg-sky-500/10 text-sky-300 text-[11px] px-2 py-0.5 ring-1 ring-sky-500/20">Top Reviewer</span>
            <span className="rounded-full bg-emerald-500/10 text-emerald-300 text-[11px] px-2 py-0.5 ring-1 ring-emerald-500/20">Binge Reader</span>
          </div>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Bio</div>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"><Edit3 size={14}/> Edit</button>
            ) : (
              <button onClick={() => setEditing(false)} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-orange-500 to-red-600 px-3 py-1.5 text-xs font-semibold hover:brightness-110"><Save size={14}/> Save</button>
            )}
          </div>
          {!editing ? (
            <p className="mt-3 text-sm text-neutral-300">{bio}</p>
          ) : (
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-3 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="text-sm font-semibold">Preferences</div>
            <div className="mt-3 space-y-3">
              <div>
                <label className="text-xs text-neutral-400">Language</label>
                <select value={lang} onChange={(e) => setLang(e.target.value)} className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50">
                  <option>EN</option>
                  <option>TR</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-neutral-400">Theme</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} className="mt-1 w-full rounded-xl bg-neutral-900/60 px-3 py-2 text-sm ring-1 ring-neutral-800 outline-none focus:ring-orange-500/50">
                  <option>Dark</option>
                  <option>Light</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
            <div className="text-sm font-semibold">Security</div>
            <div className="mt-3 space-y-2 text-sm text-neutral-300">
              <div className="flex items-center justify-between">
                <span>Two-factor authentication</span>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 accent-orange-500" />
                  <span className="text-xs text-neutral-400">Enable</span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span>Login alerts</span>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 accent-orange-500" defaultChecked />
                  <span className="text-xs text-neutral-400">Enable</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
