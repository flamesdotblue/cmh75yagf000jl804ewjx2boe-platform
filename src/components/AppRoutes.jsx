import React, { useMemo } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import SeriesDetail from './SeriesDetail';
import Reader from './Reader';
import LibraryPage from './LibraryPage';
import ProfilePage from './ProfilePage';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminSeries from './admin/AdminSeries';
import AdminUpload from './admin/AdminUpload';
import AdminModeration from './admin/AdminModeration';
import AdminAnalytics from './admin/AdminAnalytics';
import { SAMPLE_SERIES } from './sampleData';

const LAST_READ_KEY = 'mf:lastRead:series-1';

function HomeSeries() {
  const navigate = useNavigate();
  const chaptersById = useMemo(() => {
    const m = new Map();
    SAMPLE_SERIES.chapters.forEach((c) => m.set(c.id, c));
    return m;
  }, []);

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
  }, [chaptersById]);

  const onReadChapter = (chapterId, resume = true) => {
    const saved = localStorage.getItem(LAST_READ_KEY);
    const params = new URLSearchParams();
    if (resume && saved) {
      try {
        const data = JSON.parse(saved);
        if (data.chapterId === chapterId) {
          if (data.mode) params.set('mode', data.mode);
        }
      } catch {}
    }
    navigate(`/read/${chapterId}?${params.toString()}`);
  };

  return (
    <SeriesDetail series={SAMPLE_SERIES} onReadChapter={onReadChapter} continueInfo={continueInfo} />
  );
}

function ReaderRoute() {
  const navigate = useNavigate();
  const { chapterId } = useParams();
  const chaptersById = useMemo(() => {
    const m = new Map();
    SAMPLE_SERIES.chapters.forEach((c) => m.set(c.id, c));
    return m;
  }, []);

  const chapter = chaptersById.get(chapterId) || SAMPLE_SERIES.chapters[0];

  const onSaveProgress = (payload) => {
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

  return (
    <Reader
      seriesId={SAMPLE_SERIES.id}
      chapter={chapter}
      chapters={SAMPLE_SERIES.chapters}
      onSaveProgress={onSaveProgress}
      onExit={() => navigate(-1)}
      onChangeChapter={(cid) => navigate(`/read/${cid}`)}
      initialState={undefined}
    />
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeSeries />} />
      <Route path="/read/:chapterId" element={<ReaderRoute />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="/admin" element={<AdminLayout />}> 
        <Route index element={<AdminDashboard />} />
        <Route path="series" element={<AdminSeries />} />
        <Route path="upload" element={<AdminUpload />} />
        <Route path="moderation" element={<AdminModeration />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>

      <Route path="*" element={<div className="py-20 text-center text-neutral-400">Page not found.</div>} />
    </Routes>
  );
}
