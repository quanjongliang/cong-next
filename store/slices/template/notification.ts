import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import {
  AlertInformation,
  SnackbarProps,
  STATUS_SNACKBAR,
  TRANSITION_SNACKBAR,
  VARIANT_SNACKBAR,
} from "model/notification";

interface IData {
  snackBar: SnackbarProps,
  alert: AlertInformation
}

const initialState: IData = {
  snackBar: {
    action: false,
    open: false,
    message: "Note archived",
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    variant: VARIANT_SNACKBAR.ALERT,
    alert: {
      color: "success",
      variant: "filled",
    },
    transition: TRANSITION_SNACKBAR.FADED,
    actionButton: false,
    severity: STATUS_SNACKBAR.SUCCESS,
  },
  alert: {
    open: false,
    message: "",
    handleConfirm: () => {},
  }
};

// ==============================|| SLICE - SNACKBAR ||============================== //

const notification = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar(state, action: PayloadAction<SnackbarProps>) {
      state.snackBar = {
        ...state.snackBar,
        ...action.payload as any
      }
    },

    closeSnackbar(state) {
      state.snackBar.open = false;
    },

    openAlertDialog(state, action: PayloadAction<AlertInformation>) {
      
      state.alert = {
        ...state.alert,
        ...action.payload
      }
    },
    closeAlertDialog(state) {
      state.alert.open = false;
    },
  },
});

export default notification.reducer;

export const { closeSnackbar, openSnackbar, openAlertDialog, closeAlertDialog } = notification.actions;
