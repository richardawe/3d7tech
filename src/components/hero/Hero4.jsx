import Button from '../button/Button';
import { LinkStyle } from '../navBar/NavBar';
import { ImageStyle } from './Hero3';
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
      <ImageStyle src='/images/hero/hero4bgimg.png' alt='hero4picture' />
      <TextWrapper>
        <Title>How we work</Title>
        <section className="how-it-works">
        <div className="how-it-works-container">
        <div className="column">
          <ol start="1">
            <li><strong>Initial Consultation:</strong> We begin with a detailed consultation to understand your business goals, challenges, and specific software requirements.</li>
            <li><strong>Requirements Analysis:</strong> Our team conducts an in-depth analysis to outline the necessary features, functionalities, and technical specifications.</li>
            <li><strong>Design and Development:</strong> We create a detailed design plan and commence development, ensuring that each aspect of the software aligns with your business objectives.</li>
          </ol>
        </div>
        <div className="column">
          <ol start="4">
            <li><strong>Testing and Quality Assurance:</strong> Rigorous testing is conducted to ensure the software is free of bugs and performs optimally under various conditions.</li>
            <li><strong>Deployment and Integration:</strong> Once approved, we deploy the software and integrate it with your existing systems, providing training and support to ensure a smooth transition.</li>
            <li><strong>Ongoing Support:</strong> We provide continuous support and maintenance to address any issues, implement updates, and ensure the software remains aligned with your evolving business needs.</li>
          </ol>
        </div>
      </div>
    </section>
        <LinkStyle
          href='https://calendly.com/consult3d7tech/project-consultancy'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Button
            title='Schedule A Meeting'
            backgroundColor='#079BE6'
            textColor='#fff'
            padding='1rem 0.5rem'
            borderRadius='0.625rem'
            height='3.25rem'
            width='12rem'
          />
        </LinkStyle>
      </TextWrapper>
    </Hero4Wrapper>
  );
};

export const Hero4Wrapper = styled.div`
  display: inline-flex;
  padding: 8.75rem 5rem;
  justify-content: center;
  align-items: center;
  background: #fff;
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    width: 100vw;
    padding: 3rem 0;
  }
`;

export const TextWrapper = styled.div`
  width: 39.5625rem;
  height: 27.625rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin-left: 8rem;
  @media (max-width: 912px) {
    width: 100vw;
    height: auto;
    margin: 0;
    padding: 4rem 1rem;
  }
  @media (min-width: 1024px) and (max-width: 1024px) {
    margin-left: 0;
    padding: 0;
  }
`;

export const TextBody = styled.p`
  width: 37.5rem;
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

export const Title = styled.h1`
  color: #0f0f10;
  font-size: 3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 4.2rem */
  letter-spacing: -0.015rem;
  width: 21.5rem;
  @media (max-width: 912px) {
    width: 100%;
    height: auto;
    font-size: 2rem;
  }
`;

export default Hero4;
