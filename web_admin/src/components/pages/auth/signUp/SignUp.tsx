/* eslint-disable prettier/prettier */
import { useState, useContext, Suspense, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import {
	FormControl,
	TextField,
	Card,
	CardContent,
	InputAdornment,
	Button,
	Step,
	Stepper,
	StepLabel,
	Checkbox,
	Menu,
	MenuItem,
	Grid,
	Chip,
	Tooltip,
	CardActions,
	Backdrop
} from "@material-ui/core";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/AccordionActions";
import { Logo } from "../../../../assets";
import { Link, useNavigate } from "react-router-dom";
import ROLES from "../../../../constants/roles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import moment, { Moment } from "moment";
import "date-fns";
import { trackPromise } from "react-promise-tracker";
import { api } from "../../../../utils/api";
import { useEffect } from "react";
import { useRef } from "react";
import { LINK } from "../../../../config/config";
import initCapitalize from "../../../../utils/commonFunctions/initCapitalize";
import validateUserName from "../../../../utils/commonFunctions/validateUserName";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SecurityIcon from "@material-ui/icons/Security";
import EventIcon from "@material-ui/icons/Event";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AuthContext from "../../../../contexts/authContext/authContext";
import React from "react";
import EmailIcon from "@material-ui/icons/Email";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import HelpIcon from "@material-ui/icons/Help";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import "./signUp.css";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { LazySnackbarAPI, SnackbarAPI } from "../../../shared";
import { SnackbarProps } from "../../../../@types/snackbarAPI.types";

const getSteps = () => ["Roles", "Personal Information", "Sign Up", "Completed"];

const mailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

const SignUp = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [OTP, setOTP] = useState("");
	const [timer, setTimer] = useState({
		minutes: 9,
		seconds: 59
	});
	const ref = useRef<HTMLElement>(null);
	const [resendOTPButtonVisible, setResendOTPButtonVisible] = useState(true);
	const [resentOTPCaptionVisible, setResentOTPCaptionVisible] = useState(false);
	const [startTimer, setStartTimer] = useState(false);
	const [OTPVerified, setOTPVerified] = useState(false);
	const [countDownTime, setCountDownTime] = useState(null);
	const [verificationToken, setVerificationToken] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [statementOfUnderstanding, setStatementOfUnderstanding] = useState("");
	const [reEnteredSSN, setReEnteredSSN] = useState("");
	const [registrationHelp, setRegistrationHelp] = useState("");
	const [userNameExists, setUserNameExists] = useState(false);
	const [checkInvalidUserName, setCheckInvalidUserName] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [pasted, setPasted] = useState(false);
	const [rePaste, setRePaste] = useState(false);
	const [hasReadStatementOfUnderstanding, setHasReadStatementOfUnderstanding] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [dateValue, setDateValue] = useState(moment());
	const [snackbarAPIProps, setSnackbarAPIProps] = useState<SnackbarProps>({
		open: false,
		severity: undefined,
		message: "",
		handleSnackbarClose: (event, reason) => {
			if (reason === "clickaway") return;
			setSnackbarAPIProps(
				Object.assign({}, snackbarAPIProps, {
					open: false
				})
			);
		}
	});
	const [documentDialogProps, setDocumentDialogProps] = useState({
		openDialog: false,
		title: "",
		content: "",
		isParsed: false,
		handleCloseCallback: () =>
			setDocumentDialogProps(
				Object.assign({}, documentDialogProps, {
					openDialog: false
				})
			)
	});
	const [signUpDialogProps, setSignUpDialogProps] = useState({
		openDialog: false,
		title: "",
		content: "",
		actions: []
	});
	const [user, setUser] = useState({
		first_name: "",
		middle_name: "",
		last_name: "",
		email: "",
		role: "",
		date_of_birth: moment().format("MM/DD/YYYY"),
		SSN: "",
		user_name: "",
		password: "",
		confirm_password: "",
		claimNotification: false
	});
	const steps = getSteps();
	const [validation, setValidation] = useState({
		user: {
			role: "",
			last_name: "",
			first_name: "",
			date_of_birth: "",
			SSN: "",
			user_name: "",
			confirm_password: "",
			password: ""
		}
	});
	const navigate = useNavigate();

	const [speedDialopen, setSpeedDialOpen] = React.useState(false);
	const [speedDialhidden, setSpeedDialHidden] = React.useState(false);

	const handleSpeedDialVisibility = () => {
		// eslint-disable-next-line arrow-parens
		setSpeedDialHidden((prevHidden) => !prevHidden);
	};

	const handleSpeedDialOpen = () => {
		setSpeedDialOpen(true);
	};

	const handleSpeedDialClose = () => {
		setSpeedDialOpen(false);
	};

	const handleRoleValidation = useCallback(async () => {
		const { role } = user;
		return role;
	}, [user, validation]);

	const handlePersonalDetailsValidation = useCallback(async () => {
		const { first_name, last_name, date_of_birth, SSN } = user;
		return first_name;
	}, [user]);

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const handlecredentialValidation = useCallback(async () => {
		return "";
	}, [user]);

	const handleDateChange = useCallback(
		(date: any, dateValue: any) => {
			// const _date = new Date(dateValue);
			//console.log("DOB", _date);
			const _user = {
				...user,
				date_of_birth: dateValue
			};
			setDateValue(date);
			setUser({ ..._user });
		},
		[setUser, user]
	);

	const handleClick = (event: any) => {
		const { currentTarget } = event;
		setAnchorEl(currentTarget);
	};

	const handleOTPChange = (event: { target: { value: any } }) => {
		const { value } = event.target;
		setOTP(value);
	};

	const handleSendOTPToEmailClick = async () => {
		const payload = {
			email: user.email,
			type: "VERIFICATION"
		};
		const response = await api.auth.sendOTP(payload);
		if (response.result === "OTP Sent Successfully") {
			alert("Email Id has been verified");
			// eslint-disable-next-line arrow-parens
			setOTPVerified(false);
			alert("OTP Sent to Email");
			setResendOTPButtonVisible(false);
			// setCountDownTime(Date.now() + 1 * 60000);
			setStartTimer(true);
		}
	};

	const handleVerifyOTPClick = async () => {
		const payload = {
			otp: OTP,
			check: user.email,
			verification_key: verificationToken
		};
		// const isVerified = await api.OTP.verifyOTP(payload);
		// if (isVerified === true) {
		// 	alert("Email Id has been verified");
		// 	// eslint-disable-next-line arrow-parens
		// 	setActiveStep((prevActiveStep) => prevActiveStep + 1);
		// 	setOTP("");
		// 	setOTPVerified(true);
		// }
	};

	const handleStatementOfUnderstandingRead = () => {
		setHasReadStatementOfUnderstanding(
			(prevHasReadStatementOfUnderstanding: any) => !prevHasReadStatementOfUnderstanding
		);
	};

	const handleClose = useCallback(
		(value: any) => {
			setAnchorEl(null);
			if (value) {
				setUser(Object.assign({}, user, { role: value }));
				const text = value === "Admin" ? 1 : value === "Enroller Admin" ? 2 : value === "Agent" ? 4 : 3;
				setActiveStep(text);
			}
		},
		[setUser, user]
	);

	const handleBack = () => {
		// eslint-disable-next-line arrow-parens
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleShowPassword = useCallback(() => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	const handleShowConfirmPassword = useCallback(() => {
		setShowConfirmPassword(!showConfirmPassword);
	}, [showConfirmPassword]);

	const handleRegistrationHelpOpen = useCallback(() => {
		setDocumentDialogProps(
			Object.assign({}, documentDialogProps, {
				...documentDialogProps,
				openDialog: true,
				title: "Registration Help",
				content: registrationHelp
			})
		);
	}, [documentDialogProps, registrationHelp]);

	const handleStatementOfUnderstandingOpen = useCallback(() => {
		setDocumentDialogProps(
			Object.assign({}, documentDialogProps, {
				...documentDialogProps,
				openDialog: true,
				title: "Statement of Understanding",
				content: statementOfUnderstanding
			})
		);
	}, [documentDialogProps, statementOfUnderstanding]);

	// eslint-disable-next-line arrow-parens
	const findUserName = useDebouncedCallback(async (value) => {
		if (value !== "") {
			const username = false;
			if (username === false) {
				setUserNameExists(false);
			} else {
				setUserNameExists(true);
			}
		} else {
			setUserNameExists(false);
		}
	}, 500);

	const findEmail = useDebouncedCallback(async (value: string) => {
		if (value !== "") {
			const params = {
				email: value,
				role: user.role.toUpperCase()
			};
			const email = false;
			if (email === false) {
				const email = await api.auth.findEmail(params);
				setEmailExists(false);
			} else {
				setEmailExists(true);
			}
		} else {
			setEmailExists(false);
		}
	}, 500);

	const handleKeyCheck = useCallback(
		(event: any) => {
			// eslint-disable-next-line prefer-const
			let { name, value } = event.target;
			const keyID = event.keyCode;

			if (name === "SSN") {
				if (keyID === 8 || keyID === 46) {
					if (/[-]/.test(value) && value.length === 4) {
						// eslint-disable-next-line no-var
						var index = value.indexOf("-");
						value = value.substr(0, index);
						setUser(Object.assign({}, user, { [name]: value }));
					}
					if (/[-]/.test(value) && value.length === 7) {
						// eslint-disable-next-line no-var
						var index = value.lastIndexOf("-");
						value = value.substr(0, index);
						setUser(Object.assign({}, user, { [name]: value }));
					}
				}
			} else if (name === "reenterSSN") {
				if (keyID === 8 || keyID === 46) {
					if (/[-]/.test(value) && value.length === 4) {
						// eslint-disable-next-line no-var
						var index = value.indexOf("-");
						value = value.substr(0, index);
						setReEnteredSSN(value);
					}
					if (/[-]/.test(value) && value.length === 7) {
						// eslint-disable-next-line no-var
						var index = value.lastIndexOf("-");
						value = value.substr(0, index);
						setReEnteredSSN(value);
					}
				}
			}
		},
		[setUser, user]
	);

	const handlePaste = (event: any) => {
		const { name } = event.target;
		if (name === "SSN") {
			setPasted(true);
			// setTimeout(2000);
		}
	};

	const handleChange = useCallback(
		(event: { target: { value: any; name?: any } }) => {
			// eslint-disable-next-line prefer-const
			let { name, value } = event.target;
			if (name === "user_name") {
				findUserName(value);

				setCheckInvalidUserName(false);

				if (!validateUserName(value)) {
					setCheckInvalidUserName(true);
					//alert("Invalid UserName!");
				}

				setUser(Object.assign({}, user, { [name]: value }));
			} else if (name === "email") {
				findEmail(value);
				setUser(Object.assign({}, user, { [name]: value }));
			} else if (name === "first_name") {
				const regex = /^[a-zA-Z]+$/;
				if (value.match(regex) || value === "") {
					value = value.slice(0, 1).toUpperCase() + value.slice(1);
					setUser(Object.assign({}, user, { [name]: value }));
				} else if (/\s/g.test(value)) {
					setUser(Object.assign({}, user, { [name]: value }));
				}
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
							value = value.substr(0, value.length - 1);
						} else if (ssn.length === 6) {
							value = value.substr(0, 7) + "-" + value.substr(7);
						} else if (ssn.length === 3) {
							value = value.substr(0, 3) + "-" + value.substr(3);
						}

						setUser(Object.assign({}, user, { [name]: value }));
					} else {
						event.target.value = null;
						event.target.value = user.SSN;
					}
				} else {
					// console.log("Pasted");
					setPasted(false);
					if (!isNaN(value)) {
						if (value.length > 9) {
							event.target.value = null;
							event.target.value = user.SSN;
							alert("Please enter a valid 9 digit SSN!");
						} else {
							// console.log("Inside Number");
							const ssn = value;

							if (ssn.length === 4) {
								value = value.substr(0, 3) + "-" + value.substr(3);
							} else if (ssn.length === 5) {
								value = value.substr(0, 3) + "-" + value.substr(3);
							} else if (ssn.length >= 6 && ssn.length <= 9) {
								value = value.substr(0, 3) + "-" + value.substr(3, 2) + "-" + value.substr(5);
							}

							setUser(Object.assign({}, user, { [name]: value }));
						}
					} else {
						// console.log("Inside alpha-numeric");
						let ssnValue = value.replace(/[^0-9]/g, "").replace(/[^\w\s]/gi, "");
						//console.log("replaced string", ssnValue);
						alert("You have pasted alpha-numeric SSN!");

						if (ssnValue.length > 9) {
							event.target.value = null;
							event.target.value = user.SSN;
							alert("Please enter a valid SSN!");
						} else {
							const ssn = ssnValue;

							if (ssn.length === 4) {
								ssnValue = ssnValue.substr(0, 3) + "-" + ssnValue.substr(3);
							} else if (ssn.length === 5) {
								ssnValue = ssnValue.substr(0, 3) + "-" + ssnValue.substr(3);
							} else if (ssn.length >= 6 && ssn.length <= 9) {
								ssnValue =
									ssnValue.substr(0, 3) + "-" + ssnValue.substr(3, 2) + "-" + ssnValue.substr(5);
							}

							setUser(Object.assign({}, user, { [name]: ssnValue }));
						}
					}
				}
			} else {
				setUser(Object.assign({}, user, { [name]: value }));
			}
		},
		[findEmail, findUserName, pasted, setUser, user]
	);

	const handleReEnteredSSNChange = useCallback(
		(event: { target: { value: any } }) => {
			let { value } = event.target;

			if (!pasted) {
				const _value = Number(value.replaceAll("-", ""));
				if (!isNaN(_value)) {
					let ssn = value;
					if (
						!(
							/^[0-9]{0,3}$/.test(value) ||
							/^[0-9]{3}-[0-9]{0,2}$/.test(value) ||
							/^[0-9]{3}-[0-9]{2}-[0-9]{0,4}$/.test(value)
						)
					) {
						// value = value.substr(0, ssn.length - 1);
						ssn = ssn.substr(0, ssn.length - 1);
					} else if (ssn.length === 6) {
						ssn = ssn.substr(0, 7) + "-" + ssn.substr(7);
					} else if (ssn.length === 3) {
						// value = value.substr(0, 3) + "-" + value.substr(3);
						ssn = ssn.substr(0, 3) + "-" + ssn.substr(3);
					}
					setReEnteredSSN(ssn);
				} else {
					event.target.value = null;
					event.target.value = reEnteredSSN;
				}
			} else {
				// console.log("Pasted");
				setPasted(false);
				if (!isNaN(value)) {
					if (value.length > 9) {
						event.target.value = null;
						event.target.value = reEnteredSSN;
						alert("Please enter a valid 9 digit SSN!");
					} else {
						// console.log("Inside Number");
						const ssn = value;

						if (ssn.length === 4) {
							value = value.substr(0, 3) + "-" + value.substr(3);
						} else if (ssn.length === 5) {
							value = value.substr(0, 3) + "-" + value.substr(3);
						} else if (ssn.length >= 6 && ssn.length <= 9) {
							value = value.substr(0, 3) + "-" + value.substr(3, 2) + "-" + value.substr(5);
						}
						setReEnteredSSN(value);
					}
				} else {
					// console.log("Inside alpha-numeric");
					let ssnValue = value.replace(/[^0-9]/g, "").replace(/[^\w\s]/gi, "");
					//console.log("replaced string", ssnValue);
					alert("You have pasted alpha-numeric SSN!");

					if (ssnValue.length > 9) {
						event.target.value = null;
						event.target.value = reEnteredSSN;
						alert("Please enter a valid SSN!");
					} else {
						const ssn = ssnValue;

						if (ssn.length === 4) {
							ssnValue = ssnValue.substr(0, 3) + "-" + ssnValue.substr(3);
						} else if (ssn.length === 5) {
							ssnValue = ssnValue.substr(0, 3) + "-" + ssnValue.substr(3);
						} else if (ssn.length >= 6 && ssn.length <= 9) {
							ssnValue = ssnValue.substr(0, 3) + "-" + ssnValue.substr(3, 2) + "-" + ssnValue.substr(5);
						}

						setReEnteredSSN(ssnValue);
					}
				}
			}
		},
		[pasted, reEnteredSSN]
	);

	// const getUploadAdministration = useCallback(async () => {
	// 	const uploadAdministration = await api.uploadAdminstration.getUploadAdministration();
	// 	if (uploadAdministration) {
	// 		setStatementOfUnderstanding(
	// 			uploadAdministration.statementOfUnderstanding ? uploadAdministration.statementOfUnderstanding : ""
	// 		);
	// 		setRegistrationHelp(uploadAdministration.registrationHelp ? uploadAdministration.registrationHelp : "");
	// 	}
	// }, []);

	const handleSubmit = useCallback(
		async (event: { preventDefault: () => void }) => {
			event.preventDefault();
			if (activeStep === 0) {
				const roleValidation = await handleRoleValidation();
				if (roleValidation === "valid") setActiveStep(activeStep + 1);
			} else if (activeStep === 1) {
				const otpVerify = await api.auth.verifyOTP({ otp: parseInt(OTP) }, user.email);
				if (otpVerify.result === "OTP Verified Successfully") {
					setActiveStep(activeStep + 1);
				}
			} else if (activeStep === 2) {
				const personalDetailsValidation = await handlePersonalDetailsValidation();
				if (personalDetailsValidation === "valid") {
					setActiveStep(activeStep + 1);
					setHasReadStatementOfUnderstanding(false);
				}
				if (user.SSN !== reEnteredSSN) {
					console.log("Reenterd SSN", reEnteredSSN);
					console.log("SSN", user.SSN);
					alert("Please Reenter correct SSN");
				} else {
					const data = await api.auth.createAdmin(user);
					navigate("/login");
					setSnackbarAPIProps(
						Object.assign({}, snackbarAPIProps, {
							open: true,
							message: `Create a ${user.role} successfully`,
							severity: "success"
						})
					);
				}
			} else if (activeStep === 3) {
				const credentialValidation = await handlecredentialValidation();
				if (credentialValidation === "valid") {
					if (hasReadStatementOfUnderstanding) {
						const { role, date_of_birth } = user;
						const _role = role.toUpperCase();
						const date = new Date(date_of_birth);
						const _user = {
							...user,
							SSN: Number(user.SSN.replaceAll("-", "")),
							role: user.role.toUpperCase(),
							date_of_birth: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
						};
						console.log("_user", _user);
						try {
							if (_role === ROLES.admin) {
								const response = {}; // await trackPromise(api.signUp.userSignUp(_user));
								console.log("User Response", response);

								if (response) {
									setActiveStep(activeStep + 1);
								}
							} else if (_role === ROLES.admin) {
								const response = {}; //await trackPromise(api.groupMemberEmployee.employeeSignUp(_user));
								console.log("Employee Response", response);

								if (response) {
									setActiveStep(activeStep + 1);
								}
							} else if (_role === ROLES.admin) {
								const response = {}; //await trackPromise(api.groupMemberDependent.dependentSignUp(_user));
								console.log("Dependent Response", response);

								if (response) {
									setActiveStep(activeStep + 1);
								}
							} else {
								console.log("Invalid Role Selected!");
							}
							// Old sign up integration
							// else {
							// 	let response = await trackPromise(
							// 		axios.post(`${LINK}/user/signup`, JSON.stringify(_user), {
							// 			headers: {
							// 				Accept: "application/json",
							// 				"Content-Type": "application/json"
							// 			}
							// 		})
							// 	);
							// 	console.log("user response.status", response.status);
							// 	console.log("user response", response);
							// 	if (response.status === 201) {
							// 		setActiveStep(activeStep + 1);
							// 	}
							// }
						} catch (err) {
							console.log("err", err);
							setSignUpDialogProps(
								Object.assign({}, signUpDialogProps, {
									openDialog: true,
									title: "Unsuccessfull Sign Up",
									content: "Unable to sign up. Please try again",
									actions: [
										{
											label: "Close",
											callback: () =>
												setSignUpDialogProps(
													Object.assign({}, signUpDialogProps, {
														openDialog: false
													})
												)
										}
									]
								})
							);
						}
					} else {
						alert("Please Read the Statement of Understanding and accept it.");
					}
				}
			} else if (activeStep === 4) {
				navigate("/login");
			}
		},
		[
			activeStep,
			handlePersonalDetailsValidation,
			handleRoleValidation,
			handlecredentialValidation,
			hasReadStatementOfUnderstanding,
			navigate,
			reEnteredSSN,
			signUpDialogProps,
			user,
			OTP
		]
	);

	// useEffect(() => {
	// 	getUploadAdministration();
	// }, [getUploadAdministration]);

	// useEffect(() => {
	// 	if (startTimer === true) {
	// 		ref.current = setInterval(() => {
	// 			const distance = countDownTime - Date.now();
	// 			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	// 			const seconds = Math.floor((distance % (1000 * 60)) / 1000);
	// 			if (minutes === 0 && seconds === 0) {
	// 				setStartTimer(false);
	// 				setResendOTPButtonVisible(true);
	// 				setResentOTPCaptionVisible(true);
	// 			}
	// 			setTimer(
	// 				Object.assign(
	// 					{},
	// 					{
	// 						minutes: String(minutes),
	// 						seconds: seconds < 10 ? "0" + String(seconds) : String(seconds)
	// 					}
	// 				)
	// 			);
	// 		}, 1000);
	// 	}

	// 	return () => clearInterval(ref.current);
	// }, [countDownTime, startTimer]);

	return (
		<div className="sign-up" id="sign-up">
			<div className="container-outer" id="container-outer">
				<div className="container-header">
					<Grid container spacing={0} direction="column" alignItems="center">
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<Stepper
								activeStep={activeStep}
								style={{ backgroundColor: "transparent", width: 500 }}
								alternativeLabel
							>
								{steps.map((label, index) => {
									const stepProps = {};
									const labelProps = {};
									return (
										<Step key={index} {...stepProps}>
											<StepLabel {...labelProps}>{label}</StepLabel>
										</Step>
									);
								})}
							</Stepper>
						</Grid>
					</Grid>
				</div>
				<Grid container spacing={0} direction="column" alignItems="center">
					<Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
						<div className="container-inner" id="container-inner">
							<Card className="card-container">
								<CardContent className="card-content" id="card-content">
									<div className={"logo-container " + (activeStep === 2 ? "logo-container-lg-form" : "")}>
										<img src={Logo} className="logo" id="id" alt="Nexcaliber logo" />
									</div>
									{activeStep === 0 ? (
										<>
											<div className="select-role-container" id="select-role-container">
												<Button
													onClick={handleClick}
													endIcon={<ExpandMoreIcon className="role-arrow-down" />}
													className="role-dropdown"
												>
													{user.role !== "" ? user.role : "Select Your Role"}
												</Button>
												<Menu
													id="simple-menu"
													anchorEl={anchorEl}
													keepMounted
													open={Boolean(anchorEl)}
													onClose={() => handleClose(null)}
												>
													{/* <MenuItem
														onClick={() => handleClose(initCapitalize(ROLES.super_admin))}
													>
														{initCapitalize(ROLES.super_admin)}
													</MenuItem> */}
													<MenuItem onClick={() => handleClose(initCapitalize(ROLES.admin))}>
														{initCapitalize(ROLES.admin)}
													</MenuItem>
													<MenuItem
														onClick={() =>
															handleClose(initCapitalize(ROLES.enroller_admin))
														}
													>
														{initCapitalize(ROLES.enroller_admin)}
													</MenuItem>
													<MenuItem onClick={() => handleClose(initCapitalize(ROLES.agent))}>
														{initCapitalize(ROLES.agent)}
													</MenuItem>
												</Menu>
												{validation.user.role ? (
													<div className="details" style={{ paddingLeft: "12.7" }}>
														<span className="select-validation-text">
															{validation.user.role}
														</span>
													</div>
												) : null}
											</div>
											<div
												className="sign-up-button-container"
												id="sign-up-button-container"
												style={{ marginTop: 50 }}
											>
												<Button
													className="button next-arrow-down"
													onClick={handleSubmit}
													variant="contained"
												>
													<span className="button-label-with-icon" style={{ color: "#ffff" }}>
														Next
													</span>
													<span>
														<ArrowForwardIosIcon
															className="button-icon"
															style={{ color: "#ffff" }}
														/>
													</span>
												</Button>
											</div>
										</>
									) : activeStep === 1 ? (
										<form onSubmit={handleSubmit} autoComplete="off" method="">
											<FormControl className="form-container" id="form-container">
												<div className="form-inner">
													<TextField
														className="form-field-input-lg-form"
														id="email-input"
														disabled={OTPVerified}
														name="email"
														label="Email"
														placeholder="Enter Email"
														value={user.email}
														variant="outlined"
														onChange={handleChange}
														style={{ width: "100%", borderRadius: 50 }}
														helperText={
															emailExists ? "Email exists!" : "validation.user.email"
														}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<EmailIcon style={{ color: "#7cb342" }} />
																</InputAdornment>
															),
															endAdornment:
																resendOTPButtonVisible &&
																	user.email.match(mailformat) &&
																	!OTPVerified ? (
																	<div
																		style={{
																			cursor:
																				user.email !== "" && !emailExists
																					? "auto"
																					: "not-allowed"
																		}}
																	>
																		<Button
																			variant="outlined"
																			onClick={handleSendOTPToEmailClick}
																			style={{ marginLeft: 5 }}
																			disabled={
																				user.email !== "" && !emailExists
																					? false
																					: true
																			}
																		>
																			{resentOTPCaptionVisible
																				? "Resend\xa0OTP"
																				: "Send\xa0OTP"}
																		</Button>
																	</div>
																) : null
														}}
													/>
													{startTimer && !OTPVerified ? (
														<TextField
															className="form-field-input"
															id="OTP-input"
															name="OTP"
															label="OTP"
															placeholder="Enter OTP"
															value={OTP}
															helperText={
																startTimer
																	? timer.minutes +
																	":" +
																	timer.seconds +
																	" before expiration"
																	: ""
															}
															variant="outlined"
															onChange={handleOTPChange}
															style={{ width: "100%", borderRadius: 50 }}
															InputProps={{
																startAdornment: (
																	<InputAdornment position="start">
																		<VpnKeyIcon style={{ color: "#7cb342" }} />
																	</InputAdornment>
																)
															}}
														/>
													) : null}
													<div
														className="sign-up-button-container"
														id="sign-up-button-container"
														style={{ cursor: OTPVerified ? "auto" : "not-allowed" }}
													>
														<Button
															className="button"
															onClick={handleBack}
															variant="contained"
															style={{
																backgroundColor: "#f5f5f5",
																color: "#4e4e4e "
															}}
														>
															<span>
																<ArrowBackIosIcon
																	className="button-icon"
																	style={{ color: "#4e4e4e" }}
																/>
															</span>
															<span
																className="button-label-with-icon"
																style={{ color: "#4e4e4e" }}
															>
																Back
															</span>
														</Button>
														<Button
															className="button"
															// disabled={!OTPVerified}
															onClick={handleSubmit}
															type="submit"
															variant="contained"
															style={{
																backgroundColor: "#9c27b0",
																color: "#ffff"
															}}
														>
															<span
																className="button-label-with-icon"
																style={{ color: "#ffff" }}
															>
																Next
															</span>
															<span>
																<ArrowForwardIosIcon
																	className="button-icon"
																	style={{ color: "#ffff" }}
																/>
															</span>
														</Button>
													</div>
												</div>
											</FormControl>
										</form>
									) : activeStep === 2 ? (
										<form onSubmit={handleSubmit} autoComplete="off" method="">
											<FormControl className={"form-container form-container-lg-form"} id="form-container">
												<div className="form-inner form-inner-lg" id="form-inner">
													<TextField
														className="form-field-input-lg-form"
														id="first-name-input"
														name="first_name"
														value={user.first_name}
														label="First Name"
														placeholder="Enter First Name"
														variant="outlined"
														onChange={handleChange}
														style={{ width: "100%", borderRadius: 50 }}
														helperText={validation.user.first_name}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AccountCircle style={{ color: "#7cb342" }} />
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input form-field-input-lg-form"
														id="middle-name-input"
														name="middle_name"
														label="Middle Name"
														placeholder="Enter Middle Name"
														value={user.middle_name}
														variant="outlined"
														onChange={handleChange}
														style={{ width: "100%", borderRadius: 50 }}
														// helperText={validation.user.middle_name}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AccountCircle style={{ color: "#7cb342" }} />
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input form-field-input-lg-form"
														id="last-name-input"
														name="last_name"
														label="Last Name"
														placeholder="Enter Last Name"
														value={user.last_name}
														variant="outlined"
														onChange={handleChange}
														style={{ width: "100%", borderRadius: 50 }}
														helperText={validation.user.last_name}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AccountCircle style={{ color: "#7cb342" }} />
																</InputAdornment>
															)
														}}
													/>
													<div className="date-picker">
														<MuiPickersUtilsProvider utils={DateFnsUtils}>
															<KeyboardDatePicker
																className="form-field-input form-field-input-lg-form"
																inputVariant="outlined"
																label="Date of Birth"
																placeholder="Enter Date of Birth"
																id="date-of-birth-input"
																name="date_of_birth"
																format="MM/dd/yyyy"
																error={false}
																value={dateValue}
																onChange={handleDateChange}
																inputValue={user.date_of_birth}
																InputProps={{
																	readOnly: true
																}}
																InputLabelProps={{
																	shrink: true
																}}
																style={{ width: "100%", borderRadius: 50 }}
																keyboardIcon={
																	<EventIcon style={{ color: "#7cb342" }} />
																}
																KeyboardButtonProps={{
																	"aria-label": "change date"
																}}
																helperText={validation.user.date_of_birth}
															/>
														</MuiPickersUtilsProvider>
													</div>
													<TextField
														className="form-field-input form-field-input-lg-form"
														id="SSN-input"
														name="SSN"
														value={user.SSN}
														label="SSN"
														placeholder="Enter SSN"
														variant="outlined"
														onChange={handleChange}
														onKeyDown={(event: any) => handleKeyCheck(event)}
														onPaste={(event: any) => handlePaste(event)}
														style={{ width: "100%", borderRadius: 50 }}
														helperText={validation.user.SSN}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<SecurityIcon style={{ color: "#7cb342" }} />
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input form-field-input-lg-form"
														id="Reenter-SSN-input"
														name="reenterSSN"
														value={reEnteredSSN}
														label="Reenter SSN"
														placeholder="Reenter SSN"
														variant="outlined"
														onChange={handleReEnteredSSNChange}
														onKeyDown={(event: any) => handleKeyCheck(event)}
														onPaste={(event: any) => handlePaste(event)}
														style={{ width: "100%", borderRadius: 50 }}
														//helperText={validation.user.SSN}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<SecurityIcon style={{ color: "#7cb342" }} />
																</InputAdornment>
															)
														}}
													/>
												</div>
												<div className={"sign-up-button-container " + (activeStep === 2 ? "sign-up-button-container-lg-form" : "")} id="sign-up-button-container">
													<Button
														className="button"
														onClick={handleBack}
														variant="contained"
														style={{
															backgroundColor: "#f5f5f5",
															color: "#4e4e4e "
														}}
													>
														<span>
															<ArrowBackIosIcon
																className="button-icon"
																style={{ color: "#4e4e4e" }}
															/>
														</span>
														<span
															className="button-label-with-icon"
															style={{ color: "#4e4e4e" }}
														>
															Back
														</span>
													</Button>
													<Button
														className="button"
														//onClick={handleSubmit}
														type="submit"
														variant="contained"
														style={{
															backgroundColor: "#9c27b0",
															color: "#ffff"
														}}
													>
														<span
															className="button-label-with-icon"
															style={{ color: "#ffff" }}
														>
															Next
														</span>
														<span>
															<ArrowForwardIosIcon
																className="button-icon"
																style={{ color: "#ffff" }}
															/>
														</span>
													</Button>
												</div>
											</FormControl>
										</form>
									) : activeStep === 3 ? (
										<form onSubmit={handleSubmit} autoComplete="off" method="">
											<FormControl className="form-container" id="form-container">
												<div className="form-inner" id="form-inner">
													<TextField
														className="form-field-input"
														id="user-name-input"
														name="user_name"
														label="Username"
														placeholder="Enter Username"
														value={user.user_name}
														variant="outlined"
														onChange={handleChange}
														helperText={
															userNameExists
																? "Username exists!"
																: checkInvalidUserName
																	? "Username must be between 4 to 20 characters and alpha-numeric!"
																	: validation.user.user_name
														}
														style={{ width: "100%", borderRadius: 50 }}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AccountCircle style={{ color: "#7cb342" }} />
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input"
														id="password-input"
														name="password"
														type={!showPassword ? "password" : "text"}
														value={user.password}
														label="Password"
														placeholder="Enter Password"
														variant="outlined"
														onChange={handleChange}
														helperText={validation.user.password}
														style={{ width: "100%", borderRadius: 50 }}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<LockIcon style={{ color: "#7cb342" }} />
																</InputAdornment>
															),
															endAdornment: (
																<InputAdornment position="end">
																	{!showPassword ? (
																		<IconButton onClick={handleShowPassword}>
																			<VisibilityOffIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	) : (
																		<IconButton onClick={handleShowPassword}>
																			<VisibilityIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	)}
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input"
														id="confirm-password-input"
														name="confirm_password"
														type={!showConfirmPassword ? "password" : "text"}
														label="Confirm password"
														placeholder="Enter Confirm Password"
														value={user.confirm_password}
														variant="outlined"
														onChange={handleChange}
														helperText={validation.user.confirm_password}
														style={{ width: "100%", borderRadius: 50 }}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<EnhancedEncryptionIcon
																		style={{ color: "#7cb342" }}
																	/>
																</InputAdornment>
															),
															endAdornment: (
																<InputAdornment position="end">
																	{!showConfirmPassword ? (
																		<IconButton onClick={handleShowConfirmPassword}>
																			<VisibilityOffIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	) : (
																		<IconButton onClick={handleShowConfirmPassword}>
																			<VisibilityIcon
																				style={{ color: "#7cb342" }}
																			/>
																		</IconButton>
																	)}
																</InputAdornment>
															)
														}}
													/>
													{/* <div
														className="claim-notification-checkbox"
														id="claim-notification-checkbox"
													>
														<Checkbox
															icon={
																<NotificationsIcon
																	fontSize="small"
																	style={{ color: "#9c27b0" }}
																/>
															}
															checkedIcon={
																<NotificationsNoneIcon
																	fontSize="small"
																	style={{ color: "#9c27b0" }}
																/>
															}
															name="checkedI"
															onChange={handleNotificationChange}
														/>
														Receive Processed Claim Notification
													</div> */}
													<div className="sou-checkbox" id="sou-checkbox">
														<Checkbox
															name="hasReadStatementOfUnderstanding"
															style={{
																color: "#9c27b0"
															}}
															value={hasReadStatementOfUnderstanding}
															onChange={handleStatementOfUnderstandingRead}
														/>
														<span>I have read the </span>
														<span
															className="sou"
															onClick={handleStatementOfUnderstandingOpen}
														>
															Statement of Understanding
														</span>
													</div>
												</div>
												<div
													className="sign-up-button-container"
													id="sign-up-button-container"
												>
													{/* <Button
                                                                variant="contained"
                                                                onClick={handleBack}
                                                                style={{
                                                                    backgroundColor: "#f5f5f5",
                                                                    letterSpacing: "1.5px",
                                                                    fontSize: "1rem",
                                                                    marginRight: 10
                                                                }}
                                                            >
                                                                Back
                                                            </Button>
                                                            <Tooltip
                                                                title={!hasReadStatementOfUnderstanding ? "Please read the statement of understanding before signing up" : ""}
                                                                arrow
                                                            >
                                                                <Button
                                                                    variant="contained"
                                                                    disabled={!hasReadStatementOfUnderstanding}
                                                                    onClick={handleSubmit}
                                                                    style={{
                                                                        backgroundColor: "#9c27b0",
                                                                        color: "white",
                                                                        letterSpacing: "1.5px",
                                                                        fontSize: "1rem",
                                                                        cursor: !hasReadStatementOfUnderstanding ? "not-allowed" : "pointer",
                                                                        pointerEvents: "unset"
                                                                    }}
                                                                >
                                                                    Sign Up
                                                                </Button>
                                                            </Tooltip> */}
													<Button
														className="button"
														onClick={handleBack}
														variant="contained"
														style={{
															backgroundColor: "#f5f5f5",
															color: "#4e4e4e "
														}}
													>
														<span>
															<ArrowBackIosIcon
																className="button-icon"
																style={{ color: "#4e4e4e " }}
															/>
														</span>
														<span
															className="button-label-with-icon"
															style={{ color: "#4e4e4e " }}
														>
															Back
														</span>
													</Button>
													<Tooltip
														title={
															!hasReadStatementOfUnderstanding
																? "Please read the statement of understanding before signing up"
																: ""
														}
														arrow
													>
														<Button
															className="button"
															//onClick={handleSubmit}
															type="submit"
															variant="contained"
															style={{
																backgroundColor: "#9c27b0",
																color: "#ffff"
															}}
														>
															<span
																className="button-label-with-icon"
																style={{ color: "#ffff" }}
															>
																Sign Up
															</span>
															<span>
																<PersonAddIcon
																	className="button-icon"
																	style={{ color: "#ffff" }}
																/>
															</span>
														</Button>
													</Tooltip>
												</div>
											</FormControl>
										</form>
									) : (
										<>
											<div className="account-created-container" id="account-created-container">
												<div className="account-created-span" id="account-created-span">
													<CheckCircleOutlineIcon />
												</div>
												<div className="account-created" id="account-created">
													Your account has been successfully created
												</div>
											</div>
											<div
												className="sign-up-button-container-lg-form"
												id="sign-up-button-container"
											>
												{/* <Button
                                                            variant="contained"
                                                            onClick={handleSubmit}
                                                            style={{
                                                                backgroundColor: "#9c27b0",
                                                                color: "white",
                                                                letterSpacing: "1.5px",
                                                                fontSize: "1rem"
                                                            }}
                                                        >
                                                            Login
                                                        </Button> */}
												<Button
													className="button"
													onClick={handleSubmit}
													variant="contained"
													style={{
														backgroundColor: "#9c27b0",
														color: "#ffff"
													}}
												>
													<span className="button-label-with-icon" style={{ color: "#ffff" }}>
														Login
													</span>
													<span>
														<PersonIcon
															className="button-icon"
															style={{ color: "#ffff" }}
														/>
													</span>
												</Button>
											</div>
										</>
									)}
								</CardContent>
								<CardActions className={activeStep === 2 ? "sign-in-container-lg-form" : ""}>
									<div className="sign-in-container">
										<span>Already registered? </span>
										<span>
											<Link to="/login">Sign In</Link>
										</span>
									</div>
								</CardActions>
							</Card>
						</div>
					</Grid>
				</Grid>
			</div>
			<div className="help-items-container">
				<div className="margin-help-item" />
				<Chip
					className="help-item-chip"
					icon={<HelpIcon className="help-item-icon" />}
					label="Registration Help"
					onClick={handleRegistrationHelpOpen}
				/>
			</div>
		</div>
	);
};

export default SignUp;
