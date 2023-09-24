import React from 'react'
import styled from 'styled-components';

const Hero2 = () => {
  return (
    <Wrapper>
      <TitleStyle>Our Developed Products & Projects.</TitleStyle>
    </Wrapper>
  );
}

export default Hero2

export const Wrapper = styled.div`
  width: 90rem;
  height: 192.9375rem;
  flex-shrink: 0;
  background: #131316;
`;

export const TitleStyle = styled.div`
  color: #fafafa;
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
  line-height: 140%; /* 4.2rem */
  letter-spacing: -0.015rem;
`;