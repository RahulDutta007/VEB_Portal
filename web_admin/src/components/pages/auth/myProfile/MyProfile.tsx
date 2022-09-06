import { useState, useContext, useEffect, useCallback, Suspense, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Grid, Card, CardContent, Checkbox, Button, TextField, InputAdornment } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import axios from "axios";
import { url, port, headers } from "../../../../config/config";
import { trackPromise } from "react-promise-tracker";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { User } from "../../../../@types/user.types";
import { ChangePassword } from "../../../../@types/changePassword.types";
import { AuthContext, UIContext } from "../../../../contexts";
import { Validation } from "../../../../@types/validation.types";
import { SnackbarProps } from "../../../../@types/snackbarAPI.types";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { ADMIN_DASHBOARD_HEADER } from "../../../../constants/caption/dashboardHeader";
import { api } from "../../../../utils/api";
import { AUTHORIZATION } from "../../../../constants/api/auth";
import SnackbarAPI from "../../../shared/snackbar/SnackbarAPI";
import validatePassword from "../../../../utils/commonFunctions/validatePassword";
import validateUserName from "../../../../utils/commonFunctions/validateUserName";

import EditIcon from "@material-ui/icons/Edit";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import SecurityIcon from "@material-ui/icons/Security";
import EventIcon from "@material-ui/icons/Event";
import SaveIcon from "@material-ui/icons/Save";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import LockIcon from "@material-ui/icons/Lock";
import InfoIcon from "@material-ui/icons/Info";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import "./myProfile.css";

const mailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

