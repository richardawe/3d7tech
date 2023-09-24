import React from 'react';
import styled from 'styled-components';
import Button from '../button/Button';

const Hero5 = () => {
  return (
    <Container>
      <TextBox>
        <ParagraphOne>
          Need help with cloud migration or restructuring?
        </ParagraphOne>
        <ParagraphTwo>
          Click the button below to get tell us your needs and get a customized
          quote
        </ParagraphTwo>
        <Button
          onClick={''}
          title='Speak With An Expert'
          backgroundColor='#079BE6'
          textColor='#fff'
          padding='1rem 0.5rem'
          borderRadius='0.625rem'
          height='3.25rem'
          width='13.875rem'
        />
      </TextBox>
    </Container>
  );
};

export const Container = styled.div`
  padding: 8.75rem 14.6875rem;
  justify-content: center;
  align-items: center;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 60.625rem;
  height: 20rem;
`;
export const ParagraphOne = styled.p`
  color: #0f0f10;
  text-align: center;
  font-size: 4rem;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.1rem;
`;
export const ParagraphTwo = styled.p`
  color: #0f0f10;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 180%;
  letter-spacing: -0.00563rem;
`;

export default Hero5;
