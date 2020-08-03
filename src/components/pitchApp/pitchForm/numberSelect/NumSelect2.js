import React from "react";
import _ from "underscore";
import PropType from "prop-types";
import setNumSelectState from "./SetNumSelectState";

const NumSelect = ({ size = 300, digitLimit = 2 }) => {
  const {
    number,
    inputOffset,
    setCircleCoords,
    toggleAnimation,
    enterNum,
    manageAnimationStates,
    addCircleAnimation,
  } = setNumSelectState(digitLimit);

  const radius = 60;
  const rotationalOffsetPercent = 70 / 100;
  const btnSize = radius ? radius * 0.2 : 1;
  const numberOfCircles = 10;
  const pieSlicePercentage = 70 / 100;
  const labelOffset = btnSize ? radius / btnSize : 0;
  const animDuration = 0.5;

  function getCoordinatesForPercent(percent, slicePercentage, offset, _radius) {
    const radians = 2 * Math.PI * (percent * slicePercentage + offset);
    const x = Math.cos(radians) * _radius;
    const y = Math.sin(radians) * _radius;
    return [x, y];
  }

  const circles = _.range(numberOfCircles).map((num) => {
    const [startX, startY] = getCoordinatesForPercent(
      num / numberOfCircles,
      pieSlicePercentage,
      rotationalOffsetPercent,
      radius
    );

    const addCircleGroupAnimation = setCircleCoords(startX, startY);

    const Group = addCircleGroupAnimation(animDuration);

    const Circle = addCircleAnimation(num);

    const Texts = () => {
      return (
        <text
          fontSize="15"
          fontWeight="600"
          x={-labelOffset - 0.75}
          y={labelOffset + 1}
        >
          {num}
        </text>
      );
    };

    return (
      <Group
        className="NumSelect-outerCircle"
        onAnimationEnd={manageAnimationStates(num)}
        key={num}
        onClick={() => {
          enterNum(`${num}`);
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
        <text fontSize="30px" x={`-${8 + inputOffset}px`}>
          {number}
        </text>
        <text fontSize="15" fontWeight="500" x="-17" y="30">
          MPH
        </text>
      </g>
    </svg>
  );
};

NumSelect.propTypes = {
  size: PropType.string,
  digitLimit: PropType.number,
};

export default NumSelect;
