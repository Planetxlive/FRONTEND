import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <ul className="wave-menu">
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wave-menu {
    border: 4px solid #545fe5;
    border-radius: 50px;
    width: 200px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: ease 0.2s;
    position: relative;
    background: #fff;
  }

  .wave-menu li {
    list-style: none;
    height: 30px;
    width: 4px;
    border-radius: 10px;
    background: #545fe5;
    margin: 0 6px;
    padding: 0;
    animation-name: wave1;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    transition: ease 0.2s;
  }

  .wave-menu:hover > li {
    background: #fff;
  }

  .wave-menu:hover {
    background: #545fe5;
  }

  .wave-menu li:nth-child(2) {
    animation-name: wave2;
    animation-delay: 0.2s;
  }

  .wave-menu li:nth-child(3) {
    animation-name: wave3;
    animation-delay: 0.23s;
    animation-duration: 0.4s;
  }

  .wave-menu li:nth-child(4) {
    animation-name: wave4;
    animation-delay: 0.1s;
    animation-duration: 0.3s;
  }

  .wave-menu li:nth-child(5) {
    animation-delay: 0.5s;
  }

  .wave-menu li:nth-child(6) {
    animation-name: wave2;
    animation-duration: 0.5s;
  }

  .wave-menu li:nth-child(8) {
    animation-name: wave4;
    animation-delay: 0.4s;
    animation-duration: 0.25s;
  }

  .wave-menu li:nth-child(9) {
    animation-name: wave3;
    animation-delay: 0.15s;
  }

  @keyframes wave1 {
    from {
      transform: scaleY(1);
    }

    to {
      transform: scaleY(0.5);
    }
  }

  @keyframes wave2 {
    from {
      transform: scaleY(0.3);
    }

    to {
      transform: scaleY(0.6);
    }
  }

  @keyframes wave3 {
    from {
      transform: scaleY(0.6);
    }

    to {
      transform: scaleY(0.8);
    }
  }

  @keyframes wave4 {
    from {
      transform: scaleY(0.2);
    }

    to {
      transform: scaleY(0.5);
    }
  }
`;

export default Loader;
