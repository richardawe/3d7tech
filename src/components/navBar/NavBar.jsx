import Container from "react-bootstrap/Container";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

/**
 * NavBar Component
 *
 * This component represents the navigation bar for the website. It includes the logo,
 * hamburger menu icon for mobile navigation, and dropdown menu for navigation links.
 *
 * @component
 * @returns {JSX.Element} The rendered NavBar component.
 */

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown();
    }
  };

  return (
    <StyledContainer fluid>
      <LinkStyle href="/">
        <ImageWrapper src="/images/logo/logo-small.png" alt="3d7tech Logo" />
      </LinkStyle>
      <hamburger-button
        aria-label="Open navigation menu"
        onClick={toggleDropdown}
        onKeyDown={handleKeyPress}
        tabIndex="0"
      >
        <HamburgerIconWrapper onClick={toggleDropdown}>
          <GiHamburgerMenuIcon />
        </HamburgerIconWrapper>
      </hamburger-button>

      <DropdownContent
        $isOpen={isDropdownOpen}
        onClick={toggleDropdown}
        className={isDropdownOpen ? "dropstyle" : ""}
      >
        <ContentWrapper>
          <Paragraph className="home">
            <LinkStyle href="/">Home</LinkStyle>
          </Paragraph>
          <Paragraph>
            <LinkStyle href={location.pathname !== "/" ? "/" : "#products"}>
              Products
            </LinkStyle>
          </Paragraph>
          <Paragraph>
            <LinkStyle
              href="https://calendly.com/consult3d7tech/project-consultancy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </LinkStyle>
          </Paragraph>
          <Paragraph>
            <LinkStyle
              href="https://blog.3d7tech.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </LinkStyle>
          </Paragraph>
          <Paragraph>
            <LinkStyle href="/aiQuiz">Quiz</LinkStyle>
          </Paragraph>
          <Paragraph>
            <LinkStyle href='/news'>News</LinkStyle>
          </Paragraph>
        </ContentWrapper>
        <ImageWrapper
          src="/images/logo/logo-small.png"
          alt="3d7tech Logo"
          className="dropdownlogo"
        />
        <CloseButton onClick={toggleDropdown}>
          <GrCloseIcon />
        </CloseButton>
      </DropdownContent>
    </StyledContainer>
  );
};

export const StyledContainer = styled(Container)`
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 100;
  display: flex;
  height: 5rem;
  padding: 1rem 5rem 1.0625rem 5rem;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  background: white;
  overflow-y: hidden;
  @media (max-width: 800px) {
    padding: 1rem 2rem 1.0625rem 2rem;
  }
`;

export const ImageWrapper = styled.img`
  height: 3rem;
  @media (max-width: 912px) {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
  }
`;

export const HamburgerIconWrapper = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 3rem;
  cursor: pointer;
`;

export const GiHamburgerMenuIcon = styled(GiHamburgerMenu)`
  width: 100%;
  height: 100%;
`;
export const HamburgerButton = styled.button`
  display: none;
`;

export const DropdownContent = styled.div`
  position: fixed;
  top: ${(props) => (props.$isOpen ? "0" : "-100%")};
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 3;
  transition: top 0.3s ease;
  .dropdownlogo {
    position: absolute;
    top: 1rem;
    left: 3rem;
  }

  .home {
    margin-top: 6.75rem;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 5rem;
  cursor: pointer;
  @media (max-width: 912px) {
    right: 2rem;
    top: 1rem;
    font-size: 2.5rem;
  }
`;

export const GrCloseIcon = styled(GrClose)`
  width: 1.98875rem;
  height: 4.2275rem;
`;

export const Paragraph = styled.p`
  text-align: center;
  font-family: DM Sans;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 400;
  padding: 0.3rem;
  line-height: 140%; /* 6.3rem */
  letter-spacing: -0.0225rem;

  @media (max-width: 1400px) {
    font-size: 2.8rem;
    padding: 0.5rem;
  }

  @media (max-width: 1200px) {
    font-size: 2.5rem;
  }

  @media (max-width: 800px) {
    font-size: 1.5rem;
  }
`;

export const LinkStyle = styled.a`
  text-decoration: none;
  color: #0f0f10;

  &:hover {
    color: var(--Primary, #079be6);
  }
`;

export default NavBar;
