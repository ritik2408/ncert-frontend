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
import CollegeDuniaLogo from '../components/CollegeDuniaLogo';

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
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => selectedResourceType ? setSelectedResourceType(null) : window.history.back()}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-600" />
            </button>
            <div className="flex items-center gap-2">
              <CollegeDuniaLogo />
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

                  {/* Physics Homepage Content - only for Class 12 Physics */}
                  {classLevel === 'class-12' && subjectSlug === 'physics' && (
                    <div className="space-y-12 pt-4">

                      {/* Intro */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                        <p className="text-zinc-700 leading-relaxed text-sm">
                          <strong>The 12th physics subject carries 70 marks in theory and 30 in practicals in the Class 12 board exam.</strong> In competitive examinations, such as for <strong>JEE Main and NEET, Class 12</strong> physics constitutes almost <strong>one-third of the entire questions.</strong>
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3 text-sm text-zinc-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                            <span><strong>According to the most recent CBSE curriculum, the NCERT Class 12 Physics curriculum comes in 9 core units with 14 chapters.</strong></span>
                          </li>
                          <li className="flex items-start gap-3 text-sm text-zinc-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                            Electrostatics, Current Electricity, Magnetism, Optics, Modern Physics, and Semiconductor Electricity are some of the high weightage chapters from Class 12 Physics.
                          </li>
                        </ul>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                          To help students get 95 or more marks and enhance their clarity of concepts, this portal gives full accessibility to chapter-by-chapter NCERT Solutions, Chapter Notes, Book PDF, Exemplar Solutions, Formula sheets and Sample papers.
                        </p>
                        <div className="rounded-2xl overflow-hidden border border-zinc-100">
                          <img
                            src="https://image-static.collegedunia.com/public/image/1i_947f9816a0d5b036c4e7acb8c51b0f98.png?tr=w-1200,h-675,c-force"
                            alt="NCERT Class 12 Physics Overview"
                            className="w-full object-cover"
                          />
                        </div>
                      </section>

                      {/* Chapter-wise Weightage */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4 space-y-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <Hash className="w-6 h-6 text-emerald-600" />
                            NCERT Class 12 Physics: Chapter Wise Weightage
                          </h2>
                          <ul className="space-y-2">
                            {[
                              <><strong>Optics chapter has the highest weightage of 14 marks</strong>, including ray optics and wave optics.</>,
                              <>Electricity and Magnetism units like <strong>Electrostatics, Current Electricity, Magnetism, and EMI together cover around 7-8 marks each.</strong></>,
                              <><strong>Modern Physics and theory-based chapters such as Atoms, Nuclei, Electronic Devices, and Communication Systems, have around 6 marks</strong> but these are comparatively easier and high scoring marks chapters.</>,
                            ].map((point, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="overflow-hidden border-t border-zinc-100">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                              <tr>
                                <th className="px-6 py-4">Unit Name</th>
                                <th className="px-6 py-4 text-right">Marks Weightage</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {[
                                { unit: 'Electrostatics', marks: '8 Marks' },
                                { unit: 'Current Electricity', marks: '7 Marks' },
                                { unit: 'Magnetic Effects of Current & Magnetism', marks: '8 Marks' },
                                { unit: 'Electromagnetic Induction & Alternating Current', marks: '8 Marks' },
                                { unit: 'Optics (Ray + Wave Optics)', marks: '14 Marks' },
                                { unit: 'Dual Nature of Radiation & Matter', marks: '6 Marks' },
                                { unit: 'Atoms & Nuclei', marks: '6 Marks' },
                                { unit: 'Electronic Devices', marks: '7 Marks' },
                                { unit: 'Communication Systems', marks: '6 Marks' },
                              ].map((row, i) => (
                                <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                                  <td className="px-6 py-3.5 text-zinc-700 font-medium">{row.unit}</td>
                                  <td className="px-6 py-3.5 text-right text-emerald-600 font-bold">{row.marks}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="p-6 border-t border-zinc-100">
                          <div className="rounded-2xl overflow-hidden">
                            <img
                              src="https://image-static.collegedunia.com/public/image/2i_847422fc2ad7e550b956d0e08d0e5d90.png?tr=w-1200,h-716,c-force"
                              alt="Class 12 Physics Chapter Weightage Chart"
                              className="w-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="px-8 pb-6">
                          <a
                            href="https://cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/Physics_SrSec_2025-26.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Download CBSE Class 12 Physics Syllabus 2025-2026 PDF
                          </a>
                        </div>
                      </section>

                      {/* NCERT Solutions */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4 space-y-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                            Class 12 Physics NCERT Solutions
                          </h2>
                          <ul className="space-y-2">
                            {[
                              'Class 12 Physics NCERT Solutions has the latest CBSE recommended syllabus either for exercises or in textual questions.',
                              'Numerical responses with step-by-step derivations in an easy to read format as required in a board examination.',
                              'Explanations based on concepts in line with the CBSE marking scheme to assist in increasing the accuracy and scoring possibilities.',
                            ].map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="overflow-hidden border-t border-zinc-100">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                              <tr>
                                <th className="px-6 py-4">Chapter Name</th>
                                <th className="px-6 py-4 text-right">NCERT Solution</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {[
                                { num: 1, name: 'Electric Charges and Fields' },
                                { num: 2, name: 'Electrostatic Potential and Capacitance' },
                                { num: 3, name: 'Current Electricity' },
                                { num: 4, name: 'Moving Charges and Magnetism' },
                                { num: 5, name: 'Magnetism and Matter' },
                                { num: 6, name: 'Electromagnetic Induction' },
                                { num: 7, name: 'Alternating Current' },
                                { num: 8, name: 'Electromagnetic Waves' },
                                { num: 9, name: 'Ray Optics and Optical Instruments' },
                                { num: 10, name: 'Wave Optics' },
                                { num: 11, name: 'Dual Nature of Radiation and Matter' },
                                { num: 12, name: 'Atoms' },
                                { num: 13, name: 'Nuclei' },
                                { num: 14, name: 'Semiconductor Electronics' },
                              ].map((ch) => (
                                <tr key={ch.num} className="hover:bg-zinc-50/50 transition-colors">
                                  <td className="px-6 py-3.5 text-zinc-700 font-medium">Chapter {ch.num} – {ch.name}</td>
                                  <td className="px-6 py-3.5 text-right">
                                    <Link to={`/chapter/${ch.num}`} className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                                      Check Solutions →
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </section>

                      {/* Class 12 Physics Notes */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4 space-y-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <FileText className="w-6 h-6 text-blue-600" />
                            Class 12 Physics Notes
                          </h2>
                          <ul className="space-y-2">
                            {[
                              'Short and test based Class 12 Physics Notes concerning all the chapters, beginning with Electrostatics and progressing to Semiconductor Electronics.',
                              'Relevant definitions, laws, derivations and diagrams in easy language to revise at a short notice.',
                              'Chapter wise summary of higher weightage topics commonly asked in board examinations.',
                            ].map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="overflow-hidden border-t border-zinc-100">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                              <tr>
                                <th className="px-6 py-4">Unit No.</th>
                                <th className="px-6 py-4">Unit</th>
                                <th className="px-6 py-4">Chapters</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {[
                                {
                                  num: 'I', unit: 'Electrostatics', chapters: [
                                    { name: 'Electric Charges and Fields', href: 'https://collegedunia.com/exams/electric-charges-and-fields-properties-flux-dipole-and-coulombs-law-physics-articleid-8' },
                                    { name: 'Electrostatic Potential and Capacitance', href: 'https://collegedunia.com/exams/electrostatic-potential-and-capacitance-introduction-and-derivation-physics-articleid-24' },
                                  ]
                                },
                                {
                                  num: 'II', unit: 'Current Electricity', chapters: [
                                    { name: 'Current Electricity', href: 'https://collegedunia.com/exams/current-electricity-definition-types-and-facts-physics-articleid-43' },
                                  ]
                                },
                                {
                                  num: 'III', unit: 'Magnetic Effects of Current and Magnetism', chapters: [
                                    { name: 'Moving Charges and Magnetism', href: 'https://collegedunia.com/exams/moving-charges-and-magnetism-force-fields-laws-and-formula-physics-articleid-106' },
                                    { name: 'Magnetism and Matter', href: 'https://collegedunia.com/exams/magnetism-and-matter-magnetic-properties-of-matter-physics-articleid-37' },
                                  ]
                                },
                                {
                                  num: 'IV', unit: 'Electromagnetic Induction and Alternating Currents', chapters: [
                                    { name: 'Electromagnetic Induction', href: 'https://collegedunia.com/exams/electromagnetic-induction-faradays-law-of-induction-physics-articleid-36' },
                                    { name: 'Alternating Currents', href: 'https://collegedunia.com/exams/alternating-current-definition-lcr-circuits-and-explanation-physics-articleid-72' },
                                  ]
                                },
                                {
                                  num: 'V', unit: 'Electromagnetic Waves', chapters: [
                                    { name: 'Electromagnetic Waves', href: 'https://collegedunia.com/exams/electromagnetic-waves-graphical-representation-equation-and-applications-physics-articleid-93' },
                                  ]
                                },
                                {
                                  num: 'VI', unit: 'Optics', chapters: [
                                    { name: 'Ray Optics and Optical Instruments', href: 'https://collegedunia.com/exams/ray-optics-and-optical-instruments-definition-and-explanation-physics-articleid-59' },
                                    { name: 'Wave Optics', href: 'https://collegedunia.com/exams/wave-optics-maxwells-electromagnetic-wave-theory-superposition-of-waves-physics-articleid-62' },
                                  ]
                                },
                                {
                                  num: 'VII', unit: 'Dual Nature of Radiation and Matter', chapters: [
                                    { name: 'Dual Nature of Radiation and Matter', href: 'https://collegedunia.com/exams/dual-nature-of-radiation-and-matter-definition-and-explanation-physics-articleid-107' },
                                  ]
                                },
                                {
                                  num: 'VIII', unit: 'Atoms and Nuclei', chapters: [
                                    { name: 'Atoms', href: 'https://collegedunia.com/exams/atoms-thomsons-atomic-model-rutherfords-model-and-atomic-spectra-physics-articleid-82' },
                                    { name: 'Nuclei', href: 'https://collegedunia.com/exams/nuclei-atomic-force-atomic-fission-and-radioactivity-physics-articleid-100' },
                                  ]
                                },
                                {
                                  num: 'IX', unit: 'Semiconductor Electronic Devices', chapters: [
                                    { name: 'Semiconductor Electronics: Materials, Devices and Simple Circuits', href: 'https://collegedunia.com/exams/semiconductor-electronics-materials-devices-and-simple-circuits-physics-articleid-97' },
                                  ]
                                },
                              ].map((row, i) => (
                                <tr key={i} className="hover:bg-zinc-50/50 transition-colors align-top">
                                  <td className="px-6 py-3.5 text-zinc-500 font-bold">{row.num}</td>
                                  <td className="px-6 py-3.5 text-zinc-700 font-medium">{row.unit}</td>
                                  <td className="px-6 py-3.5">
                                    <div className="flex flex-col gap-1">
                                      {row.chapters.map((ch, j) => (
                                        <a key={j} href={ch.href} target="_blank" rel="noopener noreferrer"
                                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors">
                                          {ch.name}
                                        </a>
                                      ))}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="p-6 border-t border-zinc-100">
                          <a
                            href="https://collegedunia.com/exams/cbse-class-xii/physics"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-800 transition-colors"
                          >
                            <span className="text-rose-600 font-bold">Read More:</span>
                            CBSE Class 12 Physics Notes: Chapterwise Formulas, Derivations &amp; NCERT Solutions PDF →
                          </a>
                        </div>
                      </section>

                      {/* NCERT Book PDF */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4 space-y-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <Book className="w-6 h-6 text-purple-600" />
                            Class 12 Physics NCERT Book PDF
                          </h2>
                          <ul className="space-y-2">
                            {[
                              <span key={0}>Availability of the most recent <strong>Class 12 Physics NCERT Book PDF</strong> as prescribed by CBSE for the current academic session.</span>,
                              'Complete study of chapter-wise downloadable PDFs with the option of revision even in offline mode.',
                              'New materials that are directly related to the official CBSE syllabus.',
                            ].map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="overflow-hidden border-t border-zinc-100">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                              <tr>
                                <th className="px-6 py-4" colSpan={2}>Physics NCERT Class 12 PDF Part 1</th>
                                <th className="px-6 py-4" colSpan={2}>Physics NCERT Class 12 PDF Part 2</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {[
                                { c1: 'Chapter 1', l1: 'https://images.collegedunia.com/public/image/Physics_Chapter_1_bdc470cad894c41c4e8b5a60a1b6d6be.pdf', c2: 'Chapter 9', l2: 'https://images.collegedunia.com/public/image/Physics_Chapter_9_89c30ab4744be91014ea7d536c765989.pdf' },
                                { c1: 'Chapter 2', l1: 'https://images.collegedunia.com/public/image/Physics_Chapter_2_19b5ba47bdd010b60f7d0b91f859cae2.pdf', c2: 'Chapter 10', l2: 'https://images.collegedunia.com/public/image/Physics_Chapter_10_ce8f9cfa6f332ebbde2e9e337b863664.pdf' },
                                { c1: 'Chapter 3', l1: 'https://images.collegedunia.com/public/image/Physics_Chapter_3_d607969298eb59e2e8f2b25285e565e8.pdf', c2: 'Chapter 11', l2: 'https://images.collegedunia.com/public/image/Physics_Chapter_11_6a4da8b7d8220fe375ab991657703a1d.pdf' },
                                { c1: 'Chapter 4', l1: 'https://images.collegedunia.com/public/image/Physics_Chapter_4_23577e38b2ae54e90a023390735475ac.pdf', c2: 'Chapter 12', l2: 'https://images.collegedunia.com/public/image/Physics_Chapter_12_72faee0e7782ccf9767417df37b2a7ba.pdf' },
                                { c1: 'Chapter 5', l1: 'https://images.collegedunia.com/public/image/Physics_Chapter_5_d2c47f17d2a603f3239d50721635bf3f.pdf', c2: 'Chapter 13', l2: 'https://images.collegedunia.com/public/image/Physics_Chapter_13_c1fd707476178bc2136e269315d06821.pdf' },
                                { c1: 'Chapter 6', l1: 'https://images.collegedunia.com/public/image/Physics_Chapter_6_dc45b4ed4f96b383f51c9d15ffc902bb.pdf', c2: 'Chapter 14', l2: 'https://images.collegedunia.com/public/image/Physics_Chapter_14_82868be35c810693eddab86902ff58fc.pdf' },
                                { c1: 'Chapter 7', l1: 'https://images.collegedunia.com/public/image/Physics_Chapter_7_dc10cf1268ec8470147bd7978e4c6839.pdf', c2: '—', l2: '' },
                                { c1: 'Chapter 8', l1: 'https://images.collegedunia.com/public/image/Physics_Chapter_8_042af921715db7a8ad530fb4dd3308d1.pdf', c2: '—', l2: '' },
                              ].map((row, i) => (
                                <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                                  <td className="px-6 py-3.5 text-zinc-700 font-medium">{row.c1}</td>
                                  <td className="px-6 py-3.5">
                                    <a href={row.l1} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline">Download NCERT Book →</a>
                                  </td>
                                  <td className="px-6 py-3.5 text-zinc-700 font-medium">{row.c2}</td>
                                  <td className="px-6 py-3.5">
                                    {row.l2 ? <a href={row.l2} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline">Download NCERT Book →</a> : <span className="text-zinc-300">—</span>}
                                  </td>
                                </tr>
                              ))}
                              <tr className="bg-zinc-50">
                                <td colSpan={2} className="px-6 py-3.5 font-bold text-zinc-700 text-xs uppercase tracking-wider">NCERT Physics Book Part 1 Answers</td>
                                <td colSpan={2} className="px-6 py-3.5">
                                  <a href="https://images.collegedunia.com/public/image/Physics_NCERT_Part_1_Answers_11899199ee6869af0473b29f1298b757.pdf" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline">Download Answers →</a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="p-6 border-t border-zinc-100">
                          <a href="https://collegedunia.com/exams/ncert-class-12-physics-book-pdf-articleid-6458" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-800 transition-colors">
                            <span className="font-bold">Read More:</span>
                            NCERT Book for Class 12 Physics Chapter-wise PDFs in Hindi →
                          </a>
                        </div>
                      </section>

                      {/* Exemplar PDF + Solutions + Formulas */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                            <Star className="w-5 h-5 text-amber-500" />
                            Class 12 Physics NCERT Exemplar
                          </h2>
                          <ul className="space-y-2">
                            {[
                              <span key={0}>Chapter-wise access to the official <strong>Class 12 Physics NCERT Exemplar PDF</strong> for advanced practice.</span>,
                              'More challenging conceptual-level questions meant to assess your understanding.',
                              'Available downloadable PDFs applicable in systematic self-studying and revising.',
                            ].map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                          <button className="w-full py-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 font-bold text-sm hover:bg-amber-100 transition-colors">
                            Check Physics Exemplar PDF →
                          </button>
                        </section>

                        <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                            <Star className="w-5 h-5 text-amber-500" />
                            NCERT Exemplar Solutions
                          </h2>
                          <ul className="space-y-2">
                            {[
                              'Detailed Class 12 Physics NCERT exercises (MCQs, Short answer, and long answer questions).',
                              'Explains the numerical problems at an advanced level and enhances conceptual clarity.',
                              'Application-based tests for board exams and competitive exams such as JEE Main and NEET.',
                            ].map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                                {p}
                              </li>
                            ))}
                          </ul>
                          <button className="w-full py-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 font-bold text-sm hover:bg-amber-100 transition-colors">
                            Check Physics Exemplar Solutions →
                          </button>
                        </section>
                      </div>

                      {/* Formula Sheet */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                        <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                          <Hash className="w-6 h-6 text-rose-500" />
                          Class 12 Physics Formula Sheet
                        </h2>
                        <ul className="space-y-2">
                          {[
                            <span key={0}>Chapter-wise <strong>Class 12 Physics Formula Sheets</strong> covering all important equations and constants.</span>,
                            'Arranged equations of some of the essential units such as Electrostatics, Optics and Modern Physics to be memorized as quick formulas.',
                            'Condensed revision notes that can be used to prepare exams at the last minute.',
                          ].map((p, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href="https://collegedunia.com/exams/physics-formulas-science-articleid-7798"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 font-bold text-sm hover:bg-rose-100 transition-colors"
                        >
                          Physics Formulas: Basic Formulas of Physics with Examples →
                        </a>
                      </section>

                      {/* Sample Papers */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4 space-y-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <FileText className="w-6 h-6 text-zinc-600" />
                            Class 12 Physics Sample Papers
                          </h2>
                          <ul className="space-y-2">
                            {[
                              <span key={0}>Latest pattern-based <strong>Class 12 Physics Sample Papers</strong> designed according to CBSE board guidelines.</span>,
                              'Case-study based questions and internal choice formats reflecting the actual exam structure.',
                              'Fully solved papers with marking scheme to enhance the presentation skills.',
                            ].map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="overflow-hidden border-t border-zinc-100">
                          <div className="grid grid-cols-3 gap-0 divide-y divide-zinc-100">
                            {[
                              { year: 2026, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2026' },
                              { year: 2025, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2025' },
                              { year: 2024, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2024' },
                              { year: 2023, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2023' },
                              { year: 2022, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2022' },
                              { year: 2021, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2021' },
                              { year: 2020, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2020' },
                              { year: 2019, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2019' },
                              { year: 2018, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2018' },
                              { year: 2017, href: 'http://collegedunia.com/exams/cbse-class-xii/question-paper-2017' },
                              { year: 2016, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2016' },
                              { year: 2015, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2015' },
                              { year: 2014, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2014' },
                              { year: 2013, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2013' },
                              { year: 2012, href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2012' },
                            ].map((sp) => (
                              <a
                                key={sp.year}
                                href={sp.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center py-4 text-sm font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-800 transition-colors border-r border-zinc-100 last:border-r-0"
                              >
                                Physics Sample Paper {sp.year}
                              </a>
                            ))}
                          </div>
                        </div>
                      </section>

                    </div>
                  )}
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
                  {selectedResourceType === 'formulas' ? (
                    /* Formula Sheets: rich grid with key formulas inline */
                    <section className="space-y-8">
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                        <h2 className="text-2xl font-bold text-zinc-800 flex items-center gap-2">
                          <Hash className="text-rose-500 w-6 h-6" />
                          Chapter-wise Formula Sheets
                        </h2>
                        <span className="text-zinc-400 text-sm font-medium">{chapters.length} Chapters</span>
                      </div>

                      <div className="grid gap-5">
                        {chapters.map((chapter, index) => (
                          <motion.div
                            key={chapter.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06 }}
                          >
                            <Link
                              to={`/chapter/${chapter.id}`}
                              className="group block bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-rose-300 hover:shadow-lg transition-all"
                            >
                              {/* card header */}
                              <div className="flex items-start gap-5 p-6">
                                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 group-hover:bg-rose-500 transition-colors">
                                  <Hash className="w-4 h-4 text-rose-500 group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                  <h3 className="text-lg font-bold text-zinc-900 group-hover:text-rose-600 transition-colors leading-snug">
                                    {chapter.title}
                                  </h3>
                                  <p className="text-sm text-zinc-500 line-clamp-1">{chapter.description}</p>
                                </div>
                                <div className="shrink-0 bg-zinc-50 p-2.5 rounded-full group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
                                  <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-rose-500 transition-colors" />
                                </div>
                              </div>

                              {/* key formulas pills */}
                              {chapter.keyFormulas && chapter.keyFormulas.length > 0 && (
                                <div className="px-6 pb-5 flex flex-wrap gap-2">
                                  {chapter.keyFormulas.map((formula, j) => (
                                    <span
                                      key={j}
                                      className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-full text-xs font-mono text-zinc-600 group-hover:bg-rose-50 group-hover:border-rose-100 group-hover:text-rose-700 transition-colors"
                                    >
                                      {formula}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  ) : (
                    /* All other resource types: standard chapter listing */
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
                  )}

                  {/* Solutions-specific content for Class 12 Physics */}
                  {classLevel === 'class-12' && subjectSlug === 'physics' && selectedResourceType === 'solutions' && (
                    <div className="space-y-8">

                      {/* Intro */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                        <p className="text-zinc-700 leading-relaxed text-sm">
                          <strong>NCERT Solutions Class 12 Physics</strong> are the primary study material for students aspiring to appear in the Class 12 board examinations and competitive entrance examinations at the college level. These include the <strong>JEE Main exam, JEE Advanced exam, NEET examination and others.</strong>
                        </p>
                        <p className="text-zinc-600 text-sm leading-relaxed">
                          These solutions offer <strong>chapter-by-chapter, topic-by-topic</strong> <em><strong>solved answers</strong></em> <strong>that strictly adhere to the newest NCERT exam syllabus</strong> as suggested by the Central Board of Secondary Education (CBSE).
                        </p>
                        <ul className="space-y-2">
                          {[
                            <span key={0}>The <strong>CBSE board exam (70 theory marks) has around 60-70% questions</strong> in the NCERT and includes derivational questions and descriptive answers.</span>,
                            <span key={1}>In <strong>JEE Main (25-30 Physics questions, 100 marks)</strong> and</span>,
                            <span key={2}><strong>NEET (45 Physics questions, 180 marks)</strong> puts more emphasis on the applications, numericals, and MCQs (approximately 70-80%).</span>,
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {/* Strategy tip box */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-sm text-emerald-800">
                          Divide the time into two. Give 40% to board-style theory + 60% to Long answer and entrance-style speed and problem-solving. Areas with high yields, such as Optics (boards: ~14 marks, entrances: 5-10%), Current Electricity (boards: ~6 marks, entrances: 6-10%), have the best overlap.
                        </div>
                        {/* Also Check links */}
                        <div className="flex flex-wrap gap-3 pt-1">
                          {[
                            { label: 'NCERT Books Class 12 — Download Free PDF', href: 'https://collegedunia.com/exams/cbse-class-xii/ncert-textbook' },
                            { label: 'CBSE Class 12 Chapter-Wise Weightage', href: 'https://collegedunia.com/exams/cbse-class-xii/chapter-wise-weightage' },
                          ].map((l, i) => (
                            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                              className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 hover:bg-emerald-100 transition-colors">
                              {l.label} →
                            </a>
                          ))}
                        </div>
                      </section>

                      {/* What You Get */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                          What You Get in Chapter-Wise NCERT Solutions Class 12 Physics?
                        </h2>
                        <ul className="space-y-2">
                          {[
                            'Step-by-step numerical solutions as per CBSE board standards.',
                            'Clear derivations with diagrams and formula explanations for theory-based questions.',
                            'Exercise questions, in-text questions, and additional practice problems solved in simple language.',
                            'Concept clarity for competitive exams like JEE Main and NEET.',
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </section>

                      {/* Chapter-Wise Solutions Table */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4">
                          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            Chapter-Wise NCERT Solutions Class 12 Physics
                          </h2>
                        </div>
                        <table className="w-full text-sm border-t border-zinc-100">
                          <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                            <tr>
                              <th className="px-6 py-4 text-left">Chapter No.</th>
                              <th className="px-6 py-4 text-left">Chapter Name</th>
                              <th className="px-6 py-4 text-right">NCERT Solutions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100">
                            {[
                              { num: 1, name: 'Electric Charges and Fields' },
                              { num: 2, name: 'Electrostatic Potential and Capacitance' },
                              { num: 3, name: 'Current Electricity' },
                              { num: 4, name: 'Moving Charges and Magnetism' },
                              { num: 5, name: 'Magnetism and Matter' },
                              { num: 6, name: 'Electromagnetic Induction' },
                              { num: 7, name: 'Alternating Current' },
                              { num: 8, name: 'Electromagnetic Waves' },
                              { num: 9, name: 'Ray Optics and Optical Instruments' },
                              { num: 10, name: 'Wave Optics' },
                              { num: 11, name: 'Dual Nature of Radiation and Matter' },
                              { num: 12, name: 'Atoms' },
                              { num: 13, name: 'Nuclei' },
                              { num: 14, name: 'Semiconductor Electronics' },
                            ].map((ch) => (
                              <tr key={ch.num} className="hover:bg-emerald-50/40 transition-colors">
                                <td className="px-6 py-3.5 text-zinc-500 font-medium">Chapter {ch.num}</td>
                                <td className="px-6 py-3.5 text-zinc-800 font-medium">{ch.name}</td>
                                <td className="px-6 py-3.5 text-right">
                                  <Link to={`/chapter/${ch.num}`}
                                    className="text-xs font-bold text-emerald-600 hover:text-emerald-800 hover:underline transition-colors">
                                    Check Solutions →
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </section>

                      {/* How to Use */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-4">
                        <h3 className="text-lg font-bold text-zinc-900">How to Use NCERT Solutions Effectively?</h3>
                        <ul className="space-y-2">
                          {[
                            'First, read the NCERT theory carefully.',
                            'Solve examples on your own.',
                            'Then verify using step-by-step solutions.',
                            'Revise formulas before solving numericals.',
                            'Practice sample papers after completing each unit.',
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                              <span className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <a href="https://collegedunia.com/news/e-1731-ncert-class-12-physics-formula-sheet" target="_blank" rel="noopener noreferrer"
                          className="inline-flex text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 hover:bg-emerald-100 transition-colors mt-2">
                          NCERT Class 12 Physics Formula Sheet: Chapterwise Formulas →
                        </a>
                      </section>

                      {/* Why Important */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-4">
                        <h2 className="text-xl font-bold text-zinc-900">Why are NCERT Solutions Class 12 Physics important?</h2>
                        <ul className="space-y-2">
                          {[
                            'Each exercise that is solved is purely based on the current CBSE instructions.',
                            <span key={1}><strong>Nearly 80-85% of CBSE board questions are directly or indirectly based on NCERT examples and exercises.</strong></span>,
                            <span key={2}><strong>Most derivation-based and numerical questions are framed from textbook concepts.</strong></span>,
                            <span key={3}><strong>Internal choice questions often follow the NCERT pattern.</strong></span>,
                            'These solutions follow a step-by-step approach that denotes the marking scheme applied by the board examiners.',
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2">
                          <p className="text-sm font-semibold text-zinc-700 mb-2">Regular practice of NCERT solutions improves:</p>
                          <div className="flex flex-wrap gap-2">
                            {['Concept clarity', 'Numerical solving speed', 'Presentation skills', 'Accuracy in derivations'].map((t, i) => (
                              <span key={i} className="px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-semibold text-emerald-700">{t}</span>
                            ))}
                          </div>
                        </div>
                        <a href="https://collegedunia.com/exams/cbse-class-xii/physics-question-paper" target="_blank" rel="noopener noreferrer"
                          className="inline-flex text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 hover:bg-emerald-100 transition-colors">
                          CBSE Class 12 Physics Question Paper with Solutions (2026-2015): Download PDF →
                        </a>
                      </section>

                      {/* Unit-Wise Weightage Table */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4 space-y-3">
                          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                            <Target className="w-5 h-5 text-amber-500" />
                            Unit-Wise Weightage in Class 12 Physics (CBSE) for 2026-2027
                          </h2>
                          <ul className="space-y-1.5 text-sm text-zinc-600">
                            {[
                              <span key={0}><strong>The CBSE Class 12 Physics Syllabus (2026-27) includes 14 chapters divided into 9 units,</strong> with a total of 184 periods allocated for theory and practicals.</span>,
                              'The theory examination carries 70 marks and includes MCQs, short and long answer questions, and case-based questions.',
                              <span key={2}><strong>Optics carries the highest weightage, followed by Electricity and Magnetism units.</strong></span>,
                              'Preparing solutions chapter-wise will help you in better accuracy and scoring potential.',
                            ].map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs border-t border-zinc-100">
                            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider">
                              <tr>
                                <th className="px-4 py-3 text-left">Ch.</th>
                                <th className="px-4 py-3 text-left">Title</th>
                                <th className="px-4 py-3 text-left hidden md:table-cell">Key Topics</th>
                                <th className="px-4 py-3 text-center">CBSE (70)</th>
                                <th className="px-4 py-3 text-center">JEE %</th>
                                <th className="px-4 py-3 text-center">NEET %</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {[
                                { ch: 1, title: 'Electric Charges and Fields', topics: "Electric charges, Coulomb's law, electric field, Gauss's theorem", cbse: '5', jee: '3-4%', neet: '3-4%' },
                                { ch: 2, title: 'Electrostatic Potential and Capacitance', topics: 'Electric potential, capacitors, dielectrics, energy storage', cbse: '5-6', jee: '4-5%', neet: '4-5%' },
                                { ch: 3, title: 'Current Electricity', topics: "Ohm's law, Kirchhoff's laws, Wheatstone bridge, potentiometer", cbse: '6', jee: '6-7%', neet: '6-7%' },
                                { ch: 4, title: 'Moving Charges and Magnetism', topics: 'Biot-Savart law, Ampere\'s law, Lorentz force, cyclotron', cbse: '6', jee: '4-5%', neet: '4-5%' },
                                { ch: 5, title: 'Magnetism and Matter', topics: "Magnetic properties, Earth's magnetism, hysteresis", cbse: '4-5', jee: '2-3%', neet: '3%' },
                                { ch: 6, title: 'Electromagnetic Induction', topics: "Faraday's laws, Lenz's law, self/mutual inductance", cbse: '4', jee: '3%', neet: '2-3%' },
                                { ch: 7, title: 'Alternating Current', topics: 'AC circuits, RMS values, reactance, impedance, transformers', cbse: '5', jee: '3-4%', neet: '4%' },
                                { ch: 8, title: 'Electromagnetic Waves', topics: "Displacement current, EM wave properties, Maxwell's equations", cbse: '3-4', jee: '2%', neet: '3%' },
                                { ch: 9, title: 'Ray Optics and Optical Instruments', topics: 'Reflection, refraction, lenses, prisms, optical instruments', cbse: '10', jee: '4-5%', neet: '5-6%' },
                                { ch: 10, title: 'Wave Optics', topics: "Huygens' principle, interference, diffraction, polarization", cbse: '4', jee: '3-4%', neet: '2-3%' },
                                { ch: 11, title: 'Dual Nature of Radiation and Matter', topics: 'Photoelectric effect, de Broglie wavelength', cbse: '4', jee: '4-5%', neet: '4%' },
                                { ch: 12, title: 'Atoms', topics: "Bohr's model, hydrogen spectrum", cbse: '3-4', jee: '3%', neet: '3%' },
                                { ch: 13, title: 'Nuclei', topics: 'Nuclear binding energy, radioactivity, fission, fusion', cbse: '4', jee: '3-4%', neet: '4-5%' },
                                { ch: 14, title: 'Semiconductor Electronics', topics: 'Semiconductors, diodes, transistors, logic gates', cbse: '5-7', jee: '4-5%', neet: '5-6%' },
                              ].map((row) => (
                                <tr key={row.ch} className="hover:bg-amber-50/40 transition-colors">
                                  <td className="px-4 py-3 text-zinc-400 font-bold">{row.ch}</td>
                                  <td className="px-4 py-3 font-medium text-zinc-800">
                                    <Link to={`/chapter/${row.ch}`} className="hover:text-emerald-600 hover:underline transition-colors">{row.title}</Link>
                                  </td>
                                  <td className="px-4 py-3 text-zinc-500 hidden md:table-cell">{row.topics}</td>
                                  <td className="px-4 py-3 text-center font-bold text-amber-700">{row.cbse}</td>
                                  <td className="px-4 py-3 text-center text-blue-600">{row.jee}</td>
                                  <td className="px-4 py-3 text-center text-rose-600">{row.neet}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {/* Infographic images from source */}
                        <div className="p-6 space-y-4 border-t border-zinc-100">
                          <img src="https://image-static.collegedunia.com/public/image/3im_f451b5a9209b2f904008e4863a9e8308.png?tr=w-1200,h-797,c-force"
                            alt="CBSE Class 12 Physics unit-wise weightage infographic" className="w-full rounded-2xl border border-zinc-100" loading="lazy" />
                        </div>
                      </section>

                      {/* Question Pattern */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4">
                          <h2 className="text-xl font-bold text-zinc-900">CBSE Class 12 Physics Question Pattern and Marks Distribution (2026-27)</h2>
                          <p className="text-xs text-zinc-400 mt-1">Source: Data from CBSE 2025-26 guidelines</p>
                        </div>
                        <div className="px-8 pb-6 space-y-4">
                          <img src="https://image-static.collegedunia.com/public/image/4im_78333c7c887dad282158c9c7a2241f33.png?tr=w-1200,h-650,c-force"
                            alt="CBSE Class 12 Physics question pattern 2026-27" className="w-full rounded-2xl border border-zinc-100" loading="lazy" />
                          <a href="https://cbseacademic.nic.in/web_material/CurriculumMain26/SrSec/Physics_SrSec_2025-26.pdf" rel="nofollow" target="_blank"
                            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl px-5 py-2.5 transition-colors">
                            <FileText className="w-3.5 h-3.5" />
                            Download CBSE Class 12 Physics Syllabus 2025-2026 PDF
                          </a>
                        </div>
                        {/* Also Read links */}
                        <div className="px-8 pb-6 flex flex-wrap gap-3">
                          {[
                            { label: 'CBSE Class 12 Question Paper 2026 with Solutions', href: 'https://collegedunia.com/exams/cbse-class-xii/question-paper-2026' },
                            { label: 'CBSE 12th Exam Analysis 2026: Difficulty Level & Weightage', href: 'https://collegedunia.com/exams/cbse-class-xii/paper-analysis' },
                          ].map((l, i) => (
                            <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                              className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 hover:bg-blue-100 transition-colors">
                              {l.label} →
                            </a>
                          ))}
                        </div>
                      </section>

                      {/* Strategic Exam Preparation Tips */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-4">
                        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-amber-500" />
                          Strategic Exam Preparation Tips with Data Insights
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { label: 'Time Management', tip: 'Based on weightages, spend 30% on Modern Physics (12 board marks, 10-15% entrances).' },
                            { label: 'Practice Regimen', tip: 'Solve 50+ numericals per high-weight chapter. Use past 5-year papers — boards repeat 15%, entrances 25%.' },
                            { label: 'Common Pitfalls', tip: 'Avoid rote learning; data shows 30% entrance errors in units/conversions. Revise formulas daily.' },
                            { label: 'Mock Analysis', tip: 'Aim for 80% accuracy in high-yield areas; adjust based on weightage data after each mock test.' },
                          ].map((tip, i) => (
                            <div key={i} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 space-y-2">
                              <p className="font-bold text-zinc-800 text-sm">{tip.label}</p>
                              <p className="text-sm text-zinc-600 leading-relaxed">{tip.tip}</p>
                            </div>
                          ))}
                        </div>
                        <a href="https://collegedunia.com/news/e-1731-ncert-class-12-physics-books" target="_blank" rel="noopener noreferrer"
                          className="inline-flex text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5 hover:bg-emerald-100 transition-colors">
                          NCERT Books Class 12 Physics: Download Free PDF and Chapter-Wise Solutions →
                        </a>
                      </section>

                      {/* FAQ */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-4">
                        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-emerald-600" />
                          NCERT Solution Class 12 Physics — FAQs
                        </h2>
                        <div className="space-y-4">
                          {[
                            { q: 'Is NCERT enough for Class 12 Physics board exam?', a: 'Yes, NCERT is more than sufficient for CBSE board preparation. Most questions are directly based on textbook concepts, examples, and exercises.' },
                            { q: 'Are NCERT Solutions helpful for JEE Main and NEET?', a: 'Yes. While JEE and NEET require additional practice, NCERT builds strong conceptual clarity which is essential for competitive exams.' },
                            { q: 'Which chapters are most important in Class 12 Physics?', a: 'You should focus more on Optics, Electrostatics, Magnetism, Current Electricity, and EMI as these chapters carry higher weightage.' },
                            { q: 'How to score 95+ in Class 12 Physics?', a: 'Mostly, you need to focus on NCERT solutions, practice derivations regularly, revise formulas daily, and solve previous year board questions.' },
                          ].map((faq, i) => (
                            <div key={i} className="border border-zinc-100 rounded-2xl overflow-hidden">
                              <div className="px-6 py-4 bg-zinc-50">
                                <p className="font-bold text-zinc-800 text-sm">Q. {faq.q}</p>
                              </div>
                              <div className="px-6 py-4">
                                <p className="text-sm text-zinc-600 leading-relaxed"><strong>Ans.</strong> {faq.a}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                    </div>
                  )}

                  {/* Books-specific content for Class 12 Physics */}
                  {classLevel === 'class-12' && subjectSlug === 'physics' && selectedResourceType === 'books' ? (
                    <div className="space-y-10">

                      {/* Intro */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                        <p className="text-zinc-700 leading-relaxed text-sm">The NCERT Physics textbooks are the official resources prescribed by the NCERT for senior secondary education. The books are designed to build a strong foundation in core concepts such as mechanics, electricity, magnetism, optics, and modern physics through clear explanations and logical progression.</p>
                        <ul className="space-y-2">
                          {[
                            <span key={0}>Physics is divided into two <strong>parts</strong>: Part 1 (Chapters 1–8) and Part 2 (Chapters 9–14).</span>,
                            <span key={1}>The total number of <strong>units is 9</strong>, which includes <strong>14 chapters</strong>. A chapter on <strong>Communication Systems</strong> has been <strong>deleted</strong>.</span>,
                            'The content strictly follows the syllabus recommended for CBSE and other major boards, making it an essential resource for board exam preparation.',
                            <span key={3}>NCERT Physics textbooks have a significant weightage of <strong>70-80%</strong> and <strong>60-70%</strong> in <strong>NEET</strong> and <strong>JEE Main</strong> exams, respectively.</span>,
                          ].map((p, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-zinc-600 text-sm">Almost 100% of CBSE board exam questions are based on the NCERT concepts, examples, and exercises.</p>
                      </section>

                      {/* Official PDF Download */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <FileText className="w-6 h-6 text-purple-600" />
                            NCERT Class 12th Official PDF Download
                          </h2>
                          <p className="text-sm text-zinc-600 mt-3">The official PDF for class 12th Physics is available on the official NCERT website, <a href="https://ncert.nic.in/" target="_blank" rel="nofollow noreferrer" className="text-blue-600 hover:underline font-medium">ncert.nic.in</a>. Download the official PDF from the links below:</p>
                        </div>
                        <table className="w-full text-sm border-t border-zinc-100">
                          <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                            <tr><th className="px-6 py-4">Subject</th><th className="px-6 py-4 text-right">PDF</th></tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100">
                            {[
                              { label: 'Physics Part I (Chapters 1–8)', href: 'https://ncert.nic.in/textbook.php?leph1=0-8' },
                              { label: 'Physics Part II (Chapters 9–14)', href: 'https://ncert.nic.in/textbook.php?leph2=0-6' },
                            ].map((r, i) => (
                              <tr key={i} className="hover:bg-zinc-50/50">
                                <td className="px-6 py-3.5 text-zinc-700 font-medium">{r.label}</td>
                                <td className="px-6 py-3.5 text-right"><a href={r.href} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 hover:underline">Download PDF →</a></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </section>

                      {/* Chapter-Wise Solutions */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                            NCERT Class 12th Physics Chapter-Wise Solutions PDF
                          </h2>
                        </div>
                        <table className="w-full text-sm border-t border-zinc-100">
                          <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                            <tr><th className="px-6 py-4">Chapter Name</th><th className="px-6 py-4 text-right">NCERT Solutions</th></tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100">
                            {[
                              { num: 1, name: 'Electric Charges and Fields' },
                              { num: 2, name: 'Electrostatic Potential and Capacitance' },
                              { num: 3, name: 'Current Electricity' },
                              { num: 4, name: 'Moving Charges and Magnetism' },
                              { num: 5, name: 'Magnetism and Matter' },
                              { num: 6, name: 'Electromagnetic Induction' },
                              { num: 7, name: 'Alternating Current' },
                              { num: 8, name: 'Electromagnetic Waves' },
                              { num: 9, name: 'Ray Optics and Optical Instruments' },
                              { num: 10, name: 'Wave Optics' },
                              { num: 11, name: 'Dual Nature of Radiation and Matter' },
                              { num: 12, name: 'Atoms' },
                              { num: 13, name: 'Nuclei' },
                              { num: 14, name: 'Semiconductor Electronics' },
                            ].map((ch) => (
                              <tr key={ch.num} className="hover:bg-zinc-50/50">
                                <td className="px-6 py-3.5 text-zinc-700 font-medium">Chapter {ch.num} – {ch.name}</td>
                                <td className="px-6 py-3.5 text-right"><Link to={`/chapter/${ch.num}`} className="text-xs font-bold text-blue-600 hover:underline">Check Solutions →</Link></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </section>

                      {/* 3-Month Roadmap */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4 space-y-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <Target className="w-6 h-6 text-blue-600" />
                            Roadmap to cover Class 12 Physics NCERT in ~3 Months
                          </h2>
                          <p className="text-sm text-zinc-600">The roadmap to cover the complete class 12th Physics NCERTs in about 3 months is provided below. Follow this order as the chapters are linked together.</p>
                          <ul className="space-y-2">
                            {[
                              'Read the NCERTs line-by-line and make your own short notes for quick revision.',
                              'After each chapter, solve the exercise questions as well as the examples.',
                              'After covering related chapters, revise them in a day and attempt a sectional mock test.',
                            ].map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="overflow-x-auto border-t border-zinc-100">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                              <tr>
                                <th className="px-4 py-4 w-12">Order</th>
                                <th className="px-4 py-4">Chapter</th>
                                <th className="px-4 py-4 whitespace-nowrap">Time (Days)</th>
                                <th className="px-4 py-4">Why this order?</th>
                                <th className="px-4 py-4">Priority Tips (NEET vs JEE)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {[
                                { n: 1, ch: 'Electric Charges and Fields', t: '5–7 days', why: 'Foundation of whole electrostatics & current.', tip: 'Learn all vector forms, Gauss law derivation thoroughly (both exams)' },
                                { n: 2, ch: 'Electrostatic Potential and Capacitance', t: '6–8 days', why: 'Directly builds on Chapter 1.', tip: 'Capacitors & energy stored are very important numericals (JEE heavy)' },
                                { n: 3, ch: 'Current Electricity', t: '7–9 days', why: 'Uses concepts from electrostatics.', tip: 'Kirchhoff laws, Wheatstone, potentiometer (both)' },
                                { n: 4, ch: 'Moving Charges and Magnetism', t: '7–9 days', why: 'Builds on current & vectors.', tip: 'Biot-Savart, Ampere, force on wire/particle – practice diagrams' },
                                { n: 5, ch: 'Magnetism and Matter', t: '4–5 days', why: 'Somewhat independent after Chapter 4.', tip: 'Focus on Earth magnetism, hysteresis (NEET)' },
                                { n: 6, ch: 'Electromagnetic Induction', t: '5–7 days', why: 'Depends on Chapter 4 & magnetism.', tip: 'Faraday, Lenz, self/mutual inductance – derivations key' },
                                { n: 7, ch: 'Alternating Current', t: '5–7 days', why: 'Builds directly on Chapter 6.', tip: 'Phasors, power, resonance – JEE numericals from here' },
                                { n: 8, ch: 'Electromagnetic Waves', t: '3–4 days', why: 'Mostly theoretical.', tip: 'Displacement current, spectrum – quick read & memorize' },
                                { n: 9, ch: 'Ray Optics and Optical Instruments', t: '7–9 days', why: 'Independent.', tip: 'Ray diagrams, lens/mirror formula, microscope/telescope – practice diagrams' },
                                { n: 10, ch: 'Wave Optics', t: '6–8 days', why: 'Builds on basic optics.', tip: 'Interference, diffraction, polarization – YDSE numericals are important' },
                                { n: 11, ch: 'Dual Nature of Radiation & Matter', t: '4–6 days', why: 'Mostly independent.', tip: 'Photoelectric, de Broglie are formula-based (easy scorer)' },
                                { n: 12, ch: 'Atoms', t: '4–5 days', why: 'Builds on dual nature (ch 11).', tip: 'Bohr model derivations & spectral series' },
                                { n: 13, ch: 'Nuclei', t: '4–6 days', why: 'Builds on atoms (ch 12).', tip: 'Binding energy, radioactivity decay – numericals & graphs' },
                                { n: 14, ch: 'Semiconductor Electronics', t: '5–7 days', why: 'Mostly independent.', tip: 'Logic gates, diodes, transistors – direct questions in NEET' },
                              ].map((r) => (
                                <tr key={r.n} className="hover:bg-zinc-50/50 align-top">
                                  <td className="px-4 py-3 text-center font-bold text-zinc-400">{r.n}</td>
                                  <td className="px-4 py-3 font-medium text-zinc-800">{r.ch}</td>
                                  <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">{r.t}</td>
                                  <td className="px-4 py-3 text-zinc-600">{r.why}</td>
                                  <td className="px-4 py-3 text-zinc-600">{r.tip}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </section>

                      {/* Chapter-Wise Weightage */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4 space-y-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <Hash className="w-6 h-6 text-emerald-600" />
                            NCERT Class 12 Physics Chapter-Wise Weightage
                          </h2>
                          <p className="text-sm text-zinc-600">The chapter-wise weightage helps students to focus on the important chapters based on their weightage in the actual exam.</p>
                          <ul className="space-y-2">
                            {[
                              'Focus should be on high-weightage chapters as these are crucial for a good score.',
                              'You can skip certain chapters based on their weightage if you have a time crunch.',
                              'Units such as EMI and AC, Optics, and Modern Physics account for around 40 marks in the CBSE Class 12 Physics exam.',
                            ].map((p, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="overflow-x-auto border-t border-zinc-100">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                              <tr>
                                <th className="px-4 py-4">Unit</th>
                                <th className="px-4 py-4">Chapter</th>
                                <th className="px-4 py-4">CBSE (Marks)</th>
                                <th className="px-4 py-4">JEE Main</th>
                                <th className="px-4 py-4">NEET</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {[
                                { unit: 'Electrostatics', ch: 'Electric Charges & Fields', cbse: '3–5', jee: '1 question', neet: '1 question' },
                                { unit: '', ch: 'Electrostatic Potential & Capacitance', cbse: '4–6', jee: '1 question', neet: '1 question' },
                                { unit: 'Current Electricity', ch: 'Current Electricity', cbse: '6–8', jee: '1–2 questions', neet: '1–2 questions' },
                                { unit: 'Magnetism', ch: 'Moving Charges & Magnetism', cbse: '5–7', jee: '1 question', neet: '1 question' },
                                { unit: '', ch: 'Magnetism & Matter', cbse: '2–3', jee: 'rare / 0–1', neet: '0–1 question' },
                                { unit: 'EMI & AC', ch: 'Electromagnetic Induction', cbse: '5–7', jee: '1 question', neet: '1 question' },
                                { unit: '', ch: 'Alternating Current', cbse: '4–6', jee: '1 question', neet: '1 question' },
                                { unit: 'EM Waves', ch: 'Electromagnetic Waves', cbse: '2–3', jee: 'rare', neet: '0–1 question' },
                                { unit: 'Optics', ch: 'Ray Optics & Optical Instruments', cbse: '10–12', jee: '1–2 questions', neet: '2 questions' },
                                { unit: '', ch: 'Wave Optics', cbse: '4–6', jee: '1 question', neet: '1 question' },
                                { unit: 'Modern Physics', ch: 'Dual Nature of Radiation & Matter', cbse: '4–6', jee: '1 question', neet: '1–2 questions' },
                                { unit: '', ch: 'Atoms', cbse: '2–4', jee: '0–1 question', neet: '1 question' },
                                { unit: '', ch: 'Nuclei', cbse: '3–5', jee: '1 question', neet: '1 question' },
                                { unit: 'Electronic Devices', ch: 'Semiconductor Electronics', cbse: '5–7', jee: '1 question', neet: '1 question' },
                              ].map((r, i) => (
                                <tr key={i} className="hover:bg-zinc-50/50">
                                  <td className="px-4 py-3 font-semibold text-zinc-500">{r.unit}</td>
                                  <td className="px-4 py-3 text-zinc-700 font-medium">{r.ch}</td>
                                  <td className="px-4 py-3 text-emerald-600 font-bold">{r.cbse}</td>
                                  <td className="px-4 py-3 text-zinc-500">{r.jee}</td>
                                  <td className="px-4 py-3 text-zinc-500">{r.neet}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </section>

                      {/* Important Topics */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-6">
                        <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                          <Star className="w-6 h-6 text-amber-500" />
                          NCERT Class 12 Physics Important Topics
                        </h2>
                        <p className="text-sm text-zinc-600">The most important topics are derived from their weightage in CBSE exams as well as JEE Main and NEET.</p>

                        <div>
                          <p className="text-sm font-bold text-zinc-800 mb-3">Most Important Units</p>
                          <div className="flex flex-wrap gap-2">
                            {['Current Electricity', 'Ray Optics', 'EMI & AC', 'Modern Physics', 'Semiconductors'].map((u, i) => (
                              <span key={i} className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm font-semibold text-amber-700">{u}</span>
                            ))}
                          </div>
                          <p className="text-xs text-zinc-500 italic mt-3">These units alone cover around 45-55% (32-40 marks) of the CBSE Class 12 Physics paper.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm font-bold text-zinc-800 mb-3">Highest Priority Chapters</p>
                            <ul className="space-y-2">
                              {['Current Electricity', 'Ray Optics', 'Electromagnetic Induction', 'Alternating Current', 'Dual Nature of Radiation & Matter', 'Semiconductor', 'Nuclei'].map((c, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-800 mb-3">Easiest and High-Scoring Chapters</p>
                            <ul className="space-y-2">
                              {['Semiconductor', 'Dual Nature', 'Electromagnetic Waves', 'Atoms'].map((c, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="overflow-x-auto border border-zinc-100 rounded-2xl">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                              <tr>
                                <th className="px-4 py-4">Chapter</th>
                                <th className="px-4 py-4">Important Topics</th>
                                <th className="px-4 py-4">CBSE Focus</th>
                                <th className="px-4 py-4">JEE/NEET Focus</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {[
                                { ch: 'Electric Charges & Fields', t: "Coulomb's law, Electric field & field lines, Gauss law", cbse: 'Derivations, diagrams', comp: 'Numericals, field calculation' },
                                { ch: 'Electrostatic Potential & Capacitance', t: 'Potential difference, Capacitance, Capacitor combinations, Energy stored', cbse: 'Derivations, formula-based', comp: 'Numericals, capacitor circuits' },
                                { ch: 'Current Electricity', t: "Ohm's law, Drift velocity, Kirchhoff laws, Wheatstone bridge, Potentiometer", cbse: 'Circuit derivations, numericals', comp: 'Circuit solving, multi-loop problems' },
                                { ch: 'Moving Charges & Magnetism', t: 'Biot-Savart, Ampere, Force on moving charge, Cyclotron', cbse: 'Derivations, diagrams', comp: 'Magnetic force numericals' },
                                { ch: 'Magnetism & Matter', t: 'Bar magnet, Magnetic field lines, Earth magnetism', cbse: 'Theory questions', comp: 'Basic conceptual questions' },
                                { ch: 'Electromagnetic Induction', t: "Faraday's, Lenz's law, self/mutual induction", cbse: 'Derivations', comp: 'Numerical problems' },
                                { ch: 'Alternating Current', t: 'RMS, Reactance, Impedance, Resonance, Power factor', cbse: 'Derivations and numericals', comp: 'AC circuit numericals' },
                                { ch: 'Electromagnetic Waves', t: 'Types, Properties, Uses', cbse: 'Theory, short answers', comp: 'Conceptual questions' },
                                { ch: 'Ray Optics & Optical Instruments', t: 'Mirror/Lens formula, TIR, Ray diagrams, Microscope/Telescope', cbse: 'Derivations, ray diagrams', comp: 'Lens/mirror numericals' },
                                { ch: 'Wave Optics', t: "YDSE, Interference, Diffraction, Fringe width", cbse: 'Derivations, theory', comp: 'Fringe width numericals' },
                                { ch: 'Dual Nature of Radiation & Matter', t: "Photoelectric effect, Einstein's equation, Work function", cbse: 'Theory and derivations', comp: 'Direct formula numericals' },
                                { ch: 'Atoms', t: 'Bohr model, Energy levels, Hydrogen spectrum', cbse: 'Theory and derivations', comp: 'Energy calculation numerics' },
                                { ch: 'Nuclei', t: 'Radioactivity, Half-life, Decay law, Binding energy', cbse: 'Theory, numericals', comp: 'Decay numericals' },
                                { ch: 'Semiconductor Electronics', t: 'PN junction, Diode characteristics, Rectifier, Logic gates', cbse: 'Diagrams, theory', comp: 'Logic gate questions' },
                              ].map((r, i) => (
                                <tr key={i} className="hover:bg-zinc-50/50 align-top">
                                  <td className="px-4 py-3 font-medium text-zinc-800">{r.ch}</td>
                                  <td className="px-4 py-3 text-zinc-600">{r.t}</td>
                                  <td className="px-4 py-3 text-zinc-500">{r.cbse}</td>
                                  <td className="px-4 py-3 text-zinc-500">{r.comp}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </section>

                      {/* Pro Tips */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-5">
                        <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                          <Lightbulb className="w-6 h-6 text-amber-500" />
                          Pro Tips to cover NCERT Class 12th Physics
                        </h2>
                        <p className="text-sm text-zinc-600">The tips below are based on toppers' advice and teacher's guidance. Your daily study plan should include theory, numericals and PYQs.</p>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <p className="text-sm font-bold text-zinc-800 mb-3">Tips to learn faster</p>
                            <ul className="space-y-2">
                              {['Study Physics daily', 'Solve numericals along with theory', 'Revise the formulas every week', 'Make a formula sheet to quickly revise formulas', 'Solve the Class 12 Physics PYQs'].map((t, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-800 mb-3">How toppers study Physics</p>
                            <ul className="space-y-2">
                              {['Concept clarity should be the aim', 'PYQs should be solved along with the NCERT reading', 'Revision is the key'].map((t, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                                  {t}
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-zinc-500 italic mt-4">Focus on revising and practicing what you have studied, not on increasing your resources.</p>
                          </div>
                        </div>
                      </section>

                      {/* Other Sources */}
                      <section className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden">
                        <div className="p-8 pb-4">
                          <h2 className="text-2xl font-bold text-zinc-900 flex items-center gap-3">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                            Other Sources to cover Class 12 Physics
                          </h2>
                          <p className="text-sm text-zinc-600 mt-3">Some other resources for holistic coverage of 12th-class Physics:</p>
                        </div>
                        <div className="overflow-x-auto border-t border-zinc-100">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-zinc-50 text-zinc-500 font-bold uppercase tracking-wider text-xs">
                              <tr><th className="px-6 py-4">CBSE</th><th className="px-6 py-4">JEE</th><th className="px-6 py-4">NEET</th></tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              {[
                                ['NCERT Textbook', 'NCERT', 'NCERT'],
                                ['NCERT Exemplar', 'HC Verma (Vol 2)', 'MTG NCERT at fingertips'],
                                ['PYQs', 'PYQs', 'PYQs'],
                              ].map((r, i) => (
                                <tr key={i} className="hover:bg-zinc-50/50">
                                  {r.map((cell, j) => <td key={j} className="px-6 py-3.5 text-zinc-700">{cell}</td>)}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </section>

                      {/* Exemplar + Mock Tests */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-4">
                          <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                            <Star className="w-5 h-5 text-amber-500" />
                            NCERT Exemplar Physics Class 12th
                          </h3>
                          <p className="text-sm text-zinc-600">The NCERT exemplar is crucial for CBSE exam preparation, as it includes higher-level numericals and conceptual MCQs.</p>
                          <ul className="space-y-2">
                            {['Good resource for CBSE boards\' case study and competency questions.', 'Can be helpful for JEE Main and NEET as well.', 'Many questions in actual exam are inspired by exemplar concepts.'].map((t, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                                {t}
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm font-bold text-zinc-800">How to use it?</p>
                          <ul className="space-y-2">
                            {['Complete NCERT textbook examples & exercise questions first.', 'Then solve Exemplar MCQs and short/long answers.', 'Mark difficult questions and make notes for them.', 'Revise notes weekly to engrain the concepts.', 'Focus more on high-weightage chapters like Electrostatics, Current Electricity, Magnetism.'].map((t, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                                {t}
                              </li>
                            ))}
                          </ul>
                          <button className="w-full py-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 font-bold text-sm hover:bg-amber-100 transition-colors">
                            Check NCERT Exemplar Physics →
                          </button>
                        </section>

                        <section className="bg-white rounded-[2rem] border border-zinc-200 p-8 space-y-4">
                          <h3 className="text-xl font-bold text-zinc-900 flex items-center gap-3">
                            <FileText className="w-5 h-5 text-zinc-600" />
                            Physics Mock Tests
                          </h3>
                          <p className="text-sm text-zinc-600">Mock tests are most important to improve your Physics score as they simulate the actual exam, converting theory knowledge into exam performance.</p>
                          <ul className="space-y-2">
                            {['Improve your speed and accuracy in the exam.', 'Help you identify your weak areas.', 'Boost confidence and reduce exam stress.', 'Help in learning answer-writing skills for CBSE boards.'].map((t, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 mt-2 shrink-0" />
                                {t}
                              </li>
                            ))}
                          </ul>
                          <button className="w-full py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-700 font-bold text-sm hover:bg-zinc-100 transition-colors mt-auto">
                            Class 12th Physics Mock Tests →
                          </button>
                        </section>
                      </div>

                    </div>
                  ) : (

                    /* Original SEO Content Section for all other pages */
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

                        {/* Physics Notes Intro - only for Class 12 Physics Notes */}
                        {classLevel === 'class-12' && subjectSlug === 'physics' && selectedResourceType === 'notes' && (
                          <div className="space-y-5 pb-2">
                            <h2 className="text-2xl font-serif font-bold text-zinc-900">
                              CBSE Class 12 Physics Notes: Chapter Wise Notes and Solutions
                            </h2>
                            <p className="text-zinc-600 leading-relaxed text-sm">
                              CBSE Class 12 Physics notes, as per the latest CBSE Class 12 syllabus, are provided below. The notes consist of chapter-wise notes and NCERT Solutions to prepare for the CBSE Class 12 Board exam. Students can find links to NCERT Notes for all physics chapters of Class 12, organised by chapter number and title.
                            </p>
                            <ul className="space-y-2.5">
                              {[
                                'There are a total of 14 chapters in the CBSE Class 12 Physics syllabus.',
                                'One chapter, Communication Systems (Chapter 15), has been removed from the CBSE Class 12 Physics syllabus and the NCERT textbook.',
                                'These notes will be very useful during the preparation of the board exam.',
                                'Class 12 Physics Notes will help in quick revision and provide an overview of the chapter.',
                                'These notes cover all key concepts, theories, and formulas presented in a clear and simplified format.',
                              ].map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                            {/* Highlight link from PDF */}
                            <a
                              href="https://www.cbse.gov.in/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl hover:bg-amber-100 hover:border-amber-300 transition-all group"
                            >
                              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-sm font-semibold text-amber-800 group-hover:text-amber-900 leading-snug block">
                                  CBSE 12th Exam Analysis 2026: Check Expected Difficulty Level, Subject-wise Weightage, and Question Papers PDF
                                </span>
                              </div>
                              <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 group-hover:translate-x-1 transition-transform" />
                            </a>
                          </div>
                        )}

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
                              Chapter-Wise Notes and Topics
                            </div>
                            <div className="grid gap-6">
                              {seoContent.chapterDetails.map((detail, i) => (
                                <div key={i} className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100 space-y-4 hover:border-zinc-200 hover:bg-white transition-all">
                                  <h4 className="text-lg font-bold text-zinc-900">{detail.title}</h4>
                                  <p className="text-sm text-zinc-600 leading-relaxed">{detail.description}</p>
                                  <div className="space-y-2">
                                    <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest">Important NCERT Notes from this chapter</p>
                                    <div className="flex flex-wrap gap-2">
                                      {detail.topicLinks ? (
                                        detail.topicLinks.map((tl, j) => (
                                          <Link
                                            key={j}
                                            to={tl.href}
                                            className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-[11px] font-semibold text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                                          >
                                            {tl.name}
                                          </Link>
                                        ))
                                      ) : (
                                        detail.topics.map((topic, j) => (
                                          <span key={j} className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                            {topic}
                                          </span>
                                        ))
                                      )}
                                    </div>
                                  </div>
                                  {detail.solutionLink && (
                                    <div className="pt-1 flex justify-end">
                                      <Link
                                        to={detail.solutionLink}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors group"
                                      >
                                        View Notes &amp; Solutions
                                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Chapter-Wise NCERT Solution Links - only for Class 12 Physics Notes */}
                        {classLevel === 'class-12' && subjectSlug === 'physics' && selectedResourceType === 'notes' && (
                          <div className="space-y-6">
                            <div className="flex items-center gap-3 text-zinc-900 font-bold text-xl">
                              <CheckCircle className="w-6 h-6 text-emerald-600" />
                              Chapter-Wise NCERT Solutions
                            </div>
                            <div className="grid md:grid-cols-2 gap-3">
                              {[
                                { num: 1, title: 'Electric Charges and Fields', path: '/chapter/1' },
                                { num: 2, title: 'Electrostatic Potential and Capacitance', path: '/chapter/2' },
                                { num: 3, title: 'Current Electricity', path: '/chapter/3' },
                                { num: 4, title: 'Moving Charges and Magnetism', path: '/chapter/4' },
                                { num: 5, title: 'Magnetism and Matter', path: '/chapter/5' },
                                { num: 6, title: 'Electromagnetic Induction', path: '/chapter/6' },
                                { num: 7, title: 'Alternating Current', path: '/chapter/7' },
                                { num: 8, title: 'Electromagnetic Waves', path: '/chapter/8' },
                                { num: 9, title: 'Ray Optics and Optical Instruments', path: '/chapter/9' },
                                { num: 10, title: 'Wave Optics', path: '/chapter/10' },
                                { num: 11, title: 'Dual Nature of Radiation and Matter', path: '/chapter/11' },
                                { num: 12, title: 'Atoms', path: '/chapter/12' },
                                { num: 13, title: 'Nuclei', path: '/chapter/13' },
                                { num: 14, title: 'Semiconductor Electronics', path: '/chapter/14' },
                              ].map((ch) => (
                                <Link
                                  key={ch.num}
                                  to={ch.path}
                                  className="flex items-center gap-3 px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl hover:bg-emerald-50 hover:border-emerald-300 transition-all group"
                                >
                                  <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                                    {ch.num}
                                  </div>
                                  <span className="text-sm text-zinc-700 font-medium group-hover:text-emerald-700 flex-1 leading-snug">
                                    NCERT Solutions for Class 12 Physics Chapter {ch.num} — {ch.title}
                                  </span>
                                  <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                                </Link>
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
                  )}
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
