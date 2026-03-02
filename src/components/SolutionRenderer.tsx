import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface SolutionRendererProps {
    text: string;
    className?: string;
}

/**
 * Renders a solution string that may contain:
 *   - $$...$$ for block/display math
 *   - $...$ for inline math
 *   - **text** for bold
 *   - Plain text (whitespace-preserved)
 */
export default function SolutionRenderer({ text, className = '' }: SolutionRendererProps) {
    // Split by $$ first (block math), then by $ (inline math)
    const renderLine = (line: string, key: number) => {
        // Split on $$ blocks
        const blockParts = line.split(/(\$\$[^$]+\$\$)/g);
        const elements: React.ReactNode[] = [];

        blockParts.forEach((part, i) => {
            if (part.startsWith('$$') && part.endsWith('$$')) {
                const mathStr = part.slice(2, -2).trim();
                elements.push(
                    <div key={`block-${key}-${i}`} className="my-3 flex justify-start overflow-x-auto">
                        <BlockMath math={mathStr} />
                    </div>
                );
            } else {
                // Split on $inline$ math
                const inlineParts = part.split(/(\$[^$]+\$)/g);
                inlineParts.forEach((inlinePart, j) => {
                    if (inlinePart.startsWith('$') && inlinePart.endsWith('$')) {
                        const mathStr = inlinePart.slice(1, -1).trim();
                        elements.push(
                            <InlineMath key={`inline-${key}-${i}-${j}`} math={mathStr} />
                        );
                    } else if (inlinePart) {
                        // Handle **bold**
                        const boldParts = inlinePart.split(/(\*\*[^*]+\*\*)/g);
                        boldParts.forEach((bp, k) => {
                            if (bp.startsWith('**') && bp.endsWith('**')) {
                                elements.push(
                                    <strong key={`bold-${key}-${i}-${j}-${k}`} className="font-bold text-zinc-900">
                                        {bp.slice(2, -2)}
                                    </strong>
                                );
                            } else if (bp) {
                                elements.push(<span key={`text-${key}-${i}-${j}-${k}`}>{bp}</span>);
                            }
                        });
                    }
                });
            }
        });

        return elements;
    };

    // Split into lines to handle newlines
    const lines = text.split('\n');

    return (
        <div className={`text-zinc-700 leading-relaxed text-sm space-y-1 ${className}`}>
            {lines.map((line, i) => {
                const trimmed = line.trim();

                // Empty line → spacer
                if (!trimmed) {
                    return <div key={i} className="h-2" />;
                }

                // Step/heading lines that start with "Step" or are numbered headings
                const isHeading = /^(Step \d+|Given:|Find:|Solution:|Formula:|Answer:|Note:)/i.test(trimmed);

                return (
                    <div
                        key={i}
                        className={`flex flex-wrap items-baseline gap-x-1 ${isHeading ? 'mt-3 font-semibold text-emerald-800' : ''}`}
                    >
                        {renderLine(line, i)}
                    </div>
                );
            })}
        </div>
    );
}
