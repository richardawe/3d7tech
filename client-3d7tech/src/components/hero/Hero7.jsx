import React from 'react';
import styled from 'styled-components';
import Button from '../button/Button';
import { TextWrapper, Title, TextBody} from '../hero/Hero4'


const Hero7 = () => {
    return (
      <Container>
        <TextWrapper>
          <Title>Training Consultancy</Title>
          <TextBody>
            3d7tech is a UK's leading provider of systems development and
            business analysis training courses, delivered as public programmes,
            on-site training and e-learning solutions for businesses and
            individuals across all industries.
          </TextBody>
        </TextWrapper>
      </Container>
    );
};
const Container= styled.div`
 margin-top:7rem;
`;
export default Hero7;
