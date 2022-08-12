import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Progress from "./Progress";
import * as Type from "./Type";
import styled from "styled-components";

const EventCard = () => {
  /**
   * variables
   */
  const ProgressOfEvents = [
    {
      label: "Event 1",
      total: 215,
    },
    {
      label: "Event 2",
      total: 134,
    },
  ];

  return (
    <CardStyled>
      <div className="mb-24 d-flex align-items-center justify-content-between">
        <Image
          className="d-md-block mr-3 ml-auto"
          src="/illustrations/event-thumbnail.png"
          fluid
        />

        <Type.Regular className="bold small">
          <span className="white-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit
            amet, consectetur adipiscing elit?
          </span>
        </Type.Regular>
      </div>

      {ProgressOfEvents?.map((item, index) => (
        <Progress className="mb-1" now={20}>
          {item?.label && <p className="progress__label">{item.label}</p>}
          {item?.total && <p className="progress__total">{item.total}</p>}
        </Progress>
      ))}

      <div className="d-flex justify-content-between">
        <div>
          <Type.Regular className="primary-400-text bold small">
            <span className="bold">Posted On -</span> August 4, 2022
          </Type.Regular>
          <Type.Regular className="primary-400-text bold small">
            <span className="bold">Closing On -</span> August 21, 2022
          </Type.Regular>
        </div>
      </div>
    </CardStyled>
  );
};

/**
 * styles
 */
const CardStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25rem;

  /* width: 327px; */
  /* height: 241px; */

  background: var(--primary-500);
  border-radius: 15px;
`;
export default EventCard;
