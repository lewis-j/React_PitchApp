import React from "react";
import RadioButtons from "./radioButton/RadioButton";
import NumSelect from "./numberSelect/NumSelect2";
import { connect } from "react-redux";
import actions from "../../../redux/actions";
import _formItems from "./formItems";
import _ from "underscore";

const calls = {
  title: _formItems.CALL,
  options: ["ball", "strike", "foul", "miss"],
};
const stances = { title: _formItems.STANCE, options: ["LEFT", "Right"] };
const pitchTypes = {
  title: _formItems.PITCHTYPE,
  options: ["FB", "CH", "CB", "SL", "FK"],
};
const allRadioBtns = [calls, stances, pitchTypes];

const mapStateToProps = (state) => {
  return {
    formItems: state.formItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitClick: () => {
      dispatch({ type: actions.SUBMIT_PITCH });
    },
    btnClicked: (event) => {
      const btnGroup = event.target.parentNode.getAttribute("value");
      const selected = event.target.innerText;
      dispatch({ type: actions.HIGHLIGHT_BTN, answer: { selected, btnGroup } });
    },
  };
};
const meshCollections = (titles, _allRadioBtns) => {
  const combined = _.zip(_.values(titles), _allRadioBtns);
  return _.map(combined, (myarray) => {
    return { selected: myarray[0], labels: myarray[1] };
  });
};

const PitchForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ formItems, submitClick, btnClicked }) => {
  const result = meshCollections(formItems, allRadioBtns);

  const radioBtnGroup = result.map((_btns, index) => {
    return <RadioButtons key={index} btns={_btns} onClick={btnClicked} />;
  });

  return (
    <div className="PitchForm">
      {radioBtnGroup}
      <NumSelect size="150" />
      <button onClick={submitClick}>Enter</button>
    </div>
  );
});

export default PitchForm;
