import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../theme/theme";
import { AiOutlineHome, AiOutlineContacts, AiOutlineBulb, AiOutlineExperiment, AiOutlineRobot } from "react-icons/ai";
import { FaBloggerB } from "react-icons/fa";
import { BsNewspaper } from "react-icons/bs";

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
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: <AiOutlineHome />, text: "Home", href: "/" },
    { 
      icon: <AiOutlineContacts />, 
      text: "Contact Us", 
      href: "https://calendly.com/consult3d7tech/project-consultancy",
      external: true 
    },
    { 
      icon: <FaBloggerB />, 
      text: "Blog", 
      href: "https://blog.3d7tech.com/",
      external: true 
    },
    { icon: <AiOutlineRobot />, text: "AI Concierge", href: "/ai-concierge" },
    { icon: <AiOutlineBulb />, text: "Quiz", href: "/aiQuiz" },
    { icon: <BsNewspaper />, text: "News", href: "/news" },
    { icon: <AiOutlineExperiment />, text: "Play", href: "/play" }
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown();
    }
  };

  const renderNavItems = (showText = false) => (
    <NavLinks>
      {navItems.map((item, index) => (
        <NavItem key={index}>
          {item.external ? (
            <NavLink 
              as="a"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.text}
            >
              <IconWrapper>
                {item.icon}
              </IconWrapper>
              {showText && <LinkText>{item.text}</LinkText>}
            </NavLink>
          ) : (
            <NavLink 
              as={Link}
              to={item.href}
              title={item.text}
            >
              <IconWrapper>
                {item.icon}
              </IconWrapper>
              {showText && <LinkText>{item.text}</LinkText>}
            </NavLink>
          )}
        </NavItem>
      ))}
    </NavLinks>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <MobileMenuButton
        aria-label="Open navigation menu"
        onClick={toggleDropdown}
        onKeyDown={handleKeyPress}
        tabIndex="0"
      >
        <GiHamburgerMenuIcon />
      </MobileMenuButton>

      {/* Sidebar */}
      <SidebarContainer 
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        $isHovered={isSidebarHovered}
      >
        <SidebarContent>
          <LogoWrapper as={Link} to="/">
            <ImageWrapper src="/images/logo/logo-small.png" alt="3d7tech Logo" />
          </LogoWrapper>
          {renderNavItems(isSidebarHovered)}
        </SidebarContent>
      </SidebarContainer>

      {/* Mobile Dropdown */}
      <MobileDropdown
        $isOpen={isDropdownOpen}
        onClick={toggleDropdown}
      >
        <MobileContent>
          <LogoWrapper as={Link} to="/">
            <ImageWrapper 
              src="/images/logo/logo-small.png" 
              alt="3d7tech Logo" 
              className="dropdownlogo"
            />
          </LogoWrapper>
          {renderNavItems(true)}
          <CloseButton onClick={toggleDropdown}>
            <GrCloseIcon />
          </CloseButton>
        </MobileContent>
      </MobileDropdown>
    </>
  );
};

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${props => props.$isHovered ? '240px' : '80px'};
  background: ${theme.colors.background.surface};
  backdrop-filter: blur(10px);
  border-right: 1px solid ${theme.colors.border.primary};
  transition: width ${theme.transitions.base};
  z-index: 100;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${theme.spacing.md};
`;

const LogoWrapper = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.sm} 0;
  margin-bottom: ${theme.spacing.xl};
`;

const ImageWrapper = styled.img`
  height: 3rem;
  transition: ${theme.transitions.base};
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  min-width: 24px;
`;

const LinkText = styled.span`
  margin-left: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.base};
`;

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  width: 100%;
  align-items: center;
  text-align: center;
`;

const NavItem = styled.li`
  white-space: nowrap;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.text.primary};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: ${theme.transitions.base};
  display: flex;
  align-items: center;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  width: 100%;

  &:hover {
    color: ${theme.colors.accent.primary};
    background: ${theme.colors.background.surfaceHover};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: ${theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  background: ${theme.colors.background.surface};
  border: 1px solid ${theme.colors.border.primary};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm};
  color: ${theme.colors.text.primary};
  cursor: pointer;
  transition: ${theme.transitions.base};
  backdrop-filter: blur(8px);

  &:hover {
    background: ${theme.colors.background.surfaceHover};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    min-width: 44px;
    height: 44px;
  }
`;

const MobileDropdown = styled.div`
  display: none;
  position: fixed;
  top: ${props => props.$isOpen ? "0" : "-100%"};
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.background.primary};
  transition: top 0.3s ease-in-out;
  z-index: 100;
  overflow-y: auto;
  backdrop-filter: blur(8px);

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding: ${theme.spacing['4xl']} ${theme.spacing.xl} ${theme.spacing.xl};
  position: relative;
  gap: ${theme.spacing.xl};

  ${LogoWrapper} {
    margin-bottom: 0;
  }

  ${NavLinks} {
    width: 100%;
    max-width: 300px;
  }

  ${NavLink} {
    justify-content: center;
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.lg};
    background: ${theme.colors.background.surface};
    margin-bottom: ${theme.spacing.sm};

    &:hover {
      background: ${theme.colors.background.surfaceHover};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.md} ${theme.spacing.md};
    gap: ${theme.spacing.lg};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  z-index: 101;
  
  svg {
    width: 24px;
    height: 24px;
    path {
      stroke: ${theme.colors.text.primary};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    top: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
  }
`;

const GiHamburgerMenuIcon = styled(GiHamburgerMenu)`
  width: 24px;
  height: 24px;
`;

const GrCloseIcon = styled(GrClose)`
  width: 24px;
  height: 24px;
`;

export default NavBar;