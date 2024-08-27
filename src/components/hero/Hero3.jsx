import Button from '../button/Button';
import { LinkStyle } from '../navBar/NavBar';
import React from 'react';
import styled from 'styled-components';

/**
 * Hero3 component for displaying product design consultancy information.
 * @component
 * @returns {JSX.Element} Rendered Hero3 component.
 */

const Hero3 = () => {
  return (
    <Hero3Wrapper>
      <TextWrapper>
        <Title>Why 3d7 Technologies?</Title>
        <section className="features">
      <div className="features-container">
        <div className="column">
          <ul>
            <li><strong>Custom Software Solutions:</strong> We develop bespoke software tailored to your specific business requirements, ensuring optimal functionality and performance.</li>
            <li><strong>Expert Development Team:</strong> Our team of experienced developers, designers, and project managers work collaboratively to deliver high-quality software that meets your business needs.</li>
            <li><strong>Scalable and Flexible:</strong> Our solutions are designed to grow with your business, providing the flexibility to adapt to changing needs and market conditions.</li>
          </ul>
        </div>
        <div className="column">
          <ul>
            <li><strong>User-Friendly Interfaces:</strong> We prioritise user experience, creating intuitive and easy-to-navigate interfaces that enhance productivity and efficiency.</li>
            <li><strong>Integration Capabilities:</strong> Seamlessly integrate new software with your existing systems, ensuring smooth transitions and minimal disruption to your operations.</li>
            <li><strong>Ongoing Support and Maintenance:</strong> We offer comprehensive support and maintenance services to keep your software running smoothly and efficiently, allowing you to focus on your core business activities.</li>
          </ul>
        </div>
      </div>
    </section>
        <LinkStyle
          href='https://calendly.com/consult3d7tech/project-consultancy'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button
            title='Get Started Today'
            backgroundColor='#079BE6'
            textColor='#fff'
            padding='1rem 0.5rem'
            borderRadius='0.625rem'
            height='3.25rem'
            width='12rem'
          />
        </LinkStyle>
      </TextWrapper>
      <ImageStyle src='/images/hero/hero3bgimg.png' alt='hero3picture' />
    </Hero3Wrapper>
  );
};

export const Hero3Wrapper = styled.div`
  display: inline-flex;
  padding: 8.75rem 5rem;
  justify-content: center;
  align-items: center;
  background: #fff;
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100vw;
    padding: 3rem 0;
  }
`;
export const ImageStyle = styled.img`
  width: 34.0625rem;
  height: 34.0625rem;
  flex-shrink: 0;
    @media (max-width: 912px) {
      width:90%;
      height:100%;
    }
`;

export const TextWrapper = styled.div`
  width: 39.5625rem;
  height: 23.625rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin-right: 6.38rem;
  @media (max-width: 912px) {
    width: 100vw;
    height: auto;
    margin: 0;
    padding:4rem 1rem;

  }
`;
export const TextBody = styled.p`
  width: 37.5625rem;
  color: #0f0f10;
  font-family: DM Sans;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%; /* 2.025rem */
  letter-spacing: -0.00563rem;
  @media (max-width: 912px) {
    width: 100%;
  }
`;
const Title = styled.h1`
  color: #0f0f10;
  font-size: 3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 4.2rem */
  letter-spacing: -0.015rem;
  width: 21.5rem;
  @media (max-width: 912px) {
    font-size: 2rem;
  }
`;

export default Hero3;
