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
  X
} from 'lucide-react';
import { chapters } from '../data/chapters';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
              {chapter.title}
            </h2>
          </div>
          <p className="text-lg text-zinc-600 max-w-3xl leading-relaxed">
            {chapter.description}
          </p>
        </section>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-16">
            {/* Selfstudys-style PDF Viewer */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-emerald-600 w-5 h-5" />
                  <h3 className="text-xl font-bold text-zinc-800">Interactive Book Viewer</h3>
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
                {chapter.studyGuide.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center text-xs text-zinc-500">0{index + 1}</span>
                      {item.topic}
                    </h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {item.content}
                    </p>
                  </motion.div>
                ))}
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
