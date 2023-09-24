import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { FiArrowUpRight } from 'react-icons/fi';

const HeroCard = (props) => {
  const { buttonTitle, imageSrc, title, text } = props;

  return (
    <Card
      style={{
        width: '26rem',
        height: '29.875rem',
        border: 'none',
      }}
    >
      <Card.Img
        variant='top'
        src={imageSrc}
        style={{
          height: '18.5rem',
          objectFit: 'cover',
          borderTopLeftRadius: '2rem',
          borderTopRightRadius: '2rem',
        }}
      />
      <CardStyle>
        <Card.Title style={{ color: '#6D93A5', fontSize: '1.5rem' }}>
          {title}
        </Card.Title>
        <Card.Text>{text}</Card.Text>
        <StyledButton variant='primary'>
          {buttonTitle} <FiArrowUpRight style={{ fontSize: '1.5rem' }} />{' '}
        </StyledButton>
      </CardStyle>
    </Card>
  );
};

const StyledButton = styled(Button)`
  background: #d7f1fe;
  border: 0.7px solid var(--Primary, #079be6);
  color: var(--Primary, #079be6);
  width: 9.375rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 0.625rem;
`;
const CardStyle = styled(Card.Body)`
  display: flex;
  width: 26rem;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  padding: 2.5rem;
`;

export default HeroCard;
