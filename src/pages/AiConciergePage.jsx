import React from "react";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import styled from "styled-components";
import { theme } from "../theme/theme";
import { Calendar, Sparkles, Users } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/consult3d7tech/project-consultancy";

const AiConciergePage = () => {
  return (
    <>
      <NavBar />
      <PageWrapper>
        <ContentContainer>
          <HeroSection>
            <Badge>
              <Sparkles size={16} />
              Premium Service
            </Badge>
            <Title>AI Concierge Service</Title>
            <Subtitle>
              A premium, hands-on consulting engagement where our team of AI specialists designs, builds, and deploys a custom personal AI assistant ecosystem tailored to busy executives, founders, and high-achieving professionals.
            </Subtitle>
            <IntroText>
              This bespoke service bridges the gap between powerful frontier AI tools (advanced language models, agents, and no-code/low-code platforms) and real-world productivity—without requiring you to become an expert yourself. We focus on creating a secure, integrated, and evolving digital assistant that automates repetitive tasks, enhances decision-making, and reclaims significant time each week, delivering measurable ROI quickly.
            </IntroText>
          </HeroSection>

          <Section>
            <SectionTitle>Core Services Offered</SectionTitle>
            <SectionIntro>
              We structure the offering around a phased, high-touch approach. The initial setup is the flagship deliverable, with optional ongoing layers for sustained value.
            </SectionIntro>

            <ServiceCard>
              <ServiceNumber>1</ServiceNumber>
              <ServiceHeading>Discovery & Workflow Mapping Workshop</ServiceHeading>
              <ServiceText>
                In-depth 2–4 hour session (in-person where feasible, or secure remote via screen-share/collaboration tools). We audit your current daily/weekly routines, tools stack (e.g., email like Gmail/Outlook, calendar, CRM such as Salesforce/HubSpot, Notion/Airtable, Slack/Teams, Google Workspace/Microsoft 365), pain points, goals, and key performance metrics.
              </ServiceText>
              <ServiceOutput>
                <strong>Output:</strong> A prioritized workflow map highlighting high-impact automation opportunities (e.g., email triage, meeting prep, research aggregation, follow-up automation).
              </ServiceOutput>
            </ServiceCard>

            <ServiceCard>
              <ServiceNumber>2</ServiceNumber>
              <ServiceHeading>Custom AI Assistant Architecture & Build</ServiceHeading>
              <ServiceText>
                Design and implementation of one or more tailored AI agents/assistants using frontier models (e.g., Grok, Claude, GPT-series) combined with no-code/low-code orchestration tools (e.g., Zapier, Make.com, n8n, LangChain-inspired setups, or custom wrappers where needed).
              </ServiceText>
              <CapabilitiesList>
                <li><strong>Email & Communication Management</strong> — Auto-summarize inboxes, draft replies, prioritize messages, flag action items.</li>
                <li><strong>Calendar & Scheduling Optimization</strong> — Intelligent booking, conflict resolution, focus-time blocking, prep briefs for meetings.</li>
                <li><strong>Research & Knowledge Aggregation</strong> — Pull insights from web/tools, summarize reports/articles, compile decision briefs.</li>
                <li><strong>Task & Project Automation</strong> — Create/update tasks in Todoist/Notion/Trello, generate follow-ups, track progress.</li>
                <li><strong>Content & Output Generation</strong> — Draft emails, LinkedIn posts, reports, proposals based on your style/voice.</li>
                <li><strong>Decision Support</strong> — Analyze data (e.g., sales figures, market trends), provide scenario recommendations.</li>
                <li><strong>Personal Productivity Boosts</strong> — Daily digests, habit tracking reminders, wellness integrations if desired.</li>
              </CapabilitiesList>
              <ServiceText>
                All agents are configured with your preferred tone, confidentiality rules, and escalation paths (e.g., flag complex items for human review).
              </ServiceText>
            </ServiceCard>

            <ServiceCard>
              <ServiceNumber>3</ServiceNumber>
              <ServiceHeading>Secure Integrations & Data Pipeline Setup</ServiceHeading>
              <ServiceText>
                Build compliant, encrypted connections to your data sources using OAuth/API keys (no unsafe scraping or storage). Emphasis on privacy: GDPR-aligned practices, minimal data retention, role-based access, audit logs where applicable. We test end-to-end flows to ensure reliability and security.
              </ServiceText>
            </ServiceCard>

            <ServiceCard>
              <ServiceNumber>4</ServiceNumber>
              <ServiceHeading>Hands-On Training & Empowerment Session</ServiceHeading>
              <ServiceText>
                1–2 hour walkthrough where we demonstrate usage, teach basic tweaks (e.g., updating prompts, adding new triggers), and share a custom "operating manual" (Notion doc or similar). Goal: You and your team gain confidence to maintain and expand independently.
              </ServiceText>
            </ServiceCard>

            <ServiceCard>
              <ServiceNumber>5</ServiceNumber>
              <ServiceHeading>Testing, Iteration & Launch</ServiceHeading>
              <ServiceText>
                Rigorous testing with real scenarios (we run shadow mode first if preferred). Final optimizations based on initial feedback. Smooth handover with monitoring setup for the first 7–14 days.
              </ServiceText>
            </ServiceCard>

            <ServiceCard>
              <ServiceNumber>6</ServiceNumber>
              <ServiceHeading>Optional Ongoing Maintenance & Evolution Retainer</ServiceHeading>
              <ServiceText>
                Proactive monthly/quarterly updates as AI models advance (new features/capabilities drop frequently). Performance monitoring, additional agent builds, prompt refinement, new tool integrations. Priority support for questions or expansions.
              </ServiceText>
            </ServiceCard>
          </Section>

          <Section>
            <SectionTitle>How We Deliver (Step-by-Step)</SectionTitle>
            <ProcessGrid>
              <ProcessItem>
                <ProcessStep>1</ProcessStep>
                <ProcessTitle>Initial Contact & Qualification</ProcessTitle>
                <ProcessText>15-minute discovery call to confirm fit (your goals, current tools, scope).</ProcessText>
              </ProcessItem>
              <ProcessItem>
                <ProcessStep>2</ProcessStep>
                <ProcessTitle>Proposal & Agreement</ProcessTitle>
                <ProcessText>Customized scope document with pricing (£2,500–£4,000 for initial setup based on complexity). Signed engagement and deposit.</ProcessText>
              </ProcessItem>
              <ProcessItem>
                <ProcessStep>3</ProcessStep>
                <ProcessTitle>Kickoff & Discovery (Week 1)</ProcessTitle>
                <ProcessText>Schedule workshop; gather access (read-only where possible).</ProcessText>
              </ProcessItem>
              <ProcessItem>
                <ProcessStep>4</ProcessStep>
                <ProcessTitle>Build Phase (Weeks 1–3)</ProcessTitle>
                <ProcessText>Architecture design → Prototyping → Full implementation. Regular check-ins (1–2 brief calls/updates).</ProcessText>
              </ProcessItem>
              <ProcessItem>
                <ProcessStep>5</ProcessStep>
                <ProcessTitle>Training & Go-Live (Week 3–4)</ProcessTitle>
                <ProcessText>Final session + 2-week support window for tweaks.</ProcessText>
              </ProcessItem>
              <ProcessItem>
                <ProcessStep>6</ProcessStep>
                <ProcessTitle>Ongoing (If Chosen)</ProcessTitle>
                <ProcessText>Monthly retainer activates post-launch; billed separately.</ProcessText>
              </ProcessItem>
            </ProcessGrid>
          </Section>

          <SelectiveNote>
            <Users size={24} />
            <p>This service is deliberately selective—we cap at 5–8 clients per month to maintain white-glove quality and ensure every deployment delivers transformative results rather than generic setups.</p>
          </SelectiveNote>

          <CTASection>
            <CTATitle>Ready to build your unfair advantage?</CTATitle>
            <CTAText>
              If this aligns with your needs in today's fast-moving AI landscape, reach out to start the conversation. Let's build the unfair advantage your schedule deserves.
            </CTAText>
            <CalendlyButton href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Calendar size={20} />
              Book a discovery call
            </CalendlyButton>
            <CalendlySubtext>
              Contact us via Calendly — schedule a 15-minute discovery call to see if the AI Concierge service is right for you.
            </CalendlySubtext>
          </CTASection>
        </ContentContainer>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default AiConciergePage;

const PageWrapper = styled.main`
  min-height: 100vh;
  background: linear-gradient(to bottom, #0A0A0A, #1E3A8A);
  padding: 6rem 0 4rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.2), transparent);
  }
`;

const ContentContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1.25rem;
  }
`;

const HeroSection = styled.section`
  margin-bottom: 4rem;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #60A5FA;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Title = styled.h1`
  color: #F3F4F6;
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 1.25rem;
  line-height: 1.2;
  ${theme.mixins.textGradient}

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(243, 244, 246, 0.95);
  font-size: 1.25rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
`;

const IntroText = styled.p`
  color: rgba(243, 244, 246, 0.9);
  font-size: 1.0625rem;
  line-height: 1.75;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  color: #F3F4F6;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  ${theme.mixins.textGradient}

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionIntro = styled.p`
  color: rgba(243, 244, 246, 0.85);
  font-size: 1rem;
  line-height: 1.65;
  margin-bottom: 2rem;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(96, 165, 250, 0.15);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1.5rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(96, 165, 250, 0.25);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ServiceNumber = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  color: #0A0A0A;
  font-weight: 700;
  font-size: 1rem;
  border-radius: 50%;
`;

const ServiceHeading = styled.h3`
  color: #60A5FA;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  padding-right: 3rem;
`;

const ServiceText = styled.p`
  color: rgba(243, 244, 246, 0.9);
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 0.75rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ServiceOutput = styled.p`
  color: rgba(243, 244, 246, 0.85);
  font-size: 0.9375rem;
  line-height: 1.65;
  margin-top: 0.75rem;
  padding: 1rem;
  background: rgba(96, 165, 250, 0.08);
  border-radius: 8px;
  border-left: 3px solid #60A5FA;

  strong {
    color: #60A5FA;
  }
`;

const CapabilitiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;

  li {
    color: rgba(243, 244, 246, 0.9);
    font-size: 0.9375rem;
    line-height: 1.65;
    padding: 0.35rem 0;
    padding-left: 1.5rem;
    position: relative;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #60A5FA;
      font-weight: 700;
    }

    strong {
      color: #E0E7FF;
    }
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(96, 165, 250, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(96, 165, 250, 0.2);
  }
`;

const ProcessStep = styled.span`
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  color: #0A0A0A;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 50%;
  margin-bottom: 0.75rem;
`;

const ProcessTitle = styled.h4`
  color: #F3F4F6;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ProcessText = styled.p`
  color: rgba(243, 244, 246, 0.85);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
`;

const SelectiveNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(96, 165, 250, 0.08);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 16px;
  margin-bottom: 4rem;

  svg {
    color: #60A5FA;
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    color: rgba(243, 244, 246, 0.9);
    font-size: 1rem;
    line-height: 1.65;
    margin: 0;
  }
`;

const CTASection = styled.section`
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(96, 165, 250, 0.2);
  border-radius: 24px;
`;

const CTATitle = styled.h2`
  color: #F3F4F6;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  ${theme.mixins.textGradient}
`;

const CTAText = styled.p`
  color: rgba(243, 244, 246, 0.9);
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CalendlyButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  color: #F3F4F6;
  font-size: 1.125rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(96, 165, 250, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(96, 165, 250, 0.4);
  }
`;

const CalendlySubtext = styled.p`
  color: rgba(243, 244, 246, 0.7);
  font-size: 0.875rem;
  margin-top: 1.25rem;
  margin-bottom: 0;
`;
