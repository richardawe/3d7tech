import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../theme/theme';

const PROJECTS = [
  {
    name: "Matchday Africa",
    url: "https://matchday.africa/",
    desc: "Sports platform connecting African football fans and clubs",
  },
  {
    name: "AiYo Health",
    url: "https://aiyohealth.app/",
    desc: "AI-powered health and wellness application",
  },
  {
    name: "Energy TRM",
    url: "https://energytrm.com/",
    desc: "Energy trading and risk management platform",
  },
  {
    name: "Requstory",
    url: "https://requstory.com/",
    desc: "Write user stories, draw process maps and create prototypes by describing your product",
  },
  {
    name: "ngr.ltd",
    url: "https://ngr.ltd",
    desc: "Web builder platform for Nigerian micro, small and medium enterprises",
  },
  {
    name: "gbr.ltd",
    url: "https://gbr.ltd",
    desc: "Web builder platform for British micro, small and medium enterprises",
  },
  {
    name: "Aconter",
    url: "https://aconter-5e5d8.web.app/",
    desc: "Free online accounting software for small businesses and individuals",
  },
];

export default function Hero2() {
  const [hovered, setHovered] = useState(null);

  return (
    <Wrapper>
      <ContentContainer>
        <Header>
          <Badge>Portfolio</Badge>
          <Title>Projects We Have Worked On</Title>
          <Subtitle>A selection of products and platforms built by the 3D7 team</Subtitle>
        </Header>
        <Grid>
          {PROJECTS.map((project) => (
            <Card
              key={project.url}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(project.url)}
              onMouseLeave={() => setHovered(null)}
            >
              <CardInner>
                <CardName>{project.name}</CardName>
                <CardDesc>{project.desc}</CardDesc>
                <CardUrl>{project.url.replace(/https?:\/\//, '').replace(/\/$/, '')}</CardUrl>
              </CardInner>
              <Arrow>→</Arrow>
              {hovered === project.url && (
                <Preview>
                  <PreviewFrame
                    src={project.url}
                    title={`Preview of ${project.name}`}
                    scrolling="no"
                    tabIndex="-1"
                  />
                </Preview>
              )}
            </Card>
          ))}
        </Grid>
      </ContentContainer>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background: linear-gradient(to bottom, #1e3a8a, #0a0a0a);
  padding: 6rem 0;
  position: relative;

  &::before {
    content: "";
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
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Badge = styled.span`
  display: inline-block;
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  ${theme.mixins.textGradient}
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: ${theme.typography.fontWeight.extrabold};
  line-height: ${theme.typography.lineHeight.tight};
  margin: 0 0 1rem;
`;

const Subtitle = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.lg};
  margin: 0;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid rgba(96, 165, 250, 0.12);
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
`;

const Card = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(96, 165, 250, 0.08);
  text-decoration: none;
  position: relative;
  transition: background 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(96, 165, 250, 0.07);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1.25rem 1.25rem;
  }
`;

const CardInner = styled.div`
  flex: 1;
  min-width: 0;
`;

const CardName = styled.span`
  display: block;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: 0.25rem;
`;

const CardDesc = styled.span`
  display: block;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
  line-height: ${theme.typography.lineHeight.snug};
  margin-bottom: 0.4rem;
`;

const CardUrl = styled.span`
  display: block;
  color: rgba(96, 165, 250, 0.6);
  font-size: ${theme.typography.fontSize.xs};
  font-family: monospace;
`;

const Arrow = styled.span`
  color: ${theme.colors.accent.primary};
  font-size: 1.25rem;
  flex-shrink: 0;
  transition: transform 0.2s ease;

  ${Card}:hover & {
    transform: translateX(4px);
  }
`;

const Preview = styled.div`
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: ${theme.borderRadius.md};
  border: 1px solid rgba(96, 165, 250, 0.25);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  background: #0a0a0a;
  pointer-events: none;
  z-index: 50;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const PreviewFrame = styled.iframe`
  width: 1200px;
  height: 800px;
  border: none;
  transform: scale(0.25);
  transform-origin: top left;
  pointer-events: none;
`;
