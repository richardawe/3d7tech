import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

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
  const { posterSrc, videoSrc, title } = props;
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to handle video play
  const handlePlay = () => {
    setIsPlaying(true);

    if (props.onVideoPlay) {
      props.onVideoPlay();
    }
  };

  // Function to handle video pause
  const handlePause = () => {
    setIsPlaying(false);

    if (props.onVideoPause) {
      props.onVideoPause();
    }
  };

  return (
    <>
      <Card id='products'>
        <ReactPlayer
          url={videoSrc}
          controls
          width='100%'
          height='100%'
          playing={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          config={{
            file: {
              attributes: {
                poster: posterSrc,
              },
            },
          }}
        />
        <CardContent>
          <CardTitle>{title}</CardTitle>
        </CardContent>
      </Card>
    </>
  );
};

const Card = styled.div`
  width: 34rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  border-radius: 2rem;
  a {
    text-decoration: none;
  }
  @media (max-width: 800px) {
    width: 21.25rem;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem;
  @media (max-width: 800px) {
  }
`;

const CardTitle = styled.h1`
  color: #6d93a5;
  font-size: 1.5rem;
`;

export default HeroCard;
