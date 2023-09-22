import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const {
    id,
    type,
    disabled,
    onClick,
    backgroundColor,
    textColor,
    padding,
    title,
    borderRadius,
    height,
    width,
  } = props;
  const customStyles = {
    background: backgroundColor,
    color: textColor,
    padding: padding,
    borderRadius: borderRadius,
    height: height,
    width: width,
  };

  return (
    <StyledButton
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={customStyles}
    >
      {title}
    </StyledButton>
  );
};

export default Button;

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  color: #fff;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.005rem;
  border: 1px solid #079be6;
`;
