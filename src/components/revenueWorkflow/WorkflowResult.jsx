import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import {
  Copy,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Mail,
  TrendingUp,
} from "lucide-react";
import MermaidDiagram from "./MermaidDiagram";

export default function WorkflowResult({ result, onReset }) {
  const [emailOpen, setEmailOpen] = useState(false);

  const handleCopyDiagram = () => {
    navigator.clipboard.writeText(result.mermaid_code || "");
    toast.success("Mermaid code copied to clipboard");
  };

  const handleCopyEmail = () => {
    const text = `Subject: ${result.email_subject}\n\n${result.email_body}`;
    navigator.clipboard.writeText(text);
    toast.success("Email copied to clipboard");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentW = pageW - margin * 2;
    const lineH = 5.5;
    let y = 22;

    const newPage = () => {
      doc.addPage();
      doc.setFillColor(18, 18, 28);
      doc.rect(0, 0, pageW, pageH, "F");
      y = 22;
    };

    const checkY = (needed = 10) => { if (y + needed > 275) newPage(); };

    // Background
    doc.setFillColor(18, 18, 28);
    doc.rect(0, 0, pageW, pageH, "F");

    // Header bar
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, pageW, 14, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(243, 244, 246);
    doc.text("3D7 Technologies — Revenue Workflow Report", margin, 9);

    y = 26;

    // Report title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(96, 165, 250);
    doc.text(result.business_name || "Revenue Workflow", margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 130, 150);
    doc.text(`Generated ${new Date().toLocaleDateString("en-GB")}`, margin, y);
    y += 10;

    // Divider
    doc.setDrawColor(60, 80, 120);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    const addSection = (title, body, bodyFontSize = 11) => {
      checkY(16);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(96, 165, 250);
      doc.text(title.toUpperCase(), margin, y);
      y += 2;
      doc.setDrawColor(96, 165, 250);
      doc.setLineWidth(0.3);
      doc.line(margin, y, margin + doc.getTextWidth(title.toUpperCase()), y);
      y += 5;

      doc.setFontSize(bodyFontSize);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(210, 215, 225);
      doc.setLineWidth(0.2);

      const lines = doc.splitTextToSize(body || "", contentW);
      lines.forEach((line) => {
        checkY(lineH);
        doc.text(line, margin, y);
        y += lineH;
      });
      y += 7;
    };

    addSection("Current Workflow", result.current_workflow_summary);
    addSection("Recommended Workflow", result.recommended_workflow_summary);
    addSection(
      "Revenue Levers",
      (result.revenue_levers || []).map((l, i) => `${i + 1}.  ${l}`).join("\n")
    );
    addSection("Implementation Notes", result.implementation_notes);
    addSection("Mermaid Diagram Code", result.mermaid_code, 9);

    if (result.email_subject) {
      addSection(
        "Outbound Email Draft",
        `Subject: ${result.email_subject}\n\n${result.email_body}`
      );
    }

    const safeName = (result.business_name || "workflow")
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase();
    doc.save(`${safeName}-revenue-workflow.pdf`);
  };

  return (
    <Container>
      <TopBar>
        <ResultTitle>{result.business_name || "Revenue Workflow"}</ResultTitle>
        <BtnRow>
          <IconBtn onClick={handleCopyDiagram} title="Copy Mermaid code">
            <Copy size={15} /> Copy Diagram
          </IconBtn>
          <IconBtn onClick={handleDownloadPDF} title="Download PDF">
            <Download size={15} /> PDF
          </IconBtn>
          <AccentBtn onClick={onReset}>
            <RefreshCw size={15} /> New Workflow
          </AccentBtn>
        </BtnRow>
      </TopBar>

      <DiagramCard>
        <CardLabel>Revenue Workflow Diagram</CardLabel>
        <MermaidDiagram code={result.mermaid_code} />
      </DiagramCard>

      <TwoCol>
        <SummaryCard>
          <CardLabel>Current Workflow</CardLabel>
          <CardBody>{result.current_workflow_summary}</CardBody>
        </SummaryCard>
        <SummaryCard $accent>
          <CardLabel $accent>Recommended Workflow</CardLabel>
          <CardBody>{result.recommended_workflow_summary}</CardBody>
        </SummaryCard>
      </TwoCol>

      <LeversCard>
        <SectionHeading>
          <TrendingUp size={16} /> Revenue Levers
        </SectionHeading>
        <LeversGrid>
          {(result.revenue_levers || []).map((lever, i) => (
            <LeverItem key={i}>
              <LeverNum>{i + 1}</LeverNum>
              <LeverText>{lever}</LeverText>
            </LeverItem>
          ))}
        </LeversGrid>
      </LeversCard>

      <ImplCard>
        <SectionHeading>Implementation Notes</SectionHeading>
        <CardBody>{result.implementation_notes}</CardBody>
      </ImplCard>

      <EmailToggleBtn onClick={() => setEmailOpen((v) => !v)}>
        <Mail size={15} />
        Outbound Email Draft
        {emailOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </EmailToggleBtn>

      {emailOpen && (
        <EmailCard>
          <EmailBlock>
            <EmailLabel>Subject</EmailLabel>
            <EmailValue>{result.email_subject}</EmailValue>
          </EmailBlock>
          <EmailBlock>
            <EmailLabel>Body</EmailLabel>
            <EmailBody>{result.email_body}</EmailBody>
          </EmailBlock>
          <CopyEmailBtn onClick={handleCopyEmail}>
            <Copy size={13} /> Copy Email
          </CopyEmailBtn>
        </EmailCard>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const ResultTitle = styled.h2`
  ${theme.mixins.textGradient}
  font-size: ${theme.typography.fontSize["2xl"]};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: 0;
`;

const BtnRow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const IconBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${theme.colors.border.hover};
  }
`;

const AccentBtn = styled(IconBtn)`
  background: rgba(96, 165, 250, 0.12);
  border-color: rgba(96, 165, 250, 0.3);
  color: ${theme.colors.accent.primary};

  &:hover {
    background: rgba(96, 165, 250, 0.22);
  }
`;

const DiagramCard = styled.div`
  ${theme.mixins.glassmorphism}
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
`;

const CardLabel = styled.h3`
  color: ${(p) => (p.$accent ? theme.colors.accent.primary : "rgba(96, 165, 250, 0.8)")};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: ${theme.spacing.md};
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  ${theme.mixins.glassmorphism}
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  ${(p) => p.$accent && "border-color: rgba(96, 165, 250, 0.25);"}
`;

const CardBody = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const LeversCard = styled.div`
  ${theme.mixins.glassmorphism}
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.lg};
`;

const SectionHeading = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.md};
`;

const LeversGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
`;

const LeverItem = styled.div`
  background: rgba(96, 165, 250, 0.07);
  border: 1px solid rgba(96, 165, 250, 0.15);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
`;

const LeverNum = styled.div`
  min-width: 28px;
  height: 28px;
  background: linear-gradient(45deg, #60a5fa, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.bold};
`;

const LeverText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  line-height: ${theme.typography.lineHeight.snug};
  margin: 0;
`;

const ImplCard = styled.div`
  ${theme.mixins.glassmorphism}
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
`;

const EmailToggleBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(96, 165, 250, 0.08);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.accent.primary};
  padding: 0.875rem 1.25rem;
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  font-family: ${theme.typography.fontFamily};
  cursor: pointer;
  width: 100%;
  transition: ${theme.transitions.fast};

  &:hover {
    background: rgba(96, 165, 250, 0.14);
  }
`;

const EmailCard = styled.div`
  ${theme.mixins.glassmorphism}
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const EmailBlock = styled.div``;

const EmailLabel = styled.p`
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 0.375rem;
`;

const EmailValue = styled.p`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  margin: 0;
`;

const EmailBody = styled.pre`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  line-height: ${theme.typography.lineHeight.relaxed};
  white-space: pre-wrap;
  word-break: break-word;
  font-family: ${theme.typography.fontFamily};
  margin: 0;
`;

const CopyEmailBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  background: rgba(96, 165, 250, 0.12);
  border: 1px solid rgba(96, 165, 250, 0.25);
  border-radius: ${theme.borderRadius.sm};
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  align-self: flex-start;

  &:hover {
    background: rgba(96, 165, 250, 0.2);
  }
`;
