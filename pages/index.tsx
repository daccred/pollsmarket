import styles from "../styles/Home.module.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Fragment, useState, useEffect } from "react";
import EventCard from "../lib/components/EventCard";
import Button from "../lib/components/Button";
import * as Type from "../lib/components/Type";
import BBNLogo from "../lib/icons/BBNLogo";
import styled from "styled-components";
import Head from "next/head";

const WrapperStyled = styled.main`
  min-height: 100%;
  background-color: var(--black);
  color: ${(props) => props?.theme?.colors?.text || "var(--white)"};
`;

const Hero = () => {
  return (
    <Container className="homepage__hero">
      <Row>
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
                onClick={() => window.open(process.env.APP_URL + "/signup")}
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        </Col>
        <Col
          xs="12"
          md="6"
          className="introduction__image pr-md-0 pr-lg-3 d-none d-md-flex align-items-center"
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

const Events = () => {
  return (
    <Container className="homepage__events">
      <Type.T2 className="default-text mb-30">Popular Events</Type.T2>
      <Row>
        <Col
          md="4"
          xs="12"
          className="d-flex align-items-center pl-md-0 pl-lg-3"
        >
          <EventCard />
        </Col>
        <Col
          md="4"
          xs="12"
          className="introduction__image pr-md-0 pr-lg-3 d-none d-md-flex align-items-center"
        >
          <EventCard />
        </Col>
        <Col
          md="4"
          xs="12"
          className="introduction__image pr-md-0 pr-lg-3 d-none d-md-flex align-items-center"
        >
          <EventCard />
        </Col>
      </Row>
    </Container>
  );
};
export default function Home() {
  return (
    <WrapperStyled>
      <Head>
        <title>BBNPoll | Put your money where your mouth is</title>
        <meta name="description" content="Put your money where your mouth is" />
        <meta
          name="keywords"
          content="bbnpoll, Put your money where your mouth is"
        />
      </Head>
      <Container>
        <BBNLogo />
      </Container>

      <div className="home-page">
        <Hero />
        <Events />
      </div>
    </WrapperStyled>
  );
}
