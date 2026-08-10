import type { ReactNode } from "react";
import { Fragment } from "react";

/**
 * Minimal markdown renderer for the crawled content: headings (##/###),
 * unordered/ordered lists, bold, italic, links and paragraphs.
 * Deliberately dependency-free — the content set is known and small.
 */

function renderInline(text: string, keyBase: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // tokenize links, bold, italic
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      const href = m[2];
      const external = /^https?:/i.test(href);
      parts.push(
        <a
          key={`${keyBase}-a${i}`}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {m[1]}
        </a>
      );
    } else if (m[3] !== undefined) {
      parts.push(<strong key={`${keyBase}-b${i}`}>{m[3]}</strong>);
    } else if (m[4] !== undefined) {
      parts.push(<em key={`${keyBase}-i${i}`}>{m[4]}</em>);
    }
    last = re.lastIndex;
    i++;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function Markdown({ text }: { text: string }) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, bi) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        const key = `md-${bi}`;

        if (trimmed.startsWith("### ")) {
          return <h3 key={key}>{renderInline(trimmed.slice(4), key)}</h3>;
        }
        if (trimmed.startsWith("## ")) {
          return <h2 key={key}>{renderInline(trimmed.slice(3), key)}</h2>;
        }
        if (trimmed.startsWith("# ")) {
          return <h2 key={key}>{renderInline(trimmed.slice(2), key)}</h2>;
        }
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={key}>
              {renderInline(trimmed.replace(/^> ?/gm, ""), key)}
            </blockquote>
          );
        }

        const lines = trimmed.split("\n");
        const isUl = lines.every((l) => /^\s*[-*•]\s+/.test(l));
        const isOl = lines.every((l) => /^\s*\d+[.)]\s+/.test(l));
        if (isUl || isOl) {
          const Tag = isUl ? "ul" : "ol";
          return (
            <Tag key={key}>
              {lines.map((l, li) => (
                <li key={`${key}-${li}`}>
                  {renderInline(l.replace(/^\s*(?:[-*•]|\d+[.)])\s+/, ""), `${key}-${li}`)}
                </li>
              ))}
            </Tag>
          );
        }

        // paragraph (keep single newlines as breaks)
        return (
          <p key={key}>
            {lines.map((l, li) => (
              <Fragment key={`${key}-${li}`}>
                {li > 0 && <br />}
                {renderInline(l, `${key}-${li}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}
