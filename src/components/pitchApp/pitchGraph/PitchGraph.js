import React from "react";
import Circle from "./circle/Circle";
import { connect } from "react-redux";
import actions from "../../../redux/actions";

const mapStateToProps = (state) => {
  return {
    coords: state.coords,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    graphClicked: (_event) => {
      dispatch({ type: actions.COORDS_ENTERED, event: _event });
    },
  };
};

const PitchGraph = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ graphClicked, coords }) => {
  const createCircle = coords.map((_coords, index) => (
    <Circle key={index} xY={_coords} />
  ));

  return (
    <svg
      className="PitchGraph"
      onClick={graphClicked}
      width="100%"
      height="100%"
      viewBox="0 0 74 100"
    >
      <rect
        className="PitchGraph-rect"
        x="0"
        y="0"
        width="100%"
        height="100%"
        stroke="darkgray"
        fill="white"
        fillOpacity=".5"
        strokeWidth="2"
      />
      <rect
        className="PitchGraph-rect"
        x="25%"
        y="25%"
        width="50%"
        height="50%"
        stroke="darkgray"
        fill="white"
        fillOpacity=".5"
        strokeWidth=".5"
      />
      <line
        className="PitchGraph-line"
        x1="25%"
        y1="41.5%"
        x2="75%"
        y2="41.5%"
        stroke="darkgray"
        strokeWidth=".5"
      />
      <line
        className="PitchGraph-line"
        x1="25%"
        y1="58%"
        x2="75%"
        y2="58%"
        stroke="darkgray"
        strokeWidth=".5"
      />
      <line
        className="PitchGraph-line"
        x1="41.5%"
        y1="25%"
        x2="41.5%"
        y2="75%"
        stroke="darkgray"
        strokeWidth=".5"
      />
      <line
        className="PitchGraph-line"
        x1="58%"
        y1="25%"
        x2="58%"
        y2="75%"
        stroke="darkgray"
        strokeWidth=".5"
      />
      {createCircle}
    </svg>
  );
});

export default PitchGraph;
