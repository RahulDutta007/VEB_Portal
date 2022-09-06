import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, MenuItem, Select } from "@mui/material";
import { CustomSelectInput } from "../customInput";
import { ThemeContext } from "../../../../src/contexts/index";

const style = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
};

const VEBModal = (props: any) => {
	const { theme } = useContext(ThemeContext);
	const [open, setOpen] = React.useState(props.open);
	const handleOpen = () => setOpen(true);

	React.useEffect(() => {
		setOpen(true);
	}, [props.open]);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Add Benefificary
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 1 }}>
						<Grid className="grid-container" container columnSpacing={4}>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Select Beneficiary</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="insuarance_premier"
									>
										<MenuItem value="abcd">ABCD</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">First Name</div>
									<CustomSelectInput></CustomSelectInput>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Last Name</div>
									<CustomSelectInput></CustomSelectInput>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Address</div>
									<CustomSelectInput />
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Address2</div>
									<CustomSelectInput></CustomSelectInput>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">City</div>
									<CustomSelectInput></CustomSelectInput>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">State</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="insuarance_premier"
									>
										<MenuItem value="abcd">ABCD</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Zip Code</div>
									<CustomSelectInput></CustomSelectInput>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">SSN</div>
									<CustomSelectInput></CustomSelectInput>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">DOB (MMDDYYYY)</div>
									<CustomSelectInput />
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Telephone</div>
									<CustomSelectInput></CustomSelectInput>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Gender</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="insuarance_premier"
									>
										<MenuItem value="abcd">ABCD</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">RelationShip</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="insuarance_premier"
									>
										<MenuItem value="abcd">ABCD</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Type</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="insuarance_premier"
									>
										<MenuItem value="abcd">ABCD</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Percent</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="insuarance_premier"
									>
										<MenuItem value="abcd">ABCD</MenuItem>
									</Select>
								</div>
							</Grid>
						</Grid>
					</Typography>
					<div>
						<Button
							className="plan-action-button"
							name="set-to-estate"
							variant="contained"
							size="small"
							style={{
								backgroundColor: theme.button.background_color,
								color: theme.button.color,
								opacity: 0.8,
								float: "right",
								marginTop: "10px"
							}}
						>
							Save
						</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default VEBModal;
