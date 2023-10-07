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
        <Title>AI Systems Development</Title>
        <TextBody>
          Designing and delivering positive products for progressive change
          makers.We combine creative expertise with commercial awareness to
          build products that grow businesses and drive change. As consultants,
          we bridge the gap between design concept and design delivery.
        </TextBody>
        <LinkStyle
          href='https://calendly.com/consult3d7tech/30min'
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
  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    padding: 3rem 1rem 2rem 1rem;
    background-size: 200% auto;
    background-position: right bottom;
    margin-top: -10rem;
  }
`;
export const ImageStyle = styled.img`
  width: 34.0625rem;
  height: 34.0625rem;
  flex-shrink: 0;
`;

export const TextWrapper = styled.div`
  width: 39.5625rem;
  height: 23.625rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin-right: 6.38rem;
`;
export const TextBody = styled.p`
  width: 37.5625rem;
  height: 8rem;
  color: #0f0f10;
  font-family: DM Sans;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%; /* 2.025rem */
  letter-spacing: -0.00563rem;
`;
const Title = styled.h1`
  color: #0f0f10;
  font-size: 3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 4.2rem */
  letter-spacing: -0.015rem;
  width: 21.5rem;
`;

export default Hero3;
