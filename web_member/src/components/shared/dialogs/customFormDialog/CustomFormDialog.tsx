import { forwardRef, JSXElementConstructor, ReactElement } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import "./customFormDialog.css";
import { CustomFormDialogProps } from "../../../../@types/components/dialogProps.types";
import { CustomInput } from "../../customInput";

const Transition: JSXElementConstructor<TransitionProps & { children: ReactElement<any, any> }> | undefined =
	forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

const CustomFormDialog = ({ customFormDialogProps }: CustomFormDialogProps) => {
	const { openDialog, title, actions, textfields } = customFormDialogProps;

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
					{textfields.map((textfield, index) => {
						const { label, placeholder, onChange } = textfield;
						return (
							<CustomInput
								key={index}
								placeholder={placeholder}
								onChange={onChange}
								style={{ width: "95%" }}
							/>
						);
					})}
				</DialogContent>
				<DialogActions>
					{actions.map((action, index) => {
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

export default CustomFormDialog;
