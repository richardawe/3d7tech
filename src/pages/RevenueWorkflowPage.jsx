import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import SeoMeta from "../components/SeoMeta";
import WorkflowForm from "../components/revenueWorkflow/WorkflowForm";
import WorkflowResult from "../components/revenueWorkflow/WorkflowResult";
import { theme } from "../theme/theme";

const API_URL = "https://3d7tech.com/api/v1/generate-workflow";
const HISTORY_KEY = "rwg_history";
const MAX_HISTORY = 10;

const GOAL_LABEL = {
  more_leads: "More Leads",
  more_bookings: "More Bookings",
  more_quotes: "More Quotes",
  more_repeat_revenue: "Repeat Revenue",
};

export default function RevenueWorkflowPage() {
  const [tab, setTab] = useState("generate");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      setHistory(JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const saveHistory = (input, res) => {
    const entry = {
      id: String(Date.now()),
      timestamp: new Date().toISOString(),
      input,
      result: res,
    };
    const next = [entry, ...history].slice(0, MAX_HISTORY);
    setHistory(next);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch {
      // storage full or unavailable
    }
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(API_URL, formData);
      setResult(data);
      setTab("generate");
      saveHistory(formData, data);
    } catch (err) {
      const msg =
        err.response?.data?.error || "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const loadHistoryItem = (item) => {
    setResult(item.result);
    setTab("generate");
  };

  return (
    <>
      <SeoMeta
        title="Revenue Workflow Generator | 3D7 Technologies"
        description="Paste your website URL and receive a tailored revenue workflow — plain-English explanation and an interactive Mermaid diagram."
        path="/revenue-workflow"
      />
      <NavBar />
      <PageWrapper>
        <ContentContainer>
          <HeroSection>
            <Badge>Revenue Intelligence</Badge>
            <PageTitle>Revenue Workflow Generator</PageTitle>
            <Tagline>Paste your website. Get your best revenue workflow.</Tagline>
          </HeroSection>

          <TabBar>
            <TabBtn
              $active={tab === "generate"}
              onClick={() => setTab("generate")}
            >
              {result ? "Result" : "Generate"}
            </TabBtn>
            <TabBtn
              $active={tab === "history"}
              onClick={() => setTab("history")}
            >
              History
              {history.length > 0 && <TabCount>{history.length}</TabCount>}
            </TabBtn>
          </TabBar>

          {tab === "generate" && (
            <>
              {result ? (
                <WorkflowResult result={result} onReset={handleReset} />
              ) : (
                <>
                  <WorkflowForm onSubmit={handleSubmit} isLoading={isLoading} />
                  {error && <ErrorBanner>{error}</ErrorBanner>}
                </>
              )}
            </>
          )}

          {tab === "history" && (
            <HistoryPanel>
              {history.length === 0 ? (
                <EmptyState>
                  No workflows yet. Generate one to see it here.
                </EmptyState>
              ) : (
                history.map((item) => (
                  <HistoryRow
                    key={item.id}
                    onClick={() => loadHistoryItem(item)}
                  >
                    <HistoryBiz>
                      {item.result.business_name ||
                        item.input.businessName ||
                        item.input.url ||
                        "Unnamed"}
                    </HistoryBiz>
                    <HistoryMeta>
                      {GOAL_LABEL[item.input.revenueGoal] ||
                        item.input.revenueGoal}
                      {" · "}
                      {new Date(item.timestamp).toLocaleDateString("en-GB")}
                    </HistoryMeta>
                    <ViewHint>View →</ViewHint>
                  </HistoryRow>
                ))
              )}
            </HistoryPanel>
          )}
        </ContentContainer>
      </PageWrapper>
      <Footer />
    </>
  );
}

const PageWrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(to bottom, #0a0a0a, #1e3a8a);
  padding: 6rem 0 4rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(96, 165, 250, 0.2),
      transparent
    );
  }
`;

const ContentContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 1.25rem;
  }
`;

const HeroSection = styled.section`
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

const Badge = styled.div`
  display: inline-block;
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
`;

const PageTitle = styled.h1`
  ${theme.mixins.textGradient}
  font-size: ${theme.typography.fontSize["4xl"]};
  font-weight: ${theme.typography.fontWeight.extrabold};
  line-height: ${theme.typography.lineHeight.tight};
  margin-bottom: 0.75rem;

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize["3xl"]};
  }
`;

const Tagline = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.lg};
  margin: 0;
`;

const TabBar = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border.primary};
`;

const TabBtn = styled.button`
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(p) => (p.$active ? theme.colors.accent.primary : "transparent")};
  color: ${(p) =>
    p.$active ? theme.colors.accent.primary : theme.colors.text.secondary};
  padding: 0.75rem 1.25rem;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  font-family: ${theme.typography.fontFamily};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: -1px;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

const TabCount = styled.span`
  background: rgba(96, 165, 250, 0.2);
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.fontSize.xs};
  padding: 2px 7px;
  border-radius: ${theme.borderRadius.full};
`;

const ErrorBanner = styled.div`
  margin-top: ${theme.spacing.md};
  padding: 1rem 1.25rem;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: ${theme.borderRadius.md};
  color: #fca5a5;
  font-size: ${theme.typography.fontSize.sm};
`;

const HistoryPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const EmptyState = styled.p`
  color: ${theme.colors.text.secondary};
  text-align: center;
  padding: ${theme.spacing.xl};
  margin: 0;
`;

const HistoryRow = styled.div`
  ${theme.mixins.glassmorphism}
  border-radius: ${theme.borderRadius.md};
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: ${theme.colors.border.hover};
  }
`;

const HistoryBiz = styled.span`
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HistoryMeta = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  white-space: nowrap;
`;

const ViewHint = styled.span`
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.fontSize.sm};
  white-space: nowrap;
`;
