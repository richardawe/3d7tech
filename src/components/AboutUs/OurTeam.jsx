import React from 'react';
import styled from 'styled-components';
import { ourTeam } from './data';

const OurTeam = () => {
  return (
    <OurTeamWrapper>
      <OurTeamText>
        <p>OUR</p> <span>TEAM</span>
      </OurTeamText>
      <HRule />
      <Team>
        {ourTeam.map((team) => (
          <TeamStyle>
            <ImageStyle src={team.image} alt={team.name} />
            <Name>{team.name}</Name>
            <Title>{team.jobTitle}</Title>
            <Description>{team.description}</Description>
          </TeamStyle>
        ))}
      </Team>
    </OurTeamWrapper>
  );
};

export const OurTeamWrapper = styled.div`
  background: #011b28;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const OurTeamText = styled.div`
  font-family: DM Sans;
  font-size: 48px;
  font-weight: 700;
  line-height: 57.6px;
  letter-spacing: -0.005em;
  text-align: left;
  display: flex;
  gap: 0.8rem;
  p {
    color: #ffffff;
  }
  span {
    color: #079be6;
  }
`;
export const HRule = styled.hr`
  border: 0.6px solid #ffffff;
`;
export const Team = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 4rem;
`;
export const TeamStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 410px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const ImageStyle = styled.img`
  width: 410px;
  aspect-ratio: 1/1;
  object-fit: scale-down;
  object-position: center;
  border-radius: 32px;
  background-color: #079be6;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const Name = styled.p`
  font-family: DM Sans;
  font-size: 24px;
  font-weight: 700;
  line-height: 28.8px;
  letter-spacing: -0.005em;
  text-align: left;
  color: #f4f4f5;
  margin-top: 1rem;
`;
export const Title = styled.p`
  font-family: DM Sans;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;
  letter-spacing: -0.005em;
  text-align: left;
  color: #079be6;
  width: 410px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const Description = styled.p`
  font-family: DM Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;
  letter-spacing: -0.005em;
  text-align: left;
  color: #cbcccd;
  width: 410px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export default OurTeam;
