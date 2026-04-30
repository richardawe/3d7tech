import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

let renderCounter = 0;
let mermaidPromise = null;

function getMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then(({ default: m }) => {
      m.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#1E3A8A",
          primaryTextColor: "#F3F4F6",
          primaryBorderColor: "#60A5FA",
          lineColor: "#60A5FA",
          background: "#0A0A0A",
          mainBkg: "#1E3A8A",
          nodeBorder: "#60A5FA",
          clusterBkg: "#111827",
          edgeLabelBackground: "#0A0A0A",
          fontFamily: "DM Sans, sans-serif",
        },
      });
      return m;
    });
  }
  return mermaidPromise;
}

export default function MermaidDiagram({ code }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    if (!code) return;
    let cancelled = false;
    setStatus("loading");

    getMermaid().then(async (mermaid) => {
      if (cancelled) return;
      try {
        const id = `mermaid${++renderCounter}`;
        const { svg } = await mermaid.render(id, code);
        if (cancelled) return;
        if (containerRef.current) containerRef.current.innerHTML = svg;
        setStatus("done");
      } catch {
        if (!cancelled) setStatus("error");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code]);

  if (status === "error") {
    return (
      <ErrorBox>
        <ErrorMsg>Diagram rendering failed.</ErrorMsg>
        <RawToggle onClick={() => setShowRaw((v) => !v)}>
          {showRaw ? "Hide" : "Show"} Mermaid source
        </RawToggle>
        {showRaw && <CodeBlock>{code}</CodeBlock>}
      </ErrorBox>
    );
  }

  return (
    <Wrapper>
      {status === "loading" && <LoadingLabel>Rendering diagram…</LoadingLabel>}
      <DiagramBox ref={containerRef} $visible={status === "done"} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const LoadingLabel = styled.p`
  color: rgba(243, 244, 246, 0.6);
  font-size: 0.875rem;
  text-align: center;
  padding: 2rem;
  margin: 0;
`;

const DiagramBox = styled.div`
  width: 100%;
  overflow-x: auto;
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity 0.3s ease;

  svg {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;

const ErrorBox = styled.div`
  padding: 1rem;
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 8px;
  background: rgba(248, 113, 113, 0.05);
`;

const ErrorMsg = styled.p`
  color: #f87171;
  font-size: 0.875rem;
  margin: 0 0 0.5rem;
`;

const RawToggle = styled.button`
  background: none;
  border: none;
  color: #60a5fa;
  font-size: 0.8125rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
`;

const CodeBlock = styled.pre`
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  font-size: 0.75rem;
  color: rgba(243, 244, 246, 0.8);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
`;
