import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Hero1 Component
 *
 * This component represents the Hero section with a video background and animated text.
 *
 * @component
 * @example
 */

const Hero1 = () => {
  const [text, setText] = useState('Products.');
  const [animationDirection, setAnimationDirection] = useState('top');
  /**
   * useEffect hook to manage text and animation direction changes.
   *
   * This hook updates the text and animation direction at regular intervals.
   *
   */

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) =>
        prevText === 'Products.' ? 'Processes.' : 'Products.'

    );

      setAnimationDirection((prevDirection) =>
        prevDirection === 'top' ? 'bottom' : 'top'
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <HeroContainer>
      <Col lg={12}>
        <VideoContainer className='d-flex justify-content-center align-items-center'>
          <Video
            autoPlay
            loop
            muted
            playsInline
            poster='/images/poster/posterImg.png'
          >
            <source src='/videos/bgimage.mp4' type='video/mp4' />
          </Video>
        </VideoContainer>
        <ContentContainer fluid>
          <TitleContainer>
            <StyledParagraph>
              We create software for small businesses to...
            </StyledParagraph>
          </TitleContainer>
          <TextContainer>
            <MainTextContainer>
              <MainText>Design, Develop & Deliver</MainText>
              <AnimationContainer>
                <MainText className='deliver-text'>
                </MainText>
                <StyledText
                  className={text === 'Processes.' ? 'blue' : 'orange'}
                  $animationDirection={animationDirection}
                >
                  {text}
                </StyledText>
              </AnimationContainer>
            </MainTextContainer>
          </TextContainer>
          <ScrollBox>
            <Image src='/images/hero/arrow-down-s-line.png' alt='arrow-image' />
            <Image src='/images/hero/arrow-down-s-line.png' alt='arrow-image' />
            <Scroll>Scroll down</Scroll>
          </ScrollBox>
        </ContentContainer>
      </Col>
    </HeroContainer>
  );
};

export const HeroContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  margin-top: 5rem;
  height: 100vh;
  @media (min-width: 280px) and (max-width: 912px) {
    height: 100%;
  }
  @media only screen and (min-width: 2560px) {
    height: 50vh;
  }
`;

export const Image = styled.img`
  width: 7.3125rem;
  height: 4.4375rem;
  @media (min-width: 280px) and (max-width: 912px) {
    width: 4rem;
    height: 4rem;
  }
`;

export const ScrollBox = styled.div`
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 280px) and (max-width: 912px) {
    height: 7.2rem;
    margin-bottom: -5rem;
  }
`;
export const Scroll = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 2.8rem */
  letter-spacing: -0.01rem;
  @media (min-width: 280px) and (max-width: 912px) {
    font-size: 1.2rem;
  }
`;
export const VideoContainer = styled.div`
  width: fit-content;
  display: flex;
  @media (min-width: 280px) and (max-width: 912px) {
    overflow: hidden;
  }
  @media only screen and (min-width: 2560px) {
    width: 100vw;
  }
`;

export const Video = styled.video`
  width: 150%;
  @media (min-width: 280px) and (max-width: 600px) {
    width: 300%;
  }
  @media (min-width: 601px) and (max-width: 767px) {
    width: 150%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width: 150%;
  }
  @media only screen and (min-width: 2560px) and (max-width: 2560px) {
  }
`;
export const ContentContainer = styled(Container)`
  left: 0;
  top: 9rem;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: absolute;
  gap: 2rem;
  @media (min-width: 280px) and (max-width: 600px) {
    top: 0;
  }
  @media (min-width: 540px) and (max-width: 540px) {
    top: 5rem;
  }
  @media (min-width: 601px) and (max-width: 767px) {
    top: 0;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    height: 50vh;
  }
  @media (max-height: 400px) and (orientation: landscape) {
    top: 15rem;
  }

  @media only screen and (min-width: 2560px) {
    height: 50vh;
  }
`;

export const TitleContainer = styled.div`
  border-radius: 6.25rem;
  background: #ebf8fe;
  display: flex;
  padding: 0.5rem 0.875rem;
  justify-content: center;
  align-items: center;
  @media (min-width: 280px) and (max-width: 912px) {
    width: auto;
    height: 1.5rem;
  }
  @media screen and (min-width: 2560px) {
  }
`;

export const StyledParagraph = styled.p`
  color: #0f0f10;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 900;
  line-height: 140%;
  letter-spacing: -0.00438rem;
  align-items: center;
  margin: 0;
  @media (min-width: 280px) and (max-width: 912px) {
    font-size: 0.5rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 0.5rem;
  }
  @media screen and (min-width: 2560px) {
    font-size: 1.8rem;
  }
`;

export const TextContainer = styled.div`
  overflow: hidden;
  position: relative;
  margin: 0;

  @media (min-width: 280px) and (max-width: 767px) {
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-left: 8rem;
  }
  @media (max-height: 400px) and (orientation: landscape) {
    left: 4rem;
  }
`;

export const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  width: fit-content;
  margin: 0 auto;
  position: relative;
  @media (min-width: 280px) and (max-width: 767px) {
    width: 60vw;
    margin: 2rem auto;
  }
  @media screen and (min-width: 2560px) {
    width: 25vw;
  }
`;

export const MainText = styled.h1`
  color: #0f0f10;
  font-size: 4.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.0225rem;
  gap: 0.125rem;
  display: flex;
  margin: 0;
  position: relative;
  z-index: 9;
  padding: 0;
  @media (max-width: 767px) {
    font-size: 6vw;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 5vw;
  }
  @media (min-width: 1024px) and (max-width: 1024px) {
    font-size: 5vw;
  }
  @media (max-height: 400px) and (orientation: landscape) {
    font-size: 5vw;
  }
  @media screen and (min-width: 2560px) {
  }
`;

const slideTopToBottom = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideBottomToTop = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  font-size: 4.5rem;
  height: 6rem;
  gap: 2rem;
  overflow-y: hidden;
  @media (min-width: 280px) and (max-width: 912px) {
    font-size: 6vw;
    gap: 0.6rem;
    height: auto;
    width: 60vw;
  }
  @media screen and (min-width: 2560px) {
    width: 25vw;
  }
`;
const StyledText = styled.p`
  width: 26vw;
  left: 43.5%;
  margin: ${(props) =>
    props.$animationDirection === 'bottom' ? '0 0 -6rem 0' : '0 0 0 0'};
  font-weight: bold;
  animation: ${(props) =>
      props.$animationDirection === 'bottom'
        ? slideBottomToTop
        : slideTopToBottom}
    2s ease-in-out infinite;

  &.blue {
    color: #2507df;
  }

  &.orange {
    color: #e15c12;
  }
  @media (min-width: 280px) and (max-width: 767px) {
    margin: ${(props) =>
      props.$animationDirection === 'bottom' ? '0 3rem 0 0' : '0 0 0 -1rem'};
    width: 100vw;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 5vw;
  }

  @media (min-width: 1024px) {
    font-size: 4vw;
  }
  @media (max-height: 400px) and (orientation: landscape) {
    font-size: 4vw;
  }
  @media screen and (min-width: 2560px) {
    text-align: center;
    width: 9vw;
    font-size: 3vw;
  }
`;

export default Hero1;

