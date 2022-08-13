import React from "react";
import Image from "react-bootstrap/Image";
import styled from "styled-components";
import PropTypes from "prop-types";

import MaticIcon from "../icons/Matic";
import Progress from "./Progress";
import * as Type from "./Type";

const propTypes = {
  /**
   * Event Title
   */
  title: PropTypes.string.isRequired,
  /**
   * event thumbnail
   */
  thumbnail: PropTypes.string,
  /**
   * event posted on date
   */
  postedDate: PropTypes.string.isRequired,
  /**
   * event close date
   */
  closingDate: PropTypes.string.isRequired,
  /**
   * event close date
   */
  amount: PropTypes.string.isRequired,
  /**
   * Progress Ratings
   */
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number,
    }).isRequired,
  ).isRequired,
  /**
   * Card contents
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

const defaultProps = {
  title: "",
};

const EventCard = ({ title, postedDate, closingDate, amount, ...props }) => {
  /**
   * variables
   */
  const { ratings, thumbnail, children } = props;

  return (
    <EventCardStyled>
      <div className="mb-24 d-flex align-items-center">
        <Image
          className="thumbnail d-md-block mr-3"
          src={thumbnail || "/illustrations/event-thumbnail.png"}
          fluid
        />

        <Type.Regular className="bold small">
          <span className="white-text">{title}</span>
        </Type.Regular>
      </div>

      {ratings?.map((item, index) => (
        <Progress key={index} className="mb-1" now={20}>
          {item?.label && <p className="label">{item.label}</p>}
          {item?.value && <p className="value">{item.value}</p>}
        </Progress>
      ))}

      <div className="mt-16 w-100 d-flex column-gap-15 align-items-center justify-content-between">
        <div>
          <Type.Regular className="primary-400-text smaller">
            <span className="bold">Posted On -</span> August 4, 2022
          </Type.Regular>
          <Type.Regular className="primary-400-text smaller">
            <span className="bold">Closing On -</span> August 21, 2022
          </Type.Regular>
        </div>

        <CurrencyBadgeStyled>
          <MaticIcon />
          <Type.Regular className="ml-2 black-text light smaller">
            {amount} Staked
          </Type.Regular>
        </CurrencyBadgeStyled>
      </div>
    </EventCardStyled>
  );
};

/**
 * styles
 */

const EventCardStyled = styled.div`
  width: 100%;
  display: flex;
  padding: 1.25rem;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  background: var(--primary-500);
  border-radius: 15px;

  img.thumbnail {
    object-fit: cover;
    height: 54px;
    width: 54px;
  }

  .column-gap-15 {
    column-gap: 15px;
  }
`;

const CurrencyBadgeStyled = styled.div`
  display: flex;
  align-items: center;
  border-radius: 25px;
  padding: 4px 10px 4px 5px;
  color: var(--primary-200);
  background: #ffffff;
`;

EventCard.propTypes = propTypes;
EventCard.defaultProps = defaultProps;

export default EventCard;
