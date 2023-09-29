import Button from '../../button/Button';
import { FiArrowUpRight } from 'react-icons/fi';
import React, { useRef } from 'react';
import styled from 'styled-components';

const ImageComponent = (props) => {
  const { imageSrc } = props;
  return (
    <>
      <ImageWrapper1>
        <ImageWrapper2>
          <ImageWrapper3>
            <ImageStyle src={imageSrc} />
          </ImageWrapper3>
        </ImageWrapper2>
      </ImageWrapper1>
      <LinearGradient></LinearGradient>
      <TextContainer>
        <StyledH2>DocuHelp</StyledH2>
        <StyledP>DocuHelp helps you write business documents</StyledP>
        <ButtonWrapper>
          <Button
            onClick={() => {}}
            title='See Product'
            backgroundColor='#079BE6'
            textColor='#fff'
            padding='0.5rem 2rem 0.5rem 0.5rem'
            borderRadius='0.625rem'
            height='3.25rem'
            width='10rem'
          />
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
    </>
  );
};

export default ImageComponent;

export const ImageWrapper1 = styled.div`
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  margin: 4rem;
  width: 75.5625rem;
  height: 39.9375rem;
  flex-shrink: 0;
  border-radius: 3.125rem;
  border: 3px solid rgba(255, 255, 255, 0.1);
  background: #1a1b18;
`;
export const ImageWrapper2 = styled.div`
  display: flex;
  width: 71.5625rem;
  padding: 1.5rem 1.5rem 0rem 1.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 2.1875rem 2.1875rem 0rem 0rem;
  background: #31332e;
`;
export const ImageWrapper3 = styled.div`
  width: 68.5625rem;
  flex-shrink: 0;
  border-radius: 1.5625rem 1.5625rem 0rem 0rem;
  background: url(<path-to-image>), lightgray 0px 0px / 100% 358.458% no-repeat;
`;

export const ImageStyle = styled.img`
  width: 68.5625rem;
  flex-shrink: 0;
  border-radius: 1.5625rem 1.5625rem 0rem 0rem;
  background: url(<path-to-image>), lightgray 0px 0px / 100% 358.458% no-repeat;
`;
export const LinearGradient = styled.div`
  margin-top: -35.5rem;
  display: flex;
  width: 75.5625rem;
  height: 32.9375rem;
  padding: 20.9375rem 0rem 3rem 0rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 1;
  border-bottom-left-radius: 3.125rem;
  border-bottom-right-radius: 3.125rem;
  background: linear-gradient(180deg, rgba(24, 23, 26, 0) 0%, #18171a 74.72%);
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 21.75rem;
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
`;
export const StyledP = styled.h2`
  color: #e6e6e6;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 140%; /* 1.4rem */
  letter-spacing: -0.005rem;
  margin-top: -2rem;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom:10rem;
`;
const IconWrapper = styled.div`
  margin-left: -2.5rem;
`;

