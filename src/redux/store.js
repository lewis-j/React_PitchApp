import * as Redux from "redux";
import actions from "./actions";
import _ from "underscore";
import formItems from "../components/pitchApp/pitchForm/formItems";

function reducer(
  state = {
    coords: [],
    savedCoords: [],
    formItems: {
      [formItems.CALL]: "",
      [formItems.STANCE]: "",
      [formItems.PITCHTYPE]: "",
    },
    savedEntries: [],
  },
  action
) {
  switch (action.type) {
    case actions.COORDS_ENTERED: {
      const rect = action.event.currentTarget.getBoundingClientRect();
      const xCoord = action.event.clientX - rect.left;
      const xPercent = (xCoord / rect.width).toFixed(4) * 100 + "%";
      const yCoord = action.event.clientY - rect.top;
      const yPercent = (yCoord / rect.height).toFixed(4) * 100 + "%";
      const savedCoords = state.savedCoords;
      const newState = Object.assign({}, state, {
        coords: [
          ...savedCoords,
          { cx: xPercent, cy: yPercent, highlight: "green" },
        ],
        savedEntries: [
          ...state.savedEntries,
          {
            ...state.formItems,
            coords: { cx: xPercent, cy: yPercent, highlight: "green" },
          },
        ],
      });

      return newState;
    }
    case actions.SUBMIT_PITCH: {
      const _coords = state.coords;
      const newCoord = Object.assign(_.last(_coords), {
        highlight: "blue",
      });

      const savedCoords = [...state.savedCoords, newCoord];

      return Object.assign({}, state, {
        coords: [...savedCoords],
        savedCoords: [...savedCoords],
      });
    }
    case actions.HIGHLIGHT_BTN: {
      const btngroup = action.answer.btnGroup;
      const selected = action.answer.selected;

      if (state.formItems[btngroup] === selected) {
        const _formItems = Object.assign({}, state.formItems, {
          [btngroup]: "",
        });

        return Object.assign({}, state, { formItems: _formItems });
      } else {
        const _formItems = Object.assign({}, state.formItems, {
          [btngroup]: selected,
        });

        return Object.assign({}, state, { formItems: _formItems });
      }
    }
  }

  return state;
}

let store = Redux.createStore(reducer);

export default store;
