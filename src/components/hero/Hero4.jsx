import React from 'react';
import styled from 'styled-components';

/**
 * Hero4 Component
 *
 * This component displays a hero section with a background image,
 * a title, text, and a button for project consultancy.
 *
 * @component
 * @returns {JSX.Element} The rendered Hero4 component.
 */

const Hero4 = () => {
  return (
    <Hero4Wrapper>
      <ContentContainer>
        <ImageWrapper>
          <StyledImage src='/images/hero/hero4bgimg.png' alt='Process illustration' />
          <ImageOverlay />
        </ImageWrapper>
        <TextWrapper>
          <Title>How We Work</Title>
          <ProcessSection>
            <ProcessGrid>
              <ProcessColumn>
                <ProcessList>
                  <ProcessItem>
                    <ProcessNumber>01</ProcessNumber>
                    <ProcessContent>
                      <ProcessTitle>Initial Consultation</ProcessTitle>
                      <ProcessText>We begin with a detailed consultation to understand your business goals, challenges, and specific software requirements.</ProcessText>
                    </ProcessContent>
                  </ProcessItem>
                  <ProcessItem>
                    <ProcessNumber>02</ProcessNumber>
                    <ProcessContent>
                      <ProcessTitle>Requirements Analysis</ProcessTitle>
                      <ProcessText>Our team conducts an in-depth analysis to outline the necessary features, functionalities, and technical specifications.</ProcessText>
                    </ProcessContent>
                  </ProcessItem>
                  <ProcessItem>
                    <ProcessNumber>03</ProcessNumber>
                    <ProcessContent>
                      <ProcessTitle>Design and Development</ProcessTitle>
                      <ProcessText>We create a detailed design plan and commence development, ensuring that each aspect aligns with your objectives.</ProcessText>
                    </ProcessContent>
                  </ProcessItem>
                </ProcessList>
              </ProcessColumn>
              <ProcessColumn>
                <ProcessList>
                  <ProcessItem>
                    <ProcessNumber>04</ProcessNumber>
                    <ProcessContent>
                      <ProcessTitle>Testing and QA</ProcessTitle>
                      <ProcessText>Rigorous testing is conducted to ensure the software is free of bugs and performs optimally under various conditions.</ProcessText>
                    </ProcessContent>
                  </ProcessItem>
                  <ProcessItem>
                    <ProcessNumber>05</ProcessNumber>
                    <ProcessContent>
                      <ProcessTitle>Deployment</ProcessTitle>
                      <ProcessText>We deploy the software and integrate it with your existing systems, providing training for a smooth transition.</ProcessText>
                    </ProcessContent>
                  </ProcessItem>
                  <ProcessItem>
                    <ProcessNumber>06</ProcessNumber>
                    <ProcessContent>
                      <ProcessTitle>Ongoing Support</ProcessTitle>
                      <ProcessText>We provide continuous support and maintenance to address issues and implement updates as your business evolves.</ProcessText>
                    </ProcessContent>
                  </ProcessItem>
                </ProcessList>
              </ProcessColumn>
            </ProcessGrid>
          </ProcessSection>
          <CallToAction href='https://calendly.com/consult3d7tech/project-consultancy' target='_blank' rel='noopener noreferrer'>
            Schedule A Meeting
          </CallToAction>
        </TextWrapper>
      </ContentContainer>
    </Hero4Wrapper>
  );
};

const Hero4Wrapper = styled.div`
  background: linear-gradient(to bottom, #0A0A0A, #1E3A8A);
  padding: 8rem 0;
  position: relative;
  overflow: hidden;

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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 4rem;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const TextWrapper = styled.div`
  flex: 1;
  max-width: 700px;
`;

const Title = styled.h2`
  color: #F3F4F6;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const ProcessSection = styled.section`
  margin-bottom: 3rem;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProcessColumn = styled.div``;

const ProcessList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProcessItem = styled.div`
  display: flex;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(96, 165, 250, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(96, 165, 250, 0.2);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: left;
  }
`;

const ProcessNumber = styled.div`
  color: #60A5FA;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  opacity: 0.9;
  flex-shrink: 0;
`;

const ProcessContent = styled.div`
  flex: 1;
`;

const ProcessTitle = styled.h3`
  color: #60A5FA;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.01em;
`;

const ProcessText = styled.p`
  color: #F3F4F6;
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.9;
  margin: 0;
`;

const CallToAction = styled.a`
  display: inline-block;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  color: #F3F4F6;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.125rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  position: relative;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    width: 100%;
    max-width: 400px;
    margin: 2rem auto 0;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  position: relative;
  z-index: 1;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(96, 165, 250, 0.1), transparent);
  border-radius: 20px;
  z-index: 2;
`;

export default Hero4;
