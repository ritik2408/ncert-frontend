import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ArrowLeft, 
  ChevronRight, 
  Search,
  FileText,
  Zap,
  FlaskConical,
  Calculator,
  Dna,
  Beaker,
  Globe,
  Hash,
  Star,
  Book
} from 'lucide-react';
import { navigationData } from '../data/navigation';

const iconMap: Record<string, any> = {
  Zap, FlaskConical, Calculator, Dna, Beaker, Globe, BookOpen, Hash, Star, Book, FileText
};

import FAQ from '../components/FAQ';

const notesFAQs = [
  {
    question: "Are these notes enough for revision?",
    answer: "Yes, our notes are designed specifically for quick revision. They cover all key concepts, formulas, and important points from each chapter."
  },
  {
    question: "Who prepares these notes?",
    answer: "The notes are prepared by experienced teachers who understand the exam patterns and know which topics are most important for students."
  },
  {
    question: "Are there any diagrams included in the notes?",
    answer: "Yes, we include simplified diagrams and flowcharts wherever necessary to help you visualize and remember complex concepts better."
  }
];

import RelatedSidebar from '../components/RelatedSidebar';
import CollegeDuniaLogo from '../components/CollegeDuniaLogo';

export default function Notes() {
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
            NCERT Notes
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Page Title */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
            <FileText className="w-4 h-4" />
            Quick Revision
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900">NCERT Notes</h1>
          <p className="text-lg text-zinc-500 max-w-2xl">
            Concise and high-quality revision notes for all subjects to help you grasp complex topics quickly.
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
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100" 
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
                    className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64"
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
                          to={`/${selectedClass.toLowerCase().replace(' ', '-')}/${subject.slug}/notes`}
                          className="group flex items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-transparent hover:border-blue-500 hover:bg-white hover:shadow-xl transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-bold text-zinc-900">{subject.name}</h3>
                              <p className="text-xs text-zinc-400 font-medium">Chapter-wise Notes</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-blue-50 group-hover:translate-x-1 transition-all" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* FAQ Section */}
            <FAQ items={notesFAQs} />
          </div>

          <RelatedSidebar 
            classLevel={selectedClass.toLowerCase().replace(' ', '-')}
            resourceType="notes"
          />
        </div>
      </main>
    </div>
  );
}
