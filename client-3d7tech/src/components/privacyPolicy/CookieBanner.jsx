import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../button/Button';

const CookieBanner = ({ onAccept, onReject }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleAcceptClick = () => {
        setIsVisible(false);
        onAccept();
    };

    const handleRejectClick = () => {
        setIsVisible(false);
        onReject();
    };
    return (
      isVisible && (
        <CookieConsentStyle>
          <TextStyle>
            This site uses cookies to ensure you get the best experience on our
            website. To learn more visit our{' '}
            <LinkStyle
              href='/privacypolicy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Privacy Policy
            </LinkStyle>
            .
          </TextStyle>
          <ButtonDiv>
            <Button
              onClick={handleRejectClick}
              title='Reject All Cookies'
              backgroundColor='#fff'
              textColor='#079BE6'
              padding='1.2rem 1.5rem'
              borderRadius='0.5rem'
              
            />
            <Button
              onClick={handleAcceptClick}
              title='Accept All Cookies'
              backgroundColor='#079BE6'
              textColor='#fff'
              padding='1.2rem 1.5rem'
              borderRadius='0.5rem'
            />
          </ButtonDiv>
        </CookieConsentStyle>
      )
    );
};

export default CookieBanner;

export const CookieConsentStyle = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    height: 2.5rem;
    padding:1rem 2.5rem 3.4rem 3rem;

    @media (min-width: 300px) and (max-width: 600px) {
        padding: 5rem 0.5rem 5rem 0.5rem;
         bottom:35rem;
        flex-direction: column;
        width: 80%;
         justify-content: center;
        margin-left:1rem;
        border-radius:0.2rem
  
`;
export const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    @media (min-width: 300px) and (max-width: 600px) {
        justify-content: space-around;
       
    }
    button {
    @media (min-width: 300px) and (max-width: 600px) {
        width:8rem;
        font-size: 0.8rem;
    }
`;

export const TextStyle = styled.p`
    color: var(--text-color, #0d0c0d);
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    width: 38rem;
    letter-spacing: -0.00563rem;
    @media (min-width: 300px) and (max-width: 600px) {
        font-size: 1rem;
        width: 100%;
    }
`;
export const LinkStyle = styled.a`
  color: #079be6;
  font-size: 1rem;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: -0.00563rem;
  text-decoration: none;
  @media (min-width: 300px) and (max-width: 600px) {
    font-size: 1rem;
  }
`;
