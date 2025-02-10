import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

/**
 * Hero3 component for displaying product design consultancy information.
 * @component
 * @returns {JSX.Element} Rendered Hero3 component.
 */

const Hero3 = () => {
  const features = [
    {
      title: 'Custom Software Solutions',
      description: 'We develop bespoke software tailored to your specific business requirements, ensuring optimal functionality and performance.'
    },
    {
      title: 'Expert Development Team',
      description: 'Our team of experienced developers, designers, and project managers work collaboratively to deliver high-quality software that meets your business needs.'
    },
    {
      title: 'Scalable and Flexible',
      description: 'Our solutions are designed to grow with your business, providing the flexibility to adapt to changing needs and market conditions.'
    },
    {
      title: 'User-Friendly Interfaces',
      description: 'We prioritise user experience, creating intuitive and easy-to-navigate interfaces that enhance productivity and efficiency.'
    },
    {
      title: 'Integration Capabilities',
      description: 'Seamlessly integrate new software with your existing systems, ensuring smooth transitions and minimal disruption to your operations.'
    },
    {
      title: 'Ongoing Support',
      description: 'We offer comprehensive support and maintenance services to keep your software running smoothly and efficiently.'
    }
  ];

  return (
    <Wrapper>
      <ContentContainer>
        <TextSection>
          <Title>Why 3d7 Technologies?</Title>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
          <CallToAction 
            href='https://calendly.com/consult3d7tech/project-consultancy'
            target='_blank'
            rel='noopener noreferrer'
          >
            Get Started Today
          </CallToAction>
        </TextSection>
        <ImageSection>
          <StyledImage src='/images/hero/hero3bgimg.png' alt='Technology illustration' />
          <ImageOverlay />
        </ImageSection>
      </ContentContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${theme.gradients.background};
  padding: ${theme.spacing['4xl']} 0;
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

const ContentContainer = styled.div`
  max-width: ${theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextSection = styled.div`
  flex: 1;
  max-width: 700px;
`;

const Title = styled.h2`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize['5xl']};
  font-weight: ${theme.typography.fontWeight.extrabold};
  margin-bottom: ${theme.spacing.xl};
  ${theme.mixins.textGradient}
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize['4xl']};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  ${theme.mixins.glassmorphism}
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  transition: ${theme.transitions.base};

  &:hover {
    background: ${theme.colors.background.surfaceHover};
    border-color: ${theme.colors.border.hover};
    transform: translateY(-4px);
  }
`;

const FeatureTitle = styled.h3`
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.fontSize.xl};
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: ${theme.spacing.xs};
  letter-spacing: 0.01em;
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const CallToAction = styled.a`
  display: inline-block;
  background: ${theme.gradients.primary};
  color: ${theme.colors.text.primary};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.lg};
  text-decoration: none;
  transition: ${theme.transitions.base};
  border: 1px solid ${theme.colors.border.primary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const ImageSection = styled.div`
  flex: 1;
  position: relative;
  max-width: 600px;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    width: 100%;
    max-width: 400px;
    margin: ${theme.spacing.xl} auto 0;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${theme.borderRadius.lg};
  position: relative;
  z-index: 1;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, ${theme.colors.accent.primary}1A, transparent);
  border-radius: ${theme.borderRadius.lg};
  z-index: 2;
`;

export default Hero3;
