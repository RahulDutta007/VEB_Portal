/* eslint-disable prettier/prettier */
import { useState, useContext, Suspense, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
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
	Menu,
	MenuItem,
	Grid,
	Chip,
	Tooltip,
	CardActions,
	Backdrop
} from "@material-ui/core";
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
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React from "react";
import EmailIcon from "@material-ui/icons/Email";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HelpIcon from "@material-ui/icons/Help";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { CustomDialog, LazySnackbarAPI, SnackbarAPI } from "../../../shared";

import "./signUp.css";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { SnackbarProps } from "../../../../@types/snackbarAPI.types";
import { Admin } from "../../../../@types/admin.types";
import { Validation } from "../../../../@types/validation.types";
import { Timer } from "../../../../@types/timer.types";
import { convertToObject } from "typescript";
import { verifyOTP } from "../../../../utils/api/auth/login";

const getSteps = () => ["Roles", "Personal Information", "Sign Up", "Completed"];

const mailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

const SignUp = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [OTP, setOTP] = useState("");
	const [timer, setTimer] = useState<Timer>({
		minutes: 1,
		seconds: 59
	});
	const [confirm_password, setConfirmPassword] = useState("");
	const ref = useRef<any>();
	const [resendOTPButtonVisible, setResendOTPButtonVisible] = useState(true);
	const [resentOTPCaptionVisible, setResentOTPCaptionVisible] = useState(false);
	const [startTimer, setStartTimer] = useState(false);
	const [OTPVerified, setOTPVerified] = useState(false);
	const [countDownTime, setCountDownTime] = useState(0);
	const [verificationToken, setVerificationToken] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [statementOfUnderstanding, setStatementOfUnderstanding] = useState("");
	const [reEnteredSSN, setReEnteredSSN] = useState("");
	const [registrationHelp, setRegistrationHelp] = useState("");
	const [userNameExists, setUserNameExists] = useState(false);
	const [checkInvalidUserName, setCheckInvalidUserName] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [pasted, setPasted] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [dateValue, setDateValue] = useState(null);
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
	const [user, setUser] = useState<Admin>({
		first_name: "",
		middle_name: "",
		last_name: "",
		email: "",
		role: "",
		date_of_birth: "",
		SSN: "",
		user_name: "",
		password: ""
	});
	const steps = getSteps();
	const [validation, setValidation] = useState<Validation>({
		user: {
			role: "",
			last_name: "",
			first_name: "",
			date_of_birth: "",
			SSN: "",
			user_name: "",
			password: ""
		},
		status: "invalid"
	});
	const navigate = useNavigate();
	const _validation = useRef<Validation>();

	const handleRoleValidation = useCallback(async () => {
		const { role } = user;
		_validation.current = {
			...validation,
			user: {}
		};
		let flag = true;

		if (role.length === 0) {
			_validation.current.user["role"] = "Role is required";
			_validation.current.user["status"] = "invalid";
			flag = false;
		}
		if (flag === true) _validation.current["status"] = "valid";
		else _validation.current["status"] = "invalid";
		setValidation(Object.assign({}, _validation.current));
		return _validation.current["status"];
	}, [user, validation]);

	const handleEmailValidation = useCallback(async () => {
		const { email } = user;
		_validation.current = {
			...validation,
			user: {}
		};
		let flag = true;

		if (email.length === 0) {
			_validation.current.user["email"] = "Email is required to send OTP";
			_validation.current.user["status"] = "invalid";
			flag = false;
		} else if (email.length > 0) {
			if (!email.match(mailformat)) {
				_validation.current.user["email"] = "Valid Email is required";
				_validation.current["status"] = "invalid";
				flag = false;
			} else {
				flag === true;
			}
		}
		if (flag === true) _validation.current["status"] = "valid";
		else _validation.current["status"] = "invalid";
		setValidation(Object.assign({}, _validation.current));
		return _validation.current["status"];
	}, [user, validation]);

	const handlePersonalDetailsValidation = useCallback(async () => {
		const { first_name, last_name, date_of_birth, SSN } = user;
		_validation.current = {
			...validation,
			user: {}
		};
		let flag = true;

		if (first_name !== null) {
			if (first_name.length === 0) {
				_validation.current.user["first_name"] = "First Name is required";
				_validation.current.user["status"] = "invalid";
				flag = false;
			}
		}
		if (last_name !== null) {
			if (last_name.length === 0) {
				_validation.current.user["last_name"] = "Last Name is required";
				_validation.current.user["status"] = "invalid";
				flag = false;
			}
		}
		// if (SSN === null || SSN === "") {
		// 	_validation.current.user["SSN"] = "SSN is required";
		// 	_validation.current.user["status"] = "invalid";
		// 	flag = false;
		// }
		if (SSN !== null) {
			if (SSN !== "") {
				const _SSN = SSN?.replaceAll("-", "");
				if (String(_SSN).length !== 9) {
					_validation.current.user["SSN"] = "Enter correct 9 digit SSN";
					_validation.current["status"] = "invalid";
					flag = false;
				}
			}
		}
		if (flag === true) _validation.current["status"] = "valid";
		else _validation.current["status"] = "invalid";
		setValidation(Object.assign({}, _validation.current));
		return _validation.current["status"];
	}, [user]);

	const handlecredentialValidation = useCallback(async () => {
		const { user_name, password } = user;
		_validation.current = {
			...validation,
			user: {}
		};
		let flag = true;

		if (user_name !== null) {
			if (user_name.length === 0) {
				_validation.current.user["user_name"] = "User Name is required";
				_validation.current.user["status"] = "invalid";
				flag = false;
			}
		}
		if (password !== null) {
			if (password.length === 0) {
				_validation.current.user["password"] = "Password is required";
				_validation.current.user["status"] = "invalid";
				flag = false;
			}
		}

		if (flag === true) _validation.current["status"] = "valid";
		else _validation.current["status"] = "invalid";
		setValidation(Object.assign({}, _validation.current));
		return _validation.current["status"];
	}, [user]);

	const handleDateChange = useCallback(
		(date: any, dateValue: any) => {
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
		const _verificationToken = await api.OTP.sendToEmail(payload);
		if (_verificationToken) {
			setOTPVerified(false);
			alert("OTP Sent to Email");
			setResendOTPButtonVisible(false);
			setOTP("");
			setCountDownTime(Date.now() + 2 * 60000);
			setStartTimer(true);
			setVerificationToken(_verificationToken);
		}
	};

	const handleVerifyOTPClick = async () => {
		const payload = {
			otp: OTP,
			check: user.email,
			verification_key: verificationToken
		};
		const isVerified = await api.OTP.verifyOTP(payload);
		if (isVerified === true) {
			alert("Email Id has been verified");
			setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
			setOTP("");
			setOTPVerified(true);
		}
	};

	const handleClose = useCallback(
		(value: any) => {
			setAnchorEl(null);
			if (value) {
				setUser(Object.assign({}, user, { role: value }));
				// const text = value === "Admin" ? 1 : value === "Enroller Admin" ? 2 : value === "Agent" ? 4 : 3;
				setActiveStep(1);
			}
		},
		[setUser, user]
	);

	const handleBack = () => {
		// eslint-disable-next-line arrow-parens
		if (activeStep === 2) {
			// setUser(Object.assign({}, user, { email: "" }));
			// setOTP("");
		}
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
				const { email } = user;
				_validation.current = {
					...validation,
					user: {}
				};
				if (email.match(mailformat)) {
					_validation.current["status"] = "valid";
					setValidation(Object.assign({}, _validation.current));
				}
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
					setPasted(false);
					if (!isNaN(value)) {
						if (value.length > 9) {
							event.target.value = null;
							event.target.value = user.SSN;
							alert("Please enter a valid 9 digit SSN!");
						} else {
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
						let ssnValue = value.replace(/[^0-9]/g, "").replace(/[^\w\s]/gi, "");
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

	const handleConfirmPasswordChange = useCallback(
		(event: { target: { value: any } }) => {
			const { value } = event.target;
			setConfirmPassword(value);
		},
		[confirm_password, setConfirmPassword]
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
						ssn = ssn.substr(0, 3) + "-" + ssn.substr(3);
					}
					setReEnteredSSN(ssn);
				} else {
					event.target.value = null;
					event.target.value = reEnteredSSN;
				}
			} else {
				setPasted(false);
				if (!isNaN(value)) {
					if (value.length > 9) {
						event.target.value = null;
						event.target.value = reEnteredSSN;
						alert("Please enter a valid 9 digit SSN!");
					} else {
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
					let ssnValue = value.replace(/[^0-9]/g, "").replace(/[^\w\s]/gi, "");
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

	const handleSubmit = useCallback(
		async (event: { preventDefault: () => void }) => {
			event.preventDefault();
			if (activeStep === 0) {
				const roleValidation = await handleRoleValidation();
				if (roleValidation === "valid") setActiveStep(activeStep + 1);
			} else if (activeStep === 1) {
				const emailValidation = await handleEmailValidation();
				if (emailValidation === "valid") {
					if (OTPVerified) {
						setActiveStep(activeStep + 1);
					} else {
						alert("Please very OTP");
					}
				}
			} else if (activeStep === 2) {
				const personalDetailsValidation = await handlePersonalDetailsValidation();
				if (personalDetailsValidation === "valid") {
					if (user.SSN !== reEnteredSSN) {
						alert("Please Reenter correct SSN");
					} else {
						setActiveStep(activeStep + 1);
					}
				}
			} else if (activeStep === 3) {
				if (user.password !== confirm_password) {
					alert("Please Reenter correct password");
				} else {
					const credentialValidation = await handlecredentialValidation();
					if (credentialValidation === "valid") {
						const { role, date_of_birth } = user;
						const _role = role.toUpperCase();
						let date;
						if (date_of_birth) {
							date = new Date(date_of_birth);
						}
						const _user = {
							...user,
							role: user.role.toUpperCase(),
							...(user.SSN &&
								user.SSN.length > 0 && { SSN: Number(user?.SSN.replaceAll("-", "")).toString() }),
							...(date?.getDate() &&
								date?.getFullYear() &&
								date?.getMonth() && {
									date_of_birth:
										date?.getFullYear() + "-" + (date?.getMonth() + 1) + "-" + date?.getDate()
								})
						};
						console.log("_user", _user);
						try {
							if (!_user.middle_name) {
								delete _user.middle_name;
							}
							if (String(date_of_birth).length === 0 || date_of_birth === null) {
								delete _user.date_of_birth;
							}
							if (_user.SSN === "0" || _user.SSN === "") {
								delete _user.SSN;
							}
							// Old sign up integration
							const response = await api.auth.signUpAdmin(_user);
							if (response?.message === "Data edited successfully") {
								setSnackbarAPIProps(
									Object.assign({}, snackbarAPIProps, {
										open: true,
										message: `Create a ${user.role} successfully`,
										severity: "success"
									})
								);
								navigate("/login");
							} else {
								setSignUpDialogProps(
									Object.assign({}, signUpDialogProps, {
										openDialog: true,
										title: "Unsuccessfull Sign Up",
										content: response?.message,
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
						} catch (err) {
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
			navigate,
			reEnteredSSN,
			signUpDialogProps,
			user,
			snackbarAPIProps,
			confirm_password
		]
	);

	useEffect(() => {
		if (startTimer === true) {
			ref.current = setInterval(() => {
				const distance = countDownTime - Date.now();
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);
				if (minutes === 0 && seconds === 0) {
					setStartTimer(false);
					setResendOTPButtonVisible(true);
					setResentOTPCaptionVisible(true);
				}
				setTimer(
					Object.assign(
						{},
						{
							minutes: minutes,
							seconds: seconds
						}
					)
				);
			}, 1000);
		}

		return () => clearInterval(ref.current);
	}, [countDownTime, startTimer]);

	return (
		<div className="sign-up" id="sign-up">
			<Suspense fallback={<div />}>
				<CustomDialog dialogProps={signUpDialogProps} />
			</Suspense>
			<div className="container-outer" id="container-outer">
				<div className="container-header">
					<Grid container spacing={0} direction="column" alignItems="center">
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<Stepper activeStep={activeStep} className="sign-up-stepper" alternativeLabel>
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
				<SnackbarAPI snackbarProps={snackbarAPIProps} />
				<Grid container spacing={0} direction="column" alignItems="center">
					<Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
						<div className="container-inner" id="container-inner">
							<Card className="card-container">
								<CardContent className="card-content" id="card-content">
									<div
										className={
											"logo-container " + (activeStep === 2 ? "logo-container-lg-form" : "")
										}
									>
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
													<div className="details role-selected-value">
														<span className="select-validation-text">
															{validation.user.role}
														</span>
													</div>
												) : null}
											</div>
											<div className="sign-up-button-container" id="sign-up-button-container">
												<Button
													className="button next-arrow-down"
													onClick={handleSubmit}
													variant="contained"
												>
													<span className="button-label-with-icon color-white">Next</span>
													<span>
														<ArrowForwardIosIcon className="button-icon color-white" />
													</span>
												</Button>
											</div>
										</>
									) : activeStep === 1 ? (
										<form onSubmit={handleSubmit} autoComplete="off" method="">
											<FormControl className="form-container" id="form-container">
												<div className="form-inner">
													<TextField
														className="form-field-input-lg-form auth-input-fields"
														id="email-input"
														disabled={OTPVerified}
														name="email"
														label="Email"
														placeholder="Enter Email"
														value={user.email}
														variant="outlined"
														onChange={handleChange}
														helperText={
															user.email.length === 0
																? ""
																: emailExists
																? "Email is already exist"
																: ""
														}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<EmailIcon className="auth-input-icon" />
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
																			className="margin-lf-5"
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
													{validation.user.email ? (
														<div className="details role-selected-value">
															<span className="select-validation-text">
																{validation.user.email}
															</span>
														</div>
													) : null}
													{startTimer && !OTPVerified ? (
														<TextField
															className="form-field-input auth-input-fields"
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
															InputProps={{
																startAdornment: (
																	<InputAdornment position="start">
																		<VpnKeyIcon style={{ color: "#7cb342" }} />
																	</InputAdornment>
																),
																endAdornment: (
																	<div
																		style={{
																			cursor: OTP === "" ? "not-allowed" : "auto"
																		}}
																	>
																		<Button
																			variant="outlined"
																			onClick={handleVerifyOTPClick}
																			className="margin-lf-5"
																			disabled={OTP === "" ? true : false}
																		>
																			Verify
																		</Button>
																	</div>
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
															className="button button-back"
															onClick={handleBack}
															variant="contained"
														>
															<span>
																<ArrowBackIosIcon className="button-icon icon-back" />
															</span>
															<span className="button-label-with-icon icon-back">
																Back
															</span>
														</Button>
														<Button
															className="button theme-button-violet"
															// disabled={!OTPVerified}
															onClick={handleSubmit}
															type="submit"
															variant="contained"
														>
															<span className="button-label-with-icon">Next</span>
															<span>
																<ArrowForwardIosIcon className="button-icon color-white" />
															</span>
														</Button>
													</div>
												</div>
											</FormControl>
										</form>
									) : activeStep === 2 ? (
										<form onSubmit={handleSubmit} autoComplete="off" method="">
											<FormControl
												className={"form-container form-container-lg-form"}
												id="form-container"
											>
												<div className="form-inner form-inner-lg" id="form-inner">
													<TextField
														className="form-field-input-lg-form auth-input-fields"
														id="first-name-input"
														name="first_name"
														value={user.first_name}
														label="First Name"
														placeholder="Enter First Name"
														variant="outlined"
														onChange={handleChange}
														helperText={validation.user.first_name}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AccountCircle className="auth-input-icon" />
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input form-field-input-lg-form auth-input-fields"
														id="middle-name-input"
														name="middle_name"
														label="Middle Name"
														placeholder="Enter Middle Name"
														value={user.middle_name}
														variant="outlined"
														onChange={handleChange}
														// helperText={validation.user.middle_name}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AccountCircle className="auth-input-icon" />
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input form-field-input-lg-form auth-input-fields"
														id="last-name-input"
														name="last_name"
														label="Last Name"
														placeholder="Enter Last Name"
														value={user.last_name}
														variant="outlined"
														onChange={handleChange}
														helperText={validation.user.last_name}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AccountCircle className="auth-input-icon" />
																</InputAdornment>
															)
														}}
													/>
													<div className="date-picker">
														<MuiPickersUtilsProvider utils={DateFnsUtils}>
															<KeyboardDatePicker
																className="form-field-input form-field-input-lg-form auth-input-fields"
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
																keyboardIcon={<EventIcon className="auth-input-icon" />}
																KeyboardButtonProps={{
																	"aria-label": "change date"
																}}
																helperText={validation.user.date_of_birth}
															/>
														</MuiPickersUtilsProvider>
													</div>
													<TextField
														className="form-field-input form-field-input-lg-form auth-input-fields"
														id="SSN-input"
														name="SSN"
														value={user.SSN}
														label="SSN"
														placeholder="Enter SSN"
														variant="outlined"
														onChange={handleChange}
														onKeyDown={(event: any) => handleKeyCheck(event)}
														onPaste={(event: any) => handlePaste(event)}
														helperText={validation.user.SSN}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<SecurityIcon className="auth-input-icon" />
																</InputAdornment>
															)
														}}
													/>

													<TextField
														className="form-field-input form-field-input-lg-form auth-input-fields"
														id="Reenter-SSN-input"
														name="reenterSSN"
														value={reEnteredSSN}
														label="Reenter SSN"
														placeholder="Reenter SSN"
														variant="outlined"
														onChange={handleReEnteredSSNChange}
														onKeyDown={(event: any) => handleKeyCheck(event)}
														onPaste={(event: any) => handlePaste(event)}
														//helperText={validation.user.confirm_SSN}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<SecurityIcon className="auth-input-icon" />
																</InputAdornment>
															)
														}}
													/>
												</div>
												<div
													className={
														"sign-up-button-container " +
														(activeStep === 2 ? "sign-up-button-container-lg-form" : "")
													}
													id="sign-up-button-container"
												>
													<Button
														className="button button-back"
														onClick={handleBack}
														variant="contained"
													>
														<span>
															<ArrowBackIosIcon className="button-icon icon-back" />
														</span>
														<span className="button-label-with-icon icon-back">Back</span>
													</Button>
													<Button
														className="button theme-button-violet"
														//onClick={handleSubmit}
														type="submit"
														variant="contained"
													>
														<span className="button-label-with-icon color-white">Next</span>
														<span>
															<ArrowForwardIosIcon className="button-icon color-white" />
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
														className="form-field-input auth-input-fields"
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
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AccountCircle className="auth-input-icon" />
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input auth-input-fields"
														id="password-input"
														name="password"
														type={!showPassword ? "password" : "text"}
														value={user.password}
														label="Password"
														placeholder="Enter Password"
														variant="outlined"
														onChange={handleChange}
														helperText={validation.user.password}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<SecurityIcon className="auth-input-icon" />
																</InputAdornment>
															),
															endAdornment: (
																<InputAdornment position="end">
																	{!showPassword ? (
																		<IconButton onClick={handleShowPassword}>
																			<VisibilityOffIcon className="auth-input-icon" />
																		</IconButton>
																	) : (
																		<IconButton onClick={handleShowPassword}>
																			<VisibilityIcon className="auth-input-icon" />
																		</IconButton>
																	)}
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input auth-input-fields"
														id="confirm-password-input"
														name="confirm_password"
														type={!showConfirmPassword ? "password" : "text"}
														label="Confirm password"
														placeholder="Enter Confirm Password"
														value={confirm_password}
														variant="outlined"
														onChange={handleConfirmPasswordChange}
														//helperText={validation.user.validate_password}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<EnhancedEncryptionIcon className="auth-input-icon" />
																</InputAdornment>
															),
															endAdornment: (
																<InputAdornment position="end">
																	{!showConfirmPassword ? (
																		<IconButton onClick={handleShowConfirmPassword}>
																			<VisibilityOffIcon className="auth-input-icon" />
																		</IconButton>
																	) : (
																		<IconButton onClick={handleShowConfirmPassword}>
																			<VisibilityIcon className="auth-input-icon" />
																		</IconButton>
																	)}
																</InputAdornment>
															)
														}}
													/>
												</div>
												<div className="sign-up-button-container" id="sign-up-button-container">
													<Button
														className="button button-back"
														onClick={handleBack}
														variant="contained"
													>
														<span>
															<ArrowBackIosIcon className="button-icon icon-back" />
														</span>
														<span className="button-label-with-icon icon-back">Back</span>
													</Button>
													<Tooltip
														title="Please read the statement of understanding before signing up"
														arrow
													>
														<Button
															className="button theme-button-violet"
															//onClick={handleSubmit}
															type="submit"
															variant="contained"
														>
															<span className="button-label-with-icon color-white">
																Sign Up
															</span>
															<span>
																<PersonAddIcon className="button-icon color-white" />
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
												<Button
													className="button theme-button-violet"
													onClick={handleSubmit}
													variant="contained"
												>
													<span className="button-label-with-icon color-white">Login</span>
													<span>
														<PersonIcon className="button-icon color-white" />
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
