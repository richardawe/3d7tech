import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

/**
 * Hero7 Component
 *
 * This component displays a hero section showcasing amazing partners.
 * It includes partner logos and descriptive text.
 *
 * @component
 * @returns {JSX.Element} The rendered Hero7 component.
 */

const Hero7 = () => {
  return (
    <ContainerStyle fluid>
      <CenteredContent>
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
            style={{ height: '7rem', width: '7rem', zIndex: '1' }}
          />
          <img
            src='/images/partners/barclays.jpg'
            alt='partner-six'
            style={{ height: '5rem', width: '5rem' }}
          />
        </LogoBox>
      </CenteredContent>
    </ContainerStyle>
  );
};

const ContainerStyle = styled(Container)`
  padding: 10rem;
  @media (max-width: 912px) {
    padding: 2rem;
  }
`;

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5.9375rem;
  border-radius: 625rem;
  border: 1px solid var(--Primary, #079be6);
  width: 70.937rem;
  @media (max-width: 912px) {
    flex-wrap: wrap;
    width: 100vw;
    border: none;
  }
  @media (min-width: 1024px) {
    width: 100%;
    gap: 2rem;
  }
  @media (min-width: 2560px) {
    width: 100%;
    height: auto;
  }
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 60.625rem;
  @media (max-width: 912px) {
    width: 100vw;
    height: auto;
  }
  @media (min-width: 2560px) {
    width: 100%;
    height: auto;
  }
`;
export const ParagraphOne = styled.p`
  color: #0f0f10;
  text-align: center;
  font-size: 4rem;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.1rem;
  @media (max-width: 912px) {
    font-size: 2.5rem;
  }
`;
export const ParagraphTwo = styled.p`
  color: #0f0f10;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 180%;
  letter-spacing: -0.00563rem;
`;

export default Hero7;
