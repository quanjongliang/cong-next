import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "store";
import { closeAlertDialog } from "store/slices/template/notification";

export const AlertDialog = () => {
  const dispatch = useDispatch();
  const { handleConfirm, message, open } = useSelector(
    (state) => state.notification.alert
  );

  const onHandleClose = () => {
    dispatch(closeAlertDialog());
  };

  const onHandleConfirm = () => {
    handleConfirm();
    onHandleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onHandleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" variant="h4">
        Bạn có chắc?
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          variant="h3"
          textAlign="center"
          color="MenuText"
          id="alert-dialog-description"
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant="contained" onClick={onHandleClose}>
          Huỷ
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onHandleConfirm}
          autoFocus
        >
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};
