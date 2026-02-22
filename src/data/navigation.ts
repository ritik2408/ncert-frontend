export interface Subject {
  name: string;
  slug: string;
  icon: string;
  color: string;
  lightColor: string;
}

export interface ClassLevel {
  level: string;
  subjects: Subject[];
}

export const navigationData: ClassLevel[] = [
  {
    level: "Class 12",
    subjects: [
      { name: "Physics", slug: "physics", icon: "Zap", color: "bg-amber-500", lightColor: "bg-amber-50" },
      { name: "Chemistry", slug: "chemistry", icon: "FlaskConical", color: "bg-emerald-500", lightColor: "bg-emerald-50" },
      { name: "Mathematics", slug: "mathematics", icon: "Calculator", color: "bg-blue-500", lightColor: "bg-blue-50" },
      { name: "Biology", slug: "biology", icon: "Dna", color: "bg-rose-500", lightColor: "bg-rose-50" },
      { name: "English", slug: "english", icon: "BookOpen", color: "bg-violet-500", lightColor: "bg-violet-50" },
      { name: "Computer Science", slug: "computer-science", icon: "Hash", color: "bg-zinc-700", lightColor: "bg-zinc-100" },
      { name: "Economics", slug: "economics", icon: "Globe", color: "bg-cyan-500", lightColor: "bg-cyan-50" },
      { name: "Business Studies", slug: "business-studies", icon: "Star", color: "bg-orange-500", lightColor: "bg-orange-50" },
      { name: "Accountancy", slug: "accountancy", icon: "Calculator", color: "bg-teal-500", lightColor: "bg-teal-50" },
      { name: "History", slug: "history", icon: "Book", color: "bg-red-500", lightColor: "bg-red-50" }
    ]
  },
  {
    level: "Class 11",
    subjects: [
      { name: "Physics", slug: "physics", icon: "Zap", color: "bg-amber-500", lightColor: "bg-amber-50" },
      { name: "Chemistry", slug: "chemistry", icon: "FlaskConical", color: "bg-emerald-500", lightColor: "bg-emerald-50" },
      { name: "Mathematics", slug: "mathematics", icon: "Calculator", color: "bg-blue-500", lightColor: "bg-blue-50" },
      { name: "Biology", slug: "biology", icon: "Dna", color: "bg-rose-500", lightColor: "bg-rose-50" },
      { name: "English", slug: "english", icon: "BookOpen", color: "bg-violet-500", lightColor: "bg-violet-50" },
      { name: "Computer Science", slug: "computer-science", icon: "Hash", color: "bg-zinc-700", lightColor: "bg-zinc-100" },
      { name: "Economics", slug: "economics", icon: "Globe", color: "bg-cyan-500", lightColor: "bg-cyan-50" },
      { name: "Business Studies", slug: "business-studies", icon: "Star", color: "bg-orange-500", lightColor: "bg-orange-50" }
    ]
  },
  {
    level: "Class 10",
    subjects: [
      { name: "Science", slug: "science", icon: "Beaker", color: "bg-indigo-500", lightColor: "bg-indigo-50" },
      { name: "Mathematics", slug: "mathematics", icon: "Calculator", color: "bg-blue-500", lightColor: "bg-blue-50" },
      { name: "Social Science", slug: "social-science", icon: "Globe", color: "bg-orange-500", lightColor: "bg-orange-50" },
      { name: "English", slug: "english", icon: "BookOpen", color: "bg-violet-500", lightColor: "bg-violet-50" },
      { name: "Hindi", slug: "hindi", icon: "FileText", color: "bg-red-500", lightColor: "bg-red-50" },
      { name: "Information Technology", slug: "it", icon: "Hash", color: "bg-zinc-700", lightColor: "bg-zinc-100" }
    ]
  }
];

export const resourceTypes = [
  { name: "NCERT Solutions", slug: "solutions", icon: "CheckCircle", color: "bg-emerald-50 text-emerald-600" },
  { name: "NCERT Notes", slug: "notes", icon: "FileText", color: "bg-blue-50 text-blue-600" },
  { name: "NCERT Book PDFs", slug: "books", icon: "Book", color: "bg-purple-50 text-purple-600" },
  { name: "NCERT Exemplar", slug: "exemplar", icon: "Star", color: "bg-amber-50 text-amber-600" },
  { name: "Formula Sheets", slug: "formulas", icon: "Hash", color: "bg-rose-50 text-rose-600" }
];