const MyProfile = () => {
	const [changePassword, setChangePassword] = useState<ChangePassword>({
		old_password: "",
		new_password: ""
	});
	const [checkInvalidUserName, setCheckInvalidUserName] = useState(false);
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [showSaveButton, setShowSaveButton] = useState(false);
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [openDateDialog, setOpenDateDialog] = useState(false);
	const { setDashboardHeader } = useContext(UIContext);
	const [emailExists, setEmailExists] = useState(false);
	const [pasted, setPasted] = useState(false);
	const widthCheck = useMediaQuery("(max-width: 1917px)");
	const heightCheck = useMediaQuery("(max-height: 1000px)");
	const [snackbarAPICallProps, setSnackbarAPICallProps] = useState<SnackbarProps>({
		open: false,
		severity: undefined,
		message: "",
		handleSnackbarClose: (event, reason) => {
			if (reason === "clickaway") return;
			setSnackbarAPICallProps(
				Object.assign({}, snackbarAPICallProps, {
					open: false
				})
			);
		}
	});

	const { user, setUser } = useContext(AuthContext);
	const [validation, setValidation] = useState<Validation>({
		first_name: "",
		last_name: "",
		SSN: "",
		date_of_birth: "",
		user_name: "",
		status: "invalid"
	});
	const _validation = useRef<Validation>();
	const [passwordValidation, setPasswordValidation] = useState<Validation>({
		changePassword: {},
		confirmNewPassword: "",
		status: "invalid"
	});
	const _passwordValidation = useRef<Validation>();

	const handleValidation = useCallback(async () => {
		if (user === null) return;
		const { first_name, last_name, SSN, user_name } = user;
		_validation.current = {
			...validation,
			first_name: "",
			last_name: "",
			SSN: "",
			date_of_birth: "",
			user_name: "",
			status: "invalid"
		};
		let flag = true;

		if (first_name.length === 0) {
			_validation.current["first_name"] = "First Name is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (last_name.length === 0) {
			_validation.current["last_name"] = "Last Name is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (SSN !== null) {
			if (SSN !== "") {
				const _SSN = SSN.replaceAll("-", "");
				if (String(_SSN).length !== 9) {
					_validation.current["SSN"] = "Enter correct 9 digit SSN";
					_validation.current["status"] = "invalid";
					flag = false;
				}
			}
		}
		if (SSN !== "") {
			const _SSN = SSN?.replaceAll("-", "");
			if (String(_SSN).length !== 9) {
				_validation.current["SSN"] = "Enter correct 9 digit SSN";
				_validation.current["status"] = "invalid";
				flag = false;
			}
		}
		if (user_name?.length === 0) {
			_validation.current["user_name"] = "User Name is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}

		if (flag === true) _validation.current["status"] = "valid";
		else {
			_validation.current["status"] = "invalid";
			alert("Please, fill all required fields!");
		}
		setValidation(Object.assign({}, _validation.current));
		return _validation.current["status"];
	}, [user, validation]);

	const handlePasswordValidation = useCallback(async () => {
		const { old_password, new_password } = changePassword;
		_passwordValidation.current = {
			...passwordValidation,
			changePassword: {},
			confirmNewPassword: "",
			status: "invalid"
		};
		let flag = true,
			confirmPasswordFlag = true,
			validPasswordFlag = true;

		if (old_password.length === 0) {
			_passwordValidation.current.changePassword["old_password"] = "Old Password is required";
			_passwordValidation.current["status"] = "invalid";
			flag = false;
		}
		if (new_password.length === 0) {
			_passwordValidation.current.changePassword["new_password"] = "New Password is required";
			_passwordValidation.current["status"] = "invalid";
			flag = false;
		}
		if (new_password.length !== 0) {
			if (!validatePassword(new_password)) {
				_passwordValidation.current.changePassword["new_password"] = "Please enter a valid password";
				_passwordValidation.current["status"] = "invalid";
				validPasswordFlag = false;
			}
		}
		if (confirmNewPassword.length === 0) {
			_passwordValidation.current["confirmNewPassword"] = "Confirm New Password is required";
			_passwordValidation.current["status"] = "invalid";
			flag = false;
		}
		if (confirmNewPassword !== new_password) {
			_passwordValidation.current["confirmNewPassword"] = "Must be same as New Password";
			_passwordValidation.current["status"] = "invalid";
			confirmPasswordFlag = false;
		}

		if (flag === true && confirmPasswordFlag === true && validPasswordFlag === true)
			_passwordValidation.current["status"] = "valid";
		else if (confirmPasswordFlag === false) {
			_passwordValidation.current["status"] = "invalid";
			alert("Confirm New Password must be same with New Password!");
		} else if (validPasswordFlag === false) {
			_passwordValidation.current["status"] = "invalid";
			alert(
				"Password length must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number and one special character!"
			);
		} else {
			_passwordValidation.current["status"] = "invalid";
			alert("Please, fill all required fields!");
		}
		setPasswordValidation(Object.assign({}, _passwordValidation.current));
		return _passwordValidation.current["status"];
	}, [changePassword, confirmNewPassword, passwordValidation]);

	const handleDateChange = (date: MaterialUiPickersDate) => {
		const _date = new Date(date as unknown as string);
		if (user !== null)
			setUser(
				Object.assign({}, user, {
					date_of_birth: _date as unknown as number
				})
			);
	};

	const handleEdit = () => setShowSaveButton(true);

	const handleKeyCheck = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			let { value } = event.target as HTMLInputElement;
			const { name } = event.target as HTMLInputElement;
			const keyID = event.keyCode;

			if (name === "SSN") {
				if (keyID === 8 || keyID === 46) {
					if (/[-]/.test(value) && value.length === 4) {
						const index = value.indexOf("-");
						value = value.substring(0, index);
						setUser(Object.assign({}, user, { [name]: value }));
					}
					if (/[-]/.test(value) && value.length === 7) {
						const index = value.lastIndexOf("-");
						value = value.substring(0, index);
						setUser(Object.assign({}, user, { [name]: value }));
					}
				}
			}
		},
		[setUser, user]
	);

	const handlePaste = (event: React.ClipboardEvent<Element>) => {
		const { name } = event.target as HTMLInputElement;
		if (name === "SSN") {
			setPasted(true);
			setTimeout(() => null, 2000);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let { value } = event.target as HTMLInputElement;
		const { name } = event.target as HTMLInputElement;

		if (name === "user_name") {
			setCheckInvalidUserName(false);

			if (!validateUserName(value)) {
				setCheckInvalidUserName(true);
				//alert("Invalid UserName!");
			}

			setUser(Object.assign({}, user, { [name]: value }));
		} else if (name === "SSN") {
			if (!pasted) {
				// console.log("Not Pasted");
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
						value = value.substring(0, value.length - 1);
					} else if (ssn.length === 6) {
						value = value.substring(0, 7) + "-" + value.substring(7);
					} else if (ssn.length === 3) {
						value = value.substring(0, 3) + "-" + value.substring(3);
					}

					setUser(Object.assign({}, user, { [name]: value }));
				} else {
					event.target.value = "";
					event.target.value = user?.SSN as string;
				}
			} else {
				// console.log("Pasted");
				setPasted(false);
				if (!isNaN(value as any)) {
					if (value.length > 9) {
						event.target.value = user?.SSN as string;
						alert("Please enter a valid 9 digit SSN!");
					} else {
						// console.log("Inside Number");
						const ssn: string = value;

						if (ssn.length === 4) {
							value = value.substring(0, 3) + "-" + value.substring(3);
						} else if (ssn.length === 5) {
							value = value.substring(0, 3) + "-" + value.substring(3);
						} else if (ssn.length >= 6 && ssn.length <= 9) {
							value = value.substring(0, 3) + "-" + value.substring(3, 2) + "-" + value.substring(5);
						}

						setUser(Object.assign({}, user, { [name]: value }));
					}
				} else {
					// console.log("Inside alpha-numeric");
					let ssnValue = value.replace(/[^0-9]/g, "").replace(/[^\w\s]/gi, "");
					//console.log("replaced string", ssnValue);
					alert("You have pasted alpha-numeric SSN!");

					if (ssnValue.length > 9) {
						event.target.value = "";
						event.target.value = user?.SSN as string;
						alert("Please enter a valid SSN!");
					} else {
						const ssn = ssnValue;

						if (ssn.length === 4) {
							ssnValue = ssnValue.substring(0, 3) + "-" + ssnValue.substring(3);
						} else if (ssn.length === 5) {
							ssnValue = ssnValue.substring(0, 3) + "-" + ssnValue.substring(3);
						} else if (ssn.length >= 6 && ssn.length <= 9) {
							ssnValue =
								ssnValue.substring(0, 3) + "-" + ssnValue.substring(3, 2) + "-" + ssnValue.substring(5);
						}

						setUser(Object.assign({}, user, { [name]: ssnValue }));
					}
				}
			}
		} else if (name === "first_name") {
			const regex = /^[a-zA-Z]+$/;
			if (value.match(regex) || value === "") {
				value = value.slice(0, 1).toUpperCase() + value.slice(1);
				setUser(Object.assign({}, user, { [name]: value }));
			} else if (/\s/g.test(value)) {
				setUser(Object.assign({}, user, { [name]: value }));
			}
		} else if (name === "email") {
			//findEmail(value);
			setUser(Object.assign({}, user, { [name]: value }));
		} else {
			setUser(Object.assign({}, user, { [name]: value }));
		}
	};

	const handleShowChangePassword = async () => {
		if (showSaveButton) {
			setShowChangePassword(true);
			// Media Query Condition
			if (widthCheck && heightCheck) {
				//Window Scrolling to bottom
				console.log("Media Query is called");
				window.scrollTo({
					left: 0,
					top: document.body.scrollHeight,
					behavior: "smooth"
				});
			}
		} else setShowChangePassword(false);
	};

	const handleclose = () => setShowChangePassword(false);

	const handleShowOldPassword = () => setShowOldPassword(!showOldPassword);

	const handleShowNewPassword = () => setShowNewPassword(!showNewPassword);

	const handleShowNewConfirmPassword = () => setShowNewConfirmPassword(!showNewConfirmPassword);

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (name === "confirm_new_password") setConfirmNewPassword(value);
		else setChangePassword(Object.assign({}, changePassword, { [name]: value }));
	};

	const getGroupOwnerByAuth = useCallback(async () => {
		try {
			const response = await trackPromise(api.groupOwner.getGroupOwnerByAuth());
			// console.log("Users", response);
			let _SSN;

			const { SSN } = response;
			// Converting SSN to required type
			const ssn = String(SSN);
			if (ssn) _SSN = ssn.substring(0, 3) + "-" + ssn.substring(3, 5) + "-" + ssn.substring(5);
			if (response) {
				const _user = {
					...response,
					SSN: SSN !== "" || SSN !== undefined ? _SSN : ""
				};
				setUser(Object.assign({}, _user));
			}
		} catch (err) {
			alert("Failed to fetch User!");
		}
	}, [setUser]);

	const updatePassword = useCallback(async () => {
		try {
			const response = await trackPromise(api.auth.changePassword(changePassword));

			if (response) {
				setShowChangePassword(false);
				alert("Password Changed Successfully!");
				setConfirmNewPassword("");
				setChangePassword(
					Object.assign({}, changePassword, {
						old_password: "",
						new_password: ""
					})
				);
				setSnackbarAPICallProps(
					Object.assign({}, snackbarAPICallProps, {
						open: true,
						message: "Successfully changed your password",
						severity: "success"
					})
				);
			}
		} catch (err) {
			alert("Failed to update password!");
		}
	}, [changePassword, snackbarAPICallProps]);

	const handlePasswordSubmit = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			try {
				event.preventDefault();
				const passwordValidationInstance = await handlePasswordValidation();
				if (passwordValidationInstance === "valid") {
					console.log("form is valid");
					await updatePassword();
				}
			} catch (error) {
				alert("Unable to change password!");
				throw error;
			}
		},
		[handlePasswordValidation, updatePassword]
	);

	const editGroupOwner = useCallback(async () => {
		try {
			if (user === null || user === undefined) return;
			let date;
			const { date_of_birth, SSN } = user;
			if (date_of_birth !== "" || date_of_birth !== null || date_of_birth !== undefined) {
				date = new Date(date_of_birth as any);
				date = date?.getFullYear() + "-" + (date?.getMonth() + 1) + "-" + date?.getDate();
			}
			const payload = {
				first_name: user.first_name,
				last_name: user.last_name,
				date_of_birth:
					date_of_birth !== "" || date_of_birth !== null || date_of_birth !== undefined ? date : null,
				SSN: SSN !== "" || SSN !== null || SSN !== undefined ? SSN?.replaceAll("-", "") : "",
				user_name: user.user_name
			};
			// console.log("Payload", payload);
			const response: User = await trackPromise(api.auth.editGroupOwner(payload));

			// console.log("User Response", response);
			if (response) {
				let ssnValue = "";
				const ssn = String(response.SSN);
				if (ssn) ssnValue = ssn.substring(0, 3) + "-" + ssn.substring(3, 5) + "-" + ssn.substring(5);
				const _user = {
					...response,
					SSN: ssnValue
				};
				setUser(Object.assign({}, _user));
				alert("Profile Updation Successfully!");
				setSnackbarAPICallProps(
					Object.assign({}, snackbarAPICallProps, {
						open: true,
						message: "Your profile has been saved",
						severity: "success"
					})
				);
			}
		} catch (err) {
			alert("Failed to update password!");
		}
	}, [setUser, snackbarAPICallProps, user]);

	// Handle Save Click
	const handleSaveClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		try {
			event.preventDefault();
			const validation = await handleValidation();
			if (validation === "valid") {
				console.log("form is valid");
				editGroupOwner();
				setShowSaveButton(false);
			}
		} catch (error) {
			alert("Unable to update profile!");
			throw error;
		}
	};

	useEffect(() => {
		setDashboardHeader(ADMIN_DASHBOARD_HEADER.my_profile);
	}, [setDashboardHeader]);

	useEffect(() => {
		getGroupOwnerByAuth();
	}, [getGroupOwnerByAuth]);

	return (
		<div className="my-profile" id="my-profile" style={{ flexGrow: "revert" }}>
			<Suspense fallback={<div />}>
				<SnackbarAPI snackbarProps={snackbarAPICallProps} />
			</Suspense>
			<div className="my-profile-action-button-container">
				{!showSaveButton ? (
					<Grid item className="edit-profile-button">
						<Button className="button-green" onClick={handleEdit} variant="contained">
							<span className="button-label-with-icon">Edit Profile</span>
							<span>
								<EditIcon className="button-icon" />
							</span>
						</Button>
					</Grid>
				) : (
					<div className="save-profile-button">
						<Button className="button-green" variant="contained" onClick={handleSaveClick}>
							<span className="button-label-with-icon">Save Profile</span>
							<span>
								<SaveIcon className="button-icon" />
							</span>
						</Button>
					</div>
				)}
			</div>
			<Grid container spacing={1} justify="center" alignItems="center">
				<Grid item xs={12} sm={12} md={12} lg={12} xl={showChangePassword ? 6 : 12}>
					<div className="my-profile-container" id="my-profile-container">
						<Card
							className="card-container"
							id="card-container"
							style={{
								display: "inline-block",
								minWidth: "700px",
								cursor: !showSaveButton ? "not-allowed" : "default"
							}}
						>
							<CardContent className="card-content" id="card-content">
								<div className="Profile-info-text" id="Profile-info-text">
									Profile Information
								</div>
								<div className="information-label" id="information-label">
									<Grid container spacing={1} className="form-label">
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="label-text required" id="label-text">
												<span>
													<ArrowForwardIosIcon
														style={{
															fontSize: "0.9rem",
															paddingTop: 4
														}}
													/>
												</span>
												First Name:
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<TextField
												className="first-name-input text-input"
												id="first-name-input"
												name="first_name"
												value={user?.first_name}
												// label="First Name"
												// variant="outlined"
												onChange={handleChange}
												style={{ width: "100%", borderRadius: 50 }}
												helperText={validation["first_name"]}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<AccountCircle style={{ color: "#7cb342" }} />
														</InputAdornment>
													),
													readOnly: !showSaveButton
												}}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={1} className="form-label">
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="label-text required" id="label-text">
												<span>
													<ArrowForwardIosIcon
														style={{
															fontSize: "0.9rem",
															paddingTop: 4
														}}
													/>
												</span>
												Last Name:
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<TextField
												className="last-name-input text-input"
												id="last-name-input"
												name="last_name"
												value={user?.last_name}
												// label="First Name"
												// variant="outlined"
												onChange={handleChange}
												style={{ width: "100%", borderRadius: 50 }}
												helperText={validation["last_name"]}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<AccountCircle style={{ color: "#7cb342" }} />
														</InputAdornment>
													),
													readOnly: !showSaveButton
												}}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={1} className="form-label">
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="label-text required" id="label-text">
												<span>
													<ArrowForwardIosIcon
														style={{
															fontSize: "0.9rem",
															paddingTop: 4
														}}
													/>
												</span>
												Email:
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<TextField
												className="email-input text-input"
												id="email-input"
												name="email"
												value={user?.email}
												onChange={handleChange}
												style={{ width: "100%", borderRadius: 50 }}
												// helperText={validation["email"]}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<EmailIcon style={{ color: "#7cb342" }} />
														</InputAdornment>
													),
													endAdornment: (
														<>
															{showSaveButton ? (
																<InputAdornment position="end">
																	<InfoIcon
																		style={{
																			color: "#4169E1",
																			cursor: !showSaveButton
																				? "default"
																				: "pointer",
																			pointerEvents: "unset"
																		}}
																	/>
																</InputAdornment>
															) : null}
														</>
													),
													// readOnly: !showSaveButton
													readOnly: true
												}}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={1} className="form-label">
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="label-text" id="label-text">
												<span>
													<ArrowForwardIosIcon
														style={{
															fontSize: "0.9rem",
															paddingTop: 4
														}}
													/>
												</span>
												Date of Birth:
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="date-picker">
												<MuiPickersUtilsProvider
													utils={DateFnsUtils}
													// readOnly={!showSaveButton}
												>
													<KeyboardDatePicker
														className="date-of-birth-input text-input"
														id="date-of-birth-input"
														name="date_of_birth"
														format="MM/dd/yyyy"
														error={false} // This is to resolve the Invalid Date Error during null value
														value={user?.date_of_birth}
														onChange={handleDateChange}
														readOnly={!showSaveButton} // This is for the EventIcon
														InputProps={{ readOnly: true }}
														InputLabelProps={{
															shrink: true
														}}
														keyboardIcon={
															<EventIcon
																style={{
																	color: "#7cb342",
																	cursor: !showSaveButton ? "not-allowed" : "pointer"
																}}
															/>
														}
														KeyboardButtonProps={{
															"aria-label": "change date"
														}}
														// helperText={
														// 	validation?.date_of_birth ? validation?.date_of_birth : null
														// }
														style={{
															width: "100%",
															borderRadius: 50
														}}
													/>
												</MuiPickersUtilsProvider>
											</div>
										</Grid>
									</Grid>
									<Grid container spacing={1} className="form-label">
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="label-text" id="label-text">
												<span>
													<ArrowForwardIosIcon
														style={{
															fontSize: "0.9rem",
															paddingTop: 4
														}}
													/>
												</span>
												SSN:
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<TextField
												className="ssn-input text-input"
												id="ssn-input"
												name="SSN"
												value={user?.SSN}
												// label="First Name"
												// variant="outlined"
												onChange={handleChange}
												onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
													handleKeyCheck(event)
												}
												onPaste={(event: React.ClipboardEvent) => handlePaste(event)}
												style={{ width: "100%", borderRadius: 50 }}
												helperText={validation["SSN"]}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<SecurityIcon style={{ color: "#7cb342" }} />
														</InputAdornment>
													),
													readOnly: !showSaveButton
												}}
											/>
										</Grid>
									</Grid>
									<Grid container spacing={1} className="form-label">
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<div className="label-text required" id="label-text">
												<span>
													<ArrowForwardIosIcon
														style={{
															fontSize: "0.9rem",
															paddingTop: 4
														}}
													/>
												</span>
												User Name:
											</div>
										</Grid>
										<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
											<TextField
												className="user-name-input text-input"
												id="user-name-input"
												name="user_name"
												value={user?.user_name}
												// label="First Name"
												// variant="outlined"
												onChange={handleChange}
												style={{ width: "100%", borderRadius: 50 }}
												helperText={
													checkInvalidUserName
														? "Username must be between 4 to 20 characters, alpha-numeric and no special characters are allowed!"
														: validation["user_name"]
												}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<AccountCircle style={{ color: "#7cb342" }} />
														</InputAdornment>
													),
													readOnly: !showSaveButton
												}}
											/>
										</Grid>
									</Grid>
									<div
										id="change-password-text"
										onClick={handleShowChangePassword}
										style={{
											cursor: !showSaveButton ? "not-allowed" : "pointer"
										}}
									>
										Change Password
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</Grid>
				{showSaveButton ? (
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
						{showChangePassword ? (
							<div className="show-change-password" id="show-change-password">
								<Card
									className="show-password-card-container"
									id="show-password-card-container"
									style={{ display: "inline-block" }}
								>
									<CardContent className="show-password-card-content" id="show-password-card-content">
										<div
											className="change-password-icon-container"
											id="change-password-header-text"
										>
											<IconButton aria-label="close" className="close-icon">
												<CloseIcon fontSize="medium" onClick={handleclose} />
											</IconButton>
										</div>
										<div className="change-password-header">Change Password</div>
										<div className="information-label" id="information-label">
											<Grid container spacing={1} className="form-label">
												<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
													<div className="label-text" id="label-text">
														<span>
															<ArrowForwardIosIcon
																style={{
																	fontSize: "0.9rem",
																	paddingTop: 4
																}}
															/>
														</span>
														Old Password:
													</div>
												</Grid>
												<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
													<TextField
														className="old-password-input text-input"
														id="old-password-input"
														name="old_password"
														type={!showOldPassword ? "password" : "text"}
														value={changePassword.old_password}
														// label="First Name"
														// variant="outlined"
														onChange={handlePasswordChange}
														style={{ width: "100%", borderRadius: 50 }}
														helperText={passwordValidation.changePassword["old_password"]}
														// readOnly={!showOldPassword}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<LockIcon style={{ color: "#7cb342" }} />
																</InputAdornment>
															),
															endAdornment: (
																<InputAdornment position="end">
																	{!showOldPassword ? (
																		<IconButton onClick={handleShowOldPassword}>
																			<VisibilityOffIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	) : (
																		<IconButton onClick={handleShowOldPassword}>
																			<VisibilityIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	)}
																</InputAdornment>
															)
														}}
													/>
												</Grid>
											</Grid>
											<Grid container spacing={1} className="form-label">
												<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
													<div className="label-text" id="label-text">
														<span>
															<ArrowForwardIosIcon
																style={{
																	fontSize: "0.9rem",
																	paddingTop: 4
																}}
															/>
														</span>
														New Password:
													</div>
												</Grid>
												<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
													<TextField
														className="new-password-input text-input"
														id="new-password-input"
														type={!showNewPassword ? "password" : "text"}
														name="new_password"
														value={changePassword.new_password}
														// label="First Name"
														// variant="outlined"
														onChange={handlePasswordChange}
														style={{ width: "100%", borderRadius: 50 }}
														helperText={passwordValidation.changePassword["new_password"]}
														// readOnly={!showNewPassword}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<LockIcon style={{ color: "#7cb342" }} />
																</InputAdornment>
															),
															endAdornment: (
																<InputAdornment position="end">
																	{!showNewPassword ? (
																		<IconButton onClick={handleShowNewPassword}>
																			<VisibilityOffIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	) : (
																		<IconButton onClick={handleShowNewPassword}>
																			<VisibilityIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	)}
																</InputAdornment>
															)
														}}
													/>
												</Grid>
											</Grid>
											<Grid container spacing={1} className="form-label">
												<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
													<div className="label-text" id="label-text">
														<span>
															<ArrowForwardIosIcon
																style={{
																	fontSize: "0.9rem",
																	paddingTop: 4
																}}
															/>
														</span>
														Confirm New Password:
													</div>
												</Grid>
												<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
													<TextField
														className="confirm-new-password-input text-input"
														id="confirm-new-password-input"
														type={!showNewConfirmPassword ? "password" : "text"}
														name="confirm_new_password"
														value={confirmNewPassword}
														onChange={handlePasswordChange}
														style={{ width: "100%", borderRadius: 50 }}
														helperText={passwordValidation["confirmNewPassword"]}
														// readOnly={!showNewConfirmPassword}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<LockIcon style={{ color: "#7cb342" }} />
																</InputAdornment>
															),
															endAdornment: (
																<InputAdornment position="end">
																	{!showNewConfirmPassword ? (
																		<IconButton
																			onClick={handleShowNewConfirmPassword}
																		>
																			<VisibilityOffIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	) : (
																		<IconButton
																			onClick={handleShowNewConfirmPassword}
																		>
																			<VisibilityIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	)}
																</InputAdornment>
															)
														}}
													/>
												</Grid>
											</Grid>
											<div className="submit-button">
												<Button
													className="button-green"
													onClick={handlePasswordSubmit}
													variant="contained"
												>
													<span className="button-label-with-icon">Submit</span>
													<span>
														<SendIcon className="button-icon" />
													</span>
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						) : null}
					</Grid>
				) : null}
			</Grid>
		</div>
	);
};

export default MyProfile;
