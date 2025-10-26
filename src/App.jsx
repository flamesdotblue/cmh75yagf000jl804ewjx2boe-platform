import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
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

function useLastRead() {
  const [last, setLast] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem(LAST_READ_KEY);
    if (!saved) return;
    try {
      setLast(JSON.parse(saved));
    } catch {}
  }, []);
  const save = (payload) => {
    const data = {
      chapterId: payload.chapterId,
      pageIndex: payload.pageIndex || 0,
      scrollY: payload.scrollY || 0,
      mode: payload.mode || 'webtoon',
      rtl: payload.rtl || false,
      ts: Date.now(),
    };
    localStorage.setItem(LAST_READ_KEY, JSON.stringify(data));
    setLast(data);
  };
  return { last, save };
}

function TopLevelNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeKey = React.useMemo(() => {
    if (location.pathname.startsWith('/series')) return 'series';
    if (location.pathname.startsWith('/read')) return 'reader';
    if (location.pathname.startsWith('/library')) return 'library';
    if (location.pathname.startsWith('/profile')) return 'profile';
    if (location.pathname.startsWith('/admin')) return 'admin';
    return 'home';
  }, [location.pathname]);

  return (
    <HomeQuickNav
      active={activeKey}
      onNavigate={(k) => {
        if (k === 'home') navigate('/');
        if (k === 'series') navigate(`/series/${SAMPLE_SERIES.id}`);
        if (k === 'reader') navigate(`/read/${SAMPLE_SERIES.id}/${SAMPLE_SERIES.chapters[0].id}`);
        if (k === 'library') navigate('/library');
        if (k === 'profile') navigate('/profile');
        if (k === 'admin') navigate('/admin');
      }}
      onQuickRead={() => navigate(`/series/${SAMPLE_SERIES.id}`)}
    />
  );
}

function SeriesRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { last } = useLastRead();

  const chaptersById = useMemo(() => {
    const m = new Map();
    SAMPLE_SERIES.chapters.forEach((c) => m.set(c.id, c));
    return m;
  }, []);

  const continueInfo = useMemo(() => {
    if (!last) return null;
    const chap = chaptersById.get(last.chapterId);
    if (!chap) return null;
    return { chapter: chap, pageIndex: last.pageIndex || 0, mode: last.mode || 'webtoon' };
  }, [last, chaptersById]);

  const handleOpenReader = (chapterId, resume = true) => {
    navigate(`/read/${id}/${chapterId}`, { state: { resume } });
  };

  if (id !== SAMPLE_SERIES.id) return <Navigate to={`/series/${SAMPLE_SERIES.id}`} replace />;

  return (
    <SeriesDetail
      series={SAMPLE_SERIES}
      onReadChapter={handleOpenReader}
      continueInfo={continueInfo}
    />
  );
}

function ReaderRoute() {
  const { seriesId, chapterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { last, save } = useLastRead();

  const chaptersById = useMemo(() => {
    const m = new Map();
    SAMPLE_SERIES.chapters.forEach((c) => m.set(c.id, c));
    return m;
  }, []);

  const chapter = chaptersById.get(chapterId) || SAMPLE_SERIES.chapters[0];

  const initialReaderState = React.useMemo(() => {
    if (!last || last.chapterId !== chapterId || location.state?.resume === false) return { mode: 'webtoon' };
    return {
      mode: last.mode || 'webtoon',
      pageIndex: last.pageIndex,
      scrollY: last.scrollY,
      rtl: last.rtl || false,
    };
  }, [last, chapterId, location.state]);

  const handleChangeChapter = (nextChapterId) => {
    navigate(`/read/${seriesId}/${nextChapterId}`);
  };

  const handleExit = () => navigate(`/series/${seriesId}`);

  if (seriesId !== SAMPLE_SERIES.id) return <Navigate to={`/read/${SAMPLE_SERIES.id}/${SAMPLE_SERIES.chapters[0].id}`} replace />;

  return (
    <Reader
      seriesId={SAMPLE_SERIES.id}
      chapter={chapter}
      chapters={SAMPLE_SERIES.chapters}
      onSaveProgress={save}
      onExit={handleExit}
      initialState={initialReaderState}
      onChangeChapter={handleChangeChapter}
    />
  );
}

function AppShell() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
      <NavBar />
      <TopLevelNav />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/series/:id" element={<SeriesRoute />} />
          <Route path="/read/:seriesId/:chapterId" element={<ReaderRoute />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
