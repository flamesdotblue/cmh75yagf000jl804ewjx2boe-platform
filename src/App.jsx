import React, { useEffect, useMemo, useState } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import HomeQuickNav from './components/HomeQuickNav';
import SeriesDetail from './components/SeriesDetail';
import Reader from './components/Reader';
import AdminPanel from './components/AdminPanel';
import LibraryPage from './components/LibraryPage';
import ProfilePage from './components/ProfilePage';

// Mock series data preserved and reused across views
const SAMPLE_SERIES = {
  id: 'series-1',
  title: 'Crimson Shards',
  author: 'A. Kuro',
  year: 2024,
  status: 'Ongoing',
  genres: ['Action', 'Fantasy', 'Adventure'],
  rating: 4.6,
  ratingBreakdown: [60, 25, 10, 4, 1],
  synopsis:
    'In a realm where ancient relics pulse with forbidden power, a wayward courier and a fallen knight are thrust together by fate. As fractured kingdoms collide, they must traverse haunted skylines and crystal deserts to gather the Crimson Shards — before a silent cabal reshapes destiny itself.',
  cover:
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
  chapters: [
    {
      id: 'ch-10',
      title: 'Chapter 10 · Ember Oath',
      date: '2025-10-05',
      images: [
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1920&auto=format&fit=crop',
      ],
    },
    {
      id: 'ch-9',
      title: 'Chapter 9 · Glass Choir',
      date: '2025-09-18',
      images: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1545972152-705f1074e5a0?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1920&auto=format&fit=crop',
      ],
    },
    {
      id: 'ch-8',
      title: 'Chapter 8 · Moonlit Vale',
      date: '2025-09-01',
      images: [
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1920&auto=format&fit=crop',
      ],
    },
  ],
};

const LAST_READ_KEY = 'mf:lastRead:series-1';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'series' | 'reader' | 'admin' | 'library' | 'profile'
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [initialReaderState, setInitialReaderState] = useState(null);

  const chaptersById = useMemo(() => {
    const m = new Map();
    SAMPLE_SERIES.chapters.forEach((c) => m.set(c.id, c));
    return m;
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(LAST_READ_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentChapterId(data.chapterId || SAMPLE_SERIES.chapters[0].id);
      } catch {
        setCurrentChapterId(SAMPLE_SERIES.chapters[0].id);
      }
    } else {
      setCurrentChapterId(SAMPLE_SERIES.chapters[0].id);
    }
  }, []);

  const handleOpenReader = (chapterId, resume = true) => {
    const saved = localStorage.getItem(LAST_READ_KEY);
    let initial = { mode: 'webtoon' };
    if (resume && saved) {
      try {
        const data = JSON.parse(saved);
        if (data.chapterId === chapterId) {
          initial = {
            ...initial,
            pageIndex: data.pageIndex,
            scrollY: data.scrollY,
            mode: data.mode || 'webtoon',
            rtl: data.rtl || false,
          };
        }
      } catch {}
    }
    setCurrentChapterId(chapterId);
    setInitialReaderState(initial);
    setView('reader');
  };

  const handleSaveProgress = (payload) => {
    localStorage.setItem(
      LAST_READ_KEY,
      JSON.stringify({
        chapterId: payload.chapterId,
        pageIndex: payload.pageIndex || 0,
        scrollY: payload.scrollY || 0,
        mode: payload.mode || 'webtoon',
        rtl: payload.rtl || false,
        ts: Date.now(),
      })
    );
  };

  const continueInfo = useMemo(() => {
    const saved = localStorage.getItem(LAST_READ_KEY);
    if (!saved) return null;
    try {
      const data = JSON.parse(saved);
      const chap = chaptersById.get(data.chapterId);
      if (!chap) return null;
      return { chapter: chap, pageIndex: data.pageIndex || 0, mode: data.mode || 'webtoon' };
    } catch {
      return null;
    }
  }, [chaptersById, view]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <NavBar />

      <HomeQuickNav
        active={view}
        onNavigate={(next) => setView(next)}
        onQuickRead={() => {
          setView('series');
        }}
      />

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {view === 'home' && <HomePage />}

        {view === 'series' && (
          <SeriesDetail
            series={SAMPLE_SERIES}
            onReadChapter={handleOpenReader}
            continueInfo={continueInfo}
          />
        )}

        {view === 'reader' && currentChapterId && (
          <Reader
            seriesId={SAMPLE_SERIES.id}
            chapter={chaptersById.get(currentChapterId)}
            chapters={SAMPLE_SERIES.chapters}
            onSaveProgress={handleSaveProgress}
            onExit={() => setView('series')}
            initialState={initialReaderState}
            onChangeChapter={(chId) => setCurrentChapterId(chId)}
          />
        )}

        {view === 'admin' && <AdminPanel />}
        {view === 'library' && <LibraryPage />}
        {view === 'profile' && <ProfilePage />}
      </main>

      <Footer />
    </div>
  );
}
