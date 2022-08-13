import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  /**
   * @default '24'
   */
  size: PropTypes.number,

  /**
   * @default '#000'
   */
  color: PropTypes.string,
};

const defaultProps = {
  size: 24,
  color: "var(--primary-400)",
};

const Telegram = ({ size, color, ...props }) => (
  <svg
    width={size}
    fill={color}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.4392 4.62225L19.2705 19.566C19.0312 20.6205 18.408 20.883 17.5222 20.3865L12.6937 16.8285L10.3642 19.0695C10.1062 19.3275 9.89099 19.5428 9.39374 19.5428L9.74099 14.6258L18.6892 6.54C19.0785 6.1935 18.6045 6.00075 18.0847 6.348L7.02224 13.314L2.25974 11.823C1.22399 11.4998 1.20524 10.7873 2.47574 10.29L21.1035 3.11325C21.966 2.79 22.7205 3.30525 22.4392 4.623V4.62225Z"
      fill={color}
    />
  </svg>
);

Telegram.propTypes = propTypes;
Telegram.defaultProps = defaultProps;

export default Telegram;
