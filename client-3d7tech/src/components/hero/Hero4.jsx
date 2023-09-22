import React from 'react';
import styled from 'styled-components';
import Button from '../button/Button';
import { ImageStyle } from './Hero3';

const Hero4 = () => {
  return (
    <Hero4Wrapper>
      <ImageStyle src='/images/hero4bgimg.png' alt='hero4picture' />
      <TextWrapper>
        <Title>Project Consultancy</Title>
        <TextBody>
          We’ll work with you to understand your business goals and aspirations,
          so we can deliver a roadmap detailing exactly how you can get there.
          We’ll tailor the amount and level of consultancy to your needs. So,
          whether you’re an SME looking for initial consultation and project
          delivery, or an IT manager with an in-house team, looking for further
          expertise and resource or guidance at a tactical level, we can help.
        </TextBody>
        <Button
          onClick={''}
          title='Book A Consultant'
          backgroundColor='#079BE6'
          textColor='#fff'
          padding='1rem 0.5rem'
          borderRadius='0.625rem'
          height='3.25rem'
          width='12rem'
        />
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

  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    padding: 3rem 1rem 2rem 1rem;
    background-size: 200% auto;
    background-position: right bottom;
    margin-top: -10rem;
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
`;

export const TextBody = styled.p`
  width: 37.5rem;
  height: 12rem;
  color: #0f0f10;
  font-family: DM Sans;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%; /* 2.025rem */
  letter-spacing: -0.00563rem;
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
