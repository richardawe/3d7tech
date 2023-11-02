import HeroCard from '../card/Card';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Hero6 Component
 *
 * This component displays a hero section with text content and scrolling cards.
 * It is typically used for promoting training consultancy services.
 *
 * @component
 * @returns {JSX.Element} The rendered Hero6 component.
 */

const Hero6 = () => {
  const [scrolling, setScrolling] = useState(true);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };
  return (
    <Container>
      <TextContainer>
        <TextBox>Products</TextBox>
        <ParagraphStyle>
          3d7tech is a leading provider of systems development and business
          analysis training courses, delivered as public programmes, on-site
          training and e-learning solutions for businesses and individuals
          across all industries.
        </ParagraphStyle>
      </TextContainer>
      <ScrollingCardContainer
        isVideoPlaying={isVideoPlaying}
        scrolling={scrolling}
      >
        <HeroCard
          videoSrc='/videos/products/docuhelp.mp4'
          posterSrc='/images/poster/docuhelp-poster.png'
          title='Docuhelp'
          onVideoPlay={handleVideoPlay}
          onVideoPause={handleVideoPause}
        />
        <HeroCard
          videoSrc='/videos/products/requstory.mp4'
          posterSrc='/images/poster/requstory-poster.png'
          title='Requstory'
          onVideoPlay={handleVideoPlay}
          onVideoPause={handleVideoPause}
        />
      </ScrollingCardContainer>
    </Container>
  );
};

const Container = styled.div`
  // background-image: url('/images/hero/hero6Bg.png');
  background-color: black;
  background-size: 100%;
  // width: 100vw;
  width: auto;
  overflow-x: auto;
  margin-top: 7.2rem;
  @media (max-width: 912px) {
    background-image: none;
    margin-top: 0;
    padding-top: 5rem;
  }
  @media (min-width: 913px) and (max-width: 1440px) {
    margin-top: 0;
  }
  @media (min-width: 2560px) {
    padding-left: 10rem;
    width: auto;
    overflow-x: auto;
    margin-top: 8rem;
  }
`;

const scrollRight = keyframes`
   50%, 100% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const scrollLeft = keyframes`
  0%, 25% {
    transform: translateX(0);
  }
  50%, 75% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-24%);
  }
`;
const mobileScrollLeft = keyframes`
  0% {
    transform: translateX(0);
  }
   25% {
    transform: translateX(-20.5%);
  }
   50% {
    transform: translateX(-41%);
  }
   75% {
    transform: translateX(-61.5%);
  }
   100% {
    transform: translateX(-82%);
  }
`;

const ScrollingCardContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: fit-content;
  animation: ${({ isVideoPlaying, scrolling }) =>
      isVideoPlaying ? 'none' : scrolling ? scrollRight : scrollLeft}
    22s linear infinite;
  gap: 12rem;
  margin: 0 10rem;
  > * {
    margin-top: 4.5rem;
    margin-bottom: 5rem;
    display: flex;
  }
  @media (max-width: 912px) {
    animation: ${({ isVideoPlaying }) =>
        isVideoPlaying ? 'none' : mobileScrollLeft}
      15s linear infinite;
  }
  @media (min-width: 2560px) {
    gap: 20rem;
    animation: ${({ isVideoPlaying }) =>
        isVideoPlaying ? 'none' : mobileScrollLeft}
      15s linear infinite;
  }
`;

const TextBox = styled.h1`
  width: 29.93rem;
  height: 2rem;
  color: #fff;
  font-size: 3rem;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.015rem;
  @media (max-width: 912px) {
    width: 100%;
    height: auto;
    font-size: 2rem;
  }
`;
export const TextContainer = styled.div`
  margin-top: 5.79rem;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 39.56rem;
  height: 10rem;
  margin-left: 4rem;
  @media (max-width: 912px) {
    width: 100%;
    margin: 0 auto;
    height: auto;
    display: flex;
    padding: 0 0.5rem;
  }
`;

export const ParagraphStyle = styled.p`
  margin-top: 2rem;
  width: 40rem;
  color: #fff;
  font-family: DM Sans;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%; /* 2.025rem */
  letter-spacing: -0.00563rem;
  @media (max-width: 912px) {
    width: 100%;
    margin: 0;
  }
`;
export default Hero6;
