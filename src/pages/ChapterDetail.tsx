import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Download,
  ChevronDown,
  ChevronUp,
  BookOpen,
  FileText,
  HelpCircle,
  Info,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowLeft,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  LayoutGrid,
  ChevronsLeft,
  ChevronsRight,
  X,
  ExternalLink,
  Target
} from 'lucide-react';
import { chapters } from '../data/chapters';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

import RelatedSidebar from '../components/RelatedSidebar';
import CollegeDuniaLogo from '../components/CollegeDuniaLogo';
import SolutionRenderer from '../components/SolutionRenderer';

const BookPage = React.forwardRef<HTMLDivElement, { pageNumber: number; width: number; currentPage: number }>(
  (props, ref) => {
    const isNear = Math.abs(props.pageNumber - (props.currentPage + 1)) <= 1;

    return (
      <div className="bg-white shadow-sm h-full w-full flex items-start justify-center" ref={ref} style={{ overflow: 'visible' }}>
        {isNear ? (
          <Page
            pageNumber={props.pageNumber}
            width={props.width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading={
              <div className="flex items-center justify-center h-full w-full bg-zinc-50">
                <Loader2 className="w-6 h-6 text-zinc-300 animate-spin" />
              </div>
            }
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-zinc-50">
            <Loader2 className="w-6 h-6 text-zinc-200 animate-spin" />
          </div>
        )}
      </div>
    );
  }
);

BookPage.displayName = 'BookPage';

export default function ChapterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const chapter = chapters.find(c => c.id === Number(id));

  const [openSolutionId, setOpenSolutionId] = useState<number | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < 1024);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const flipBookRef = useRef<any>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panAtDragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerDimensions({ width, height });
      }
    });

    if (viewerRef.current) {
      observer.observe(viewerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Ctrl+Wheel zoom on the viewer container
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      setZoom(z => Math.min(Math.max(z + delta, 0.5), 3));
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // Reset pan when zoom goes back to 1
  useEffect(() => {
    if (zoom <= 1) setPanOffset({ x: 0, y: 0 });
  }, [zoom]);

  useEffect(() => {
    if (!chapter) {
      navigate('/');
    }
  }, [chapter, navigate]);

  if (!chapter) return null;

  const proxyPdfUrl = `/api/proxy-pdf?url=${encodeURIComponent(chapter.pdfUrl)}`;

  const toggleSolution = (id: number) => {
    setOpenSolutionId(openSolutionId === id ? null : id);
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const nextButton = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevButton = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const onPage = (e: any) => {
    setCurrentPage(e.data);
  };

  const goToFirst = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flip(0);
    }
  };

  const goToLast = () => {
    if (flipBookRef.current && numPages) {
      flipBookRef.current.pageFlip().flip(numPages - 1);
    }
  };

  const zoomIn = () => setZoom(z => Math.min(z + 0.15, 3));
  const zoomOut = () => setZoom(z => Math.max(z - 0.15, 0.5));
  const resetZoom = () => { setZoom(1); setPanOffset({ x: 0, y: 0 }); };

  // Drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panAtDragStart.current = { ...panOffset };
    e.preventDefault();
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPanOffset({ x: panAtDragStart.current.x + dx, y: panAtDragStart.current.y + dy });
  };
  const handleMouseUp = () => { isDragging.current = false; };

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;

    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);


  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-600" />
            </Link>
            <div className="flex items-center gap-2">
              <CollegeDuniaLogo />
            </div>
          </div>
          <a
            href={chapter.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section - Full Width */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">NCERT Class 12 Physics</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 leading-tight">
              {chapter.resourceOverrides?.solutions?.title || chapter.title}
            </h2>
          </div>
          <p className="text-lg text-zinc-600 max-w-3xl leading-relaxed">
            {chapter.resourceOverrides?.solutions?.description || chapter.description}
          </p>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-16">
            {/* Selfstudys-style PDF Viewer */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-emerald-600 w-5 h-5" />
                  <h3 className="text-xl font-bold text-zinc-800">Interactive PDF Viewer</h3>
                </div>
                <a
                  href={chapter.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
                  title="Open Original PDF"
                >
                  <Download className="w-4 h-4" />
                  HD PDF Download
                </a>
              </div>

              {/* Main Viewer Container */}
              <div
                ref={viewerRef}
                className={`relative overflow-hidden select-none ${isFullscreen
                  ? 'fixed inset-0 z-[60] bg-[#4a4a4a]'
                  : 'rounded-2xl bg-[#9aa5b4] min-h-[600px]'
                  }`}
                style={{
                  backgroundImage: isFullscreen ? 'none' : 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              >
                {/* Dotted / polygon texture overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 50%)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Loading overlay */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#9aa5b4] z-50">
                    <Loader2 className="w-10 h-10 text-white animate-spin mb-4" />
                    <p className="text-white/70 font-medium">Loading PDF...</p>
                  </div>
                )}

                {/* Thumbnail Sidebar */}
                {showThumbnails && numPages && (
                  <div className="absolute left-0 top-0 bottom-0 w-44 bg-black/80 backdrop-blur-md z-40 overflow-y-auto flex flex-col gap-3 p-3">
                    <div className="flex items-center justify-between text-white text-xs font-semibold mb-1">
                      <span>Pages</span>
                      <button onClick={() => setShowThumbnails(false)} className="hover:text-white/60 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <Document file={proxyPdfUrl} loading={null}>
                      {Array.from(new Array(numPages), (_, i) => (
                        <button
                          key={i}
                          onClick={() => { flipBookRef.current?.pageFlip().flip(i); setShowThumbnails(false); }}
                          className={`w-full rounded overflow-hidden border-2 transition-all ${(i === currentPage || i === currentPage + 1)
                            ? 'border-emerald-400' : 'border-transparent hover:border-white/40'
                            }`}
                        >
                          <Page pageNumber={i + 1} width={120} renderAnnotationLayer={false} renderTextLayer={false} />
                          <div className="bg-black/60 text-white text-[10px] text-center py-0.5">{i + 1}</div>
                        </button>
                      ))}
                    </Document>
                  </div>
                )}

                {/* Left side arrow */}
                <button
                  onClick={prevButton}
                  disabled={currentPage === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all disabled:opacity-20 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right side arrow */}
                <button
                  onClick={nextButton}
                  disabled={numPages ? currentPage >= numPages - 1 : true}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all disabled:opacity-20 backdrop-blur-sm"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Book content area */}
                <div
                  className="w-full h-full flex items-center justify-center py-4 px-8 overflow-hidden"
                  ref={bookContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onDoubleClick={zoom > 1 ? resetZoom : undefined}
                  style={{ cursor: zoom > 1 ? (isDragging.current ? 'grabbing' : 'grab') : 'default' }}
                >
                  <div style={{
                    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                    transformOrigin: 'center center',
                    transition: isDragging.current ? 'none' : 'transform 0.15s ease',
                  }}>
                    <Document
                      file={proxyPdfUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      loading={null}
                      className="flex justify-center items-center"
                    >
                      {numPages && containerDimensions.width > 0 && (() => {
                        // Use actual window size in fullscreen for reliable dimensions
                        const viewW = isFullscreen ? window.innerWidth : containerDimensions.width;
                        const viewH = isFullscreen ? window.innerHeight : containerDimensions.height;

                        // Available width: subtract side arrows (80px, reduced from 128px to match smaller px-8 padding)
                        const availW = viewW - 80;
                        const pageWFromWidth = isPortrait
                          ? Math.min(availW, 550)
                          : Math.min(Math.floor(availW / 2), 550);

                        // Constrain by height: subtract py-4 (32px) + toolbar+gap (90px) = 122px
                        let pageW = pageWFromWidth;
                        if (viewH > 0) {
                          const availH = viewH - 122;
                          const pageWFromHeight = Math.floor(availH / 1.414);
                          pageW = Math.min(pageWFromWidth, pageWFromHeight);
                        }

                        const pageH = Math.round(pageW * 1.414); // A4 ratio
                        // Key on pageW+isFullscreen so the flipbook fully remounts when
                        // dimensions change — prevents the stale-layout overlap bug.
                        const flipKey = `flipbook-${pageW}-${isFullscreen ? 'fs' : 'nrm'}`;
                        return (
                          <HTMLFlipBook
                            key={flipKey}
                            width={pageW}
                            height={pageH}
                            size="fixed"
                            minWidth={pageW}
                            maxWidth={pageW}
                            minHeight={pageH}
                            maxHeight={pageH}
                            maxShadowOpacity={0.6}
                            showCover={true}
                            mobileScrollSupport={true}
                            onFlip={onPage}
                            className="book-container"
                            ref={flipBookRef}
                            startPage={currentPage}
                            drawShadow={true}
                            flippingTime={700}
                            usePortrait={isPortrait}
                            startZIndex={0}
                            autoSize={false}
                            clickEventForward={true}
                            useMouseEvents={true}
                            swipeDistance={30}
                            showPageCorners={true}
                            disableFlipByClick={false}
                          >
                            {Array.from(new Array(numPages), (el, index) => (
                              <BookPage
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={pageW - 2}
                                currentPage={currentPage}
                              />
                            ))}
                          </HTMLFlipBook>
                        );
                      })()}
                    </Document>
                  </div>
                </div>

                {/* Bottom floating toolbar */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30">
                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md rounded-full px-3 py-2 shadow-xl border border-white/10">
                    {/* Thumbnails toggle */}
                    <button
                      onClick={() => setShowThumbnails(v => !v)}
                      className={`p-2 rounded-full transition-colors ${showThumbnails ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      title="Page Thumbnails"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-white/20 mx-1" />

                    {/* First page */}
                    <button
                      onClick={goToFirst}
                      disabled={currentPage === 0}
                      className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                      title="First Page"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>

                    {/* Prev */}
                    <button
                      onClick={prevButton}
                      disabled={currentPage === 0}
                      className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                      title="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page indicator */}
                    <span className="text-white text-xs font-mono px-2 min-w-[55px] text-center">
                      {currentPage + 1} / {numPages || '--'}
                    </span>

                    {/* Next */}
                    <button
                      onClick={nextButton}
                      disabled={numPages ? currentPage >= numPages - 1 : true}
                      className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                      title="Next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Last page */}
                    <button
                      onClick={goToLast}
                      disabled={numPages ? currentPage >= numPages - 1 : true}
                      className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                      title="Last Page"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-white/20 mx-1" />

                    {/* Zoom Out */}
                    <button
                      onClick={zoomOut}
                      disabled={zoom <= 0.5}
                      className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                      title="Zoom Out (Ctrl+Scroll)"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>

                    {/* Zoom % — click to reset */}
                    <button
                      onClick={resetZoom}
                      className="text-white/70 hover:text-white text-[11px] font-mono px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors min-w-[38px] text-center"
                      title="Reset zoom to 100%"
                    >
                      {Math.round(zoom * 100)}%
                    </button>

                    {/* Zoom In */}
                    <button
                      onClick={zoomIn}
                      disabled={zoom >= 3}
                      className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
                      title="Zoom In (Ctrl+Scroll)"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    <div className="w-px h-5 bg-white/20 mx-1" />

                    {/* Fullscreen */}
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    >
                      {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Study Guide Grid */}
            <section className="space-y-8">
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-4">
                <Info className="text-emerald-600 w-5 h-5" />
                <h3 className="text-xl font-bold text-zinc-800">Core Concepts</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {chapter.studyGuide.map((item, index) => {
                  const colors = [
                    { bg: 'bg-blue-50', text: 'text-blue-600', hoverBorder: 'hover:border-blue-300', icon: 'text-blue-400 group-hover:text-blue-600' },
                    { bg: 'bg-purple-50', text: 'text-purple-600', hoverBorder: 'hover:border-purple-300', icon: 'text-purple-400 group-hover:text-purple-600' },
                    { bg: 'bg-emerald-50', text: 'text-emerald-600', hoverBorder: 'hover:border-emerald-300', icon: 'text-emerald-400 group-hover:text-emerald-600' },
                    { bg: 'bg-rose-50', text: 'text-rose-600', hoverBorder: 'hover:border-rose-300', icon: 'text-rose-400 group-hover:text-rose-600' },
                    { bg: 'bg-amber-50', text: 'text-amber-600', hoverBorder: 'hover:border-amber-300', icon: 'text-amber-400 group-hover:text-amber-600' },
                    { bg: 'bg-indigo-50', text: 'text-indigo-600', hoverBorder: 'hover:border-indigo-300', icon: 'text-indigo-400 group-hover:text-indigo-600' }
                  ];
                  const color = colors[index % colors.length];

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-all ${color.hoverBorder} hover:-translate-y-1`}
                    >
                      <h4 className="font-bold text-zinc-900 mb-3 flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${color.bg} ${color.text}`}>
                          0{index + 1}
                        </span>
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${color.text} hover:underline transition-colors flex items-center gap-1 group`}
                          >
                            {item.topic}
                            <ExternalLink className={`w-3.5 h-3.5 shrink-0 transition-colors ${color.icon}`} />
                          </a>
                        ) : (
                          item.topic
                        )}
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed pl-11">
                        {item.content}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Solutions Accordion */}
            <section className="space-y-8">
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-4">
                <HelpCircle className="text-emerald-600 w-5 h-5" />
                <h3 className="text-xl font-bold text-zinc-800">Exercise Solutions</h3>
              </div>
              <div className="space-y-4">
                {chapter.solutions.map((sol) => (
                  <div
                    key={sol.id}
                    className="bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleSolution(sol.id)}
                      className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex gap-4">
                        <span className="font-mono text-emerald-600 font-bold">Q{sol.id}.</span>
                        <span className="font-medium text-zinc-800 pr-8">{sol.question}</span>
                      </div>
                      {openSolutionId === sol.id ? (
                        <ChevronUp className="w-5 h-5 text-zinc-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-zinc-400 shrink-0" />
                      )}
                    </button>
                    <AnimatePresence>
                      {openSolutionId === sol.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-zinc-100 space-y-4">
                            {sol.figure && (
                              <div className="flex flex-col items-center gap-2 bg-zinc-50 rounded-xl border border-zinc-200 p-4">
                                <img
                                  src={sol.figure}
                                  alt={sol.figureCaption || 'Figure'}
                                  className="max-h-64 w-auto object-contain rounded"
                                />
                                {sol.figureCaption && (
                                  <p className="text-xs font-semibold text-zinc-500 text-center tracking-wide uppercase">
                                    {sol.figureCaption}
                                  </p>
                                )}
                              </div>
                            )}
                            <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
                              <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">Solution</h5>
                              <SolutionRenderer text={sol.solution} />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>

            {/* Chapter 1 specific supplementary content */}
            {chapter.id === 1 && (
              <div className="space-y-8">

                {/* Intro, Mastering & Time Strategy */}
                <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                      How to Master Chapter 1: Electric Charges and Fields
                    </h2>
                  </div>

                  <p className="text-zinc-700 leading-relaxed">
                    Electric Charges and Fields is the foundational chapter of the <strong>Electrostatics</strong> unit. A solid grasp here is non-negotiable because the concepts of electric fields, dipoles, and fluxes seamlessly transition into Capacitance, Magnetism, and Electromagnetic Induction. This chapter is your stepping stone to mastering Class 12 Physics.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-2">
                      <h3 className="font-bold text-blue-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center text-sm">⏱️</span>
                        Time Required to Master
                      </h3>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        For a dedicated student, it typically takes <strong>8-10 hours</strong> of focused study. This includes: <br />
                        • 3-4 hours reading NCERT & Notes<br />
                        • 2 hours practicing in-text derivations<br />
                        • 3-4 hours solving numericals & NCERT exercises
                      </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 space-y-2">
                      <h3 className="font-bold text-amber-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-sm">📅</span>
                        Ideal Revision Strategy
                      </h3>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        • <strong>Day 1:</strong> Revise properties of charge & Coulomb's law.<br />
                        • <strong>Day 3:</strong> Practice dipole & electric field derivations.<br />
                        • <strong>Day 7:</strong> Focus purely on Gauss's Law numericals.<br />
                        • <strong>Monthly:</strong> Retake chapter mock tests.
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 space-y-3">
                    <h3 className="font-semibold text-emerald-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-xs">💡</span>
                      Student Pro-Tip for Derivations
                    </h3>
                    <p className="text-sm text-emerald-800 leading-relaxed">
                      Many students struggle with the vector addition in Coulomb's Law and the symmetrical applications of Gauss's Law. Do not skip drawing the diagrams! A correct vector diagram for an electric dipole almost guarantees correct mathematical steps.
                    </p>
                  </div>
                </section>

                {/* Exam Weightage Breakdown */}
                <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                  <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                      <Target className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                      Exam Weightage & Importance
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 pt-2">
                    <div className="space-y-2 border-l-4 border-indigo-500 pl-4 py-1">
                      <h3 className="font-bold text-zinc-900">CBSE Boards</h3>
                      <p className="text-sm text-zinc-600">Together with Chapter 2 (Electrostatic Potential), this unit carries <strong>16-17 marks</strong> out of 70 theory marks. Expect 1 long format derivation and 2-3 MCQs.</p>
                    </div>
                    <div className="space-y-2 border-l-4 border-emerald-500 pl-4 py-1">
                      <h3 className="font-bold text-zinc-900">NEET UG</h3>
                      <p className="text-sm text-zinc-600">Historically, <strong>2-3 questions</strong> appear purely from Electrostatics. Focus heavily on Gauss's law applications and charge distribution numericals.</p>
                    </div>
                    <div className="space-y-2 border-l-4 border-amber-500 pl-4 py-1">
                      <h3 className="font-bold text-zinc-900">JEE Main / Adv</h3>
                      <p className="text-sm text-zinc-600"><strong>1-2 questions</strong> per shift. Questions here usually combine electrostatics with mechanics (like a pendulum in an E-field). Conceptual core is highly tested.</p>
                    </div>
                  </div>
                </section>

                {/* Complete Resource Guide CTAs */}
                <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-6 shadow-sm">
                  <div className="space-y-2 text-center md:text-left">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 flex items-center justify-center md:justify-start gap-2">
                      <LayoutGrid className="w-6 h-6 text-emerald-600" />
                      Your Full Toolkit for Chapter 1
                    </h2>
                    <p className="text-zinc-600 text-sm max-w-2xl">
                      Don't stop at just reading. Practice makes perfect. Use our meticulously created resources targeted purely for Electric Charges and Fields to build absolute mastery.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 pt-4">
                    <Link to="/class-12/physics/notes" className="bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-blue-300 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl text-blue-600 transition-transform shrink-0 group-hover:scale-110">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-zinc-900 text-lg group-hover:text-blue-700 transition-colors">Revision Notes</h4>
                          <p className="text-sm text-zinc-600 leading-relaxed">
                            Short, crisp chapter notes designed for quick revision. Perfect for brushing up concepts right before your exams without reading the entire textbook.
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex justify-end mt-4 pt-4 border-t border-zinc-100">
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-600">
                          View Chapter Notes <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>

                    <Link to="/class-12/physics/exemplar" className="bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-purple-300 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-50 border border-purple-100 p-3 rounded-xl text-purple-600 transition-transform shrink-0 group-hover:scale-110">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-zinc-900 text-lg group-hover:text-purple-700 transition-colors">NCERT Exemplar</h4>
                          <p className="text-sm text-zinc-600 leading-relaxed">
                            Advanced problem sets curated by NCERT. Crucial for students targeting competitive exams like JEE and NEET to build higher-order thinking skills.
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex justify-end mt-4 pt-4 border-t border-zinc-100">
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-purple-600">
                          Practice Exemplar <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>

                    <Link to="/class-12/physics/formulas" className="bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-emerald-300 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-emerald-600 transition-transform shrink-0 group-hover:scale-110">
                          <Target className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-zinc-900 text-lg group-hover:text-emerald-700 transition-colors">Formula Sheet</h4>
                          <p className="text-sm text-zinc-600 leading-relaxed">
                            A one-page cheat sheet containing all critical mathematical formulas for Electric Charges and Fields. Highly useful for numerical problem solving.
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex justify-end mt-4 pt-4 border-t border-zinc-100">
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
                          Download Formulas <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </Link>

                    <a href="https://collegedunia.com/exams/cbse-class-xii/physics-question-paper" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-rose-300 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all group relative overflow-hidden flex flex-col justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl text-rose-600 transition-transform shrink-0 group-hover:scale-110">
                          <HelpCircle className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-zinc-900 text-lg group-hover:text-rose-700 transition-colors">Mock Tests & PYQs</h4>
                          <p className="text-sm text-zinc-600 leading-relaxed">
                            Test your preparation with rigorous mock papers and previous year questions. Identify weak points before the actual board exams.
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex justify-end mt-4 pt-4 border-t border-zinc-100">
                        <span className="inline-flex items-center gap-1 text-sm font-bold text-rose-600">
                          Take Mock Test <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </a>
                  </div>
                </section>

                {/* Additional Sections Guiding Students */}

                {/* 1. Why NCERT Exemplar is a Game Changer */}
                <section className="bg-purple-50/50 rounded-[2rem] border border-purple-100 p-8 space-y-4">
                  <h2 className="text-xl font-bold text-purple-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Why Solve the NCERT Exemplar?
                  </h2>
                  <p className="text-sm text-purple-800 leading-relaxed">
                    While the standard NCERT textbook builds your foundational concepts, the <strong>NCERT Exemplar</strong> tests the depth of your understanding. It contains high-order thinking skills (HOTS) questions designed specifically to bridge the gap between board exams and competitive exams like JEE Main and NEET.
                  </p>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-start gap-3 text-sm text-purple-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                      <span><strong>Conceptual Clarity:</strong> The MCQs in the Exemplar often have confusing trap options that force you to deeply understand the underlying physics principles, rather than just rote learning.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-purple-800">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                      <span><strong>Board Exam Variations:</strong> CBSE frequently picks 3-mark and 5-mark long answer questions directly from Exemplar problems for the final examination.</span>
                    </li>
                  </ul>
                  <div className="pt-3">
                    <Link to="/class-12/physics/exemplar" className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 hover:text-purple-900 transition-colors bg-purple-100/50 hover:bg-purple-200 px-5 py-2.5 rounded-xl">
                      View Chapter 1 Exemplar Solutions <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </section>

                {/* 2. Importance of Formula Sheets */}
                <section className="bg-emerald-50/50 rounded-[2rem] border border-emerald-100 p-8 space-y-4">
                  <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600" />
                    The Power of Quick Formula Revisions
                  </h2>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    Electric Charges and Fields involves significant mathematics—from Coulomb's vector forms to complex Flux integrations. In the pressure of an exam, remembering the exact power of 'r' or whether you need 'ε₀' in the numerator or denominator is crucial.
                  </p>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    We highly recommend maintaining a separate formula notebook. Download our curated formula sheet to get a ready-made list of all crucial equations in this chapter. Review this sheet every Sunday to commit the formulas to memory permanently.
                  </p>
                  <div className="pt-3">
                    <Link to="/class-12/physics/formulas" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors bg-emerald-100/50 hover:bg-emerald-200 px-5 py-2.5 rounded-xl">
                      Download Chapter 1 Formula Sheet <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </section>

                {/* Video Solutions */}
                <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-6">
                  <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                    <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
                      Video Solutions: Electric Charges and Fields
                    </h2>
                  </div>
                  <p className="text-zinc-600 leading-relaxed md:text-lg">
                    Stuck on a complex derivation or tricky numerical? Watch this comprehensive video tutorial breaking down the most challenging problems from the Chapter 1 NCERT textbook step-by-step. Let an expert teacher walk you through the logic behind Coulomb's law vectors and Gauss's theorem setups.
                  </p>
                  <div className="mt-8 rounded-3xl overflow-hidden border-4 border-zinc-100 shadow-md bg-zinc-900 relative" style={{ paddingTop: '56.25%' }}>
                    {/* Placeholder iframe - 56.25% padding trick handles 16:9 aspect ratio */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 p-6 text-center z-0">
                      <Loader2 className="w-8 h-8 animate-spin mb-4 text-zinc-600" />
                      <p className="font-bold text-zinc-300">Loading Video Player...</p>
                    </div>
                    {/* Hardcoding a great CBSE class 12 physics chap 1 relevant video from youtube (e.g., Arvind Academy or similar popular one, we use a generic embed for now) */}
                    <iframe
                      className="absolute top-0 left-0 w-full h-full z-10"
                      src="https://www.youtube.com/embed/QXldH_EGu8Q"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </section>

                {/* Study Materials & Related Articles Table */}
                <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                  <div className="p-8 pb-4 border-b border-zinc-100">
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                      <LayoutGrid className="w-5 h-5 text-emerald-600" />
                      Explore Related Topics & Study Materials
                    </h2>
                    <p className="text-sm text-zinc-500 mt-2">
                      Deep-dive into specific derivations and concepts from Electric Charges and Fields.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
                    <div className="p-6 space-y-4">
                      <h3 className="font-bold text-zinc-800 text-sm uppercase tracking-wider">Concept Deep Dives</h3>
                      <ul className="space-y-3">
                        {[
                          { label: 'Charging by Induction', url: 'https://collegedunia.com/exams/charging-by-induction-definition-charged-objects-and-sample-questions-physics-articleid-869' },
                          { label: 'Dipole in a Uniform External Field', url: 'https://collegedunia.com/exams/dipole-in-a-uniform-external-field-torque-and-its-calculation-physics-articleid-15' },
                          { label: 'Unit of Electric Field', url: 'https://collegedunia.com/exams/electric-field-definition-formula-calculation-physics-articleid-2259' },
                          { label: 'Conservation of Charge', url: 'https://collegedunia.com/exams/conservation-of-charge-definition-formula-examples-articleid-3095' },
                        ].map((link, idx) => (
                          <li key={idx}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-2">
                              <ChevronRight className="w-3 h-3 text-emerald-400" />
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="font-bold text-zinc-800 text-sm uppercase tracking-wider">Broader Physics Topics</h3>
                      <ul className="space-y-3">
                        {[
                          { label: "Applications of Gauss's Law", url: 'https://collegedunia.com/exams/applications-of-gausss-law-overview-formula-and-derivations-physics-articleid-10' },
                          { label: 'Electrostatic Potential and Capacitance', url: 'https://collegedunia.com/exams/electrostatic-potential-and-capacitance-introduction-and-derivation-physics-articleid-24' },
                          { label: 'Formulas in Physics', url: 'https://collegedunia.com/exams/physics-formulas-notes-and-examples-articleid-4112' },
                          { label: 'Class 12 Physics Practicals Guide', url: 'https://collegedunia.com/exams/cbse-class-xii/physics-practical' },
                        ].map((link, idx) => (
                          <li key={idx}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-2">
                              <ChevronRight className="w-3 h-3 text-blue-400" />
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* End of Chapter 1 content */}
          </div>

          <RelatedSidebar
            currentChapterId={chapter.id}
            subjectSlug="physics"
            classLevel="class-12"
            resourceType="solutions"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center items-center gap-2 opacity-50">
            <CollegeDuniaLogo className="opacity-60" />
          </div>
          <p className="text-zinc-400 text-xs">
            Educational resource for NCERT Class 12 Physics. All rights reserved by NCERT for the textbook content.
          </p>
        </div>
      </footer>
    </div>
  );
}
