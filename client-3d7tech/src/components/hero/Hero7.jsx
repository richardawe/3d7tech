import { Container, TextBox, ParagraphOne, ParagraphTwo } from './Hero5';
import styled from 'styled-components';

const Hero7 = () => {
  return (
    <Container>
      <TextBox>
        <ParagraphOne>Amazing Partners We’re</ParagraphOne>
        <ParagraphTwo>Truly priviledged to have worked with</ParagraphTwo>
      </TextBox>
      <LogoBox>
        <img
          src='/images/partners/european-central-bank.jpg'
          alt='partner-one'
          style={{ height: '3.75rem', width: '3.75rem' }}
        />
        <img
          src='/images/partners/swinton.jpg'
          alt='partner-two'
          style={{ height: '5rem', width: '5rem' }}
        />
        <img
          src='/images/partners/lloyds.jpg'
          alt='partner-three'
          style={{ height: '5rem', width: '5rem' }}
        />
        <img
          src='/images/partners/autoweb.jpg'
          alt='partner-four'
          style={{ height: '5rem', width: '5rem' }}
        />
        <img
          src='/images/partners/hsbc.jpg'
          alt='partner-five'
          style={{ height: '7.5rem', width: '7.5rem', zIndex: '-1' }}
        />
        <img
          src='/images/partners/barclays.jpg'
          alt='partner-six'
          style={{ height: '5rem', width: '5rem' }}
        />
      </LogoBox>
    </Container>
  );
};

export const LogoBox = styled.div`
  display: flex;
  padding: 0 5rem;
  height: 7.5rem;
  justify-content: center;
  align-items: center;
  gap: 5.9375rem;
  border-radius: 625rem;
  border: 1px solid var(--Primary, #079be6);
  margin-left: -5rem;
  width: 70.937rem;
  margin-top: -2rem;
`;

export default Hero7;
