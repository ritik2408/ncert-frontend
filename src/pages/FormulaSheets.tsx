import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
    BookOpen,
    ArrowLeft,
    ChevronRight,
    Search,
    Hash,
    Zap,
    FlaskConical,
    Calculator,
    Dna,
    Beaker,
    Globe,
    Star,
    Book,
    FileText,
    CheckCircle,
} from 'lucide-react';
import { navigationData } from '../data/navigation';
import RelatedSidebar from '../components/RelatedSidebar';
import CollegeDuniaLogo from '../components/CollegeDuniaLogo';
import FAQ from '../components/FAQ';

const iconMap: Record<string, any> = {
    Zap, FlaskConical, Calculator, Dna, Beaker, Globe, BookOpen, Hash, Star, Book, FileText,
};

const formulaFAQs = [
    {
        question: 'What are NCERT Formula Sheets?',
        answer:
            'Formula sheets are concise, chapter-wise compilations of all key formulas, derivations, and equations from NCERT textbooks — perfect for quick revision before exams.',
    },
    {
        question: 'Which classes are formula sheets available for?',
        answer:
            'We provide formula sheets for Classes 10, 11, and 12 across all major subjects including Physics, Chemistry, Mathematics, and Biology.',
    },
    {
        question: 'How should I use formula sheets effectively?',
        answer:
            'Study the concept first from NCERT, then use formula sheets for quick revision. Practice applying each formula to solved numerical problems to solidify understanding.',
    },
];

export default function FormulaSheets() {
    const [selectedClass, setSelectedClass] = useState(navigationData[0].level);
    const [searchQuery, setSearchQuery] = useState('');

    const activeClassData =
        navigationData.find((c) => c.level === selectedClass) || navigationData[0];

    const filteredSubjects = activeClassData.subjects.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const classSlug = selectedClass.toLowerCase().replace(' ', '-');

    return (
        <div className="min-h-screen bg-zinc-50">
            {/* Header */}
            <header className="bg-white border-b border-zinc-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-zinc-600" />
                        </Link>
                        <CollegeDuniaLogo />
                    </div>
                    <div className="hidden sm:block text-sm font-medium text-zinc-500">
                        Formula Sheets
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
                {/* Page Title */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-rose-600 font-bold text-sm uppercase tracking-widest">
                        <Hash className="w-4 h-4" />
                        Quick Reference Formulas
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-900">
                        NCERT Formula Sheets
                    </h1>
                    <p className="text-lg text-zinc-500 max-w-2xl">
                        Chapter-wise formula sheets for all NCERT subjects. All key equations, laws, and
                        derivations — compiled for lightning-fast revision.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 space-y-12">
                        {/* Search & Class Filter */}
                        <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                {/* Class tabs */}
                                <div className="flex flex-wrap gap-2">
                                    {navigationData.map((cls) => (
                                        <button
                                            key={cls.level}
                                            onClick={() => setSelectedClass(cls.level)}
                                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${selectedClass === cls.level
                                                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-100'
                                                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                                                }`}
                                        >
                                            {cls.level}
                                        </button>
                                    ))}
                                </div>
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="text"
                                        placeholder="Search subject..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 outline-none w-full md:w-64"
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
                                                    to={`/${classSlug}/${subject.slug}/formulas`}
                                                    className="group flex items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-transparent hover:border-rose-400 hover:bg-white hover:shadow-xl transition-all"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div
                                                            className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                                                        >
                                                            <Icon className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-zinc-900">{subject.name}</h3>
                                                            <p className="text-xs text-zinc-400 font-medium">
                                                                Chapter-wise Formula Sheets
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Info Section */}
                        <section className="grid md:grid-cols-2 gap-12 pt-4">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-zinc-900">
                                    Why use our Formula Sheets?
                                </h2>
                                <p className="text-zinc-500 leading-relaxed">
                                    Our formula sheets are meticulously curated by subject experts to ensure every
                                    important formula and derivation is covered — organized chapter-by-chapter for
                                    targeted revision.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'All chapter formulas in one place',
                                        'Includes laws, constants & units',
                                        'Designed for last-minute exam revision',
                                        'Covers CBSE, JEE, and NEET syllabi',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                                            <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                                                <CheckCircle className="text-rose-500 w-3 h-3" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-zinc-900 rounded-3xl p-8 text-white space-y-6">
                                <h3 className="text-xl font-bold">Pro Revision Tip</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Print or save the formula sheet for each chapter. Glance through it every morning
                                    during exam prep week. Recognition is faster than recollection — the brain
                                    internalizes formulas through repeated exposure.
                                </p>
                                <div className="pt-4 border-t border-zinc-800">
                                    <p className="text-xs text-zinc-500 italic">
                                        "Formulas are the language physics speaks — learn the vocabulary and the story
                                        makes sense."
                                    </p>
                                </div>
                            </div>
                        </section>

                        <FAQ items={formulaFAQs} />
                    </div>

                    <RelatedSidebar
                        classLevel={classSlug}
                        resourceType="formulas"
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
