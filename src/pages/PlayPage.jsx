import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";
import SeoMeta from "../components/SeoMeta";
import { theme } from "../theme/theme"; // Ensure theme is imported

const PlayPage = () => {
  const [downloadCount, setDownloadCount] = useState(0);

  useEffect(() => {
    const storedCount = localStorage.getItem('playDownloadCount');
    if (storedCount) {
      setDownloadCount(parseInt(storedCount, 10));
    }
  }, []);

  const handleDownloadClick = () => {
    const newCount = downloadCount + 1;
    setDownloadCount(newCount);
    localStorage.setItem('playDownloadCount', newCount.toString());
  };

  return (
    <PlayContainer>
      <SeoMeta
        title="Play 1.0 | 3D7 Technologies"
        description="Meet Play 1.0 — The Future of Work, all in one app. Email, chat, docs, tasks, and more, powered by AI. Private, fast, and fully local."
        path="/play"
      />
      <NavBar />
      <HeroSection>
        <Logo src="/images/play.png" alt="Play Logo" />
        <h1>Meet Play 1.0 — The Future of Work, All in One App</h1>
        <HeroDescription>
          Play brings together all your work tools — email, chat, docs, tasks, and more — powered by AI, right on your desktop.
          It’s private, fast, and fully local — no cloud, no subscriptions, no limits.
          <br /><br />
          Your workspace. Your AI. Your rules.
        </HeroDescription>
      </HeroSection>
      <QuickStartSection>
        <h2>🚀 Quick Start Guide</h2>
        <QuickStartGrid>
          <StepCard>
            <StepIcon>1️⃣</StepIcon>
            <h3>Step 1: Download</h3>
            <p>Click the download button above.</p>
            <p>Wait for the DMG file to download (10-30 seconds).</p>
            <p>File will appear in your Downloads folder.</p>
          </StepCard>

          <StepCard>
            <StepIcon>2️⃣</StepIcon>
            <h3>Step 2: Install</h3>
            <p><strong>Double-click</strong> the DMG file in Downloads.</p>
            <p><strong>Drag Play</strong> to the Applications folder.</p>
            <p><strong>Launch</strong> Play from Applications.</p>
          </StepCard>

          <StepCard>
            <StepIcon>3️⃣</StepIcon>
            <h3>Step 3: First Launch</h3>
            <p>Open Applications folder.</p>
            <p>Double-click Play to launch.</p>
            <p>Click "Open" if prompted about security.</p>
          </StepCard>
        </QuickStartGrid>
      </QuickStartSection>
      <ContentWrapper>
        <div className="container">
          <h1>🎉 Play v1.0</h1>
          <p className="subtitle">Offline-First AI-Powered Workspace</p>

          <DownloadBox>
            <h2>📥 Download Play</h2>
            <p><strong>Ready to get started?</strong></p>
            <DownloadLink href="/Play-v1.0.dmg" download onClick={handleDownloadClick}>
              Download Play v1.0
            </DownloadLink>
            <p>
              <small>3.7MB • macOS 10.15+ • DMG Format</small>
            </p>
            <DownloadCounter>Downloads: {downloadCount}</DownloadCounter>
          </DownloadBox>

          <h2>🎨 What You'll See</h2>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>💬</FeatureIcon>
              <h3>Chat</h3>
              <p>AI-powered conversations</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>📄</FeatureIcon>
              <h3>Documents</h3>
              <p>Rich text editing</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>✅</FeatureIcon>
              <h3>Tasks</h3>
              <p>Kanban organization</p>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>📅</FeatureIcon>
              <h3>Calendar</h3>
              <p>Event scheduling</p>
            </FeatureCard>
          </FeatureGrid>

          <h2>🤖 AI Features (Optional)</h2>
          <WarningBox>
            <strong>Note:</strong> AI features require Ollama to be installed
            and running. This is completely optional!
          </WarningBox>

          <div className="step">
            <h3>Install Ollama for AI Features</h3>
            <ol>
              <li>
                Visit <a href="https://ollama.ai" target="_blank">ollama.ai</a>
              </li>
              <li>Download and install Ollama for macOS</li>
              <li>Open Terminal and run:</li>
            </ol>
            <CodeBlock>
              # Download AI models
              <br />
              ollama pull llama3.2
              <br />
              ollama pull nomic-embed-text
              <br />
              <br />
              # Start the service
              <br />
              ollama serve
            </CodeBlock>

          </div>

          <h2>🎯 Key Features</h2>
          <StyledList>
            <li>
              <strong>100% Offline:</strong> All your data stays on your
              computer
            </li>
            <li>
              <strong>AI-Powered:</strong> Chat, summarize, rewrite, and generate
              content
            </li>
            <li>
              <strong>Cross-Module Linking:</strong> Connect related items
              across modules
            </li>
            <li>
              <strong>Global Search:</strong> Press Cmd+K to find anything
              instantly
            </li>
            <li>
              <strong>Dark/Light Themes:</strong> Switch between modes
            </li>
            <li>
              <strong>Data Export:</strong> Backup and migrate your data
            </li>
          </StyledList>

          <h2>🆘 Troubleshooting</h2>

          <WarningBox>
            <h3>App won't open?</h3>
            <p>
              Right-click the app → Open → Click "Open" in the security dialog
            </p>
          </WarningBox>

          <WarningBox>
            <h3>AI not working?</h3>
            <p>
              Make sure Ollama is installed and running. Open Terminal and type:{" "}
              <code>ollama serve</code>
            </p>
          </WarningBox>

          <SuccessBox>
            <h3>✅ You're All Set!</h3>
            <p>
              Play is now installed and ready to boost your productivity. Start
              with the Chat module to test AI features, or dive into any module
              that interests you!
            </p>
          </SuccessBox>

          <h2>🎉 Quick Tips</h2>
          <StyledList>
            <li>
              <strong>Cmd+K</strong> - Global search across all modules
            </li>
            <li>
              <strong>Settings</strong> - Click the gear icon to customize
            </li>
            <li>
              <strong>Export</strong> - Use the sidebar to backup your data
            </li>
            <li>
              <strong>Linking</strong> - Connect items between modules for
              better organization
            </li>
          </StyledList>

          <FooterWrapper>
            <p>
              <strong>Play v1.0</strong> - Built with ❤️ for productivity and
              privacy
            </p>
            <p>Last updated: October 2025</p>
          </FooterWrapper>
        </div>
      </ContentWrapper>
      <Footer />
      <FixedDownloadButton href="/Play-v1.0.dmg" download onClick={handleDownloadClick}>
        Download Play v1.0
      </FixedDownloadButton>
    </PlayContainer>
  );
};

