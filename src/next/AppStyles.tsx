import { Global } from '@emotion/react';

interface AppStyleProps {
  font: string;
}

export const AppStyles = ({ font }: AppStyleProps) => (
  <Global
    styles={`
          ${font}
          html, body {
              -webkit-overflow-scrolling: touch;
              font-family: "BR Firma";
              scroll-behavior: smooth;
              font-variant-ligatures: common-ligatures contextual discretionary-ligatures;
              font-feature-settings: 'kern', 'liga', 'clig', 'calt', 'dlig';
              font-kerning: normal;
          }
          a {
            text-decoration: none;
          }
          #nprogress {
            pointer-events: none;
          }
          #nprogress .bar {
            background: #001a0e;
            position: fixed;
            z-index: 199999939;  /* index to override what is set for sticky nav */
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
          }
          /* Fancy blur effect */
          #nprogress .peg {
            display: block;
            position: absolute;
            z-index: 199999939;  /* index to override what is set for sticky nav */
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 20px rgba(117, 28, 10, 0.7), 0 0 5px rgba(237, 147, 89, 0.7);
            opacity: 1.0;
            -webkit-transform: rotate(3deg) translate(0px, -4px);
                -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
          }
          .nprogress-custom-parent {
            overflow: hidden;
            position: relative;

          }
          .nprogress-custom-parent #nprogress .spinner {
            background: #001a0e;
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
          }
          .nprogress-custom-parent #nprogress .spinner,
          .nprogress-custom-parent #nprogress .bar {
            position: absolute;
          }
          @-webkit-keyframes nprogress-spinner {
            0%   { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); } 
          }
          @keyframes nprogress-spinner {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        
        `}
  />
);

export default AppStyles;
