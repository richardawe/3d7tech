import React from 'react';
import styled from 'styled-components';

const Hero = () => {
  return (
    <>
      <AboutUsImage>
      </AboutUsImage>
    </>
  );
};

export const AboutUsImage = styled.div`
  margin-top: 5rem;
  width: 100%;
  aspect-ratio: 12/5;
  height: auto;
  background: url('/images/aboutUs/aboutUsHero.svg') no-repeat;
  background-size: 100% 100%;

  @media (max-width: 767px) {
    margin-top: 6.5rem;
    -moz-transform: scale(1.3, 1.3);
    -webkit-transform: scale(1.3, 1.3);
    transform: scale(1.3, 1.3);
  }
  @media screen and (min-width: 2560px) {
  }
`;
export const Image = styled.img`
  aspect-ratio: 1/1;
  object-fit: contain;
  border: 2px solid red;
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
  }
`;
export default Hero;
