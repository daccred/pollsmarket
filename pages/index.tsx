import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Head from "next/head";

import * as Type from "../lib/Components/Type";
import BBNLogo from "../lib/Icons/BBNLogo";
import Events from "./index/Events";
import About from "./index/About";
import Hero from "./index/Hero";

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

        <div className="home-page">
          <Hero />
          <Events />
          <About />

          <Type.Regular className="text-center primary-300-text small">
            BBN Poll 2022. All Rights Reserved
          </Type.Regular>
        </div>
      </Container>
    </WrapperStyled>
  );
}

/**
 * styles
 */
const WrapperStyled = styled.main`
  min-height: 100%;
  background-color: var(--black);
  color: ${(props) => props?.theme?.colors?.text || "var(--white)"};
  padding-bottom: 40px;
  padding-top: 32px;

  .homepage__hero {
    padding: 140px 0;

    @media (max-width: 767px) {
      padding: 80px 0;
    }
  }
`;