const DownloadBox = styled.div`
  background: ${theme.colors.background.surface};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.xl};
  text-align: center;
  margin: ${theme.spacing['2xl']} 0;
  box-shadow: ${theme.shadows.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const DownloadLink = styled.a`
  display: inline-block;
  background: ${theme.colors.background.primary};
  color: ${theme.colors.accent.primary};
  padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  text-decoration: none;
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.xl};
  border: 2px solid ${theme.colors.accent.primary};
  transition: ${theme.transitions.fast};
  box-shadow: ${theme.shadows.md};
  position: absolute;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};

  &:hover {
    background: ${theme.colors.accent.primary};
    color: ${theme.colors.background.primary};
    transform: translateY(-3px) scale(1.05);
    box-shadow: ${theme.shadows.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.lg};
    top: ${theme.spacing.md};
    right: ${theme.spacing.md};
  }
`;

const DownloadCounter = styled.p`
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing.md};
`;

const PlayContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.background.primary};
  min-height: 100vh;
  overflow-x: hidden; /* Prevent horizontal scroll */
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing['5xl']} ${theme.spacing.xl};
  background: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['3xl']} ${theme.spacing.md};
  }

  h1 {
    font-size: ${theme.typography.fontSize['6xl']};
    font-weight: ${theme.typography.fontWeight.extrabold};
    color: ${theme.colors.accent.primary};
    margin-bottom: ${theme.spacing.md};
    line-height: ${theme.typography.lineHeight.tight};

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['5xl']};
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.typography.fontSize['4xl']};
    }
  }
`;

const Logo = styled.img`
  width: 250px; /* Adjust size as needed */
  height: auto;
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 180px;
    margin-bottom: ${theme.spacing.md};
  }
`;

const HeroDescription = styled.p`
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.text.secondary};
  max-width: 900px;
  line-height: ${theme.typography.lineHeight.relaxed};
  margin-bottom: ${theme.spacing['4xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.xl};
    max-width: 700px;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.lg};
    max-width: 90%;
    margin-bottom: ${theme.spacing['2xl']};
  }
`;

const QuickStartSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing['5xl']};
  background: ${theme.colors.background.surface};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.border.primary};
  margin: ${theme.spacing['2xl']} ${theme.spacing['5xl']};
  text-align: center;

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing['3xl']};
    margin: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
    margin: ${theme.spacing.lg} ${theme.spacing.md};
  }

  h2 {
    color: ${theme.colors.accent.secondary};
    border-bottom: 2px solid ${theme.colors.accent.primary};
    padding-bottom: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.xl};
    font-size: ${theme.typography.fontSize['4xl']};
    font-weight: ${theme.typography.fontWeight.bold};

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['3xl']};
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  }
`;

const QuickStartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing['3xl']};
  margin-top: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.xl};
  }
`;

const StepCard = styled.div`
  background: ${theme.colors.background.surfaceHover};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.base};
  border: 1px solid ${theme.colors.border.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.accent.secondary};
  }

  h3 {
    margin-top: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.accent.primary};
    font-size: ${theme.typography.fontSize['xl']};
  }

  p {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.relaxed};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const StepIcon = styled.div`
  font-size: ${theme.typography.fontSize['5xl']};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.accent.primary};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing['2xl']};
  margin: ${theme.spacing['3xl']} 0;
  width: 100%;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const FeatureCard = styled.div`
  background: ${theme.colors.background.surface};
  padding: ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  text-align: center;
  box-shadow: ${theme.shadows.md};
  transition: ${theme.transitions.base};
  border: 1px solid ${theme.colors.border.primary};

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.accent.secondary};
  }

  h3 {
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.accent.primary};
    font-size: ${theme.typography.fontSize['xl']};
  }

  p {
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.base};
  }
`;

const FeatureIcon = styled.div`
  font-size: ${theme.typography.fontSize['5xl']};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.accent.primary};
`;

const CodeBlock = styled.div`
  background: ${theme.colors.background.primary};
  color: ${theme.colors.accent.primary};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-family: 'Fira Code', monospace;
  margin: ${theme.spacing.xl} 0;
  overflow-x: auto;
  font-size: ${theme.typography.fontSize.base};
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.4;

  code {
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.fontWeight.semibold};
  }
`;

const WarningBox = styled.div`
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid ${theme.colors.accent.primary};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing['2xl']} 0;
  box-shadow: ${theme.shadows.sm};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  strong {
    color: ${theme.colors.accent.secondary};
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.secondary};
  }
`;

const SuccessBox = styled.div`
  background: rgba(40, 167, 69, 0.1);
  border: 1px solid ${theme.colors.accent.primary};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing['2xl']} 0;
  box-shadow: ${theme.shadows.sm};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  h3 {
    color: ${theme.colors.accent.primary};
    margin-bottom: ${theme.spacing.xs};
  }

  p {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.secondary};
  }
`;

const StyledList = styled.ul`
  padding-left: ${theme.spacing['2xl']};
  color: ${theme.colors.text.secondary};
  list-style-type: disc;

  li {
    margin: ${theme.spacing.sm} 0;
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.relaxed};

    strong {
      color: ${theme.colors.accent.secondary};
    }
  }
`;

