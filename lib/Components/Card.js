import React from "react";
import styled from "styled-components";

const Card = () => {
  return <CardStyled>Card</CardStyled>;
};

/**
 * styles
 */
const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25rem;
  gap: 1.5625rem;

  /* width: 327px; */
  /* height: 241px; */

  background: var(--primary-500);
  border-radius: 15px;
`;
export default Card;
