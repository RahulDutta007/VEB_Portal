import React, { useContext, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { CustomSelectInput } from "../customInput";
import { ThemeContext } from "../../../../src/contexts/index";
import { PERCENTAGE } from "../../../constants/percentage";
import SecurityOutlined from "@mui/icons-material/SecurityOutlined";

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
	const [open, setOpen] = useState(false);
	const [addBeneficiaryDetails, setAddBeneficiaryDetails] = useState({
		beneficiaryName: "",
		firstName: "",
		lastName: "",
		address: "",
		address2: "",
		city: "",
		state: "",
		zipCode: "",
		ssn: "",
		dob: "",
		telephone: "",
		gender: "",
		relationship: "",
		type: "",
		percentage: ""
	});
	const handleOpen = () => setOpen(true);

	const handlePlanChange = useCallback(
		async (event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement>) => {
			let value: any = event.target.value;
			const { name } = event.target;
			if (name === "ssn") {
				const _value = Number(value.replaceAll("-", ""));
				if (!isNaN(_value)) {
					const ssn = value;
					if (
						!(
							/^[0-9]{0,3}$/.test(value) ||
							/^[0-9]{3}-[0-9]{0,2}$/.test(value) ||
							/^[0-9]{3}-[0-9]{2}-[0-9]{0,4}$/.test(value)
						)
					) {
						value = value.substr(0, value.length - 1);
					} else if (ssn.length === 6) {
						value = value.substr(0, 7) + "-" + value.substr(7);
					} else if (ssn.length === 3) {
						value = value.substr(0, 3) + "-" + value.substr(3);
					}

					setAddBeneficiaryDetails(Object.assign({}, addBeneficiaryDetails, { [name]: value }));
				} else {
					event.target.value = "";
					event.target.value = addBeneficiaryDetails.ssn;
				}
			} else if (name === "dob") {
				const _value = Number(value.replaceAll("-", ""));
				if (!isNaN(_value)) {
					const dob = value;
					if (
						!(
							/^[0-9]{0,2}$/.test(value) ||
							/^[0-9]{2}-[0-9]{0,2}$/.test(value) ||
							/^[0-9]{2}-[0-9]{2}-[0-9]{0,4}$/.test(value)
						)
					) {
						value = value.substr(0, value.length - 1);
					} else if (dob.length === 5) {
						value = value.substr(0, 6) + "-" + value.substr(6);
					} else if (dob.length === 2) {
						value = value.substr(0, 2) + "-" + value.substr(2);
					}

					setAddBeneficiaryDetails(Object.assign({}, addBeneficiaryDetails, { [name]: value }));
				} else {
					event.target.value = "";
					event.target.value = addBeneficiaryDetails.ssn;
				}
			} else {
				setAddBeneficiaryDetails(Object.assign({}, addBeneficiaryDetails, { [name]: value }));
			}
		},
		[addBeneficiaryDetails]
	);

	const handleSubmitBeneficiary = useCallback(
		async (event: { preventDefault: () => void }) => {
			event.preventDefault();
			setOpen(false);
			setAddBeneficiaryDetails({
				beneficiaryName: "",
				firstName: "",
				lastName: "",
				address: "",
				address2: "",
				city: "",
				state: "",
				zipCode: "",
				ssn: "",
				dob: "",
				telephone: "",
				gender: "",
				relationship: "",
				type: "",
				percentage: ""
			});
			props.submitBeneficiary(addBeneficiaryDetails);
		},
		[addBeneficiaryDetails, open, props]
	);

	const handleKeyCheck = useCallback(
		(event: any) => {
			// eslint-disable-next-line prefer-const
			let { name, value } = event.target;
			const keyID = event.keyCode;

			if (name === "ssn") {
				if (keyID === 8 || keyID === 46) {
					if (/[-]/.test(value) && value.length === 4) {
						// eslint-disable-next-line no-var
						var index = value.indexOf("-");
						value = value.substr(0, index);
						setAddBeneficiaryDetails(Object.assign({}, addBeneficiaryDetails, { [name]: value }));
					}
					if (/[-]/.test(value) && value.length === 7) {
						// eslint-disable-next-line no-var
						var index = value.lastIndexOf("-");
						value = value.substr(0, index);
						setAddBeneficiaryDetails(Object.assign({}, addBeneficiaryDetails, { [name]: value }));
					}
				}
			}
			if (name === "dob") {
				if (keyID === 8 || keyID === 46) {
					if (/[-]/.test(value) && value.length === 3) {
						// eslint-disable-next-line no-var
						var index = value.indexOf("-");
						value = value.substr(0, index);
						setAddBeneficiaryDetails(Object.assign({}, addBeneficiaryDetails, { [name]: value }));
					}
					if (/[-]/.test(value) && value.length === 6) {
						// eslint-disable-next-line no-var
						var index = value.lastIndexOf("-");
						value = value.substr(0, index);
						setAddBeneficiaryDetails(Object.assign({}, addBeneficiaryDetails, { [name]: value }));
					}
				}
			}
		},
		[addBeneficiaryDetails]
	);

	React.useEffect(() => {
		setOpen(props.open);
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
						Add Beneficary
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 1 }}>
						<Grid className="grid-container" container columnSpacing={4}>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Select Beneficiary</div>
									<Select
										id="text-align-options"
										className="pointer-event-unset select-input-style create-user-input-select"
										name="beneficiaryName"
										onChange={(event: SelectChangeEvent) => handlePlanChange(event)}
										style={{ width: "100%" }}
										MenuProps={{
											style: { zIndex: 35960 }
										}}
										inputProps={{ "aria-label": "Without label" }}
										value={
											props.data.length === 0
												? addBeneficiaryDetails.beneficiaryName
												: props.data.name
										}
									>
										{props.familyDetails.map((val: any, index: number) => {
											return (
												<MenuItem key={index} value={val.name}>
													{val.name}
												</MenuItem>
											);
										})}
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">First Name</div>
									<TextField
										className="form-field-input form-field-input-lg-form auth-input-fields"
										id="beneficiary-first-name"
										name="firstName"
										value={
											Object.keys(props.data).length === 0
												? addBeneficiaryDetails.firstName
												: props.data.Name
										}
										placeholder="Enter First Name"
										variant="outlined"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlanChange(event)
										}
										// onKeyDown={(event: any) => handleKeyCheck(event)}
										// onPaste={(event: any) => handlePaste(event)}
										// helperText={validation.user.SSN}
									/>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Last Name</div>
									<TextField
										className="form-field-input form-field-input-lg-form auth-input-fields"
										id="beneficiary-last-name"
										name="lastName"
										value={addBeneficiaryDetails.lastName}
										placeholder="Enter Last Name"
										variant="outlined"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlanChange(event)
										}
										// onKeyDown={(event: any) => handleKeyCheck(event)}
										// onPaste={(event: any) => handlePaste(event)}
										// helperText={validation.user.SSN}
									/>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Address</div>
									<TextField
										className="form-field-input form-field-input-lg-form auth-input-fields"
										id="beneficiary-address"
										name="address"
										value={addBeneficiaryDetails.address}
										placeholder="Enter Address"
										variant="outlined"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlanChange(event)
										}
										// onKeyDown={(event: any) => handleKeyCheck(event)}
										// onPaste={(event: any) => handlePaste(event)}
										// helperText={validation.user.SSN}
									/>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Address2</div>
									<TextField
										className="form-field-input form-field-input-lg-form auth-input-fields"
										id="beneficiary-address-2"
										name="address2"
										value={addBeneficiaryDetails.address2}
										placeholder="Enter Address 2"
										variant="outlined"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlanChange(event)
										} // onChange={handleChange}
										// onKeyDown={(event: any) => handleKeyCheck(event)}
										// onPaste={(event: any) => handlePaste(event)}
										// helperText={validation.user.SSN}
									/>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">City</div>
									<TextField
										className="form-field-input form-field-input-lg-form auth-input-fields"
										id="beneficiary-city"
										name="city"
										value={addBeneficiaryDetails.city}
										placeholder="Enter City"
										variant="outlined"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlanChange(event)
										}
										// onKeyDown={(event: any) => handleKeyCheck(event)}
										// onPaste={(event: any) => handlePaste(event)}
										// helperText={validation.user.SSN}
									/>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">State</div>
									<Select
										id="text-align-options"
										className="pointer-event-unset select-input-style create-user-input-select"
										name="state"
										value={addBeneficiaryDetails.state}
										onChange={(event: SelectChangeEvent) => handlePlanChange(event)}
										style={{ width: "100%" }}
										MenuProps={{
											style: { zIndex: 35960 }
										}}
										inputProps={{ "aria-label": "Without label" }}
									>
										<MenuItem value="abcd">ABCD</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Zip Code</div>
									<TextField
										className="form-field-input form-field-input-lg-form auth-input-fields"
										id="beneficiary-zip-code"
										name="zipCode"
										value={addBeneficiaryDetails.zipCode}
										placeholder="Enter Zip Code"
										variant="outlined"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlanChange(event)
										}
										// onKeyDown={(event: any) => handleKeyCheck(event)}
										// onPaste={(event: any) => handlePaste(event)}
										// helperText={validation.user.SSN}
									/>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">SSN</div>
									<TextField
										className="form-field-input form-field-input-lg-form auth-input-fields"
										id="SSN-input"
										name="ssn"
										value={addBeneficiaryDetails.ssn}
										placeholder="Enter SSN"
										variant="outlined"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlanChange(event)
										}
										onKeyDown={(event: any) => handleKeyCheck(event)}
										// onPaste={(event: any) => handlePaste(event)}
										// helperText={validation.user.SSN}
										InputProps={{
											startAdornment: <InputAdornment position="start"></InputAdornment>
										}}
									/>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">DOB (MMDDYYYY)</div>
									<TextField
										className="form-field-input form-field-input-lg-form auth-input-fields"
										id="beneficiary-dob"
										name="dob"
										value={addBeneficiaryDetails.dob}
										placeholder="Enter DOB"
										variant="outlined"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlanChange(event)
										}
										InputProps={{
											startAdornment: <InputAdornment position="start"></InputAdornment>
										}}
										onKeyDown={(event: any) => handleKeyCheck(event)}
										// onPaste={(event: any) => handlePaste(event)}
										// helperText={validation.user.SSN}
									/>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Telephone</div>
									<TextField
										className="form-field-input form-field-input-lg-form auth-input-fields"
										id="beneficiary-phone"
										name="telephone"
										value={addBeneficiaryDetails.telephone}
										placeholder="Enter Phone Number"
										variant="outlined"
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											handlePlanChange(event)
										}
										// onKeyDown={(event: any) => handleKeyCheck(event)}
										// onPaste={(event: any) => handlePaste(event)}
										// helperText={validation.user.SSN}
									/>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Gender</div>
									<Select
										id="text-align-options"
										className="pointer-event-unset select-input-style create-user-input-select"
										name="gender"
										value={addBeneficiaryDetails.gender}
										onChange={(event: SelectChangeEvent) => handlePlanChange(event)}
										style={{ width: "100%" }}
										MenuProps={{
											style: { zIndex: 35960 }
										}}
										inputProps={{ "aria-label": "Without label" }}
									>
										<MenuItem value="Male">Male</MenuItem>
										<MenuItem value="Female">Female</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">RelationShip</div>
									<Select
										id="text-align-options"
										className="pointer-event-unset select-input-style create-user-input-select"
										name="relationship"
										value={addBeneficiaryDetails.relationship}
										onChange={(event: SelectChangeEvent) => handlePlanChange(event)}
										style={{ width: "100%" }}
										MenuProps={{
											style: { zIndex: 35960 }
										}}
										inputProps={{ "aria-label": "Without label" }}
									>
										<MenuItem value="">select</MenuItem>
										<MenuItem value="Aunt">Aunt</MenuItem>
										<MenuItem value="Brother">Brother</MenuItem>
										<MenuItem value="Child">Child</MenuItem>
										<MenuItem value="CommonLawHusband">CommonLawHusband</MenuItem>
										<MenuItem value="CommonLawWife">CommonLawWife</MenuItem>
										<MenuItem value="Daughter">Daughter</MenuItem>
										<MenuItem value="DisabledChild">DisabledChild</MenuItem>
										<MenuItem value="Estate">Estate</MenuItem>
										<MenuItem value="ExHusband">ExHusband</MenuItem>
										<MenuItem value="ExWife">ExWife</MenuItem>
										<MenuItem value="Father">Father</MenuItem>
										<MenuItem value="Fiance">Fiance</MenuItem>
										<MenuItem value="Fiancee">Fiancee</MenuItem>
										<MenuItem value="Friend">Friend</MenuItem>
										<MenuItem value="Goddaughter">Goddaughter</MenuItem>
										<MenuItem value="Godson">Godson</MenuItem>
										<MenuItem value="Granddaughter">Granddaughter</MenuItem>
										<MenuItem value="Grandson">Grandson</MenuItem>
										<MenuItem value="Husband">Husband</MenuItem>
										<MenuItem value="Member">Member</MenuItem>
										<MenuItem value="Mother">Mother</MenuItem>
										<MenuItem value="Nephew">Nephew</MenuItem>
										<MenuItem value="Niece">Niece</MenuItem>
										<MenuItem value="Other">Other</MenuItem>
										<MenuItem value="Parents">Parents</MenuItem>
										<MenuItem value="Sister">Sister</MenuItem>
										<MenuItem value="Son">Son</MenuItem>
										<MenuItem value="Spouse">Spouse</MenuItem>
										<MenuItem value="Stepchildren">Stepchildren</MenuItem>
										<MenuItem value="Stepdaughter">Stepdaughter</MenuItem>
										<MenuItem value="Stepfather">Stepfather</MenuItem>
										<MenuItem value="Stepmother">Stepmother</MenuItem>
										<MenuItem value="Stepson">Stepson</MenuItem>
										<MenuItem value="Uncle">Uncle</MenuItem>
										<MenuItem value="Ward">Ward</MenuItem>
										<MenuItem value="Wife">Wife</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Type</div>
									<Select
										id="text-align-options"
										className="pointer-event-unset select-input-style create-user-input-select"
										name="type"
										onChange={(event: SelectChangeEvent) => handlePlanChange(event)}
										value={addBeneficiaryDetails.type}
										style={{ width: "100%" }}
										MenuProps={{
											style: { zIndex: 35960 }
										}}
										inputProps={{ "aria-label": "Without label" }}
									>
										<MenuItem value="Primary">Primary</MenuItem>
										<MenuItem value="Contigent">Contigent</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Percent</div>
									<Select
										id="text-align-options"
										className="pointer-event-unset select-input-style create-user-input-select"
										name="percentage"
										onChange={(event: SelectChangeEvent) => handlePlanChange(event)}
										style={{ width: "100%" }}
										value={addBeneficiaryDetails.percentage}
										MenuProps={{
											style: { zIndex: 35960 }
										}}
										inputProps={{ "aria-label": "Without label" }}
									>
										{PERCENTAGE.map((val: string, index: number) => {
											return (
												<MenuItem key={index} value={val}>
													{val}
												</MenuItem>
											);
										})}
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
							onClick={handleSubmitBeneficiary}
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