const ContentWrapper = styled.div`
  font-family: ${theme.typography.fontFamily};
  line-height: ${theme.typography.lineHeight.normal};
  max-width: 1200px; /* Increased max-width for a more spacious layout */
  margin: ${theme.spacing['2xl']} auto; /* Adjusted margin */
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background.primary};
  color: ${theme.colors.text.primary};

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing.lg};
    margin: ${theme.spacing.xl} auto;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md};
    margin: ${theme.spacing.lg} auto;
  }

  .container {
    background: ${theme.colors.background.surface};
    padding: ${theme.spacing['4xl']} ${theme.spacing['5xl']}; /* Generous padding */
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.lg};
    border: 1px solid ${theme.colors.border.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing['2xl']} ${theme.spacing['3xl']};
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      padding: ${theme.spacing.xl} ${theme.spacing.lg};
    }
  }

  h1 {
    color: ${theme.colors.accent.primary};
    text-align: center;
    margin-bottom: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize['6xl']};
    font-weight: ${theme.typography.fontWeight.extrabold};
    letter-spacing: -0.05em;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['5xl']};
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.typography.fontSize['4xl']};
    }
  }

  .subtitle {
    text-align: center;
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing['3xl']};
    font-size: ${theme.typography.fontSize['2xl']};
    max-width: 800px;

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize.xl};
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.typography.fontSize.lg};
    }
  }

  h2 {
    color: ${theme.colors.accent.secondary};
    border-bottom: 2px solid ${theme.colors.accent.primary};
    padding-bottom: ${theme.spacing.xs};
    margin-top: ${theme.spacing['4xl']};
    margin-bottom: ${theme.spacing.xl};
    font-size: ${theme.typography.fontSize['4xl']};
    font-weight: ${theme.typography.fontWeight.bold};

    @media (max-width: ${theme.breakpoints.md}) {
      font-size: ${theme.typography.fontSize['3xl']};
      margin-top: ${theme.spacing['3xl']};
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.typography.fontSize['2xl']};
      margin-top: ${theme.spacing['2xl']};
    }
  }

  h3 {
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.md};

    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.typography.fontSize.xl};
    }
  }

  .step {
    background: ${theme.colors.background.surfaceHover};
    padding: ${theme.spacing['2xl']};
    border-radius: ${theme.borderRadius.lg};
    margin: ${theme.spacing.xl} 0;
    border-left: 6px solid ${theme.colors.accent.primary};
    box-shadow: ${theme.shadows.md};
    transition: ${theme.transitions.base};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: ${theme.shadows.lg};
      border-left-color: ${theme.colors.accent.secondary};
    }

    h3 {
      margin-top: 0;
      margin-bottom: ${theme.spacing.sm};
    }

    ol {
      padding-left: ${theme.spacing.lg};
      list-style-type: decimal;

      li {
        margin-bottom: ${theme.spacing.xs};
        font-size: ${theme.typography.fontSize.base};
        color: ${theme.colors.text.secondary};
      }
    }
  }

  .download-box {
    background: ${theme.colors.background.surface}; /* Changed from gradient */
    color: white;
    padding: ${theme.spacing.xl}; /* Reduced padding */
    border-radius: ${theme.borderRadius.xl};
    text-align: center;
    margin: ${theme.spacing['2xl']} 0;
    box-shadow: ${theme.shadows.lg};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative; /* For absolute positioning of button */
  }

  .download-link {
    display: inline-block;
    background: ${theme.colors.background.primary};
    color: ${theme.colors.accent.primary};
    padding: ${theme.spacing.md} ${theme.spacing['2xl']};
    text-decoration: none;
    border-radius: ${theme.borderRadius.full};
    font-weight: ${theme.typography.fontWeight.bold};
    /* margin-top: ${theme.spacing.xl}; Remove margin-top as it's absolutely positioned */
    font-size: ${theme.typography.fontSize.xl};
    border: 2px solid ${theme.colors.accent.primary};
    transition: ${theme.transitions.fast};
    box-shadow: ${theme.shadows.md};
    position: absolute; /* Position button top-right */
    top: ${theme.spacing.lg};
    right: ${theme.spacing.lg};

    &:hover {
      background: ${theme.colors.accent.primary};
      color: ${theme.colors.background.primary};
      transform: translateY(-3px) scale(1.05);
      box-shadow: ${theme.shadows.lg};
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      padding: ${theme.spacing.sm} ${theme.spacing.lg};
      font-size: ${theme.typography.fontSize.lg};
      top: ${theme.spacing.md};
      right: ${theme.spacing.md};
    }
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${theme.spacing['2xl']};
    margin: ${theme.spacing['3xl']} 0;
    width: 100%;

    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: ${theme.spacing.xl};
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      grid-template-columns: 1fr;
      gap: ${theme.spacing.lg};
    }
  }

  .feature-card {
    background: ${theme.colors.background.surface};
    padding: ${theme.spacing['2xl']};
    border-radius: ${theme.borderRadius.xl};
    text-align: center;
    box-shadow: ${theme.shadows.md};
    transition: ${theme.transitions.base};
    border: 1px solid ${theme.colors.border.primary};

    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: ${theme.shadows.lg};
      border-color: ${theme.colors.accent.secondary};
    }

    h3 {
      margin-bottom: ${theme.spacing.sm};
      color: ${theme.colors.accent.primary};
      font-size: ${theme.typography.fontSize['xl']};
    }

    p {
      color: ${theme.colors.text.secondary};
      font-size: ${theme.typography.fontSize.base};
    }
  }

  .feature-icon {
    font-size: ${theme.typography.fontSize['5xl']};
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.accent.primary};
  }

  .code-block {
    background: ${theme.colors.background.primary};
    color: ${theme.colors.accent.primary};
    padding: ${theme.spacing.lg};
    border-radius: ${theme.borderRadius.md};
    font-family: 'Fira Code', monospace;
    margin: ${theme.spacing.xl} 0;
    overflow-x: auto;
    font-size: ${theme.typography.fontSize.base};
    white-space: pre-wrap;
    word-break: break-all;
    line-height: 1.4;

    code {
      color: ${theme.colors.text.primary};
      font-weight: ${theme.typography.fontWeight.semibold};
    }
  }

  .warning {
    background: rgba(255, 193, 7, 0.1);
    border: 1px solid ${theme.colors.accent.primary};
    color: ${theme.colors.text.primary};
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.md};
    margin: ${theme.spacing['2xl']} 0;
    box-shadow: ${theme.shadows.sm};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

    strong {
      color: ${theme.colors.accent.secondary};
      font-size: ${theme.typography.fontSize.lg};
      margin-bottom: ${theme.spacing.xs};
    }

    p {
      font-size: ${theme.typography.fontSize.base};
      color: ${theme.colors.text.secondary};
    }
  }

  .success {
    background: rgba(40, 167, 69, 0.1);
    border: 1px solid ${theme.colors.accent.primary};
    color: ${theme.colors.text.primary};
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.md};
    margin: ${theme.spacing['2xl']} 0;
    box-shadow: ${theme.shadows.sm};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

    h3 {
      color: ${theme.colors.accent.primary};
      margin-bottom: ${theme.spacing.xs};
    }

    p {
      font-size: ${theme.typography.fontSize.base};
      color: ${theme.colors.text.secondary};
    }
  }

  .screenshot-placeholder {
    background: ${theme.colors.background.surfaceHover};
    border: 2px dashed ${theme.colors.accent.primary};
    padding: ${theme.spacing['4xl']};
    text-align: center;
    color: ${theme.colors.text.secondary};
    border-radius: ${theme.borderRadius.lg};
    margin: ${theme.spacing['3xl']} 0;
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;

    @media (max-width: ${theme.breakpoints.sm}) {
      padding: ${theme.spacing['2xl']};
      font-size: ${theme.typography.fontSize.xl};
    }
  }

  ul, ol {
    padding-left: ${theme.spacing['2xl']};
    color: ${theme.colors.text.secondary};
    list-style-type: disc;

    li {
      margin: ${theme.spacing.sm} 0;
      font-size: ${theme.typography.fontSize.base};
      line-height: ${theme.typography.lineHeight.relaxed};

      strong {
        color: ${theme.colors.accent.secondary};
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: ${theme.spacing['5xl']};
    padding-top: ${theme.spacing['2xl']};
    border-top: 1px solid ${theme.colors.border.primary};
    color: ${theme.colors.text.secondary};
    font-size: ${theme.typography.fontSize.sm};
    background: ${theme.colors.background.primary};
  }
`;

const FooterWrapper = styled.div`
  text-align: center;
  margin-top: ${theme.spacing['5xl']};
  padding-top: ${theme.spacing['2xl']};
  border-top: 1px solid ${theme.colors.border.primary};
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  background: ${theme.colors.background.primary};
`;

const FixedDownloadButton = styled.a`
  position: fixed;
  bottom: ${theme.spacing.xl};
  right: ${theme.spacing.xl};
  background: ${theme.colors.accent.primary};
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.full};
  font-weight: ${theme.typography.fontWeight.bold};
  font-size: ${theme.typography.fontSize.xl};
  text-decoration: none;
  box-shadow: ${theme.shadows.lg};
  z-index: 1000;
  transition: ${theme.transitions.base};

  &:hover {
    transform: translateY(-3px) scale(1.05);
    background: ${theme.colors.accent.secondary};
    box-shadow: ${theme.shadows.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    bottom: ${theme.spacing.lg};
    right: ${theme.spacing.lg};
    padding: ${theme.spacing.sm} ${theme.spacing.xl};
    font-size: ${theme.typography.fontSize.lg};
  }
`;

export default PlayPage;
