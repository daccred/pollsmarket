import React from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import { chakra, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// eslint-disable-next-line prefer-const
let AnimatedBox = motion.div;

// Framer animations
// const duration = 0.7;
// export const customTransition = {
//   type: 'spring',
//   damping: 0,
//   duration: duration,
//   restDelta: 0.5,
//   restSpeed: 0.5,
//   bounce: 0.25,
//   stiffness: 1,
// };

//@see https://www.framer.com/docs/transition/

const flipTransitions = {
  mass: 2,
  velocity: 1,
  restSpeed: 0.15,
  bounce: 0.25,
  damping: 0,
  type: 'spring',
  stiffness: 1,
};

const flipVariants = {
  shown: {
    rotateY: 0,
    transition: {
      mass: 2,
      velocity: 2,
      restSpeed: 0.75,
      bounce: 0.25,
      type: 'spring',
      damping: 0,
      stiffness: 1,
    },
  },

  // FYI front flip does most of the animations
  frontFlipped: {
    rotateY: -180,
    transition: flipTransitions,
  },
  // Back flip does almost nothing 99% of the time
  backFlipped: {
    rotateY: 180,
    transitions: flipTransitions,
  },
};

export function FlipCard({ children }: any) {
  return (
    <AnimatedBox
      style={{
        perspective: 1000,
      }}
    >
      <AnimatedBox
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          width: 300,
          height: 300,
        }}
      >
        {children}
      </AnimatedBox>
    </AnimatedBox>
  );
}

function AnimatedCardFace({ children, style, ...rest }: any) {
  return (
    <AnimatedBox
      style={{
        position: 'absolute',
        backfaceVisibility: 'hidden',
        // boxShadow: ' 40px 50px 150px rgba(0,0,0,0.3)',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 12,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'relative',
          flexDirection: 'column',
          // filter: "drop-shadow(30px 20px 23px rgba(0,0,0,0.3)",

          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ flex: 1, width: '100%' }}>{children}</div>
      </div>
    </AnimatedBox>
  );
}

export function FrontCard({ isCardFlipped, children }: any) {
  return (
    <AnimatedCardFace variants={flipVariants} animate={isCardFlipped ? 'frontFlipped' : 'shown'}>
      {children}
    </AnimatedCardFace>
  );
}

export function BackCard({ isCardFlipped, children }: any) {
  return (
    <AnimatedCardFace
      variants={flipVariants}
      initial={{ rotateY: 180 }}
      animate={isCardFlipped ? 'shown' : 'backFlipped'}
      style={
        isCardFlipped
          ? {
              backgroundColor: 'black',
              backgroundImage: 'linear-gradient(-370deg, #3898FF, #7A70FF)',
              color: 'white',
            }
          : {}
      }
    >
      {children}
    </AnimatedCardFace>
  );
}

const FlipPage: NextPage = () => {
  const [totalMinted] = React.useState(0);

  const [isMinted] = React.useState(true);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMinted(!isMinted);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [isMinted]);

  // const isMinted = false

  return (
    <Center>
      <chakra.div display={'flex'} justifyContent={'center'} m={'o auto'}>
        <chakra.div>
          <chakra.div style={{ flex: '1 1 auto' }}>
            <chakra.div style={{ padding: '24px 24px 24px 0' }}>
              <h1>NFT Demo Mint</h1>
              <p style={{ margin: '12px 0 24px' }}>{totalMinted} minted so far!</p>
              <ConnectButton />

              {/* {mintError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {mintError.message}
              </p>
            )}
            {txError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {txError.message}
              </p>
            )}

            {isConnected && !isMinted && (
              <button
                style={{ marginTop: 24 }}
                disabled={!mint || isMintLoading || isMintStarted}
                className="button"
                data-mint-loading={isMintLoading}
                data-mint-started={isMintStarted}
                onClick={() => mint?.()}
              >
                {isMintLoading && 'Waiting for approval'}
                {isMintStarted && 'Minting...'}
                {!isMintLoading && !isMintStarted && 'Mint'}
              </button>
            )} */}
            </chakra.div>
          </chakra.div>

          <chakra.div flex={'0 0 auto'} filter={'drop-shadow(15px 20px 53px rgba(0,0,0,0.3)'}>
            <FlipCard>
              <FrontCard isCardFlipped={isMinted}>
                <Image layout="responsive" src="/nft.png" width="500" height="500" alt="RainbowKit Demo NFT" />
                <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
                <ConnectButton />
              </FrontCard>
              <BackCard isCardFlipped={isMinted}>
                <Image layout="responsive" src="/nft.png" width="500" height="500" alt="RainbowKit Demo NFT" />
                <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
              </BackCard>
            </FlipCard>
          </chakra.div>
        </chakra.div>
      </chakra.div>
    </Center>
  );
};

export default FlipPage;
