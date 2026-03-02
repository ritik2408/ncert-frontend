import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
    Download,
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
    FileText,
    Hash,
    BookOpen,
    Star,
    Info,
    ExternalLink,
} from 'lucide-react';
import { chapters } from '../data/chapters';
import { exemplarContent } from '../data/exemplarContent';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import RelatedSidebar from '../components/RelatedSidebar';
import CollegeDuniaLogo from '../components/CollegeDuniaLogo';

// ─── Resource metadata ────────────────────────────────────────────────────────
type ResourceType = 'notes' | 'books' | 'exemplar' | 'formulas';

const RESOURCE_META: Record<
    ResourceType,
    {
        label: string;
        accent: string;         // Tailwind colour stem, e.g. 'blue'
        accentBg: string;
        accentText: string;
        accentBorder: string;
        icon: React.ReactNode;
        tagline: string;
    }
> = {
    notes: {
        label: 'Chapter Notes',
        accent: 'blue',
        accentBg: 'bg-blue-600',
        accentText: 'text-blue-600',
        accentBorder: 'border-blue-200',
        icon: <FileText className="w-5 h-5" />,
        tagline: 'NCERT Class 12 Physics',
    },
    books: {
        label: 'Book PDF',
        accent: 'purple',
        accentBg: 'bg-purple-600',
        accentText: 'text-purple-600',
        accentBorder: 'border-purple-200',
        icon: <BookOpen className="w-5 h-5" />,
        tagline: 'NCERT Class 12 Physics',
    },
    exemplar: {
        label: 'Exemplar PDF',
        accent: 'amber',
        accentBg: 'bg-amber-500',
        accentText: 'text-amber-600',
        accentBorder: 'border-amber-200',
        icon: <Star className="w-5 h-5" />,
        tagline: 'NCERT Class 12 Physics',
    },
    formulas: {
        label: 'Formula Sheet',
        accent: 'rose',
        accentBg: 'bg-rose-500',
        accentText: 'text-rose-600',
        accentBorder: 'border-rose-200',
        icon: <Hash className="w-5 h-5" />,
        tagline: 'NCERT Class 12 Physics',
    },
};

// ─── BookPage sub-component (same as ChapterDetail) ──────────────────────────
const BookPage = React.forwardRef<
    HTMLDivElement,
    { pageNumber: number; width: number; currentPage: number }
