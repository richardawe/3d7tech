import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

const Text2AI = () => {
  return <Wrapper fluid>{/* <img src='' alt='textAI' /> */}</Wrapper>;
};

export default Text2AI;

const Wrapper = styled(Container)`
  background: url("/images/hero/hero2d.jpg") no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  @media (max-width: 768px) {
    background: url("/images/text2AI-mobile.jpg") no-repeat;
    background-size: 100% 100%;
  }
`;
