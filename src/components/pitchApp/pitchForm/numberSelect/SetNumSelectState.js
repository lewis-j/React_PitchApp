import { useState } from "react";
import styled, { keyframes, css } from "styled-components";

const setNumSelectHook = (digitLimit) => {
  const [customState, setCustomState] = useState({
    numInput: "0",
    offset: 0,
    css: "unanimatedClosed",
    activeHighlight: -1,
  });

  const createCssMap = (startX, startY, duration) => {
    const transformEnd = `transform: translate(${-1 * startX}px,${
      -1 * startY
    }px);`;

    const transformBegin = `transform: translate(0,0);`;

    const expand = keyframes`    from {
          ${transformBegin}
        
        }
        to {
          ${transformEnd}
        }
        `;

    const collapse = keyframes`    from {
          ${transformEnd}
        }
        to {
          ${transformBegin}
        }
        `;
    return (cssBlock) => {
      const styledCss = {
        open: css`
          animation: ${expand} ${duration}s linear;
          animation-fill-mode: forwards;
        `,
        close: css`
          ${transformEnd}
            animation: ${collapse} ${duration}s linear;
            animation-fill-mode: forwards;
          `,

        unanimatedOpened: css`
          ${transformEnd}
        `,
        unanimatedClosed: css``,
      };
      return styledCss[cssBlock];
    };
  };

  const toggleAnimation = () => {
    const newState = Object.assign({}, customState, {
      css: customState.css === "unanimatedClosed" ? "open" : "close",
      numInput:
        customState.numInput.length >= digitLimit ? "0" : customState.numInput,
      offset:
        customState.numInput.length >= digitLimit ? 0 : customState.offset,
    });
    setCustomState(newState);
  };

  const setCssState = () => {
    const newState = Object.assign({}, customState, {
      css: customState.css === "open" ? "unanimatedOpened" : "unanimatedClosed",
    });
    setCustomState(newState);
  };

  const enterNum = (_num) => {
    const newNum = `${
      customState.numInput.localeCompare("0") ? customState.numInput : ""
    }${_num}`;
    const newState = Object.assign({}, customState, {
      numInput: newNum,
      offset:
        customState.numInput == "0"
          ? customState.offset
          : customState.offset + 8.5,
      css: newNum.length >= digitLimit ? "close" : "unanimatedOpened",
      activeHighlight: _num,
    });
    setCustomState(newState);
  };

  const highlightAnimation = () => {
    const anim = keyframes`    from {
        
          stroke-width: .5
        }
        to {
         
          stroke-width: 5
        }`;

    return css`
      animation: ${anim} 0.25s linear;
      stroke: orange;
      fill: #b5bec1;
    `;
  };

  const addCircleAnimation = (_num) => {
    return styled.circle`
      ${_num == customState.activeHighlight ? highlightAnimation() : ""}
    `;
  };

  const setCircleCoords = (startX, startY) => {
    return (animDuration) => {
      const getCss = createCssMap(startX, startY, animDuration);

      return styled.g`
        ${getCss(customState.css)}
      `;
    };
  };

  const manageAnimationStates = (num) => (e) => {
    const t = e.target.tagName;
    if (num === 0 && t.trim() === "g") {
      setCssState();
    } else if (t.trim() === "circle" && customState.css !== "close") {
      const newState = Object.assign({}, customState, {
        activeHighlight: -1,
      });
      setCustomState(newState);
    }
  };

  return {
    number: customState.numInput,
    inputOffset: customState.offset,
    setCircleCoords,
    toggleAnimation,
    enterNum,
    manageAnimationStates,
    addCircleAnimation,
  };
};

export default setNumSelectHook;
