import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  FileText,
  Star,
  ChevronRight,
  Hash,
  CheckCircle,
  ExternalLink,
  Layers,
  Book
} from 'lucide-react';
import { chapters } from '../data/chapters';
import { navigationData } from '../data/navigation';

interface RelatedSidebarProps {
  currentChapterId?: number;
  subjectSlug?: string;
  classLevel?: string;
  resourceType?: string; // 'solutions', 'notes', 'books', 'exemplar', 'formulas'
}

export default function RelatedSidebar({
  currentChapterId,
  subjectSlug = 'physics',
  classLevel = 'class-12',
  resourceType = 'solutions'
}: RelatedSidebarProps) {

  const formattedClass = classLevel.replace('-', ' ').replace('class', 'Class');
  const currentChapter = chapters.find(c => c.id === currentChapterId);

  // Resource types configuration
  const resourceTypes = [
    { name: "NCERT Solutions", slug: "solutions", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "NCERT Notes", slug: "notes", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "NCERT Books", slug: "books", icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "NCERT Exemplar", slug: "exemplar", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Formula Sheets", slug: "formulas", icon: Hash, color: "text-rose-600", bg: "bg-rose-50" }
  ];

  // Get other subjects in the same class
  const classData = navigationData.find(n => n.level.toLowerCase().replace(' ', '-') === classLevel);
  const otherSubjects = classData?.subjects.filter(s => s.slug !== subjectSlug).slice(0, 4) || [];

  // Filter other chapters for the same resource type
  const otherChapters = chapters
    .filter(c => c.id !== currentChapterId)
    .slice(0, 6);

  return (
    <aside className="space-y-8 w-full lg:w-80 shrink-0">
      {/* Section 1: This Chapter Resources (Only if on a chapter page) */}
      {currentChapterId && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            Chapter Resources
          </h3>
          <div className="space-y-3">
            {resourceTypes.map((type) => (
              <Link
                key={type.slug}
                to={`/chapter/${currentChapterId}/${type.slug}`}
                className={`flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-zinc-200 hover:bg-zinc-50 transition-all group ${resourceType === type.slug ? 'bg-zinc-50 border-zinc-200' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${type.bg} ${type.color} rounded-lg flex items-center justify-center`}>
                    <type.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900">{type.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Explore More Chapters (Only if NOT on a listing page) */}
      {currentChapterId && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            More {resourceTypes.find(r => r.slug === resourceType)?.name.split(' ')[1]}
          </h3>
          <div className="space-y-4">
            {otherChapters.map((chapter) => (
              <Link
                key={chapter.id}
                to={`/chapter/${chapter.id}/${resourceType}`}
                className="group block space-y-1"
              >
                <h4 className="text-sm font-bold text-zinc-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {chapter.title}
                </h4>
                <p className="text-[11px] text-zinc-400 line-clamp-1 leading-relaxed">
                  {chapter.description}
                </p>
              </Link>
            ))}
            <Link
              to={`/${classLevel}/${subjectSlug}/${resourceType}`}
              className="block text-center py-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors border-t border-zinc-100 pt-4 mt-2"
            >
              View All Chapters
            </Link>
          </div>
        </div>
      )}

      {/* Section 3: Other Resources (If on a listing page) */}
      {!currentChapterId && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">
          <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-emerald-600" />
            Other Resources
          </h3>
          <div className="space-y-3">
            {resourceTypes.map((link) => (
              <Link
                key={link.slug}
                to={`/${classLevel}/${subjectSlug}/${link.slug}`}
                className={`flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-zinc-200 hover:bg-zinc-50 transition-all group ${resourceType === link.slug ? 'bg-zinc-50 border-zinc-200' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${link.bg} ${link.color} rounded-lg flex items-center justify-center`}>
                    <link.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900">{link.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Other Subjects */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 shadow-sm">
        <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-6 flex items-center gap-2">
          <Book className="w-4 h-4 text-emerald-600" />
          Other Subjects
        </h3>
        <div className="space-y-3">
          {otherSubjects.map((subject) => (
            <Link
              key={subject.slug}
              to={`/${classLevel}/${subject.slug}/solutions`}
              className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-zinc-200 hover:bg-zinc-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-100 text-zinc-500 rounded-lg flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900">{subject.name}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Study Tip Card */}
      <div className="bg-emerald-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-emerald-200">
        <div className="relative z-10 space-y-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold">Pro Study Tip</h4>
            <p className="text-xs text-emerald-50 leading-relaxed">
              Solve the NCERT Exemplar problems after finishing each chapter to master high-order thinking skills.
            </p>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
      </div>
    </aside>
  );
}
