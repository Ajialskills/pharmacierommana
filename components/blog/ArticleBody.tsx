import React from "react";

interface Props {
  body: string;
}

export default function ArticleBody({ body }: Props) {
  const nodes = parseBody(body);

  return (
    <div className="space-y-4 text-[var(--color-on-surface)]">
      {nodes.map((node, i) => {
        if (node.type === "h2") {
          return (
            <h2 key={i} className="text-xl font-bold mt-8 mb-2 text-[var(--color-on-surface)]">
              {node.text}
            </h2>
          );
        }
        if (node.type === "h3") {
          return (
            <h3 key={i} className="text-base font-bold mt-6 mb-1 text-[var(--color-on-surface)]">
              {node.text}
            </h3>
          );
        }
        if (node.type === "ul") {
          return (
            <ul key={i} className="list-disc list-inside space-y-1 text-sm leading-relaxed text-[var(--color-on-surface-variant)] pl-2">
              {node.items!.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (node.type === "p") {
          return (
            <p key={i} className="text-sm leading-relaxed text-[var(--color-on-surface-variant)]">
              {node.text}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
}

type Node =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

function parseBody(raw: string): Node[] {
  const lines = raw.split("\n");
  const nodes: Node[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      nodes.push({ type: "ul", items: [...listBuffer] });
      listBuffer = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("## ")) {
      flushList();
      nodes.push({ type: "h2", text: line.slice(3) });
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      nodes.push({ type: "h3", text: line.slice(4) });
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("• ")) {
      listBuffer.push(line.slice(2));
      continue;
    }
    if (line === "") {
      flushList();
      continue;
    }
    flushList();
    nodes.push({ type: "p", text: line });
  }

  flushList();
  return nodes;
}
