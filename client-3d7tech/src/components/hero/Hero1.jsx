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
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <HeroContainer>
      <Video src='/videos/bgimage.mov' autoPlay loop muted />
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
                    animationDirection={animationDirection}
                  >
                    {text}
                  </StyledText>
                </MainText>
              </MainTextContainer>
            </TextContainer>
          </div>
        </div>
      </ContentContainer>
    </HeroContainer>
  );
};

export const HeroContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin-top: -5rem;
  z-index: -1;
`;

export const Video = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
`;

export const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px;
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
`;

export const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`