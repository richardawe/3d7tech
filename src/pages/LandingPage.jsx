import CookieBanner from "../components/privacyPolicy/CookieBanner";
import NavBar from "../components/navBar/NavBar";
import SeoMeta from "../components/SeoMeta";
import Hero1 from "../components/hero/Hero1";
import Hero2 from "../components/hero/hero2/Hero2";
import Hero3 from "../components/hero/Hero3";
import Hero4 from "../components/hero/Hero4";
import Hero7 from "../components/hero/Hero7";
import Footer from "../components/footer/Footer";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../theme/theme";

/**
 * LandingPage component rendering the main landing page.
 * Manages the display of various components based on user interaction.
 * @returns {JSX.Element} JSX for the landing page.
 */

const LandingPage = () => {
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const userCookieConsent = localStorage.getItem("cookieConsent");
    setIsCookieAccepted(userCookieConsent === "accepted");
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsCookieAccepted(true);
  };

  const handleCookieReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsCookieAccepted(true);
  };

  useEffect(() => {
    isCookieAccepted &&
      setTimeout(() => {
        setShowPopUp(true);
      }, 10000);
  }, [isCookieAccepted]);

  return (
    <LandingContainer>
      <SeoMeta
        title="3D7 Technologies - AI Innovation & Development"
        description="We specialise in crafting cutting-edge AI systems tailored to your unique business requirements. Our expert team combines innovation and precision to transform your vision into reality."
        path="/"
      />
      <Overlay $isCookieAccepted={isCookieAccepted}></Overlay>
      {!isCookieAccepted && (
        <CookieBanner
          onAccept={handleCookieAccept}
          onReject={handleCookieReject}
        />
      )}
      <NavBar />
      <RevenueIntelligenceSection>
        <RIBadge>Revenue Intelligence</RIBadge>
        <RIHeadline>Map Your Revenue Workflow in Minutes</RIHeadline>
        <RISubline>
          Paste your website URL and get a tailored lead-to-cash flowchart,
          revenue levers, and a personalised outbound email — free.
        </RISubline>
        <RIButton to="/revenue-workflow">Generate Revenue Workflow →</RIButton>
      </RevenueIntelligenceSection>
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Hero4 />
      <Hero7 />
      <Footer />
      {/* {showPopUp && (
        <Modal clickScreen={() => setShowPopUp(false)}>
          <PopUp closeModal={() => setShowPopUp(false)} />
        </Modal>
      )} */}
    </LandingContainer>
  );
};
const LandingContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  display: ${(props) => (props.$isCookieAccepted ? "none" : "block")};
`;

const RevenueIntelligenceSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 1.5rem;
  background: linear-gradient(to bottom, #0a0a0a, #1e3a8a);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(96, 165, 250, 0.2),
      transparent
    );
  }
`;

const RIBadge = styled.span`
  display: inline-block;
  color: ${theme.colors.accent.primary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

const RIHeadline = styled.h2`
  ${theme.mixins.textGradient}
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: ${theme.typography.fontWeight.extrabold};
  line-height: ${theme.typography.lineHeight.tight};
  max-width: 640px;
  margin: 0 0 1rem;
`;

const RISubline = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSize.lg};
  max-width: 560px;
  margin: 0 0 2rem;
  line-height: ${theme.typography.lineHeight.relaxed};
`;

const RIButton = styled(Link)`
  display: inline-block;
  padding: 0.9rem 2rem;
  background: linear-gradient(45deg, #60a5fa, #3b82f6);
  color: #fff;
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  border-radius: ${theme.borderRadius.md};
  text-decoration: none;
  transition: ${theme.transitions.base};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(96, 165, 250, 0.35);
    color: #fff;
  }
`;

export default LandingPage;
