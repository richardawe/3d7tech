import React from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import { FaBrain, FaRocket, FaCode } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";

/**
 * Hero1 Component
 *
 * This component represents the Hero section with animated text and gradient background.
 *
 * @component
 */

const processData = [
  {
    icon: <FaCode />,
    title: "Design",
    description: "Crafting intuitive and scalable AI solutions tailored to your specific needs",
    color: "#60A5FA",
    initialPosition: { x: "-10%", y: "15%" },
    animation: { x: 0, y: [0, 300, 0] }
  },
  {
    icon: <FaBrain />,
    title: "Develop",
    description: "Building robust AI systems using cutting-edge technologies and best practices",
    color: "#34D399",
    initialPosition: { x: "85%", y: "20%" },
    animation: { x: 0, y: [0, 300, 0] }
  },
  {
    icon: <FaRocket />,
    title: "Deliver",
    description: "Implementing and deploying solutions that drive real business value",
    color: "#F472B6",
    initialPosition: { x: "5%", y: "60%" },
    animation: { x: [0, 800, 0], y: 0 }
  }
];

const Hero1 = () => {
  return (
    <HeroOneContainer>
      <GradientBackground />
      <ContentContainer>
        <Header>
          <HeroContent>
            <MainTitle>
              Crafting Intelligent Solutions with
              <AccentSpan> AI Innovation</AccentSpan>
            </MainTitle>
            <SubTitle>
              We specialize in developing cutting-edge AI systems tailored to your unique business needs
            </SubTitle>
            <ButtonGroup>
              <PrimaryButton as="a" href="https://calendly.com/consult3d7tech/project-consultancy" target="_blank" rel="noopener noreferrer">
                Get Started
              </PrimaryButton>
            </ButtonGroup>
          </HeroContent>
        </Header>

        {processData.map((process, index) => (
          <FloatingCard
            key={process.title}
            style={{ 
              position: 'absolute',
              left: process.initialPosition.x,
              top: process.initialPosition.y
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1,
              scale: [1, 1.02, 1],
              ...process.animation
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            <ProcessCardInner>
              <IconCircle style={{ background: `${process.color}20` }}>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="icon-wrapper"
                >
                  {process.icon}
                </motion.div>
              </IconCircle>
              <ProcessCardContent>
                <ProcessCardTitle>{process.title}</ProcessCardTitle>
                <ProcessCardText>{process.description}</ProcessCardText>
              </ProcessCardContent>
            </ProcessCardInner>
          </FloatingCard>
        ))}
      </ContentContainer>
    </HeroOneContainer>
  );
};

const HeroOneContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: ${theme.colors.background.primary};
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.gradients.background};
  opacity: 0.95;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, ${theme.colors.background.primary} 100%);
    opacity: 0.7;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.lg};
  color: ${theme.colors.text.primary};
  z-index: 1;
  max-width: ${theme.breakpoints.xl};
  margin: 0 auto;
  padding-top: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.md};
    padding-top: ${theme.spacing['4xl']};
    justify-content: flex-start;
    min-height: 100vh;
    gap: ${theme.spacing.lg};
  }
`;

const Header = styled.header`
  padding: ${theme.spacing.xl} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg} 0;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  .icon {
    width: 2rem;
    height: 2rem;
    color: ${theme.colors.accent.primary};
  }
`;

const LogoText = styled.span`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
`;

const NavLinks = styled.div`
  display: none;
  gap: ${theme.spacing.xl};

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLink = styled.a`
  color: ${theme.colors.text.primary};
  transition: ${theme.transitions.base};

  &:hover {
    color: ${theme.colors.accent.primary};
  }
`;

const HeroContent = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  padding-top: ${theme.spacing.xl};
`;

const MainTitle = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['3xl']};
    margin-bottom: ${theme.spacing.md};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize['2xl']};
  }
`;

const AccentSpan = styled.span`
  color: ${theme.colors.accent.primary};
`;

const SubTitle = styled.p`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.lg};
    margin-bottom: ${theme.spacing.xl};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize.base};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  width: 100%;
  padding: 0 ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
`;

const Button = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.semibold};
  transition: ${theme.transitions.base};
  width: auto;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    max-width: 280px;
  }
`;

const PrimaryButton = styled(Button)`
  background: ${theme.colors.accent.primary};
  color: ${theme.colors.text.primary};

  &:hover {
    background: ${theme.colors.accent.secondary};
  }
`;

const SecondaryButton = styled(Button)`
  border: 1px solid ${theme.colors.accent.primary};
  color: ${theme.colors.text.primary};

  &:hover {
    background: ${theme.colors.background.surfaceHover};
  }
`;

const ScrollDown = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing['2xl']};

  .bounce {
    width: 2rem;
    height: 2rem;
    color: ${theme.colors.accent.primary};
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

const ProcessSection = styled.section`
  padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  background: ${theme.colors.background.surface};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${theme.colors.border.primary}, transparent);
  }
`;

const ProcessTitle = styled.h2`
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
  ${theme.mixins.textGradient}
  
  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['5xl']};
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: ${theme.spacing['2xl']};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProcessCard = styled.div`
  position: relative;
  background: ${theme.colors.background.surface};
  border-radius: ${theme.borderRadius.xl};
  ${theme.mixins.glassmorphism}
  transition: ${theme.transitions.base};
  height: 100%;
  
  &:hover {
    transform: translateY(-8px);
    background: ${theme.colors.background.surfaceHover};
  }
`;

const ProcessCardInner = styled.div`
  padding: ${theme.spacing.xl};
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProcessNumber = styled.span`
  position: absolute;
  top: -${theme.spacing.lg};
  right: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize['4xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  opacity: 0.1;
  color: ${theme.colors.text.primary};
`;

const ProcessCardContent = styled.div`
  flex: 1;
`;

const IconCircle = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  margin-bottom: ${theme.spacing.lg};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${theme.transitions.base};

  .icon-wrapper {
    width: 2.5rem;
    height: 2.5rem;
    color: ${theme.colors.accent.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const ProcessCardTitle = styled.h3`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  margin: ${theme.spacing.md} 0;
  color: ${theme.colors.text.primary};
`;

const ProcessCardText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.lg};
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const ProcessCardArrow = styled.div`
  position: absolute;
  bottom: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.fontSize['2xl']};
  opacity: 0.6;
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const FloatingCard = styled(motion.div)`
  width: 300px;
  background: ${theme.colors.background.surface};
  border-radius: ${theme.borderRadius.xl};
  ${theme.mixins.glassmorphism}
  transition: ${theme.transitions.base};
  z-index: 2;
  
  &:hover {
    transform: scale(1.05);
    background: ${theme.colors.background.surfaceHover};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    position: static !important;
    width: 100%;
    max-width: 300px;
    margin: ${theme.spacing.md} auto;
    transform: none !important;
    animation: none !important;

    &:first-child {
      margin-top: ${theme.spacing['2xl']};
    }

    &:hover {
      transform: translateY(-4px) !important;
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    max-width: 280px;
  }
`;

export default Hero1;
