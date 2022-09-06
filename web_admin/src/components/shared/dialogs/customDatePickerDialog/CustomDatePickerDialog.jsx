/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
import { forwardRef, useCallback } from "react";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Grid } from "@mui/material";

import EventIcon from "@mui/icons-material/Event";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const CustomDatePickerDialog = ({ dialogProps, setDialogProps }) => {
	const { openDialog, title, textFields, actions, _id, value } = dialogProps;
	const handleDateChange = useCallback(
		(_date, name) => {
			const date = new Date(_date);
			const parsedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
			setDialogProps(Object.assign({}, dialogProps, { value: parsedDate }));
		},
		[dialogProps, setDialogProps]
	);

	return (
		<div>
			<Dialog
				style={{ zIndex: 800 }}
				open={openDialog}
				TransitionComponent={Transition}
				keepMounted
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
				<DialogContent>
					{textFields.map((textField, index) => {
						const { placeHolder, name, label } = textField;
						return (
							<>
								<Grid container spacing={1} className=" pf-grid-container " key={index}>
									<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
										<Grid container spacing={1} className="pf-label">
											<Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
												<div className="pf-label-text ">{label}</div>
											</Grid>
											<Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
												<MuiPickersUtilsProvider utils={DateFnsUtils}>
													<KeyboardDatePicker
														className="from-date-input date-input"
														id="from-date-input"
														inputVariant="outlined"
														placeholder={placeHolder}
														name={name}
														label={label}
														format="MM/dd/yyyy"
														error={false}
														value={value}
														onChange={(date) => handleDateChange(date, name)}
														InputProps={{
															readOnly: true
														}}
														InputLabelProps={{
															shrink: true
														}}
														//style={{ width: "340px", borderRadius: 50 }}
														keyboardIcon={<EventIcon style={{ color: "#7cb342" }} />}
														KeyboardButtonProps={{
															"aria-label": "change date"
														}}
														// disabled={!isButtonSelected}
														// disableElevation={!isButtonSelected}
														style={{
															// cursor: !isButtonSelected ? "not-allowed" : "pointer",
															pointerEvents: "unset",
															width: "250px",
															borderRadius: 50
														}}
														helperText={""}
													/>
												</MuiPickersUtilsProvider>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							</>
						);
					})}
				</DialogContent>
				<DialogActions>
					{actions.map((action, index) => {
						const { label, callback } = action;

						return (
							<Button
								className="action-button"
								variant="contained"
								key={index}
								onClick={() => {
									callback();
								}}
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

export default CustomDatePickerDialog;
