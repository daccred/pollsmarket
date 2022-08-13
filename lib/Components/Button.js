import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import PropTypes from "prop-types";
import styled from "styled-components";
import Btn from "react-bootstrap/Button";

const propTypes = {
  /**
   * @default 'true'
   */
  isValid: PropTypes.bool,
  /**
   * @default 'default'
   */
  variant: PropTypes.oneOf([
    "default",
    "outline",
    "outline:white",
    "cancel",
    "custom",
  ]),
  /**
   * @default 'false'
   */
  isSubmitting: PropTypes.bool,
  /**
   * loading props for spinner
   */
  loader: PropTypes.shape({
    size: PropTypes.number,
    color: PropTypes.string,
  }),
  /**
   * Button contents
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

const defaultProps = {
  isValid: true,
  variant: "default",
  isSubmitting: false,
  loader: { size: 25, color: "#fff" },
};

const Button = ({
  isSubmitting,
  children,
  variant,
  isValid,
  loader,
  value,
  type,
  ...props
}) => {
  switch (variant) {
    case "default":
      props = {
        ...props,
        bg: "var(--default)",
        color: "var(--black)",
        border: "var(--default)",
      };
      break;
    case "outline":
      props = {
        ...props,
        bg: "#fff",
        color: "var(--black)",
        border: "var(--pale-white)",
      };
      break;
    case "outline:white":
      props = {
        ...props,
        bg: "transparent",
        color: "#fff",
        border: "#fff",
      };
      break;
    case "cancel":
      props = {
        ...props,
        color: "#fff",
        bg: "var(--primary-900)",
        border: "var(--primary-900)",
      };
      break;
    default:
      break;
  }

  return (
    <Wrapper
      variant="default"
      type={type || "button"}
      className="text-truncate"
      {...(!isValid && { disabled: true })}
      {...(isSubmitting && { disabled: true })}
      {...props}
    >
      {isSubmitting ? <ClipLoader {...loader} /> : children}
    </Wrapper>
  );
};

/**
 * styles
 */
const Wrapper = styled(Btn)`
  height: ${({ height }) => (height ? `${height * 0.0625}rem` : "3rem")};
  max-width: ${({ width }) => (width ? `${width * 0.0625}rem` : "100%")};
  ${({ border }) => border && `border-color: ${border};`};
  ${({ bg }) => bg && `background-color: ${bg};`};
  ${({ color }) => color && `color: ${color};`};
  border-radius: 15px;
  font-weight: bold;
  /* width: 100%; */
`;

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
