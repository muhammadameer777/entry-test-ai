'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface LatexRendererProps {
  content: string;
  className?: string;
  block?: boolean;
}

export function LatexRenderer({ content, className = '', block = false }: LatexRendererProps) {
  const renderedContent = useMemo(() => {
    if (!content) return '';

    // Check if content has delimiters like $$...$$ or $...$
    if (!content.includes('$')) {
      // If block is explicitly true, treat the whole content as LaTeX
      if (block) {
        try {
          return katex.renderToString(content, { displayMode: true, throwOnError: false });
        } catch {
          return content;
        }
      }
      return content;
    }

    // Split and parse inline ($...$) and block ($$...$$) math
    // First replace block math $$...$$
    let formatted = content.replace(/\$\$([\s\S]*?)\$\$/g, (_, equation) => {
      try {
        return katex.renderToString(equation.trim(), { displayMode: true, throwOnError: false });
      } catch (e) {
        return `$$${equation}$$`;
      }
    });

    // Next replace inline math $...$
    formatted = formatted.replace(/\$([^\$\n]+?)\$/g, (_, equation) => {
      try {
        return katex.renderToString(equation.trim(), { displayMode: false, throwOnError: false });
      } catch (e) {
        return `$${equation}$`;
      }
    });

    return formatted;
  }, [content, block]);

  // If the rendered string contains KaTeX HTML markup, render safely
  if (renderedContent.includes('katex')) {
    return (
      <span
        className={`inline-block ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    );
  }

  return <span className={className}>{content}</span>;
}

export default LatexRenderer;
