import React, { useState } from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Container>
      <ImageWrapper src='/images/logo-small.png' alt='3d7tech Logo' />
      <HamburgerIconWrapper onClick={toggleDropdown}>
        {isDropdownOpen ? <GrCloseIcon /> : <GiHamburgerMenuIcon />}
      </HamburgerIconWrapper>
      {isDropdownOpen && (
        <DropdownContent isOpen={isDropdownOpen}>
          <Paragraph>Home</Paragraph>
          <Paragraph>Training</Paragraph>
          <Paragraph>Products</Paragraph>
          <Paragraph>Contact Us</Paragraph>
        </DropdownContent>
      )}
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  height: 5rem;
  padding: 1rem 5rem 1.0625rem 5rem;
  justify-content: space-between;
  align-items: center;
`;

export const ImageWrapper = styled.img`
  height:3rem;
`;

export const HamburgerIconWrapper = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 3rem;
`;

export const GiHamburgerMenuIcon = styled(GiHamburgerMenu)`
  width: 100%;
  height: 100%;
`;
export const GrCloseIcon = styled(GrClose)`
  width: 100%;
  height: 100%;
`;

export const DropdownContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1;
  margin-top: 5rem;
`;
export const Paragraph = styled.p`
  text-align: center;
  font-family: DM Sans;
  font-size: 4.5rem;
  font-style: normal;
  font-weight: 400;
  padding: 1.5rem;
  line-height: 140%; /* 6.3rem */

  letter-spacing: -0.0225rem;
  &: hover {
    color: var(--Primary, #079be6);
  }
`;

export default NavBar;
