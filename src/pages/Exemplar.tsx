import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ArrowLeft, 
  ChevronRight, 
  Search,
  Star,
  Zap,
  FlaskConical,
  Calculator,
  Dna,
  Beaker,
  Globe,
  Hash,
  Book,
  FileText
} from 'lucide-react';
import { navigationData } from '../data/navigation';

const iconMap: Record<string, any> = {
  Zap, FlaskConical, Calculator, Dna, Beaker, Globe, BookOpen, Hash, Star, Book, FileText
};

import FAQ from '../components/FAQ';

const exemplarFAQs = [
  {
    question: "What is the difference between NCERT and NCERT Exemplar?",
    answer: "NCERT textbooks cover the basic syllabus, while NCERT Exemplar provides higher-level problems (HOTS) to test deeper understanding and prepare for competitive exams like JEE and NEET."
  },
  {
    question: "Should I solve Exemplar before NCERT?",
    answer: "It is recommended to first master the concepts in the NCERT textbook and then move to Exemplar problems for advanced practice."
  },
  {
    question: "Are Exemplar questions asked in Board Exams?",
    answer: "Yes, many challenging questions in Board Exams are often inspired by or directly taken from the NCERT Exemplar books."
  }
];

import RelatedSidebar from '../components/RelatedSidebar';

export default function Exemplar() {
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
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-900">PhysicsHub</span>
            </div>
          </div>
          <div className="hidden sm:block text-sm font-medium text-zinc-500">
            NCERT Exemplar
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Page Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm uppercase tracking-widest">
            <Star className="w-4 h-4" />
            Advanced Practice
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900">NCERT Exemplar</h1>
          <p className="text-lg text-zinc-500 max-w-2xl">
            Higher-order thinking questions and exemplar solutions to challenge your understanding.
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
                        ? "bg-amber-600 text-white shadow-lg shadow-amber-100" 
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
                    className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none w-full md:w-64"
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
                          to={`/${selectedClass.toLowerCase().replace(' ', '-')}/${subject.slug}/exemplar`}
                          className="group flex items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-transparent hover:border-amber-500 hover:bg-white hover:shadow-xl transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-bold text-zinc-900">{subject.name}</h3>
                              <p className="text-xs text-zinc-400 font-medium">Exemplar Solutions</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-amber-50 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* FAQ Section */}
            <FAQ items={exemplarFAQs} />
          </div>

          <RelatedSidebar 
            classLevel={selectedClass.toLowerCase().replace(' ', '-')}
            resourceType="exemplar"
          />
        </div>
      </main>
    </div>
  );
}
