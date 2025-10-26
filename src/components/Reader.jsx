import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Maximize, Minimize, X, Sun, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, BookOpen, AlignVerticalJustifyCenter, ArrowLeftRight } from 'lucide-react';

function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement));
  const enter = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
  };
  const exit = () => {
    if (document.exitFullscreen) document.exitFullscreen();
  };
  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  return { isFullscreen, enter, exit };
}

export default function Reader({ seriesId, chapter, chapters, onSaveProgress, onExit, initialState, onChangeChapter }) {
  const [mode, setMode] = useState(initialState?.mode || 'webtoon'); // 'manga' | 'webtoon'
  const [rtl, setRtl] = useState(initialState?.rtl || false);
  const [zoom, setZoom] = useState(() => Math.min(Math.max(initialState?.zoom || 1, 0.5), 3));
  const [brightness, setBrightness] = useState(1); // 1 normal, <1 darker
  const [pageIndex, setPageIndex] = useState(initialState?.pageIndex || 0);
  const [uiVisible, setUiVisible] = useState(true);
  const scrollRef = useRef(null);
  const uiHideTimer = useRef(null);
  const { isFullscreen, enter, exit } = useFullscreen();

  const chapterIndex = useMemo(() => chapters.findIndex((c) => c.id === chapter.id), [chapters, chapter.id]);
  const canPrev = chapterIndex < chapters.length - 1; // older chapter
  const canNext = chapterIndex > 0; // newer chapter

  const saveProgress = useCallback(() => {
    const payload = {
      chapterId: chapter.id,
      pageIndex: mode === 'manga' ? pageIndex : 0,
      scrollY: mode === 'webtoon' ? (scrollRef.current?.scrollTop || 0) : 0,
      mode,
      rtl,
    };
    onSaveProgress(payload);
  }, [chapter.id, mode, pageIndex, rtl, onSaveProgress]);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    if (mode === 'webtoon' && typeof initialState?.scrollY === 'number') {
      node.scrollTo({ top: initialState.scrollY, behavior: 'instant' });
    }
  }, [mode, initialState]);

  useEffect(() => {
    const onMove = () => {
      setUiVisible(true);
      clearTimeout(uiHideTimer.current);
      uiHideTimer.current = setTimeout(() => setUiVisible(false), 1800);
    };
    const el = scrollRef.current || window;
    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchstart', onMove);
    el.addEventListener('scroll', onMove);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('touchstart', onMove);
      el.removeEventListener('scroll', onMove);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onExit();
      if (mode === 'manga') {
        if (e.key === 'ArrowRight') {
          rtl ? prevPage() : nextPage();
        } else if (e.key === 'ArrowLeft') {
          rtl ? nextPage() : prevPage();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mode, rtl]);

  useEffect(() => {
    return () => {
      saveProgress();
    };
  }, [saveProgress]);

  const nextChapter = () => {
    if (!canNext) return;
    const target = chapters[chapterIndex - 1];
    onChangeChapter(target.id);
    setPageIndex(0);
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 });
    setTimeout(saveProgress, 50);
  };
  const prevChapter = () => {
    if (!canPrev) return;
    const target = chapters[chapterIndex + 1];
    onChangeChapter(target.id);
    setPageIndex(0);
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0 });
    setTimeout(saveProgress, 50);
  };

  const nextPage = () => setPageIndex((p) => Math.min(p + 1, chapter.images.length - 1));
  const prevPage = () => setPageIndex((p) => Math.max(p - 1, 0));

  const toggleFullscreen = () => (isFullscreen ? exit() : enter());

  const containerStyle = {
    filter: `brightness(${brightness})`,
  };

  return (
    <div className="relative rounded-2xl border border-neutral-800 overflow-hidden" style={containerStyle}>
      {/* Controls */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/60 to-black/0 ${uiVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        <div className="pointer-events-auto flex items-center justify-between gap-2 px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={() => { saveProgress(); onExit(); }} className="rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20">
              <X size={16} />
            </button>
            <div className="text-sm font-semibold">{chapter.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setMode((m) => (m === 'manga' ? 'webtoon' : 'manga'))} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20" title="Toggle mode">
              <BookOpen size={16} /> {mode === 'manga' ? 'Manga' : 'Webtoon'}
            </button>
            {mode === 'manga' && (
              <button onClick={() => setRtl((v) => !v)} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20" title="Reading direction">
                <ArrowLeftRight size={16} /> {rtl ? 'RTL' : 'LTR'}
              </button>
            )}
            <div className="hidden md:flex items-center gap-2 rounded-lg bg-white/10 px-2 py-1">
              <button onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.1).toFixed(2)))} className="rounded-md p-1 hover:bg-white/10" title="Zoom out">
                <ZoomOut size={16} />
              </button>
              <div className="text-xs w-10 text-center">{Math.round(zoom * 100)}%</div>
              <button onClick={() => setZoom((z) => Math.min(3, +(z + 0.1).toFixed(2)))} className="rounded-md p-1 hover:bg-white/10" title="Zoom in">
                <ZoomIn size={16} />
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-lg bg-white/10 px-2 py-1" title="Brightness">
              <Sun size={16} />
              <input type="range" min="0.6" max="1.2" step="0.01" value={brightness} onChange={(e) => setBrightness(parseFloat(e.target.value))} className="w-28 accent-orange-500" />
            </div>
            <button onClick={toggleFullscreen} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs hover:bg-white/20">
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />} Fullscreen
            </button>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/60 to-black/0 ${uiVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        <div className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <button disabled={!canPrev} onClick={rtl ? nextChapter : prevChapter} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${canPrev ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 opacity-50 cursor-not-allowed'}`}>
              <ChevronLeft size={16} /> Prev chapter
            </button>
            <button disabled={!canNext} onClick={rtl ? prevChapter : nextChapter} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${canNext ? 'bg-white/10 hover:bg-white/20' : 'bg-white/5 opacity-50 cursor-not-allowed'}`}>
              Next chapter <ChevronRight size={16} />
            </button>
          </div>
          <div className="text-xs text-neutral-300">
            {mode === 'manga' ? `Page ${pageIndex + 1} / ${chapter.images.length}` : 'Scroll to read'}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div ref={scrollRef} className={`relative h-[80vh] overflow-auto bg-neutral-950 ${mode === 'webtoon' ? 'py-8' : 'flex items-center justify-center'} `}>
        {mode === 'webtoon' ? (
          <div className="mx-auto w-full max-w-3xl px-3">
            {chapter.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Page ${idx + 1}`}
                className="mb-4 w-full rounded-lg ring-1 ring-neutral-800"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4 select-none" onClick={(e) => {
            const { left, width } = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - left;
            if (x > width / 2) {
              rtl ? prevPage() : nextPage();
            } else {
              rtl ? nextPage() : prevPage();
            }
          }}>
            <img
              src={chapter.images[pageIndex]}
              alt={`Page ${pageIndex + 1}`}
              className="max-h-full rounded-lg ring-1 ring-neutral-800"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        )}
      </div>

      {/* Distraction-free toggle floating */}
      <button
        title="Toggle UI"
        onClick={() => setUiVisible((v) => !v)}
        className="absolute right-4 top-4 z-30 rounded-full bg-white/10 p-2 hover:bg-white/20"
      >
        <AlignVerticalJustifyCenter size={18} />
      </button>
    </div>
  );
}
