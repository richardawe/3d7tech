import React from 'react';
import styled from 'styled-components';

const Modal = ({ children, clickScreen }) => {
  return <PopUpOverlay onClick={clickScreen}>{children}</PopUpOverlay>;
};

export default Modal;

const PopUpOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`;
