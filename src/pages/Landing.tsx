import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  GraduationCap, 
  Search, 
  Zap, 
  FlaskConical, 
  Calculator, 
  Dna, 
  Beaker, 
  Globe,
  CheckCircle,
  FileText,
  Book,
  Star,
  Hash,
  ArrowRight
} from 'lucide-react';
import { navigationData, resourceTypes } from '../data/navigation';

const iconMap: Record<string, any> = {
  Zap, FlaskConical, Calculator, Dna, Beaker, Globe, CheckCircle, FileText, Book, Star, Hash
};

import FAQ from '../components/FAQ';

const landingFAQs = [
  {
    question: "What is PhysicsHub?",
    answer: "PhysicsHub is a comprehensive educational platform providing NCERT solutions, notes, books, and exemplar problems for students from Class 10 to 12."
  },
  {
    question: "Are the solutions updated for the current session?",
    answer: "Yes, all our NCERT solutions and study materials are updated regularly to align with the latest CBSE curriculum and NCERT textbooks."
  },
  {
    question: "Is the content free to access?",
    answer: "Most of our study materials, including NCERT solutions and notes, are completely free to access for all students."
  },
  {
    question: "Can I download the notes as PDF?",
    answer: "Currently, you can view all notes online. We are working on adding a PDF download feature very soon."
  }
];

export default function Landing() {
  const [selectedClass, setSelectedClass] = useState(navigationData[0].level);
  const [showAll, setShowAll] = useState(false);

  const activeClassData = navigationData.find(c => c.level === selectedClass) || navigationData[0];
  
  // Initial subjects to show (8 subjects = 2 rows of 4)
  const displayedSubjects = showAll ? activeClassData.subjects : activeClassData.subjects.slice(0, 8);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900">PhysicsHub</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-4 text-sm font-medium text-zinc-600">
              <Link to="/solutions" className="hover:text-emerald-600 transition-colors">Solutions</Link>
              <Link to="/notes" className="hover:text-emerald-600 transition-colors">Notes</Link>
              <Link to="/exemplar" className="hover:text-emerald-600 transition-colors">Exemplar</Link>
            </nav>
            <div className="h-4 w-px bg-zinc-200" />
            <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-zinc-200 py-24">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Updated for 2025-26 Session
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-zinc-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
              Your Ultimate <span className="text-emerald-600 italic">NCERT</span> Resource Portal
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              From detailed solutions to interactive book previews, we provide everything you need to excel in your academics.
            </p>
          </div>
          
          {/* Bigger Resource Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {resourceTypes.map((type, index) => {
              const Icon = iconMap[type.icon];
              
              // Map slugs to routes
              const routeMap: Record<string, string> = {
                'solutions': '/solutions',
                'notes': '/notes',
                'exemplar': '/exemplar'
              };
              
              const targetRoute = routeMap[type.slug];
              
              const TileWrapper = ({ children }: { children: React.ReactNode }) => 
                targetRoute ? <Link to={targetRoute}>{children}</Link> : <div>{children}</div>;

              return (
                <motion.div 
                  key={type.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <TileWrapper>
                    <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all cursor-pointer flex flex-col items-center text-center gap-4 h-full">
                      <div className={`w-16 h-16 rounded-2xl ${type.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-bold text-zinc-800 leading-tight">{type.name}</span>
                    </div>
                  </TileWrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-50" />
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-20 space-y-24">
        {/* Class-wise Navigation */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-zinc-900">Explore by Class</h2>
            
            {/* Class Filter Tiles */}
            <div className="flex justify-center gap-3">
              {navigationData.map((classLevel) => (
                <button
                  key={classLevel.level}
                  onClick={() => {
                    setSelectedClass(classLevel.level);
                    setShowAll(false);
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedClass === classLevel.level 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105" 
                    : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  {classLevel.level}
                </button>
              ))}
            </div>
          </div>
          
          {/* Dynamic Subject Grid */}
          <div className="relative min-h-[300px] space-y-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedClass + showAll}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {displayedSubjects.map((subject) => {
                  const Icon = iconMap[subject.icon] || BookOpen;
                  return (
                    <Link
                      key={subject.slug}
                      to={`/${selectedClass.toLowerCase().replace(' ', '-')}/${subject.slug}`}
                      className="group relative p-8 rounded-[2.5rem] border border-zinc-200 bg-white hover:shadow-2xl hover:shadow-zinc-200/50 transition-all overflow-hidden"
                    >
                      <div className="relative z-10 space-y-6">
                        <div className={`w-14 h-14 ${subject.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xl font-bold text-zinc-900">{subject.name}</h4>
                          <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Resources Available</p>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm group-hover:gap-3 transition-all">
                          Explore Now
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                      
                      {/* Colorful Background Accent */}
                      <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${subject.lightColor} rounded-full opacity-50 group-hover:scale-150 transition-transform`} />
                    </Link>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* View All Button */}
            {activeClassData.subjects.length > 8 && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 px-8 py-3 bg-white border border-zinc-200 rounded-2xl text-sm font-bold text-zinc-600 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                >
                  {showAll ? "Show Less" : "View All Subjects"}
                  <ChevronRight className={`w-4 h-4 transition-transform ${showAll ? "rotate-90" : ""}`} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-zinc-900 rounded-[3rem] p-8 md:p-20 text-white overflow-hidden relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                Why students <span className="text-emerald-400 italic underline decoration-emerald-400/30 underline-offset-8">love</span> our platform
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="text-emerald-400 w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl">Verified Solutions</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">Step-by-step solutions verified by subject matter experts for accuracy.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                    <Book className="text-blue-400 w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl">Book Viewer</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">Read books with our unique flip-book viewer for an immersive experience.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                    <Star className="text-purple-400 w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl">Quick Notes</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">Concise, high-quality notes designed for quick revision before exams.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                    <Hash className="text-amber-400 w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-xl">Formula Sheets</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">All important formulas and derivations in one scannable place.</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full border border-white/10 flex items-center justify-center p-16">
                <div className="w-full h-full bg-zinc-800 rounded-full border border-white/5 shadow-2xl flex items-center justify-center relative">
                  <BookOpen className="w-40 h-40 text-emerald-500/20" />
                  <div className="absolute top-1/4 -left-10 bg-white text-zinc-900 p-4 rounded-2xl shadow-2xl rotate-[-12deg] border border-zinc-200">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Live Preview</span>
                    </div>
                    <p className="text-xs font-bold">Class 12 Physics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
        </section>
        {/* FAQ Section */}
        <FAQ items={landingFAQs} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-900">PhysicsHub</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Empowering students with high-quality NCERT resources and interactive learning tools.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-zinc-900 mb-4">Resources</h5>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">NCERT Solutions</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">NCERT Books</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Exemplar Solutions</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Revision Notes</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-zinc-900 mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Class 12 Physics</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Class 11 Chemistry</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Class 10 Science</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Formula Sheets</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-zinc-900 mb-4">Connect</h5>
            <p className="text-sm text-zinc-500 mb-4">Subscribe to get latest updates on NCERT curriculum.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-zinc-100 border-none rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-emerald-500" />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-12 mt-12 border-t border-zinc-100 text-center text-xs text-zinc-400">
          © 2026 PhysicsHub. All rights reserved. NCERT content is property of NCERT.
        </div>
      </footer>
    </div>
  );
}
