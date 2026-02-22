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
  ExternalLink,
  Info,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { chapters } from '../data/chapters';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import RelatedSidebar from '../components/RelatedSidebar';

const BookPage = React.forwardRef<HTMLDivElement, { pageNumber: number; width: number }>(
  (props, ref) => {
    return (
      <div className="bg-white shadow-sm h-full w-full flex items-center justify-center overflow-hidden" ref={ref}>
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
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-600" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <h1 className="font-bold text-xl tracking-tight text-zinc-800 hidden sm:block">PhysicsHub</h1>
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
            {/* PDF Preview */}
            <section className="space-y-8">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-emerald-600 w-5 h-5" />
                  <h3 className="text-xl font-bold text-zinc-800">Interactive Book Viewer</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-1">
                    <button 
                      onClick={prevButton}
                      className="p-1 hover:bg-white rounded transition-colors disabled:opacity-30"
                      disabled={currentPage === 0}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-mono px-2 min-w-[60px] text-center">
                      {currentPage + 1} / {numPages || '--'}
                    </span>
                    <button 
                      onClick={nextButton}
                      className="p-1 hover:bg-white rounded transition-colors disabled:opacity-30"
                      disabled={numPages ? currentPage >= numPages - 1 : true}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <a 
                    href={chapter.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-zinc-900 transition-colors"
                    title="Open Original PDF"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="relative bg-zinc-200 rounded-3xl overflow-hidden shadow-2xl border border-zinc-300 min-h-[600px] flex items-center justify-center p-4 md:p-8">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-100/80 backdrop-blur-sm z-10">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
                    <p className="text-zinc-500 font-medium">Loading Interactive Book...</p>
                  </div>
                )}
                
                <div className="w-full h-full flex justify-center">
                  <Document
                    file={proxyPdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={null}
                    className="flex justify-center"
                  >
                    {numPages && (
                      <HTMLFlipBook
                        width={500}
                        height={700}
                        size="stretch"
                        minWidth={315}
                        maxWidth={1000}
                        minHeight={400}
                        maxHeight={1533}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        onFlip={onPage}
                        className="book-container"
                        ref={flipBookRef}
                        startPage={0}
                        drawShadow={true}
                        flippingTime={800}
                        usePortrait={isPortrait}
                        startZIndex={0}
                        autoSize={true}
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
                            width={500} 
                          />
                        ))}
                      </HTMLFlipBook>
                    )}
                  </Document>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6 text-zinc-400 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Click corners to flip</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Swipe on mobile</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Use arrow keys</span>
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
                          <div className="px-6 pb-6 pt-2 border-t border-zinc-100">
                            <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-100">
                              <h5 className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-3">Solution</h5>
                              <p className="text-zinc-700 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                                {sol.solution}
                              </p>
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
            <BookOpen className="w-4 h-4" />
            <span className="font-bold text-sm">PhysicsHub</span>
          </div>
          <p className="text-zinc-400 text-xs">
            Educational resource for NCERT Class 12 Physics. All rights reserved by NCERT for the textbook content.
          </p>
        </div>
      </footer>
    </div>
  );
}
