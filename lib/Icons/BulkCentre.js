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
  color: "var(--black)",
};

const BulkCentre = ({ size, color, ...props }) => (
  <svg
    width={size}
    fill={color}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z" />
  </svg>
);

BulkCentre.propTypes = propTypes;
BulkCentre.defaultProps = defaultProps;

export default BulkCentre;
