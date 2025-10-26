import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-800">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-neutral-300">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-500 to-red-600" />
            <span className="font-semibold">MangaFlow</span>
          </div>
          <p className="mt-3 text-neutral-400">A modern platform for reading and publishing manga and webtoons. Smooth, immersive, and mobile-first.</p>
        </div>
        <div>
          <h3 className="text-neutral-200 font-semibold">Platform</h3>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:text-white" href="#">Home</a></li>
            <li><a className="hover:text-white" href="#">Library</a></li>
            <li><a className="hover:text-white" href="#">Categories</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-neutral-200 font-semibold">Company</h3>
          <ul className="mt-3 space-y-2">
            <li><a className="hover:text-white" href="#">About</a></li>
            <li><a className="hover:text-white" href="#">Terms</a></li>
            <li><a className="hover:text-white" href="#">Privacy</a></li>
            <li><a className="hover:text-white" href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-neutral-200 font-semibold">Language</h3>
          <div className="mt-3">
            <select className="w-full rounded-xl bg-neutral-900/70 px-3 py-2 ring-1 ring-neutral-800 focus:ring-orange-500/50 outline-none">
              <option>English (EN)</option>
              <option>Türkçe (TR)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} MangaFlow. All rights reserved.
      </div>
    </footer>
  );
}
