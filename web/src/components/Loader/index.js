import React from 'react';
import styled from 'styled-components';


const Dot = () => (
  <img
    className="__dot"
    alt="Loader Dot"
    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
  />
);

const Loader = () => (
  <Wrapper>
    <Dot />
    <Dot />
    <Dot />
  </Wrapper>
);

export default Loader;

const Wrapper = styled.div`
  width: 100%;
  height: 20px;
    max-height: 25px;
    display: flex;
    justify-content: center;
    visibility: visible;

    .__dot {
        background: #2185C9;
        height: 100%; // Since the dots are images, they will automatically try to retain their aspect ratio (1:1 for these squares)
        border-radius: 50%;
        margin: 0 .25em;
        padding: .25em;
        animation: dots 1.8s ease-in-out infinite both;

         &:nth-of-type(2) {
             animation-delay: .16s;
         }

         &:nth-of-type(3) {
             animation-delay: .32s;
         }
    }
    
    @keyframes dots {
    0%,
    80%,
    100% {
        transform : scale3d(.8, .8, .8)
    }
    40% {
        transform: scale3d(0, 0, 0)
    }
`;
