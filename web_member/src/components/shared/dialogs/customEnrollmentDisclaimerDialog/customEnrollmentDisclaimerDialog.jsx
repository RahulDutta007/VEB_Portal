/* eslint-disable arrow-parens */
/* eslint-disable react/prop-types */
import { forwardRef, JSXElementConstructor, ReactElement, useCallback } from "react";
import { CustomFilledInput } from "../../customInput";

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
						<Grid item xs={6} sm={6} md={9} lg={9} xl={9}>
							{inputFields.map((inputField, index) => {
								const { name, value, placeHolder } = inputField;
								return (
									<div key={index} className="form-field-container">
										<input
											className="form-field"
											id="first-name-input"
											value={emailDisclaimer}
											name={name}
											placeholder={placeHolder}
											onChange={(event) => handleDisclaimerEmailChange(event)}
											// onChange={(event) => handleTermReasonChange(event)}
											variant="outlined"
										/>
									</div>
								);
							})}
						</Grid>
						<Grid item xs={6} sm={6} md={3} lg={3} xl={3} className="disclaimer-action-btn-container">
							{actions.map((action, index) => {
								const { label, callback } = action;
								return (
									<Button
										variant="contained"
										key={index}
										onClick={callback}
										// style={{
										// 	backgroundColor: "rgb(224, 40, 38)",
										// 	letterSpacing: "1px",
										// 	fontSize: "0.5rem",
										// 	fontWeight: "bold",

										// 	color: "#ffff",
										// 	marginRight: 10,
										// 	marginTop: 2,
										// 	marginLeft: 10
										// }}
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
