import React from 'react';
import styled from 'styled-components';

/**
 * Hero7 Component
 *
 * This component displays a hero section showcasing amazing partners.
 * It includes partner logos and descriptive text.
 *
 * @component
 * @returns {JSX.Element} The rendered Hero7 component.
 */

const Hero7 = () => {
  const partners = [
    {
      src: '/images/partners/european-central-bank.jpg',
      alt: 'European Central Bank',
      width: '3.75rem'
    },
    {
      src: '/images/partners/swinton.jpg',
      alt: 'Swinton',
      width: '5rem'
    },
    {
      src: '/images/partners/lloyds.jpg',
      alt: 'Lloyds',
      width: '5rem'
    },
    {
      src: '/images/partners/autoweb.jpg',
      alt: 'Autoweb',
      width: '5rem'
    },
    {
      src: '/images/partners/hsbc.jpg',
      alt: 'HSBC',
      width: '7rem'
    },
    {
      src: '/images/partners/barclays.jpg',
      alt: 'Barclays',
      width: '5rem'
    }
  ];

  return (
    <Container>
      <ContentWrapper>
        <TextContainer>
          <Title>Amazing Partners</Title>
          <Subtitle>We're truly privileged to have worked with</Subtitle>
        </TextContainer>
        <PartnersGrid>
          {partners.map((partner, index) => (
            <PartnerCard key={index}>
              <PartnerImage 
                src={partner.src} 
                alt={partner.alt}
                style={{ width: partner.width, height: partner.width }}
              />
            </PartnerCard>
          ))}
        </PartnersGrid>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
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

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  color: #F3F4F6;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  color: #F3F4F6;
  font-size: 1.25rem;
  line-height: 1.7;
  opacity: 0.9;
  margin: 0;
  letter-spacing: 0.015em;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(96, 165, 250, 0.1);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const PartnerCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }
`;

const PartnerImage = styled.img`
  object-fit: contain;
  transition: transform 0.3s ease;
  filter: grayscale(100%) brightness(1.2);

  ${PartnerCard}:hover & {
    filter: grayscale(0%) brightness(1);
    transform: scale(1.05);
  }
`;

export default Hero7;
