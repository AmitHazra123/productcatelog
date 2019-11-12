import { OPEN_DIALOG, CLOSE_DIALOG } from "../actions/types";

const initialState = {
  open: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    // to open a dialog window
    case OPEN_DIALOG:
      return {
        ...state,
        open: true
      };
    // to close a dialog window
    case CLOSE_DIALOG:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
