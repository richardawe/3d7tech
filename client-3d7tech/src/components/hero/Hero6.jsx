import React from 'react';
import styled from 'styled-components';
// import SVGImage from '../../../public/images/bgimage.svg';
import HeroCard from '../card/Card';

const Hero6 = () => {
  return (
    <Container
    //style={{ backgroundImage: `url(${SVGImage})` }}
    >
      <TextContainer>
        <TextBox>Training Consultancy</TextBox>
        <ParagraphStyle>
          3d7tech is a UK's leading provider of systems development and business
          analysis training courses, delivered as public programmes, on-site
          training and e-learning solutions for businesses and individuals
          across all industries.
        </ParagraphStyle>
      </TextContainer>
      <CardContainer>
        <HeroCard
          imageSrc='/images/hero/hero6a.jpeg'
          title='Business Analysis'
          buttonTitle='Enroll Now'
        />
        <HeroCard
          imageSrc='/images/hero/hero6b.png'
          title='Project Management'
          buttonTitle='Enroll Now'
        />
        <HeroCard
          imageSrc='/images/hero/hero6c.jpeg'
          title='Solution Testing'
          buttonTitle='Enroll Now'
        />
        <HeroCard
          imageSrc='/images/hero/hero6d.png'
          title='Business Analysis'
          buttonTitle='Enroll Now'
        />
      </CardContainer>
    </Container>
  );
};
const Container = styled.div`
  border-top: 1px solid #079be6;
  border-bottom: 1px solid #079be6;
  background-color: white;
`;
const TextBox = styled.h1`
  width: 29.93rem;
  height: 2rem;
  color: #0f0f10;
  font-size: 3rem;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.015rem;
`;
export const TextContainer = styled.div`
  margin-top: 5.79rem;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  width: 39.56rem;
  height: 10rem;
  margin-left: 4rem;
`;

export const ParagraphStyle = styled.p`
  margin-top: 2rem;
  width: 40rem;
  color: #0f0f10;
  font-family: DM Sans;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 400;
  line-height: 180%; /* 2.025rem */
  letter-spacing: -0.00563rem;
`;

export const CardContainer = styled.div`
  margin-top: 4.5rem;
  margin-bottom: 5rem;
  display: inline-flex;
  align-items: flex-start;
  gap: 1rem;
  margin-left: 2.5rem;
`;
export default Hero6;
