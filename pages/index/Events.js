import { Container, Row, Col } from "react-bootstrap";
import EventCard from "../../lib/Components/EventCard";
import * as Type from "../../lib/Components/Type";

const Events = () => {
  const upcomingEvents = [
    {
      title: "Will Ijeoma leave in the next Elimination?",
      postedDate: "August 4, 2022",
      closingDate: "August 21, 2022",
      amount: "384 MATIC",
      ratings: [
        {
          label: "Most Likely",
          value: 215,
        },
        {
          label: "No",
          value: 134,
        },
      ],
    },
    {
      title: "Will Emeka propose to Rita?",
      thumbnail: "/illustrations/emeka.png",
      postedDate: "August 4, 2022",
      closingDate: "August 21, 2022",
      amount: "384 MATIC",
      ratings: [
        {
          label: "Yes",
          value: 2,
        },
        {
          label: "Maybe",
          value: 215,
        },
        {
          label: "No",
          value: 134,
        },
      ],
    },
    {
      title: "Will Ijeoma leave in the next Elimination?",
      postedDate: "August 4, 2022",
      closingDate: "August 21, 2022",
      amount: "384 MATIC",
      ratings: [
        {
          label: "Most Likely",
          value: 215,
        },
        {
          label: "No",
          value: 134,
        },
      ],
    },
    {
      title: "Will Ijeoma leave in the next Elimination?",
      postedDate: "August 4, 2022",
      closingDate: "August 21, 2022",
      amount: "384 MATIC",
      ratings: [
        {
          label: "Most Likely",
          value: 215,
        },
        {
          label: "No",
          value: 134,
        },
      ],
    },
    {
      title: "Will Ijeoma leave in the next Elimination?",
      postedDate: "August 4, 2022",
      closingDate: "August 21, 2022",
      amount: "384 MATIC",
      ratings: [
        {
          label: "Most Likely",
          value: 215,
        },
        {
          label: "No",
          value: 134,
        },
      ],
    },
    {
      title: "Will Ijeoma leave in the next Elimination?",
      postedDate: "August 4, 2022",
      closingDate: "August 21, 2022",
      amount: "384 MATIC",
      ratings: [
        {
          label: "Most Likely",
          value: 215,
        },
        {
          label: "No",
          value: 134,
        },
      ],
    },
  ];

  return (
    <Container className="homepage__events px-0">
      <Type.T2 className="default-text mb-30">Popular Events</Type.T2>
      <Row className="align-items-start">
        {upcomingEvents?.map((event, index) => {
          return (
            <Col
              lg="4"
              md="6"
              xs="12"
              key={index}
              className="d-flex align-items-center mb-16  pl-lg-3"
            >
              <EventCard {...event} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Events;
