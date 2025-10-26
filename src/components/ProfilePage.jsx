import React, { useState } from 'react';
import { User, Star } from 'lucide-react';
import { MOCK_USERS } from './sampleData';

export default function ProfilePage() {
  const user = MOCK_USERS[0];
  const [bio, setBio] = useState('Story addict. Tea > Coffee.');
  const [lang, setLang] = useState('EN');
  const [theme, setTheme] = useState('Dark');

  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
        <div className="flex items-center gap-4">
          <div className="grid place-items-center h-16 w-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <User />
          </div>
          <div>
            <div className="text-lg font-bold">{user.name}</div>
            <div className="text-xs text-neutral-400">Joined {user.joined}</div>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-sm text-neutral-300">Bio</div>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-2 w-full rounded-xl bg-neutral-900/70 p-3 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none" rows={3} />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-neutral-300">Language</div>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="mt-2 w-full rounded-xl bg-neutral-900/70 p-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none">
              <option value="EN">English (EN)</option>
              <option value="TR">Türkçe (TR)</option>
            </select>
          </div>
          <div>
            <div className="text-sm text-neutral-300">Theme</div>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="mt-2 w-full rounded-xl bg-neutral-900/70 p-2 text-sm ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none">
              <option>Dark</option>
              <option>Light</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-sm text-neutral-300">Badges</div>
          <div className="mt-2 flex items-center gap-2">
            {user.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
                <Star size={14} /> {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="text-sm text-neutral-300">Stats</div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
              <div className="text-2xl font-extrabold">{user.stats.followed}</div>
              <div className="text-xs text-neutral-400">Series followed</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
              <div className="text-2xl font-extrabold">{user.stats.read}</div>
              <div className="text-xs text-neutral-400">Chapters read</div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4">
              <div className="text-2xl font-extrabold">{user.stats.comments}</div>
              <div className="text-xs text-neutral-400">Comments</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="text-sm text-neutral-300">Recent activity</div>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li>Followed "Crimson Shards"</li>
            <li>Commented on "Neon Echo"</li>
            <li>Finished "Glass Garden"</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
