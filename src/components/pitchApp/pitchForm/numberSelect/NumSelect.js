import React, { useState } from "react";
import _ from "underscore";
import styled, { keyframes, css } from "styled-components";
import PropType from "prop-types";

const NumSelect = ({ size = 300, digitLimit = 2 }) => {
  const [customState, setCustomState] = useState({
    num: "0",
    offset: 0,
    css: "unanimatedClosed",
    activeHighlight: -1,
  });

  const radius = 60;
  const rotationalOffsetPercent = 70 / 100;
  const btnSize = radius ? radius * 0.2 : 1;
  const numberOfCircles = 10;
  const pieSlicePercentage = 70 / 100;
  const offset = btnSize ? radius / btnSize : 0;
  const animDuration = 0.5;

  function getCoordinatesForPercent(percent, slicePercentage, offset, _radius) {
    const radians = 2 * Math.PI * (percent * slicePercentage + offset);
    const x = Math.cos(radians) * _radius;
    const y = Math.sin(radians) * _radius;
    return [x, y];
  }
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
    console.log("anim state", customState.css);

    const newState = Object.assign({}, customState, {
      css: customState.css === "unanimatedClosed" ? "open" : "close",
      num: customState.num.length >= digitLimit ? "0" : customState.num,
      offset: customState.num.length >= digitLimit ? 0 : customState.offset,
    });
    setCustomState(newState);
  };

  const setCssState = () => {
    console.log("set state", customState.css);
    const newState = Object.assign({}, customState, {
      css: customState.css === "open" ? "unanimatedOpened" : "unanimatedClosed",
    });
    setCustomState(newState);
  };

  const enterNum = (_num) => {
    const newNum = `${
      customState.num.localeCompare("0") ? customState.num : ""
    }${_num}`;
    console.log("splite number", newNum.length);
    const newState = Object.assign({}, customState, {
      num: newNum,
      offset:
        customState.num == "0" ? customState.offset : customState.offset + 8.5,
      css: newNum.length >= digitLimit ? "close" : "unanimatedOpened",
      activeHighlight: _num,
    });
    setCustomState(newState);
  };

  const circles = _.range(numberOfCircles).map((num) => {
    const [startX, startY] = getCoordinatesForPercent(
      num / numberOfCircles,
      pieSlicePercentage,
      rotationalOffsetPercent,

      radius
    );

    const _num = num;

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

    const Circle = styled.circle`
      ${_num == customState.activeHighlight ? highlightAnimation() : ""}
    `;

    const Texts = () => {
      return (
        <text fontSize="15" fontWeight="600" x={-offset - 0.75} y={offset + 1}>
          {_num}
        </text>
      );
    };

    const getCss = createCssMap(startX, startY, animDuration);

    const Group = styled.g`
      ${getCss(customState.css)}
    `;

    const manageAnimationStates = (e) => {
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

    return (
      <Group
        className="NumSelect-outerCircle"
        onAnimationEnd={(e) => {
          manageAnimationStates(e);
        }}
        key={_num}
        onClick={() => {
          enterNum(`${_num}`);
        }}
      >
        <Circle
          onAnimationEnd={() => {}}
          cx={0}
          cy={0}
          r={btnSize}
          stroke="black"
          strokeWidth=".5"
          fill="grey"
        />
        <Texts />
      </Group>
    );
  });

  return (
    <svg viewBox="-100 -100 200 200" width={`${size}px`} height={`${size}px`}>
      {circles}
      <g id="go" onClick={toggleAnimation}>
        <circle
          className="NumSelect-innerCircle"
          cx="0"
          cy="0"
          r={radius - (btnSize + 4)}
          stroke="black"
          strokeWidth="1"
          fill="white"
        ></circle>
        <text fontSize="30px" x={`-${8 + customState.offset}px`}>
          {customState.num}
        </text>
        <text fontSize="15" fontWeight="500" x="-17" y="30">
          MPH
        </text>
      </g>
    </svg>
  );
};

NumSelect.propTypes = {
  size: PropType.number.isRequired,
  digitLimit: PropType.number.isRequired,
};

export default NumSelect;
