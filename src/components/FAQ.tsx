import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 border-t border-zinc-200">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
            <HelpCircle className="text-emerald-600 w-6 h-6" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-zinc-900">{title}</h2>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div 
              key={index}
              className="border border-zinc-200 rounded-2xl bg-white overflow-hidden transition-all hover:border-emerald-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left group"
              >
                <span className="font-bold text-zinc-800 group-hover:text-emerald-600 transition-colors">
                  {item.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-emerald-600" : ""
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-zinc-600 leading-relaxed text-sm">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
