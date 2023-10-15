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
          We specialize in crafting cutting-edge AI systems tailored to your
          unique needs. Our expert team combines innovation and precision to
          transform your vision into reality. With our AI development expertise,
          you'll harness the future of technology to drive growth, efficiency,
          and unparalleled insights.
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
  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100vw;
    padding: 0;
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
