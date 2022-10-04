// material-ui
import { AlertProps, SnackbarOrigin } from "@mui/material";

// ==============================|| SNACKBAR TYPES  ||============================== //

export interface SnackbarProps {
	open: boolean;
	message: string;
	alert: AlertProps;
	transition?: TRANSITION_SNACKBAR;
	variant?: VARIANT_SNACKBAR;
	action?: boolean;
	anchorOrigin?: SnackbarOrigin;
	actionButton?: boolean;
	severity?: STATUS_SNACKBAR;
}

export enum STATUS_SNACKBAR {
	ERROR = "error",
	WARNING = "warning",
	INFO = "info",
	SUCCESS = "success",
}

export enum VARIANT_SNACKBAR {
	DEFAULT = "default",
	ALERT = "alert",
}

export enum TRANSITION_SNACKBAR {
	FADED = "Faded",
	SLIDE = "Slide",
	GROW = "Grow",
}

export interface AlertInformation {
	open: boolean;
	message: string;
	handleConfirm: () => void;
}
