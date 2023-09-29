import ImageComponent from './ImageComponent';
import React from 'react';
import styled from 'styled-components';

const Hero2 = () => {
  return (
    <Wrapper>
      <TextBox>
        <TitleStyle>Our Developed Products & Projects.</TitleStyle>
        <TextStyle>
          Here are some projects we have led and products we have built.
        </TextStyle>
      </TextBox>
      <ImageComponent imageSrc='/images/hero/hero2a.png' />
      <ImageComponent imageSrc='/images/hero/hero2b.png' />
      <ImageComponent imageSrc='/images/hero/hero2a.png' />
      <ImageComponent imageSrc='/images/hero/hero2b.png' />
    </Wrapper>
  );
};

export default Hero2;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #131316;
`;
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  margin-top: 6.75rem;
  width: 50.475rem;
`;
export const TitleStyle = styled.div`
  color: #fafafa;
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
  line-height: 140%; /* 4.2rem */
  letter-spacing: -0.015rem;
`;
export const TextStyle = styled.p`
  color: #e6e6e6;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 140%; /* 1.575rem */
  letter-spacing: -0.00563rem;
`;
