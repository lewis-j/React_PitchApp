import React from "react";
import PropTypes from "prop-types";

const RadioButtons = ({ btns, onClick }) => {
  const _labels = mapLabels(btns.selected, btns.labels.options);

  const mapClass = (_entered) => {
    return _entered ? "RadioButtons-btn selected" : "RadioButtons-btn";
  };

  return (
    <div value={btns.labels.title} className="RadioButtons">
      {_labels.map(({ name, entered }, index) => (
        <button
          key={index}
          className={`${mapClass(entered)}`}
          onClick={onClick}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

const mapLabels = (selected, buttons) => {
  return buttons.map((item) => {
    const newItem = { name: item, entered: selected === item };

    return newItem;
  });
};

RadioButtons.propTypes = {
  btns: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RadioButtons;