>((props, ref) => {
    const isNear = Math.abs(props.pageNumber - (props.currentPage + 1)) <= 1;
    return (
        <div
            className="bg-white shadow-sm h-full w-full flex items-start justify-center"
            ref={ref}
            style={{ overflow: 'visible' }}
        >
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
});
BookPage.displayName = 'BookPage';

// ─── Main component ───────────────────────────────────────────────────────────
export default function ChapterResourceDetail() {
    const { id, resourceType } = useParams<{ id: string; resourceType: string }>();
    const navigate = useNavigate();
    const chapter = chapters.find((c) => c.id === Number(id));

    // PDF viewer state
    const [numPages, setNumPages] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isPortrait, setIsPortrait] = useState(window.innerWidth < 1024);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
    const [zoom, setZoom] = useState(1);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    // For books: which part is selected
    const [selectedPartUrl, setSelectedPartUrl] = useState<string | null>(null);

    const flipBookRef = useRef<any>(null);
    const viewerRef = useRef<HTMLDivElement>(null);
    const bookContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const panAtDragStart = useRef({ x: 0, y: 0 });

    // Validate resource type
    const rt = (resourceType as ResourceType) || 'notes';
    const meta = RESOURCE_META[rt] ?? RESOURCE_META.notes;

    // Derive the PDF URL for the current resource type
    const getPdfUrl = () => {
        if (!chapter) return '';
        if (rt === 'notes') return chapter.notesUrl || chapter.pdfUrl;
        if (rt === 'exemplar') return chapter.exemplarUrl || '';
        if (rt === 'formulas') return chapter.formulaSheetUrl || '';
        if (rt === 'books') {
            if (selectedPartUrl) return selectedPartUrl;
            return (chapter.bookParts?.[0]?.url) || chapter.pdfUrl;
        }
        return chapter.pdfUrl;
    };

    const pdfUrl = getPdfUrl();
    const proxyPdfUrl = pdfUrl ? `/api/proxy-pdf?url=${encodeURIComponent(pdfUrl)}` : '';

    useEffect(() => {
        if (!chapter || !RESOURCE_META[rt]) navigate('/');
    }, [chapter, rt, navigate]);

    useEffect(() => {
        const handleResize = () => setIsPortrait(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setContainerDimensions({ width, height });
            }
        });
        if (viewerRef.current) observer.observe(viewerRef.current);
        return () => { window.removeEventListener('resize', handleResize); observer.disconnect(); };
    }, []);

    useEffect(() => {
        const el = viewerRef.current;
        if (!el) return;
        const handleWheel = (e: WheelEvent) => {
            if (!e.ctrlKey && !e.metaKey) return;
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.08 : 0.08;
            setZoom((z) => Math.min(Math.max(z + delta, 0.5), 3));
        };
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, []);

    useEffect(() => { if (zoom <= 1) setPanOffset({ x: 0, y: 0 }); }, [zoom]);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Reset viewer when PDF changes (e.g. book part switch)
    useEffect(() => {
        setNumPages(null);
        setCurrentPage(0);
        setIsLoading(true);
        setZoom(1);
        setPanOffset({ x: 0, y: 0 });
    }, [pdfUrl]);

    if (!chapter) return null;

    // Navigation helpers
    const nextButton = () => flipBookRef.current?.pageFlip().flipNext();
    const prevButton = () => flipBookRef.current?.pageFlip().flipPrev();
    const onPage = (e: any) => setCurrentPage(e.data);
    const goToFirst = () => flipBookRef.current?.pageFlip().flip(0);
    const goToLast = () => numPages && flipBookRef.current?.pageFlip().flip(numPages - 1);
    const zoomIn = () => setZoom((z) => Math.min(z + 0.15, 3));
    const zoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.5));
    const resetZoom = () => { setZoom(1); setPanOffset({ x: 0, y: 0 }); };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom <= 1) return;
        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };
        panAtDragStart.current = { ...panOffset };
        e.preventDefault();
    };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        setPanOffset({
            x: panAtDragStart.current.x + (e.clientX - dragStart.current.x),
            y: panAtDragStart.current.y + (e.clientY - dragStart.current.y),
        });
    };
    const handleMouseUp = () => { isDragging.current = false; };

    const toggleFullscreen = () => {
        if (!viewerRef.current) return;
        if (!document.fullscreenElement) {
            viewerRef.current.requestFullscreen().catch(console.error);
        } else {
            document.exitFullscreen();
        }
    };

    // ─── Render ────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-zinc-50">
            {/* ── Header ── */}
            <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to={`/chapter/${chapter.id}`} className="p-2 hover:bg-zinc-100 rounded-full transition-colors" title="Back to Solutions">
                            <ArrowLeft className="w-5 h-5 text-zinc-600" />
                        </Link>
                        <CollegeDuniaLogo />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-zinc-500">
                        Class 12 • Physics • {meta.label}
                    </span>
                    {pdfUrl && (
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </a>
                    )}
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
                {/* ── Hero ── */}
                <section className="space-y-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                        <Link to="/" className="hover:text-zinc-600 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/class-12/physics" className="hover:text-zinc-600 transition-colors">Class 12 Physics</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className={meta.accentText}>{meta.label}</span>
                    </div>

                    <div className="space-y-2">
                        <span className={`${meta.accentText} font-semibold text-sm uppercase tracking-wider flex items-center gap-2`}>
                            {meta.icon}
                            {meta.tagline} — {meta.label}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
                            {chapter.title}
                        </h1>
                    </div>
                    <p className="text-lg text-zinc-600 max-w-3xl leading-relaxed">
                        {chapter.description}
                    </p>


                </section>

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-12">



                        {/* ── PDF Viewer ── */}
                        {proxyPdfUrl ? (
                            <section className="space-y-4">
                                <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                                    <div className="flex items-center gap-2">
                                        <span className={meta.accentText}>{meta.icon}</span>
                                        <h2 className="text-xl font-bold text-zinc-800">Interactive {meta.label} Viewer</h2>
                                    </div>
                                    <a
                                        href={pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        HD PDF Download
                                    </a>
                                </div>

                                {/* Main Viewer */}
                                <div
                                    ref={viewerRef}
                                    className={`relative overflow-hidden select-none ${isFullscreen
                                        ? 'fixed inset-0 z-[60] bg-[#4a4a4a]'
                                        : 'rounded-2xl bg-[#9aa5b4] min-h-[600px]'
                                        }`}
                                    style={{
                                        backgroundImage: isFullscreen
                                            ? 'none'
                                            : 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)',
                                        backgroundSize: '24px 24px',
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            backgroundImage:
                                                'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 50%)',
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
                                                <button onClick={() => setShowThumbnails(false)} className="hover:text-white/60">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <Document file={proxyPdfUrl} loading={null}>
                                                {Array.from(new Array(numPages), (_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => { flipBookRef.current?.pageFlip().flip(i); setShowThumbnails(false); }}
                                                        className={`w-full rounded overflow-hidden border-2 transition-all ${i === currentPage || i === currentPage + 1
                                                            ? 'border-emerald-400'
                                                            : 'border-transparent hover:border-white/40'
                                                            }`}
                                                    >
                                                        <Page pageNumber={i + 1} width={120} renderAnnotationLayer={false} renderTextLayer={false} />
                                                        <div className="bg-black/60 text-white text-[10px] text-center py-0.5">{i + 1}</div>
                                                    </button>
                                                ))}
                                            </Document>
                                        </div>
                                    )}

                                    <button onClick={prevButton} disabled={currentPage === 0}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all disabled:opacity-20 backdrop-blur-sm">
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button onClick={nextButton} disabled={numPages ? currentPage >= numPages - 1 : true}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all disabled:opacity-20 backdrop-blur-sm">
                                        <ChevronRight className="w-6 h-6" />
                                    </button>

                                    {/* Book content */}
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
                                                onLoadSuccess={({ numPages }) => { setNumPages(numPages); setIsLoading(false); }}
                                                loading={null}
                                                className="flex justify-center items-center"
                                            >
                                                {numPages && containerDimensions.width > 0 && (() => {
                                                    const viewW = isFullscreen ? window.innerWidth : containerDimensions.width;
                                                    const viewH = isFullscreen ? window.innerHeight : containerDimensions.height;
                                                    const availW = viewW - 80;
                                                    const pageWFromWidth = isPortrait
                                                        ? Math.min(availW, 550)
                                                        : Math.min(Math.floor(availW / 2), 550);
                                                    let pageW = pageWFromWidth;
                                                    if (viewH > 0) {
                                                        const availH = viewH - 122;
                                                        pageW = Math.min(pageWFromWidth, Math.floor(availH / 1.414));
                                                    }
                                                    const pageH = Math.round(pageW * 1.414);
                                                    const flipKey = `flipbook-${pageW}-${isFullscreen ? 'fs' : 'nrm'}`;
                                                    return (
                                                        <HTMLFlipBook
                                                            key={flipKey}
                                                            width={pageW} height={pageH}
                                                            size="fixed"
                                                            minWidth={pageW} maxWidth={pageW}
                                                            minHeight={pageH} maxHeight={pageH}
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
                                                            {Array.from(new Array(numPages), (_, index) => (
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

                                    {/* Bottom toolbar */}
                                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30">
                                        <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md rounded-full px-3 py-2 shadow-xl border border-white/10">
                                            <button onClick={() => setShowThumbnails((v) => !v)}
                                                className={`p-2 rounded-full transition-colors ${showThumbnails ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                                                title="Page Thumbnails">
                                                <LayoutGrid className="w-4 h-4" />
                                            </button>
                                            <div className="w-px h-5 bg-white/20 mx-1" />
                                            <button onClick={goToFirst} disabled={currentPage === 0}
                                                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30" title="First Page">
                                                <ChevronsLeft className="w-4 h-4" />
                                            </button>
                                            <button onClick={prevButton} disabled={currentPage === 0}
                                                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30">
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            <span className="text-white text-xs font-mono px-2 min-w-[55px] text-center">
                                                {currentPage + 1} / {numPages || '--'}
                                            </span>
                                            <button onClick={nextButton} disabled={numPages ? currentPage >= numPages - 1 : true}
                                                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                            <button onClick={goToLast} disabled={numPages ? currentPage >= numPages - 1 : true}
                                                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30" title="Last Page">
                                                <ChevronsRight className="w-4 h-4" />
                                            </button>
                                            <div className="w-px h-5 bg-white/20 mx-1" />
                                            <button onClick={zoomOut} disabled={zoom <= 0.5}
                                                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30" title="Zoom Out">
                                                <ZoomOut className="w-4 h-4" />
                                            </button>
                                            <button onClick={resetZoom}
                                                className="text-white/70 hover:text-white text-[11px] font-mono px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors min-w-[38px] text-center" title="Reset zoom">
                                                {Math.round(zoom * 100)}%
                                            </button>
                                            <button onClick={zoomIn} disabled={zoom >= 3}
                                                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30" title="Zoom In">
                                                <ZoomIn className="w-4 h-4" />
                                            </button>
                                            <div className="w-px h-5 bg-white/20 mx-1" />
                                            <button onClick={toggleFullscreen}
                                                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors" title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
                                                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            /* ─ No PDF available ─ */
                            <section className="bg-white rounded-[2rem] border border-zinc-200 p-10 text-center space-y-4">
                                <div className={`w-14 h-14 ${meta.accentBg} rounded-2xl flex items-center justify-center text-white mx-auto`}>
                                    {meta.icon}
                                </div>
                                <h2 className="text-xl font-bold text-zinc-900">{meta.label} — Coming Soon</h2>
                                <p className="text-zinc-500 text-sm max-w-sm mx-auto">
                                    The {meta.label.toLowerCase()} for this chapter will be available shortly. Check back soon!
                                </p>
                            </section>
                        )}

                        {/* ── Core Concepts (study guide) ── */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-2 border-b border-zinc-200 pb-4">
                                <Info className={`w-5 h-5 ${meta.accentText}`} />
                                <h2 className="text-xl font-bold text-zinc-800">Core Concepts</h2>
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
                                        <h3 className="font-bold text-zinc-900 mb-2 flex items-center gap-2">
                                            <span className="w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center text-xs text-zinc-500">
                                                0{index + 1}
                                            </span>
                                            {item.topic}
                                        </h3>
                                        <p className="text-zinc-600 text-sm leading-relaxed">{item.content}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* ── Key Formulas (always shown; especially useful for notes/formulas) ── */}
                        {chapter.keyFormulas && chapter.keyFormulas.length > 0 && (
                            <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                                    <Hash className={`w-5 h-5 ${meta.accentText}`} />
                                    Key Formulas — {chapter.shortTitle}
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {chapter.keyFormulas.map((f, i) => (
                                        <div key={i} className={`bg-zinc-50 border ${meta.accentBorder} rounded-xl px-5 py-3 font-mono text-sm text-zinc-800`}>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── Exemplar Language Switch (only for 'exemplar') ── */}
                        {rt === 'exemplar' && (chapter.exemplarUrl || chapter.exemplarHindiUrl) && (
                            <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-amber-500" />
                                    Download Exemplar PDF
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {chapter.exemplarUrl && (
                                        <a href={chapter.exemplarUrl} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white text-sm font-bold rounded-2xl hover:bg-amber-600 transition-colors">
                                            <Download className="w-4 h-4" />
                                            Exemplar PDF (English)
                                        </a>
                                    )}
                                    {chapter.exemplarHindiUrl && (
                                        <a href={chapter.exemplarHindiUrl} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-50 border border-amber-300 text-amber-700 text-sm font-bold rounded-2xl hover:bg-amber-100 transition-colors">
                                            <Download className="w-4 h-4" />
                                            Exemplar PDF (Hindi)
                                        </a>
                                    )}
                                </div>
                                <p className="text-sm text-zinc-500">
                                    The NCERT Exemplar contains additional higher-order thinking questions (HOTs) beyond the regular textbook exercises — essential for JEE, NEET, and 90+ board scores.
                                </p>
                            </section>
                        )}

                        {/* ── Exemplar Editorial Content ── */}
                        {rt === 'exemplar' && exemplarContent[chapter.id] && (
                            <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-0">
                                <div className="flex items-center gap-2 border-b border-amber-100 pb-4 mb-6">
                                    <Star className="w-5 h-5 text-amber-500" />
                                    <h2 className="text-xl font-bold text-zinc-800">About the NCERT Exemplar</h2>
                                </div>
                                <div
                                    className="exemplar-prose"
                                    dangerouslySetInnerHTML={{ __html: exemplarContent[chapter.id] }}
                                />
                            </section>
                        )}



                        {/* ── Related Resources strip ── */}
                        <section className="bg-white rounded-[2rem] border border-zinc-200 p-6">
                            <h2 className="text-base font-bold text-zinc-700 mb-4">More Resources for this Chapter</h2>
                            <div className="flex flex-wrap gap-2">
                                {([
                                    { type: 'notes', label: 'Notes' },
                                    { type: 'books', label: 'Book PDF' },
                                    { type: 'exemplar', label: 'Exemplar' },
                                    { type: 'formulas', label: 'Formulas' },
                                ] as { type: ResourceType; label: string }[])
                                    .filter((r) => r.type !== rt)
                                    .map((r) => {
                                        const m = RESOURCE_META[r.type];
                                        return (
                                            <Link
                                                key={r.type}
                                                to={`/chapter/${chapter.id}/${r.type}`}
                                                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border ${m.accentBorder} ${m.accentText} hover:opacity-80 transition-opacity bg-white`}
                                            >
                                                {m.icon}
                                                {r.label}
                                                <ExternalLink className="w-3 h-3 opacity-50" />
                                            </Link>
                                        );
                                    })}
                                <Link
                                    to={`/chapter/${chapter.id}`}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border border-emerald-200 text-emerald-600 hover:opacity-80 transition-opacity bg-white"
                                >
                                    <FileText className="w-3.5 h-3.5" />
                                    Solutions
                                    <ExternalLink className="w-3 h-3 opacity-50" />
                                </Link>
                            </div>
                        </section>

                    </div>

                    <RelatedSidebar
                        currentChapterId={chapter.id}
                        subjectSlug="physics"
                        classLevel="class-12"
                        resourceType={rt}
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
