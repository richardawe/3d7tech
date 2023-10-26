import ImageComponent from './ImageComponent';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

/**
 * Hero2 Component
 *
 * This component displays a hero section with a title, description,
 * and multiple images linked to different websites.
 *
 * @component
 * @returns {JSX.Element} The rendered Hero2 component.
 */

const Hero2 = () => {
  const [imagesrc, setImageSrc] = useState({
    image1: '/images/hero/hero2a.png',
    image2: '/images/hero/hero2b.png',
  });
  return (
    <Wrapper>
      <TextBox>
        <TitleStyle>Our Developed Products & Projects.</TitleStyle>
        <TextStyle>
          Here are some projects we have led and products we have built.
        </TextStyle>
      </TextBox>
      <ImageComponent
        imageSrc={imagesrc.image1}
        image2Src='/images/documobile.png'
        link='https://docuhelp.ai/'
        productTitle='Docuhelp'
        product='DocuHelp helps you write business documents'
      />
      <ImageComponent
        imageSrc={imagesrc.image2}
        image2Src='/images/requstorymobile.png'
        link='https://requstory.com/'
        productTitle='Requstory'
        product='Requstory helps you write your ‘user story’ fast by simply describing the features of your project/product.'
      />
      <ImageComponent
        imageSrc={imagesrc.image1}
        image2Src='/images/documobile.png'
        link='https://docuhelp.ai/'
        productTitle='Docuhelp'
        product='DocuHelp helps you write business documents'
      />
      <ImageComponent
        imageSrc={imagesrc.image2}
        image2Src='/images/requstorymobile.png'
        link='https://requstory.com/'
        productTitle='Requstory'
        product='Requstory helps you write your ‘user story’ fast by simply describing the features of your project/product.'
      />
    </Wrapper>
  );
};

export default Hero2;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #131316;

  @media (max-width: 800px) {
    width: 100vw;
    height: auto;
    position: relative;
    display: inline-block;
  }
`;
export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  margin-top: 6.75rem;
  width: 50.475rem;
  @media (max-width: 800px) {
    width: 100%;
    margin: auto;
  }
`;
export const TitleStyle = styled.div`
  color: #fafafa;
  text-align: center;
  font-size: 3rem;
  font-weight: 500;
  line-height: 140%; /* 4.2rem */
  letter-spacing: -0.015rem;
  @media (max-width: 800px) {
    width: 100%;
    padding: 1rem;
    font-size: 2rem;
  }
`;
export const TextStyle = styled.p`
  color: #e6e6e6;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 140%; /* 1.575rem */
  letter-spacing: -0.00563rem;
`;
