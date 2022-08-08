import { forwardRef, JSXElementConstructor, Key, ReactElement } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { CustomDialogProps } from "../../../../@types/components/dialogProps.types";
import { TransitionProps } from "@mui/material/transitions";

import "./customDialog.css";

const Transition: JSXElementConstructor<TransitionProps & { children: ReactElement<any, any> }> | undefined =
	forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

const CustomDialog = ({ dialogProps }: CustomDialogProps): JSX.Element => {
	const { openDialog, title, content, actions } = dialogProps;

	return (
		<div>
			<Dialog
				style={{ zIndex: 5000 }}
				open={openDialog}
				TransitionComponent={Transition}
				keepMounted
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					<div className="custom-dialog-title">{title}</div>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<div className="custom-dialog-content">{content}</div>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{actions.map((action: { label: any; callback: any; }, index: Key | null | undefined) => {
						const { label, callback } = action;
						return (
							<Button
								variant="contained"
								key={index}
								onClick={callback}
								style={{
									backgroundColor: "#3a4652", //"#44b700" --> Green Color
									letterSpacing: "1px",
									fontSize: "0.7rem",
									fontWeight: "bold",
									color: "#ffff",
									marginRight: 10,
									marginLeft: 5
								}}
							>
								{label}
							</Button>
						);
					})}
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default CustomDialog;
