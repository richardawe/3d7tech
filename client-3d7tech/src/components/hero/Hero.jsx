import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Hero = () => {
  const [text, setText] = useState('processes.');

  useEffect(() => {
    const interval = setInterval(() => {
      // Toggle between 'Processes.' and 'Products.'
      setText((prevText) => (prevText === 'Products.' ? 'Processes.' : 'Products.'));
    },2000);

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
              <StyledParagraph>3D7 TECH Helps Individuals & Companies</StyledParagraph>
            </TitleContainer>
            <input id='efdw' type='hidden' value={text} />
            <MainText>
              Design, Develop & Deliver   <StyledText>{text}</StyledText>
            </MainText>
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
  padding: 20px; /* Add padding to the content */
  
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
  font-family: DM Sans;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.225rem */
  letter-spacing: -0.00438rem;
  align-items: center;
  position: absolute;
  top: 25%;


`;
export const MainText = styled.h1`
  color: #0f0f10;
  text-align: center;
  font-size: 4.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 6.3rem */
  letter-spacing: -0.0225rem;
  gap: 0.125rem;
  margin: 0 22rem;
`;

const StyledText = styled.span`
  color: ${({ children }) =>
    children === 'Processes.' ? '#2507DF' : '#E15C12'};
  font-weight: bold;
`;
export default Hero;
