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
      <VideoContainer>
        <Video src='/videos/bgimage.mov' autoPlay loop muted />
      </VideoContainer>
      <ContentContainer>
        <div className='container'>
          <div>
            <TitleContainer>
              <StyledParagraph>
                3D7 TECH Helps Individuals & Companies
              </StyledParagraph>
            </TitleContainer>
            <TextContainer>
              <MainTextContainer>
                <MainText>
                  Design, Develop & Deliver{' '}
                  <StyledText
                    className={text === 'Processes.' ? 'blue' : 'orange'}
                    $animationDirection={animationDirection}
                  >
                    {text}
                  </StyledText>
                </MainText>
              </MainTextContainer>
            </TextContainer>
          </div>
        </div>
        <ScrollBox>
          <Image src='/images/hero/arrow-down-s-line.png' alt='arrow-image' />
          <Image src='/images/hero/arrow-down-s-line.png' alt='arrow-image' />
          <Scroll>Scroll down</Scroll>
        </ScrollBox>
      </ContentContainer>
    </HeroContainer>
  );
};

export const HeroContainer = styled.div`
  margin-top: -5rem;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 800px) {
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 2.5rem;
  }
`;

export const Image = styled.img`
  width: 7.3125rem;
  height: 4.4375rem;
  display: inline-flex;
  flex-direction: column;
`;

export const ScrollBox = styled.div`
  position: absolute;
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Scroll = styled.p`
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 2.8rem */
  letter-spacing: -0.01rem;
`;
export const VideoContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  @media (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Video = styled.video`
  position: absolute;
  top: 55%;
  left: 47%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;

  @media (max-width: 800px) {
    //  max-width:250%;
    width: 100vw;
    top: 50%;
    left: 50%;
    object-fit: cover;
  }
`;

export const ContentContainer = styled.div`
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 100%;
  padding: 20px;
  position: absolute;

  @media (max-width: 800px) {
    width: 100%;
    padding: 0;
  }
`;

export const TitleContainer = styled.div`
  border-radius: 6.25rem;
  background: #ebf8fe;
  display: flex;
  padding: 0.5rem 0.875rem;
  justify-content: center;
  align-items: center;
  width: 18rem;
  height: 2.25rem;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledParagraph = styled.p`
  color: #0f0f10;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 900;
  line-height: 140%;
  letter-spacing: -0.00438rem;
  align-items: center;
  position: absolute;
  top: 25%;
`;

export const TextContainer = styled.div`
  overflow: hidden;
  height: 12.75rem;
  position: relative;

  @media screen and (max-width: 800px) {
    overflow: hidden;
    height: 6.75rem;
  }
`;

export const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media (max-width: 800px) {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.125rem;
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
  margin: -2rem 22rem;
  padding: 1.5rem;

  @media (max-width: 800px) {
    font-size: 2.2rem;
    margin: 0;
    padding: 0 2rem;
    display: flex;
    width: 22.25rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.125rem;
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

const StyledText = styled.p`
  margin: ${(props) =>
    props.$animationDirection === 'bottom'
      ? '-7rem 0 0 14.5rem'
      : '0rem 0 9rem 14.5rem'};
  gap: 0.125rem;
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
  @media (max-width: 800px) {
    margin: ${(props) =>
      props.$animationDirection === 'bottom'
        ? '1rem 0 0 6rem'
        : '9rem 0 0 6rem'};
  }
  position: absolute;
`;

export default Hero1;
