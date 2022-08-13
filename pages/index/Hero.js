import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import * as Type from "../../lib/Components/Type";
import Button from "../../lib/Components/Button";

const Hero = () => {
  return (
    <Container className="homepage__hero">
      <Row className="flex-column-reverse flex-md-row">
        <Col
          md="6"
          xs="12"
          className="d-flex align-items-center pl-md-0 pl-lg-3"
        >
          <div>
            <Type.Regular className="bold">
              <span className="white-text">
                Put your <span className="default-text">money</span> where your
                mouth is.
              </span>
            </Type.Regular>

            <Type.Regular className="my-30 small pale-white-text">
              <span className="default-text">BBN Poll</span> is a platform where
              you can stake money on events in the BB Naija show and predict on
              an outcome to win from a stake pool. The platform would operate on
              the Polygon blockchain and stakes will be made using the MATIC
              currency.
            </Type.Regular>

            <div className="get-started">
              <Button
                height={50}
                variant="default"
                className="btn--default btn-56 btn-lg-72 px-5"
                onClick={() => window.open(process.env.APP_URL + "/connect")}
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        </Col>
        <Col
          xs="12"
          md="6"
          className="pr-md-0 pr-lg-3 d-md-flex align-items-center"
        >
          <Image
            className="d-md-block mr-0 ml-auto"
            src="/illustrations/bbn-poll.png"
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
