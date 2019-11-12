import { OPEN_DIALOG, CLOSE_DIALOG } from "./types";

// action for opening 'add product dialog'
export const openDialog = () => dispatch => {
  dispatch({
    type: OPEN_DIALOG,
    payload: {}
  });
};

// aciton for closing 'add product dialog'
export const closeDialog = () => dispatch => {
  dispatch({
    type: CLOSE_DIALOG,
    payload: {}
  });
};
