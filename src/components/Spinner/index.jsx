import React from 'react';
import { styled } from 'styled-components';

const Spinner = () => {
  return (
    <div>
      <Overlay>
        <LoadingSpinner />
      </Overlay>
    </div>
  );
};

export default Spinner;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
  backdrop-filter: blur(3px);
`;
export const LoadingSpinner = styled.div`
  border: 7px solid rgba(0, 0, 0, 0.1);
  border-left: 7px solid #079be6;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
