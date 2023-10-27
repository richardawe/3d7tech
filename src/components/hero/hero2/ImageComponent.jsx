import Button from '../../button/Button';
import { FiArrowUpRight } from 'react-icons/fi';
import { LinkStyle } from '../../navBar/NavBar';
import { getLinkPreview, getPreviewFromContent } from 'link-preview-js';
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
          <LinkStyle href={link} target='_blank' rel='noopener noreferrer' id='products'>
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
  padding: 6rem;
  width: 100vw;
  &.sticky {
    position: sticky;
    top: 1rem;
    z-index: 1;
  }
  @media (max-width: 800px) {
    width: 100vw;
    display: flex;
    justify-content: center;
    padding: 0 1.5rem;
    top: 0;
    margin-bottom: 1rem;
  }
  @media (min-width: 2560px) {
  }
`;

export const ImageWrapper1 = styled.div`
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  width: 100%;
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
  width: 100%;
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 2.1875rem;
  background: #31332e;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
export const ImageWrapper3 = styled.div`
  width: 100%;
  flex-shrink: 0;
  border-radius: 1.5625rem 1.5625rem 0rem 0rem;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const ImageStyle = styled.div`
  width: 100%;
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
  bottom: 6rem;
  left: 6rem;
  display: flex;
  width: 92.5%;
  height: 75%;
  padding: 20.9375rem 0rem 3rem 0rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 1;
  position: absolute;
  border-bottom-left-radius: 3.125rem;
  border-bottom-right-radius: 3.125rem;
  background: linear-gradient(180deg, rgba(24, 23, 26, 0) 0%, #18171a 74.72%);

  @media (max-width: 800px) {
    width: 89%;
    left: auto;
    right: auto;
    border-left: transparent;
    border-right: transparent;
    bottom: 0rem;
  }
  @media (min-width: 801px) and(max-width: 2559px) {
    width: 86.6%;
    height: 60%;
    bottom: 6.1rem;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 86.7%;
  position: absolute;
  bottom: 15rem;
  z-index: 3;
  @media (max-width: 800px) {
    left: auto;
    right: auto;
    bottom: 1rem;
  }
  @media (min-width: 801px) and(max-width: 2559px) {
    bottom: 6rem;
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
  @media (min-width: 2560px) {
    font-size: 2rem;
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
  @media (min-width: 2560px) {
    font-size: 1.5rem;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const IconWrapper = styled.div`
  margin-left: -2.5rem;
`;
