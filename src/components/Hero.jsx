import React from 'react';
import Spline from '@splinetool/react-spline';
import { Play, Plus, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/40 to-neutral-950" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300 ring-1 ring-white/10">
            <Star size={14} className="text-amber-400" /> Editor’s picks this week
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Immerse in stories. Crafted for manga and webtoon lovers.
          </h1>
          <p className="mt-4 text-neutral-300 max-w-xl">
            Discover trending epics, follow new releases, and read in a distraction-free, beautifully tuned reader. Fully responsive with smooth navigation.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-orange-500 to-red-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-red-900/20 transition hover:brightness-110">
              <Play size={18} /> Read Now
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition">
              <Plus size={18} /> Add to Library
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
