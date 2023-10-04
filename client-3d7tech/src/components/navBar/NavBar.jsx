// import { GrClose } from 'react-icons/gr';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// const NavBar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // useEffect(() => {
//   //   setIsDropdownOpen(false)
//   // },[isDropdownOpen])
//   return (
//     <Container>
//       <ImageWrapper src='/images/logo/logo-small.png' alt='3d7tech Logo' />
//       <HamburgerIconWrapper onClick={toggleDropdown}>
//         <GiHamburgerMenuIcon />
//       </HamburgerIconWrapper>
//       {isDropdownOpen && (
//         <DropdownContent
//           isOpen={isDropdownOpen}
//           className={isDropdownOpen ? 'dropstyle' : 'invisible'}
//         >
//           <Paragraph className='home'>Home</Paragraph>
//           <Paragraph>Training</Paragraph>
//           <Paragraph>Products</Paragraph>
//           <Paragraph>Contact Us</Paragraph>
//           <ImageWrapper
//             src='/images/logo/logo-small.png'
//             alt='3d7tech Logo'
//             className='dropdownlogo'
//           />
//           <GrCloseIcon onClick={toggleDropdown} />
//         </DropdownContent>
//       )}
//     </Container>
//   );
// };

// export const Container = styled.div`
//   display: flex;
//   height: 5rem;
//   padding: 1rem 5rem 1.0625rem 5rem;
//   justify-content: space-between;
//   align-items: center;
// `;

// export const ImageWrapper = styled.img`
//   height: 3rem;
// `;

// export const HamburgerIconWrapper = styled.div`
//   font-size: 24px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 5rem;
//   height: 3rem;
// `;

// export const GiHamburgerMenuIcon = styled(GiHamburgerMenu)`
//   width: 100%;
//   height: 100%;
// `;
// export const GrCloseIcon = styled(GrClose)`
//   width: 1.98875rem;
//   height: 4.2275rem;
//   position: absolute;
//   top: 1rem;
//   right: 5rem;
// `;

// export const DropdownContent = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: white;
//   z-index: 1;

//   .dropdownlogo {
//     position: absolute;
//     top: 1rem;
//     left: 5rem;
//   }
//   .home {
//     margin-top: 6.75rem;
//   }

//   /* Keyframes for the drop-down animation */
//   @keyframes dropDown {
//     0% {
//       opacity: 0;
//       transform: translateY(-100%);
//     }
//     100% {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
//   @keyframes closeup {
//     0% {
//       opacity: 1;
//       transform: translateY(0);
//     }
//     100% {
//       opacity: 0;
//       transform: translateY(-100%);
//     }
//   }

//   /* Apply animation to the div */
//   &.dropstyle {
//     // opacity: 0;
//     // transform: translateY(-100%);
//     animation: dropDown 1s ease-out forwards;
//   }
//   &.invisible {
//     // animation: closeup 1s ease forwards;
//     border: 2px solid red;
//   }
// `;
// export const Paragraph = styled.p`
//   text-align: center;
//   font-family: DM Sans;
//   font-size: 4.5rem;
//   font-style: normal;
//   font-weight: 400;
//   padding: 1.5rem;
//   line-height: 140%; /* 6.3rem */
//   letter-spacing: -0.0225rem;
//   &: hover {
//     color: var(--Primary, #079be6);
//   }
// `;

// export default NavBar;


import { GrClose } from 'react-icons/gr';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Container>
      <ImageWrapper src='/images/logo/logo-small.png' alt='3d7tech Logo' />
      <HamburgerIconWrapper onClick={toggleDropdown}>
        <GiHamburgerMenuIcon />
      </HamburgerIconWrapper>
      <DropdownContent
        $isOpen={isDropdownOpen}
        onClick={toggleDropdown}
        className={isDropdownOpen ? 'dropstyle' : ''}
      >
        <ContentWrapper>
          <Paragraph className='home'>Home</Paragraph>
          <Paragraph>Training</Paragraph>
          <Paragraph>Products</Paragraph>
          <Paragraph>Contact Us</Paragraph>
        </ContentWrapper>
        <ImageWrapper
          src='/images/logo/logo-small.png'
          alt='3d7tech Logo'
          className='dropdownlogo'
        />
        <CloseButton onClick={toggleDropdown}>
          <GrCloseIcon />
        </CloseButton>
      </DropdownContent>
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
  height: 3rem;
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

export const DropdownContent = styled.div`
  position: fixed;
  top: ${(props) => (props.$isOpen ? '0' : '-100%')};
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1;
  transition: top 0.3s ease;

  .dropdownlogo {
    position: absolute;
    top: 1rem;
    left: 5rem;
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
`;

export const GrCloseIcon = styled(GrClose)`
  width: 1.98875rem;
  height: 4.2275rem;
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

  &:hover {
    color: var(--Primary, #079be6);
  }
`;

export default NavBar;
