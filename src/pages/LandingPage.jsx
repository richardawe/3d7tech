import CookieBanner from '../components/privacyPolicy/CookieBanner';
import NavBar from '../components/navBar/NavBar';
import Hero1 from '../components/hero/Hero1';
import Hero2 from '../components/hero/hero2/Hero2';
import Hero3 from '../components/hero/Hero3';
import Hero4 from '../components/hero/Hero4';
import Hero6 from '../components/hero/Hero6';
import Hero7 from '../components/hero/Hero7';
import Footer from '../components/footer/Footer';
import Modal from '../components/popup/Modal';
import PopUp from '../components/popup/PopUp';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

/**
 * LandingPage component rendering the main landing page.
 * Manages the display of various components based on user interaction.
 * @returns {JSX.Element} JSX for the landing page.
 */

const LandingPage = () => {
  const [isCookieAccepted, setIsCookieAccepted] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const userCookieConsent = localStorage.getItem('cookieConsent');
    setIsCookieAccepted(userCookieConsent === 'accepted');
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsCookieAccepted(true);
  };

  const handleCookieReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
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
      <Overlay $isCookieAccepted={isCookieAccepted}></Overlay>
      {!isCookieAccepted && (
        <CookieBanner
          onAccept={handleCookieAccept}
          onReject={handleCookieReject}
        />
      )}
      <NavBar />
      <Hero1 />
      <Hero6 />
      <Hero3 />
      <Hero4 />
      <Hero2 />
      <Hero7 />
      <Footer />
      {showPopUp && (
        <Modal clickScreen={() => setShowPopUp(false)}>
          <PopUp closeModal={() => setShowPopUp(false)} />
        </Modal>
      )}
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
  display: ${(props) => (props.$isCookieAccepted ? 'none' : 'block')};
`;

export default LandingPage;
