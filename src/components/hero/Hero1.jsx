import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

/**
 * Hero1 Component
 *
 * This component represents the Hero section with a video background and animated text.
 *
 * @component
 * @example
 */

const Hero1 = () => {
  const [text, setText] = useState("Products.");
  const [animationDirection, setAnimationDirection] = useState("top");
  /**
   * useEffect hook to manage text and animation direction changes.
   *
   * This hook updates the text and animation direction at regular intervals.
   *
   */

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prevText) =>
        prevText === "Products." ? "Processes." : "Products."
      );

      setAnimationDirection((prevDirection) =>
        prevDirection === "top" ? "bottom" : "top"
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <HeroOneContainer>
      <Video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/poster/posterImg.png"
      >
        <source src="/videos/bgimage.mp4" type="video/mp4" />
      </Video>
      <ContentContainer>
        <TitleContainer>
          <StyledParagraph>
            We create software for small businesses to...
          </StyledParagraph>
        </TitleContainer>
        <TextContainer>
          <MainTextContainer>
            <MainText>
              Design, Develop & <br /> Deliver
            </MainText>
            <AnimationContainer>
              <MainText className="deliver-text"></MainText>
              <StyledText
                className={text === "Processes." ? "blue" : "orange"}
                $animationDirection={animationDirection}
              >
                {text}
              </StyledText>
            </AnimationContainer>
          </MainTextContainer>
        </TextContainer>
        <ScrollBox>
          <Image src="/images/hero/arrow-down-s-line.png" alt="arrow-image" />
          <Image src="/images/hero/arrow-down-s-line.png" alt="arrow-image" />
          <Scroll>Scroll down</Scroll>
        </ScrollBox>
      </ContentContainer>
    </HeroOneContainer>
  );
};

export const HeroOneContainer = styled.div`
  /* position: relative; */
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
  line-height: 140%;
  letter-spacing: -0.01rem;
  @media (min-width: 280px) and (max-width: 912px) {
    font-size: 1.2rem;
  }
`;

export const Video = styled.video`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 95%;
  object-fit: cover;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    height: 100vh;
  }
`;
export const ContentContainer = styled(Container)`
  position: absolute;
  left: 0;
  top: 15%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  gap: 2rem;
  background: transparent;
  @media only screen and (max-width: 768px) {
    left: 0;
    top: 15%;
  }
  @media only screen and (min-width: 1024px) and (max-width: 1024px) {
    left: 0;
    top: 20%;
  }
`;

export const TitleContainer = styled.div`
  border-radius: 6.25rem;
  background: #ebf8fe;
  display: flex;
  padding: 0.5rem 0.875rem;
  justify-content: center;
  align-items: center;
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
  @media only screen and (max-width: 1024px) {
    font-size: 0.7rem;
  }
`;

export const TextContainer = styled.div``;

export const MainTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: fit-content;
  margin: 0 auto;
  position: relative;
  @media only screen and (max-width: 1024px) {
  }
`;

export const MainText = styled.h1`
  color: #0f0f10;
  font-size: 3.8rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  letter-spacing: -0.0225rem;
  gap: 0.125rem;
  @media only screen and (max-width: 1024px) {
    font-size: 2rem;
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
  font-size: 3.8rem;
  height: 6rem;
  overflow-y: hidden;
  position: absolute;
  top: 40%;
  left: 45%;
  @media only screen and (max-width: 1024px) {
    font-size: 2rem;
  }
`;
const StyledText = styled.p`
  width: 26vw;
  left: 43.5%;
  margin: ${(props) =>
    props.$animationDirection === "bottom" ? "0 0 -6rem 0" : "0 0 0 0"};
  font-weight: bold;
  animation: ${(props) =>
      props.$animationDirection === "bottom"
        ? slideBottomToTop
        : slideTopToBottom}
    2s ease-in-out infinite;

  &.blue {
    color: #2507df;
  }

  &.orange {
    color: #e15c12;
  }
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export default Hero1;
