import styled from "styled-components";
import TelegramIcon from "../../lib/Icons/Telegram";
import DiscordIcon from "../../lib/Icons/Discord";
import TwitterIcon from "../../lib/Icons/Twitter";
import * as Type from "../../lib/Components/Type";
import BBNLogo from "../../lib/Icons/BBNLogo";

const About = () => {
  return (
    <AboutStyled className="homepage__about">
      <div className="text-center">
        <BBNLogo />
        <Type.Regular className="my-16 primary-300-text small">
          BBN Poll is a platform where you can stake money on events in the BB
          Naija show and predict on an outcome to win from a stake pool.
        </Type.Regular>

        <div className="d-flex align-items-center justify-content-center">
          <DiscordIcon
            onClick={() => window.open(process.env.REACT_APP_SOCIAL_DISCORD)}
            className="mr-16"
            color="var(--default)"
          />
          <TelegramIcon
            onClick={() => window.open(process.env.REACT_APP_SOCIAL_TELEGRAM)}
            className="mr-16"
            color="var(--default)"
          />
          <TwitterIcon
            onClick={() => window.open(process.env.REACT_APP_SOCIAL_TWITTER)}
            className="mr-16"
            color="var(--default)"
          />
        </div>
      </div>
    </AboutStyled>
  );
};

/**
 * styles
 */
const AboutStyled = styled.footer`
  max-width: 480px;
  margin: 84px auto;

  @media (min-width: 768px) {
    margin: 84px auto 112px;
  }
`;

export default About;
