import { Snackbar, SnackbarCloseReason, Alert } from "@mui/material";
import { SyntheticEvent } from "react";
import { SnackbarAPIProps } from "../../../../src/@types/components/snackbarProps.types";

const SnackbarAPI = ({ snackbarProps }: SnackbarAPIProps): JSX.Element => {
	const { open, handleSnackbarClose, message, severity } = snackbarProps;
	const handleClose = (
		event: SyntheticEvent<Element, Event> | Event | SyntheticEvent<any, Event>,
		reason?: SnackbarCloseReason | undefined
	) => handleSnackbarClose(event, reason);

	return (
		<Snackbar
			open={open}
			onClose={handleClose}
			autoHideDuration={6000}
			style={{
				zIndex: 54000
			}}
		>
			<Alert onClose={handleClose} severity={severity}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarAPI;
