import { AlertColor, SnackbarCloseReason } from "@mui/material";
import { SyntheticEvent } from "react";

export type SnackbarProps = {
	open: boolean;
	severity: AlertColor | undefined;
	message: string;
	handleSnackbarClose: (
		event: SyntheticEvent<Element, Event> | Event | SyntheticEvent<any, Event>,
		reason: SnackbarCloseReason | undefined
	) => void;
};
