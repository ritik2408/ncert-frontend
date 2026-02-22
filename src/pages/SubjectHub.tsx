import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  GraduationCap, 
  Lightbulb, 
  Target, 
  ArrowLeft,
  CheckCircle,
  FileText,
  Book,
  Star,
  Hash
} from 'lucide-react';
import { chapters } from '../data/chapters';
import { subjectSEOData, getGenericSEOContent } from '../data/seoContent';

import FAQ from '../components/FAQ';

const subjectFAQs = [
  {
    question: "How should I use these resources for exam preparation?",
    answer: "Start with NCERT Books to understand the theory, then use NCERT Solutions to practice questions. Use Notes for quick revision and Exemplar for advanced practice."
  },
  {
    question: "Are these resources sufficient for competitive exams?",
    answer: "These resources provide a very strong foundation for exams like JEE, NEET, and CUET. However, for these competitive exams, you might need additional specialized practice material."
  },
  {
    question: "How often is the content updated?",
    answer: "We update our content as soon as NCERT releases new editions or CBSE announces changes in the syllabus or exam pattern."
  }
];

import RelatedSidebar from '../components/RelatedSidebar';

export default function SubjectHub() {
  const { classLevel, subjectSlug, resourceType } = useParams();
  const [selectedResourceType, setSelectedResourceType] = useState<string | null>(resourceType || null);

  // Sync state with URL parameter if it changes externally
  React.useEffect(() => {
    if (resourceType) {
      setSelectedResourceType(resourceType);
    }
  }, [resourceType]);
  
  // For demo purposes, we'll use the same chapters data for all subjects
  const formattedClass = classLevel?.replace('-', ' ').replace('class', 'Class');
  const formattedSubject = subjectSlug?.charAt(0).toUpperCase() + subjectSlug?.slice(1);

  const resourceOptions = [
    { name: "NCERT Solutions", slug: "solutions", icon: "CheckCircle", color: "bg-emerald-500", lightColor: "bg-emerald-50", description: "Step-by-step textbook solutions" },
    { name: "NCERT Notes", slug: "notes", icon: "FileText", color: "bg-blue-500", lightColor: "bg-blue-50", description: "Concise revision notes" },
    { name: "NCERT Books", slug: "books", icon: "Book", color: "bg-purple-500", lightColor: "bg-purple-50", description: "Digital textbook PDFs" },
    { name: "NCERT Exemplar", slug: "exemplar", icon: "Star", color: "bg-amber-500", lightColor: "bg-amber-50", description: "Advanced practice problems" },
    { name: "Formula Sheets", slug: "formulas", icon: "Hash", color: "bg-rose-500", lightColor: "bg-rose-50", description: "Quick reference formulas" }
  ];

  const iconMap: Record<string, any> = {
    CheckCircle, FileText, Book, Star, Hash
  };

  // Get SEO Content
  const seoContent = subjectSEOData[classLevel || ""]?.[subjectSlug || ""] || getGenericSEOContent(formattedSubject || "Subject", formattedClass || "Class");

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => selectedResourceType ? setSelectedResourceType(null) : window.history.back()}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-600" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <BookOpen className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-900">PhysicsHub</span>
            </div>
          </div>
          <div className="hidden sm:block text-sm font-medium text-zinc-500">
            {formattedClass} • {formattedSubject} {selectedResourceType ? `• ${resourceOptions.find(r => r.slug === selectedResourceType)?.name}` : ''}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <AnimatePresence mode="wait">
          {!selectedResourceType ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="space-y-6">
                <div className="space-y-2">
                  <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">{formattedClass} {formattedSubject}</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
                    Select <span className="text-emerald-600">Resource Type</span>
                  </h2>
                </div>
                <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
                  Choose the type of study material you need for {formattedClass} {formattedSubject}. All resources are updated for the latest session.
                </p>
              </section>

              <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 space-y-12">
                  {/* Resource Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resourceOptions.map((option, index) => {
                      const Icon = iconMap[option.icon];
                      return (
                        <motion.button
                          key={option.slug}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedResourceType(option.slug)}
                          className="group relative p-8 rounded-[2.5rem] border border-zinc-200 bg-white hover:shadow-2xl hover:shadow-zinc-200/50 transition-all overflow-hidden text-left"
                        >
                          <div className="relative z-10 flex items-center gap-6">
                            <div className={`w-16 h-16 ${option.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                              <Icon className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xl font-bold text-zinc-900">{option.name}</h4>
                              <p className="text-zinc-500 text-sm">{option.description}</p>
                            </div>
                            <ChevronRight className="w-6 h-6 text-zinc-300 ml-auto group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${option.lightColor} rounded-full opacity-50 group-hover:scale-150 transition-transform`} />
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Educational Content Section - Only show on selection screen */}
                  <section className="grid md:grid-cols-3 gap-8 pt-12">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                        <Lightbulb className="text-amber-600 w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900">Why Study {formattedSubject}?</h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        {formattedSubject} is a fundamental subject that helps us understand the world around us. It develops critical thinking and problem-solving skills.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                        <Target className="text-blue-600 w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900">Exam Preparation</h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        Our solutions are designed to help you score better in board exams. We focus on conceptual clarity and step-by-step explanations.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                        <BookOpen className="text-emerald-600 w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900">NCERT Alignment</h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        All content is strictly aligned with the latest NCERT curriculum, ensuring you're studying exactly what's required for your syllabus.
                      </p>
                    </div>
                  </section>
                </div>

                <RelatedSidebar 
                  subjectSlug={subjectSlug} 
                  classLevel={classLevel}
                  resourceType={selectedResourceType || 'solutions'}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chapters"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="space-y-6">
                <div className="space-y-2">
                  <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">{formattedClass} {formattedSubject}</span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900 leading-tight">
                    {resourceOptions.find(r => r.slug === selectedResourceType)?.name}
                  </h2>
                </div>
                <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
                  Access chapter-wise {selectedResourceType?.replace('-', ' ')} and simplified study materials for {formattedClass} {formattedSubject}.
                </p>
              </section>

              <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 space-y-12">
                  {/* Chapter Listing */}
                  <section className="space-y-8">
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                      <h2 className="text-2xl font-bold text-zinc-800 flex items-center gap-2">
                        <BookOpen className="text-emerald-600 w-6 h-6" />
                        Chapter-wise List
                      </h2>
                      <span className="text-zinc-400 text-sm font-medium">{chapters.length} Chapters Available</span>
                    </div>
                    
                    <div className="grid gap-4">
                      {chapters.map((chapter, index) => (
                        <motion.div
                          key={chapter.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link 
                            to={`/chapter/${chapter.id}`}
                            className="group block bg-white border border-zinc-200 p-6 rounded-2xl hover:border-emerald-500 hover:shadow-lg transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h3 className="text-xl font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">
                                  {chapter.title}
                                </h3>
                                <p className="text-zinc-500 text-sm line-clamp-1 max-w-2xl">
                                  {chapter.description}
                                </p>
                              </div>
                              <div className="bg-zinc-50 p-3 rounded-full group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                <ChevronRight className="w-5 h-5" />
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  {/* SEO Content Section */}
                  <section className="bg-white rounded-[2.5rem] border border-zinc-200 p-8 md:p-12 space-y-12 overflow-hidden relative">
                    <div className="relative z-10 space-y-10">
                      <div className="space-y-4">
                        <h2 className="text-3xl font-serif font-bold text-zinc-900">
                          Mastering {formattedClass} {formattedSubject}: Complete Study Guide
                        </h2>
                        <p className="text-zinc-600 leading-relaxed">
                          {seoContent.overview}
                        </p>
                      </div>

                      {/* CBSE Weightage Section */}
                      {seoContent.weightage && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-zinc-900 font-bold text-xl">
                            <Hash className="w-6 h-6 text-emerald-600" />
                            CBSE Board Exam Weightage
                          </div>
                          <div className="overflow-hidden border border-zinc-100 rounded-2xl">
                            <table className="w-full text-sm text-left">
                              <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider">
                                <tr>
                                  <th className="px-6 py-4">Unit Name</th>
                                  <th className="px-6 py-4 text-right">Marks</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-100">
                                {seoContent.weightage.map((item, i) => (
                                  <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                                    <td className="px-6 py-4 text-zinc-700 font-medium">{item.unit}</td>
                                    <td className="px-6 py-4 text-right text-emerald-600 font-bold">{item.marks}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Detailed Chapter Insights */}
                      {seoContent.chapterDetails && (
                        <div className="space-y-8">
                          <div className="flex items-center gap-3 text-zinc-900 font-bold text-xl">
                            <BookOpen className="w-6 h-6 text-emerald-600" />
                            Detailed Chapter Insights
                          </div>
                          <div className="grid gap-6">
                            {seoContent.chapterDetails.map((detail, i) => (
                              <div key={i} className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 space-y-4">
                                <h4 className="text-lg font-bold text-zinc-900">{detail.title}</h4>
                                <p className="text-sm text-zinc-600 leading-relaxed">{detail.description}</p>
                                <div className="flex flex-wrap gap-2">
                                  {detail.topics.map((topic, j) => (
                                    <span key={j} className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-emerald-600 font-bold">
                            <Target className="w-5 h-5" />
                            Important Topics to Focus On
                          </div>
                          <ul className="space-y-3">
                            {seoContent.importantTopics.map((topic, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-blue-600 font-bold">
                            <Lightbulb className="w-5 h-5" />
                            Effective Study Tips
                          </div>
                          <ul className="space-y-3">
                            {seoContent.studyTips.map((tip, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100">
                        <h3 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                          <GraduationCap className="text-emerald-600 w-6 h-6" />
                          Exam Preparation Strategy
                        </h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                          {seoContent.examStrategy}
                        </p>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full -ml-32 -mb-32" />
                  </section>
                </div>

                <RelatedSidebar 
                  subjectSlug={subjectSlug} 
                  classLevel={classLevel}
                  resourceType={selectedResourceType || 'solutions'}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ Section */}
        <FAQ items={subjectFAQs} />
      </main>
    </div>
  );
}
