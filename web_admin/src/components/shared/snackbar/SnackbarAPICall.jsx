/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

const SnackbarAPICall = ({ snackbarProps }) => {
	const { open, severity, message, handleSnackbarClose } = snackbarProps;

	const handleClose = (event, reason) => handleSnackbarClose(event, reason);

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

export default SnackbarAPICall;
