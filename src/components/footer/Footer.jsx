import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BsWhatsapp } from 'react-icons/bs';
import { GrInstagram, GrLinkedin, GrTwitter } from 'react-icons/gr';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

/**
 * LandingFooter Component
 *
 * This component represents the footer section of the landing page.
 * It displays various information like Stay In Touch section with email subscription,
 * Company information, Contact Us details, logo, and social media icons.
 *
 * @returns {JSX.Element} JSX Element representing the LandingFooter component.
 */

function Footer() {
  return (
    <>
      <ContainerStyle fluid>
        <RowStyle md={4}>
          <StyledCol xs={6}>
            <LinkStyle href='/'>
              <img src='/images/logo/logo-small.png' alt='3d7tech Logo' />
              <StyledText>3d7 Technologies Limited</StyledText>
            </LinkStyle>
          </StyledCol>
          <StyledCol xs={3}>
            <TextH6>Company</TextH6>
            <LinkStyle href='/'>
              <LinkP>About</LinkP>
            </LinkStyle>
            <LinkStyle href='#'>
              <LinkP>Blog</LinkP>
            </LinkStyle>
          </StyledCol>
          <StyledCol xs={3}>
            <TextH6>Products</TextH6>
            <LinkStyle href='#'>
              <LinkP>Docuhelp</LinkP>
            </LinkStyle>
            <LinkStyle
              href='https://requstory.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkP>Requstory</LinkP>
            </LinkStyle>
          </StyledCol>
          <StyledCol xs={3}>
            <TextH6>Connect</TextH6>
            <LinkStyle
              href='https://calendly.com/consult3d7tech/project-consultancy'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkP>Contact</LinkP>
            </LinkStyle>
          </StyledCol>
        </RowStyle>
        <StyledRow>
          <StyledSection>
            <a href='#'>
              <img src='/images/logo/top-logo.jpg' alt='3d7tech Logo' />
            </a>

            <StyledSpan>
              Copyright © 2023 3D7 TECH. All rights reserved
            </StyledSpan>

            <StyledColumn>
              <IconsWrap>
                <LinkStyle
                  href='https://www.linkedin.com/company/3d7-technologies-ltd'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GrLinkedin />
                </LinkStyle>
                <LinkStyle
                  href='https://www.instagram.com/3d7tech/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GrInstagram />
                </LinkStyle>
                <LinkStyle
                  href='https://twitter.com/3d7techdotcom'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GrTwitter />
                </LinkStyle>
                <LinkStyle
                  href='https://wa.me/message/PMH3PQH4SDYVN1'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <BsWhatsapp />
                </LinkStyle>
              </IconsWrap>
            </StyledColumn>
          </StyledSection>
        </StyledRow>
      </ContainerStyle>
    </>
  );
}

export default Footer;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 2rem;
  width: fit-content;

  @media (max-width: 800px) {
  }
`;

const StyledText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 160%;
  color: var(--text-color, #0d0c0d);
  width: 19rem;
  margin-top: 1rem;
  @media (max-width: 800px) {
    max-width: 100%;
  }
`;

const IconsWrap = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  p {
    margin: auto 0;
  }
  @media (max-width: 800px) {
    gap: 1rem;
  }
`;

const StyledRow = styled(Row)`
  justify-content: center;
  border-top: 1px solid rgba(153, 153, 153, 0.5);
  padding: 2rem 3rem 2rem 3rem;

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 1rem 0;
    align-items: center;
    gap: 1rem;
  }
`;

const StyledSpan = styled.span`
  color: var(--text-color, #0d0c0d);
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  font-size: 0.8125rem;

  @media (max-width: 800px) {
    font-size: 0.7em !important;
    margin-bottom: -1rem;
  }
`;

const RowStyle = styled(Row)`
  display: flex;
  justify-content: space-between;
  padding: 3rem;
  margin: auto 4rem 0 0;
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 0;
  }
`;

const LinkStyle = styled.a`
  text-decoration: none;
  color: var(--text-color, #0d0c0d);
`;

const LinkP = styled.p`
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin: -0.1rem;
`;
const TextH6 = styled.h6`
  color: var(--text-color, #0d0c0d);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;
const StyledSection = styled.section`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;
const StyledColumn = styled(Col)`
  display: flex;
  justify-content: flex-end;
  font-size: 1.5rem;
  @media (max-width: 800px) {
    font-size: 1rem;
  }
`;

const ContainerStyle = styled(Container)`
  padding-top: 3rem;
  background: #f7f7f8;
`;
