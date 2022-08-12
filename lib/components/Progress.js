import styled from "styled-components";

const Progress = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  color: var(--black);
  border-radius: 5px;
  height: ${({ height }) => height || "25px"};
  background-color: ${({ bg, active }) =>
    bg || active ? "var(--primary-950)" : "var(--primary-400)"};

  &::before {
    height: 100%;
    content: " ";
    display: block;
    border-radius: 5px;
    background-color: ${({ overlay, active }) =>
      overlay || active ? "var(--default)" : "var(--primary-300)"};
    transition: ease-in-out width 0.25s;
    width: ${({ now }) => `${now || 0}%`};
  }

  .progress__label {
    position: absolute;
    font-size: 0.625rem;
    line-height: 0.8125rem;
    left: 1rem;
    top: 25%;
  }

  .progress__total {
    position: absolute;
    font-weight: 700;
    right: 1rem;
    top: 0;
  }
`;
export default Progress;
