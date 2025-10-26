import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import SectionRow from './components/SectionRow';
import Footer from './components/Footer';

export default function App() {
  const newReleases = [
    { id: 'nr1', title: 'Crimson Shards', author: 'A. Kuro', genres: ['Action', 'Fantasy'], rating: 4.6, cover: 'https://images.unsplash.com/photo-1520975922172-663b0f2bb3b9?q=80&w=1200&auto=format&fit=crop' },
    { id: 'nr2', title: 'Neon Echo', author: 'R. Sato', genres: ['Sci-Fi', 'Drama'], rating: 4.2, cover: 'https://images.unsplash.com/photo-1545972152-705f1074e5a0?q=80&w=1200&auto=format&fit=crop' },
    { id: 'nr3', title: 'Petals of Steel', author: 'H. Lin', genres: ['Romance', 'Cyberpunk'], rating: 4.5, cover: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop' },
    { id: 'nr4', title: 'Moonlit Vale', author: 'E. Aria', genres: ['Fantasy'], rating: 4.1, cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' }
  ];

  const trending = [
    { id: 'tr1', title: 'Dragon’s Circuit', author: 'K. Tan', genres: ['Action'], rating: 4.9, cover: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop' },
    { id: 'tr2', title: 'Velvet Skyline', author: 'I. Nox', genres: ['Mystery'], rating: 4.7, cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop' },
    { id: 'tr3', title: 'Aurora March', author: 'M. Rei', genres: ['Adventure'], rating: 4.8, cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' },
    { id: 'tr4', title: 'Silent Harbor', author: 'T. En', genres: ['Drama'], rating: 4.6, cover: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop' }
  ];

  const editors = [
    { id: 'ed1', title: 'Glass Garden', author: 'U. Ame', genres: ['Slice of Life'], rating: 4.3, cover: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop' },
    { id: 'ed2', title: 'Ember Crown', author: 'S. Noor', genres: ['Fantasy', 'Romance'], rating: 4.4, cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop' },
    { id: 'ed3', title: 'Starlit Courier', author: 'Y. Vega', genres: ['Adventure', 'Sci-Fi'], rating: 4.5, cover: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop' },
    { id: 'ed4', title: 'Paper Moons', author: 'N. Lumi', genres: ['Romance'], rating: 4.2, cover: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <NavBar />
      <main className=""> 
        <Hero />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14 py-12">
          <SectionRow title="New Releases" items={newReleases} accent="from-orange-500/30 via-red-500/20 to-transparent" />
          <SectionRow title="Trending" items={trending} ranked accent="from-fuchsia-500/20 via-purple-500/20 to-transparent" />
          <SectionRow title="Editor’s Picks" items={editors} accent="from-emerald-500/20 via-teal-500/20 to-transparent" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
