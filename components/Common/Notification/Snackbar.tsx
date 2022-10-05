import { ReactElement, SyntheticEvent } from "react";

// material-ui
import {
  Alert,
  Button,
  Fade,
  Grow,
  IconButton,
  Slide,
  SlideProps,
} from "@mui/material";
import MuiSnackbar from "@mui/material/Snackbar";

// assets
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "store";
import { closeSnackbar } from "store/slices/template/notification";
import {
  SnackbarProps,
  STATUS_SNACKBAR,
  TRANSITION_SNACKBAR,
} from "model/notification";

export const defaultSuccessAlert = (message: string): SnackbarProps => ({
  open: true,
  message,
  alert: { color: STATUS_SNACKBAR.SUCCESS },
  severity: STATUS_SNACKBAR.SUCCESS,
});

export const defaultErrorAlert = (message: string): SnackbarProps => ({
  open: true,
  message,
  alert: { color: STATUS_SNACKBAR.ERROR },
  severity: STATUS_SNACKBAR.ERROR,
});

// animation function
function TransitionSlide(props: SlideProps) {
  return <Slide {...props} />;
}

function GrowTransition(props: SlideProps) {
  return <Grow {...props} />;
}

// animation options
const animation: {
  [key in TRANSITION_SNACKBAR]: (props: SlideProps) => ReactElement;
} = {
  Slide: TransitionSlide,
  Grow: GrowTransition,
  Faded: Fade,
};

// ==============================|| SNACKBAR ||============================== //

const Snackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.notification.snackBar);
  const {
    actionButton,
    anchorOrigin,
    alert,
    message,
    open,
    transition = TRANSITION_SNACKBAR.FADED,
    variant,
    severity,
  } = snackbar;

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <>
      {variant === "default" && (
        <MuiSnackbar
          anchorOrigin={anchorOrigin}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message={message}
          TransitionComponent={animation[transition]}
          action={
            <>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          }
        />
      )}

      {/*Enum*/}
      {variant === "alert" && (
        <MuiSnackbar
          TransitionComponent={animation[transition]}
          anchorOrigin={anchorOrigin}
          open={open}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <Alert
            variant={alert.variant}
            color={alert.color}
            severity={severity}
            // color="primary"
            action={
              <>
                {actionButton !== false && (
                  <Button
                    size="small"
                    onClick={handleClose}
                    sx={{ color: "background.paper" }}
                  >
                    UNDO
                  </Button>
                )}

                <IconButton
                  sx={{ color: "background.paper" }}
                  size="small"
                  aria-label="close"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </>
            }
            sx={{
              ...(alert.variant === "outlined" && {
                bgcolor: "background.paper",
              }),
            }}
          >
            {message}
          </Alert>
        </MuiSnackbar>
      )}
    </>
  );
};

export default Snackbar;
