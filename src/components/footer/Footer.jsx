import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BsWhatsapp } from 'react-icons/bs';
import { GrInstagram, GrLinkedin, GrTwitter } from 'react-icons/gr';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import { theme } from '../../theme/theme';

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
    <FooterContainer fluid>
      <ContentWrapper>
        <FooterGrid md={4}>
          <FooterColumn xs={6}>
            <FooterLink href='/'>
              <FooterLogo src='/images/logo/logo-small.png' alt='3d7tech Logo' />
              <CompanyName>3d7 Technologies Limited</CompanyName>
            </FooterLink>
          </FooterColumn>
          <FooterColumn xs={3}>
            <FooterHeading>Company</FooterHeading>
            <FooterLink href='/aboutUs'>
              <FooterText>About us</FooterText>
            </FooterLink>
            <FooterLink href='https://blog.3d7tech.com/'>
              <FooterText>Blog</FooterText>
            </FooterLink>
          </FooterColumn>
          <FooterColumn xs={3}>
            <FooterHeading>Products</FooterHeading>
            <FooterLink
              href='https://docuhelp.ai/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FooterText>Docuhelp</FooterText>
            </FooterLink>
            <FooterLink
              href='https://requstory.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FooterText>Requstory</FooterText>
            </FooterLink>
          </FooterColumn>
          <FooterColumn xs={3}>
            <FooterHeading>Connect</FooterHeading>
            <FooterLink
              href='https://calendly.com/consult3d7tech/project-consultancy'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FooterText>Contact</FooterText>
            </FooterLink>
          </FooterColumn>
        </FooterGrid>
        <FooterBottom>
          <BottomSection>
            <FooterLink href='/'>
              <FooterLogo src='/images/logo/logo-small.png' alt='3d7tech Logo' />
            </FooterLink>

            <Copyright>
              Copyright © 2023 3D7 TECH. All rights reserved
            </Copyright>

            <SocialLinks>
              <SocialIconsGroup>
                <FooterLink
                  href='https://www.linkedin.com/company/3d7-technologies-ltd'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GrLinkedin />
                </FooterLink>
                <FooterLink
                  href='https://www.instagram.com/3d7tech/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GrInstagram />
                </FooterLink>
                <FooterLink
                  href='https://twitter.com/3d7techdotcom'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GrTwitter />
                </FooterLink>
                <FooterLink
                  href='https://wa.me/message/PMH3PQH4SDYVN1'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <BsWhatsapp />
                </FooterLink>
              </SocialIconsGroup>
            </SocialLinks>
          </BottomSection>
        </FooterBottom>
      </ContentWrapper>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled(Container)`
  background: ${theme.colors.background.primary};
  position: relative;
  overflow: hidden;
  padding-top: ${theme.spacing['4xl']};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${theme.colors.border.primary}, transparent);
  }
`;

const ContentWrapper = styled.div`
  max-width: ${theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const FooterGrid = styled(Row)`
  display: flex;
  justify-content: space-between;
  padding: ${theme.spacing['2xl']} 0;
  
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    padding: ${theme.spacing.xl} 0;
    gap: ${theme.spacing.xl};
  }
`;

const FooterColumn = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.md}) {
    align-items: center;
    text-align: center;
    margin-bottom: 0;
  }

  &:first-child {
    @media (max-width: ${theme.breakpoints.md}) {
      margin-bottom: ${theme.spacing.xl};
    }
  }
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.text.primary};
  transition: ${theme.transitions.base};
  font-size: ${theme.typography.fontSize.base};

  @media (max-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
  }

  &:hover {
    color: ${theme.colors.accent.primary};
  }
`;

const FooterLogo = styled.img`
  height: 3rem;
  width: auto;

  @media (max-width: ${theme.breakpoints.md}) {
    height: 2.5rem;
  }
`;

const CompanyName = styled.p`
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.text.primary};
  margin-top: ${theme.spacing.md};
`;

const FooterHeading = styled.h3`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.lg};
  font-weight: ${theme.typography.fontWeight.bold};
  margin-bottom: ${theme.spacing.sm};

  @media (max-width: ${theme.breakpoints.md}) {
    margin-bottom: ${theme.spacing.xs};
  }
`;

const FooterText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.base};
  transition: ${theme.transitions.base};

  ${FooterLink}:hover & {
    color: ${theme.colors.accent.primary};
  }
`;

const FooterBottom = styled(Row)`
  border-top: 1px solid ${theme.colors.border.primary};
  padding: ${theme.spacing.xl} 0;
`;

const BottomSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${theme.spacing.xl};
    text-align: center;
  }
`;

const Copyright = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.sm};
`;

const SocialLinks = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

const SocialIconsGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize['2xl']};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.typography.fontSize.xl};
    gap: ${theme.spacing.md};
  }

  svg {
    path {
      stroke: ${theme.colors.text.primary};
    }
  }
`;
