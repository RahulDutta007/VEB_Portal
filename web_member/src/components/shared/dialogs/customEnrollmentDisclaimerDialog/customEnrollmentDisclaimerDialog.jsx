/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
import { forwardRef, JSXElementConstructor, ReactElement, useCallback, useContext } from "react";
import { CustomFilledInput, CustomInput } from "../../customInput";
import { ThemeContext } from "../../../../contexts";

import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	IconButton,
	DialogActions,
	Button,
	Grid,
	TextField
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import CloseIcon from "@mui/icons-material/Close";

import "./customEnrollmentDisclaimerDialog.css";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CustomEnrollmentDisclaimerDialog = ({
	enrollmentDisclaimerDialogProps,
	handleCloseDisclaimerDialog,
	handleEscapeCloseDisclaimerDialog,
	emailDisclaimer,
	setEmailDisclaimer
}) => {
	const { theme } = useContext(ThemeContext);
	const { openDialog, title, content, importantTitle, importantContent, inputFields, actions } =
		enrollmentDisclaimerDialogProps;

	const handleDisclaimerEmailChange = useCallback(
		(event) => {
			const { name, value } = event.target;
			setEmailDisclaimer(value);
		},
		[setEmailDisclaimer]
	);

	return (
		<Dialog
			style={{ zIndex: 5000 }}
			open={openDialog}
			onClose={handleCloseDisclaimerDialog}
			onKeyDown={handleEscapeCloseDisclaimerDialog}
			TransitionComponent={Transition}
			keepMounted
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
			className="disclaimer-dialog-container"
		>
			<DialogTitle id="alert-dialog-slide-title">
				<div className="custom-dialog-title">{title}</div>
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleCloseDisclaimerDialog}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500]
				}}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent className="custom-discliamer-dialog-content-container">
				<DialogContentText id="alert-dialog-slide-description">
					<div className="custom-dialog-content">{content}</div>
				</DialogContentText>
				<div className="disclaimer-dialog-content-container">
					<span className="important-content-title">{importantTitle}:</span>
					<span className="important-content">{importantContent}</span>
				</div>
				<div className="discalimer-dialog-action-field-container">
					<Grid container spacing={1}>
						<Grid item xs={6} sm={6} md={8} lg={8} xl={8}>
							{inputFields.map((inputField, index) => {
								const { name, value, placeholder } = inputField;
								return (
									<TextField
										// id="first-name-input"
										// className="form-field"
										name={name}
										value={emailDisclaimer}
										onChange={(event) => handleDisclaimerEmailChange(event)}
										variant="outlined"
										key={index}
										placeholder={placeholder}
										style={{ width: "100%", padding: 0, cursor: "pointer" }}
									/>
								);
							})}
						</Grid>
						<Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
							{actions.map((action, index) => {
								const { label, callback } = action;
								return (
									<Button
										variant="contained"
										style={{
											backgroundColor: theme.button.background_color,
											color: theme.button.color
										}}
										onClick={callback}
										key={index}
										className="enroll-disclaimer-action-btn"
									>
										{label}
									</Button>
								);
							})}
						</Grid>
					</Grid>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default CustomEnrollmentDisclaimerDialog;
