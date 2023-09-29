import { FiArrowUpRight } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

/**
 * HeroCard Component
 *
 * This component represents a card used in a hero section. It typically includes an image,
 * a title, and a button for a call to action.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {string} props.buttonTitle - The title for the card's button.
 * @param {string} props.imageSrc - The image source URL for the card.
 * @param {string} props.title - The title for the card.
 * @returns {JSX.Element} The rendered HeroCard component.
 */

const HeroCard = (props) => {
  const { buttonTitle, imageSrc, title } = props;

  return (
    <>
      <Card>
        <CardImg src={imageSrc} alt='Card' />
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardButton>
            {buttonTitle} <FiArrowUpRight style={{ fontSize: '1.5rem' }} />
          </CardButton>
        </CardContent>
      </Card>
    </>
  );
};

const Card = styled.div`
  width: 26rem;
  height: 29.875rem;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  border-radius: 2rem;
`;

const CardImg = styled.img`
  width: 100%;
  height: 18.5rem;
  object-fit: cover;
  border-radius: 2rem 2rem 0 0;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
`;

const CardTitle = styled.h1`
  color: #6d93a5;
  font-size: 1.5rem;
`;

const CardButton = styled.button`
  background: #d7f1fe;
  border: 0.7px solid var(--Primary, #079be6);
  color: var(--Primary, #079be6);
  width: 9.375rem;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 0.625rem;
  cursor: pointer;
`;

export default HeroCard;
