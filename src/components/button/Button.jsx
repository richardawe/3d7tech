import React from "react";
import styled from "styled-components";

/**
 * Button Component
 *
 * This component represents a customizable button element.
 *
 * @component
 * @param {Object} props - The component's props.
 * @param {string} props.id - The unique identifier for the button element.
 * @param {string} props.type - The type of the button (e.g., "button", "submit", "reset").
 * @param {boolean} props.disabled - Indicates if the button should be disabled.
 * @param {function} props.onClick - The click event handler for the button.
 * @param {string} props.backgroundColor - The background color of the button.
 * @param {string} props.textColor - The text color of the button.
 * @param {string} props.padding - The padding of the button.
 * @param {string} props.title - The text or content displayed on the button.
 * @param {string} props.borderRadius - The border radius of the button.
 * @param {string} props.height - The height of the button.
 * @param {string} props.width - The width of the button.
 * @returns {JSX.Element} The rendered Button component.
 */

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

/**
 * StyledButton - Styled button element using styled-components.
 *
 */

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
