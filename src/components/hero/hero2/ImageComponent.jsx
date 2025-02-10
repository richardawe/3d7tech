import React from 'react';
import styled from 'styled-components';
import { FiArrowUpRight } from 'react-icons/fi';

/**
 * ImageComponent - Grid Style
 *
 * This component displays a product card with an image, title, description, and a button.
 *
 * @component
 * @param {Object} props - The component's properties.
 * @param {string} props.imageSrc - The source URL of the main image.
 * @param {string} props.image2Src - The source URL for the mobile version of the image.
 * @param {string} props.link - The URL to navigate to when the button is clicked.
 * @param {string} props.productTitle - The title of the product.
 * @param {string} props.product - The description of the product.
 * @returns {JSX.Element} The rendered ImageComponent.
 */

const ImageComponent = ({ imageSrc, image2Src, link, productTitle, product }) => {
  return (
    <CardLink href={link} target="_blank" rel="noopener noreferrer">
      <Card>
        <ImageContainer>
          <MainImage src={imageSrc} alt={productTitle} />
          <SecondaryImage src={image2Src} alt={`${productTitle} mobile`} />
          <Overlay />
        </ImageContainer>
        <ContentContainer>
          <Title>{productTitle}</Title>
          <Description>{product}</Description>
          <ViewProject>
            <span>View Project</span>
            <FiArrowUpRight />
          </ViewProject>
        </ContentContainer>
      </Card>
    </CardLink>
  );
};

const CardLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(96, 165, 250, 0.1);
  overflow: hidden;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(96, 165, 250, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
  background: #000;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.7));
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardLink}:hover & {
    opacity: 1;
  }
`;

const MainImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardLink}:hover & {
    transform: scale(1.05);
  }
`;

const SecondaryImage = styled.img`
  position: absolute;
  bottom: -10%;
  right: 5%;
  width: 30%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  z-index: 1;

  ${CardLink}:hover & {
    transform: translateY(-12px) scale(1.05);
  }
`;

const ContentContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.02));
`;

const Title = styled.h3`
  color: #F3F4F6;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(45deg, #60A5FA, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.01em;
`;

const Description = styled.p`
  color: #F3F4F6;
  font-size: 1.125rem;
  line-height: 1.7;
  margin: 0 0 1.5rem 0;
  opacity: 0.9;
  letter-spacing: 0.015em;
`;

const ViewProject = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #60A5FA;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.3s ease;
  }

  ${CardLink}:hover & {
    color: #3B82F6;
    gap: 0.75rem;

    svg {
      transform: translateX(2px) translateY(-2px);
    }
  }
`;

export default ImageComponent;
