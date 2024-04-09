import React from 'react';
import { whatWeDo } from './data';
import styled from 'styled-components';

const WhatWeDo = () => {
  return (
    <Wrapper>
      <TextOne>
        <h3>WHAT WE DO AT 3D7 TECHNOLOGY</h3>
      </TextOne>
      <ParagraphStyle>
        <ParagraphOne>{whatWeDo.paragraphOne}</ParagraphOne>
        <ParagraphTwo>{whatWeDo.paragraphTwo}</ParagraphTwo>
      </ParagraphStyle>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5rem;
  @media (max-width: 767px) {
    padding: 3rem 1rem 0 1rem;
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
 
    gap: 2rem;
  }
`;
export const TextOne = styled.div`
  padding: 2rem;
  width: 25rem;
  h3 {
    font-family: DM Sans;
    font-size: 64px;
    font-weight: 700;
    line-height: 76.8px;
    letter-spacing: 0.008em;
    color: #079be6;
  }
  @media (max-width: 767px) {
    width: 100%;
    padding: 0;
    h3 {
      width: 18rem;
      font-size: 40px;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    width:100%;
    h3 {
      font-size: 40px;
    }
  }
  @media screen and (min-width: 2560px) {
    width: 100%;
  }
`;
export const ParagraphOne = styled.p`
  font-family: DM Sans;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -0.005em;
  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 16px;
  }
`;
export const ParagraphTwo = styled.p`
  font-family: DM Sans;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -0.005em;
  @media (max-width: 767px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 16px;
  }
`;
export const ParagraphStyle = styled.div`
  margin: 7rem 0;
  padding: 1rem 1rem 0 1rem;
  @media (max-width: 767px) {
    margin: 0;
    padding: 0;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin: 0;
    padding: 0;
  }

`;
export default WhatWeDo;
