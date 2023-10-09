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
        <Title>Project Consultancy</Title>
        <TextBody>
          Discover a partner in 3d7Tech that understands the dynamics of
          successful project management inside out. Our project consultancy
          services are designed to elevate your projects to new heights. With a
          track record of delivering excellence, we offer tailored solutions
          that drive efficiency, mitigate risks, and ensure project success.
          Let's collaborate to turn your vision into reality.
        </TextBody>
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
  @media (max-width: 800px) {
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
  @media (max-width: 800px) {
    width: 100vw;
    height: auto;
    margin: 0;
    padding: 4rem 1rem;
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
     @media (max-width: 800px) {
      width:100%;
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
`;

export default Hero4;
