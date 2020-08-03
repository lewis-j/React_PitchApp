import React from "react";
import PropTypes from "prop-types";

const Circle = (props) => {
  return (
    <circle
      cx={props.xY.cx}
      cy={props.xY.cy}
      r="1"
      stroke="black"
      strokeWidth=".5"
      fill={props.xY.highlight}
    />
  );
};

Circle.propTypes = {
  xY: PropTypes.object.isRequired,
};

export default Circle;
