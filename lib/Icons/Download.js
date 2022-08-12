import React from "react";
import PropTypes from "prop-types";

/**
 * props definition
 */
const propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  variant: PropTypes.oneOf(["default", "round"]),
};

const defaultProps = {
  size: 24,
  color: "var(--black)",
  variant: "default",
};

const Download = ({ size, color, variant, ...props }) => (
  <svg
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {variant === "default" && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44771 4 7 4H13.7574C14.0226 4 14.2769 4.10536 14.4645 4.29289L16.5858 6.41421L17.7071 7.53553C17.8946 7.72307 18 7.97742 18 8.24264V19ZM4 5C4 3.34315 5.34315 2 7 2H13.7574C14.553 2 15.3161 2.31607 15.8787 2.87868L18 5L19.1213 6.12132C19.6839 6.68393 20 7.44699 20 8.24264V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V5ZM15.7071 13.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L8.29289 13.7071C7.90237 13.3166 7.90237 12.6834 8.29289 12.2929C8.68342 11.9024 9.31658 11.9024 9.70711 12.2929L11 13.5858V8C11 7.44771 11.4477 7 12 7C12.5523 7 13 7.44771 13 8V13.5858L14.2929 12.2929C14.6834 11.9024 15.3166 11.9024 15.7071 12.2929C16.0976 12.6834 16.0976 13.3166 15.7071 13.7071Z"
        fill={color}
      />
    )}
    {variant === "round" && (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 6C12.5523 6 13 6.44772 13 7V14.5858L14.2929 13.2929C14.6834 12.9024 15.3166 12.9024 15.7071 13.2929C16.0976 13.6834 16.0976 14.3166 15.7071 14.7071L12.7071 17.7071C12.3166 18.0976 11.6834 18.0976 11.2929 17.7071L8.29289 14.7071C7.90237 14.3166 7.90237 13.6834 8.29289 13.2929C8.68342 12.9024 9.31658 12.9024 9.70711 13.2929L11 14.5858V7C11 6.44772 11.4477 6 12 6Z"
        fill={color}
      />
    )}
  </svg>
);

Download.propTypes = propTypes;
Download.defaultProps = defaultProps;

export default Download;