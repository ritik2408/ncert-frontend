import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ArrowLeft, 
  ChevronRight, 
  Search,
  CheckCircle,
  Zap,
  FlaskConical,
  Calculator,
  Dna,
  Beaker,
  Globe,
  Hash,
  Star,
  Book,
  FileText
} from 'lucide-react';
import { navigationData } from '../data/navigation';

const iconMap: Record<string, any> = {
  Zap, FlaskConical, Calculator, Dna, Beaker, Globe, BookOpen, Hash, Star, Book, FileText
};

import FAQ from '../components/FAQ';

const solutionsFAQs = [
  {
    question: "How accurate are these NCERT solutions?",
    answer: "Our solutions are prepared by subject matter experts and double-checked for accuracy. We ensure that all mathematical steps and conceptual explanations are correct."
  },
  {
    question: "Do you provide solutions for all chapters?",
    answer: "Yes, we provide comprehensive solutions for every chapter in the NCERT textbooks for Classes 10, 11, and 12."
  },
  {
    question: "Are these solutions helpful for Board Exams?",
    answer: "Absolutely! These solutions follow the CBSE marking scheme and provide the ideal way to write answers in exams to score maximum marks."
  }
];

import RelatedSidebar from '../components/RelatedSidebar';
import CollegeDuniaLogo from '../components/CollegeDuniaLogo';

export default function Solutions() {
  const [selectedClass, setSelectedClass] = useState(navigationData[0].level);
  const [searchQuery, setSearchQuery] = useState("");

  const activeClassData = navigationData.find(c => c.level === selectedClass) || navigationData[0];
  
  const filteredSubjects = activeClassData.subjects.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="hidden sm:block text-sm font-medium text-zinc-500">
            NCERT Solutions
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Page Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase tracking-widest">
            <CheckCircle className="w-4 h-4" />
            Step-by-Step Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900">NCERT Solutions</h1>
          <p className="text-lg text-zinc-500 max-w-2xl">
            Comprehensive, accurate, and easy-to-understand solutions for all NCERT textbook questions across classes 10 to 12.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-12">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-wrap gap-2">
                  {navigationData.map((classLevel) => (
                    <button
                      key={classLevel.level}
                      onClick={() => setSelectedClass(classLevel.level)}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        selectedClass === classLevel.level 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100" 
                        : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                      }`}
                    >
                      {classLevel.level}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="Search subject..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64"
                  />
                </div>
              </div>

              <div className="h-px bg-zinc-100 w-full" />

              {/* Subject Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="wait">
                  {filteredSubjects.map((subject, index) => {
                    const Icon = iconMap[subject.icon] || BookOpen;
                    return (
                      <motion.div
                        key={`${selectedClass}-${subject.slug}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={`/${selectedClass.toLowerCase().replace(' ', '-')}/${subject.slug}/solutions`}
                          className="group flex items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-transparent hover:border-emerald-500 hover:bg-white hover:shadow-xl transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-bold text-zinc-900">{subject.name}</h3>
                              <p className="text-xs text-zinc-400 font-medium">Chapter-wise Solutions</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-emerald-50 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Info Section */}
            <section className="grid md:grid-cols-2 gap-12 pt-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-zinc-900">Why use our NCERT Solutions?</h2>
                <p className="text-zinc-500 leading-relaxed">
                  Our solutions are crafted by expert educators to ensure that every concept is explained clearly. We follow the latest CBSE guidelines and marking schemes to help you maximize your scores.
                </p>
                <ul className="space-y-3">
                  {['Detailed step-by-step explanations', 'Accurate mathematical derivations', 'Diagrams and illustrations for better clarity', 'Solved examples and practice questions'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="text-emerald-600 w-3 h-3" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 rounded-3xl p-8 text-white space-y-6">
                <h3 className="text-xl font-bold">Exam Tip</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Don't just memorize the solutions. Try to understand the logic behind each step. This will help you solve similar problems in your exams even if the values are changed.
                </p>
                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-xs text-zinc-500 italic">"Physics is not about formulas, it's about understanding how the world works."</p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <FAQ items={solutionsFAQs} />
          </div>

          <RelatedSidebar 
            classLevel={selectedClass.toLowerCase().replace(' ', '-')}
            resourceType="solutions"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-zinc-400">
          © 2026 Collegedunia. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
