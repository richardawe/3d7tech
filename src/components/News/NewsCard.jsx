import React from 'react';
import styled from 'styled-components';

const NewsCard = ({ title, description, url, image }) => {
  return (
    <CardContainer>
      <Title>{title}</Title>
      <Image src={image} />
      <Description>{description}</Description>
      <ReadMoreLink href={url} target='_blank' rel='noopener noreferrer'>
        Read more
      </ReadMoreLink>
    </CardContainer>
  );
};

export default NewsCard;

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  width: 100%;
  height: 100%;
  margin-right: 16px;
`;

const Title = styled.h3`
  margin-bottom: 3rem;
  font-size: 20px;
  color: #333333;
`;

const Description = styled.p`
  color: #666666;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const ReadMoreLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
