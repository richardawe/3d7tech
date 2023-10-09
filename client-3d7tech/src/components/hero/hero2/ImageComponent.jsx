import Button from '../../button/Button';
import { FiArrowUpRight } from 'react-icons/fi';
import { LinkStyle } from '../../navBar/NavBar';
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

/**
 * ImageComponent Component
 *
 * This component displays an image along with associated text and buttons.
 * The image becomes sticky when the user scrolls past it.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {string} props.imageSrc - The source URL of the image.
 * @param {string} props.link - The URL to navigate to when the button is clicked.
 * @returns {JSX.Element} The rendered ImageComponent.
 */

const ImageComponent = (props) => {
  const { imageSrc, image2Src, link, productTitle, product } = props;

  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const image = imageRef.current;
      const threshold = image.offsetTop - window.innerHeight;
      if (window.scrollY > threshold) {
        image.classList.add('sticky');
      } else {
        image.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ImageContainer ref={imageRef}>
      <ImageWrapper1>
        <ImageWrapper2>
          <ImageWrapper3>
            <ImageStyle $bgImg={imageSrc} $bgImgSmall={image2Src} />
          </ImageWrapper3>
        </ImageWrapper2>
      </ImageWrapper1>
      <LinearGradient></LinearGradient>
      <TextContainer>
        <StyledH2>{productTitle}</StyledH2>
        <StyledP>{product}</StyledP>
        <ButtonWrapper>
          <LinkStyle href={link} target='_blank' rel='noopener noreferrer'>
            <Button
              title='See Product'
              backgroundColor='#079BE6'
              textColor='#fff'
              padding='0.5rem 2rem 0.5rem 0.5rem'
              borderRadius='0.625rem'
              height='3.25rem'
              width='10rem'
            />
          </LinkStyle>
          <IconWrapper>
            <FiArrowUpRight
              style={{
                fontSize: '1.5rem',
                color: '#fff',
              }}
            />
          </IconWrapper>
        </ButtonWrapper>
      </TextContainer>
    </ImageContainer>
  );
};

export default ImageComponent;

const ImageContainer = styled.div`
  position: relative;
  &.sticky {
    position: sticky;
    top: 3rem;
    z-index: 1;
  }
  @media (max-width: 800px) {
    width: 100vw;
    display: flex;
    justify-content: center;
    padding: 0 0.5rem;
    top: 0;
  }
`;

export const ImageWrapper1 = styled.div`
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  margin: 4rem;
  width: 75.5625rem;
  flex-shrink: 0;
  border-radius: 3.125rem;
  border: 3px solid rgba(255, 255, 255, 0.1);
  background: #1a1b18;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ImageWrapper2 = styled.div`
  display: flex;
  width: 71.5625rem;
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 2.1875rem 2.1875rem 0rem 0rem;
  background: #31332e;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
export const ImageWrapper3 = styled.div`
  width: 68.5625rem;
  flex-shrink: 0;
  border-radius: 1.5625rem 1.5625rem 0rem 0rem;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ImageStyle = styled.div`
  width: 68.5625rem;
  height: 72vh;
  flex-shrink: 0;
  border-radius: 1.5625rem 1.5625rem 0rem 0rem;
  background: url('${({ $bgImg }) => $bgImg}') no-repeat top;
  background-size: 100% 100%;
  @media (max-width: 800px) {
    background-image: url('${({ $bgImgSmall }) => $bgImgSmall}');
    width: 100%;
  }
`;

export const LinearGradient = styled.div`
  bottom: 0;
  left: 4rem;
  display: flex;
  width: 75.5625rem;
  height: 35.9375rem;
  padding: 20.9375rem 0rem 3rem 0rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 1;
  border-left: 3px solid rgba(255, 255, 255, 0.1);
  border-right: 3px solid rgba(255, 255, 255, 0.1);
  position: absolute;
  border-bottom-left-radius: 3.125rem;
  border-bottom-right-radius: 3.125rem;
  background: linear-gradient(180deg, rgba(24, 23, 26, 0) 0%, #18171a 74.72%);
  @media (max-width: 800px) {
    width: 96%;
    left: 0.5rem;
    border-left: transparent;
    border-right: transparent;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 21.75rem;
  position: absolute;
  bottom: 5rem;
  left: 36.5%;
  z-index: 3;
  @media (max-width: 800px) {
    left: auto;
    right: auto;
  }
`;

export const StyledH2 = styled.h2`
  color: #fafafa;
  text-align: center;
  font-family: DM Sans;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 2.1rem */
  letter-spacing: -0.0075rem;
  @media (max-width: 800px) {
  }
`;
export const StyledP = styled.h2`
  color: #e6e6e6;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: -0.005rem;
  margin-top: -2rem;
  @media (max-width: 800px) {
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
  }
`;
const IconWrapper = styled.div`
  margin-left: -2.5rem;
  @media (max-width: 800px) {
  }
`;
