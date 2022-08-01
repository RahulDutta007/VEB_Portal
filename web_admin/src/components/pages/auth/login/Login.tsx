import "../auth.css";
import "./login.css";
import React, { Suspense, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Credential } from "../../../../@types/credential.types";
import { DialogProps } from "../../../../@types/dialogProps.types";
import { Validation } from "../../../../@types/validation.types";
import { Logo } from "../../../../assets";
import {
	Card,
	CardContent,
	FormControl,
	Button,
	Menu,
	MenuItem,
	TextField,
	InputAdornment,
	IconButton
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { api } from "../../../../utils/api";
import { trackPromise } from "react-promise-tracker";
import initCapitalize from "../../../../utils/commonFunctions/initCapitalize";
import ROLES from "../../../../constants/roles";
import { MemberLinks, MEMBER_LINKS } from "../../../../constants/member/memberLinks";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import PersonIcon from "@material-ui/icons/Person";
import { useLocation, useParams } from "react-router-dom";

import "./login.css";
import { LazySnackbarAPI, SnackbarAPI } from "../../../shared";
import { SnackbarProps } from "../../../../@types/snackbarAPI.types";

const Login = (props: any): JSX.Element => {
	const location = useLocation();
	const { token } = useParams();
	console.log("ss", token);
	const [credential, setCredential] = useState<Credential>({
		user_id: "",
		role: "",
		password: ""
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [validation, setValidation] = useState<Validation>();
	const [loginDialogProps, setLoginDialogProps] = useState<DialogProps>();
	const [forgetPasswordUser, setForgetPasswordUser] = useState<null | string>("");
	const [forgetUserId, setForgetUserId] = useState<null | string>("");
	const [newPassword, setNewPassword] = useState<null | string>("");
	const [confirmPassword, setConfirmPassword] = useState<null | string>("");
	const [statusMessage, setStatusMessage] = useState<null | string>("");
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
	const _validation = useRef<Validation>();
	const navigate = useNavigate();

	const handleValidation = useCallback(async () => {
		const { role, user_id, password } = credential;
		let flag = true;
		_validation.current = {
			role: null,
			status: "invalid",
			user_id: null
		};

		if (role.length === 0) {
			_validation.current["role"] = "Role is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (user_id.length === 0) {
			_validation.current["user_id"] = "User name/Email is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (password.length === 0) {
			_validation.current["password"] = "Password is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (flag === true) _validation.current["status"] = "valid";
		else _validation.current["status"] = "invalid";

		setValidation(Object.assign({}, _validation.current));
		return _validation.current["status"];
	}, [credential]);

	const handleShowPassword = useCallback((): void => {
		setShowPassword(!showPassword);
	}, [showPassword]);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;
			setCredential(Object.assign({}, credential, { [name]: value }));
		},
		[credential]
	);

	const handleForgotPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setForgetPasswordUser(value);
	};

	const handleNewPassowrdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setNewPassword(value);
	};

	const handleConfirmPassowrdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setConfirmPassword(value);
	};

	const handleSubmitForgetPassword = useCallback(async () => {
		// event.preventDefault();
		const payload = {
			credential: forgetPasswordUser
		};
		// const status = await handleValidation();
		const response = await trackPromise(api.auth.forgetPassword(payload));
		// console.log("55", response);
		if (response) {
			// setStatusMessage("Sent a Link Email to email for reset password");
			navigate("/login");
			setSnackbarAPIProps(
				Object.assign({}, snackbarAPIProps, {
					open: true,
					message: "Sent a Link Email to email for reset password",
					severity: "success"
				})
			);
		} else {
			setStatusMessage("Error Occurred");
			navigate("/login");
		}
	}, [forgetPasswordUser, navigate, snackbarAPIProps]);

	const handleChangeForgetUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
		// event.preventDefault();
		const { value } = event.target;
		setForgetUserId(value);
	};

	const handleSubmitForgetUserId = useCallback(async () => {
		// event.preventDefault();
		const payload = {
			email: forgetUserId
		};
		// const status = await handleValidation();
		const response = await trackPromise(api.auth.changeForgetUserId(payload));
		console.log("55", response);
		if (response) {
			// setStatusMessage("Sent email with forget user id");
			navigate("/login");
			setSnackbarAPIProps(
				Object.assign({}, snackbarAPIProps, {
					open: true,
					message: "Sent email with forget user id",
					severity: "success"
				})
			);
		} else {
			setStatusMessage("Error Occurred");
			navigate("/login");
		}
	}, [forgetUserId, navigate, snackbarAPIProps]);

	const handleSubmitChangePassword = useCallback(async () => {
		// event.preventDefault();
		const payload = {
			new_password: newPassword,
			confirm_password: confirmPassword
		};
		// const status = await handleValidation();
		const response = await trackPromise(api.auth.changeForgetPassword(payload, token));
		console.log("55", response);
		if (response) {
			setStatusMessage("Password Changed Successfully");
			navigate("/login");
			setSnackbarAPIProps(
				Object.assign({}, snackbarAPIProps, {
					open: true,
					message: "Password has been changed successfully",
					severity: "success"
				})
			);
		} else {
			setStatusMessage("Error Occurred");
			navigate("/login");
		}
	}, [newPassword, confirmPassword, navigate, token, snackbarAPIProps]);

	const handleRoleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { currentTarget } = event;
		setAnchorEl(currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleRoleSelectClose = useCallback(
		(value: string | undefined) => {
			setAnchorEl(null);
			if (value) {
				setCredential(Object.assign({}, credential, { role: value }));
			}
		},
		[credential]
	);

	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			const status = await handleValidation();

			if (status === "valid") {
				try {
					const _credential = {
						...credential,
						role: credential.role.toUpperCase()
					};

					const response = await trackPromise(api.auth.login(_credential));
					console.log("Login Data", response);

					if (response?.message === "Authentication Successful!") {
						const {
							result: { role },
							token
						} = response;
						console.log("Result Role", role);

						if (role === ROLES.admin || role === ROLES.enroller_admin || role === ROLES.agent) {
							console.log("Owner Login");
							console.log("Owner Role", role);
							localStorage.setItem("@jwt", token);
							navigate("/");
							//window.location.reload();
						} else {
							alert("Invalid role selected!");
						}
					} else if (response)
						setLoginDialogProps(
							Object.assign({}, loginDialogProps, {
								openDialog: true,
								title: "Login failed!",
								content: "Invalid Role or Username or Password",
								actions: [
									{
										label: "Close",
										callback: () =>
											setLoginDialogProps(
												Object.assign({}, loginDialogProps, {
													openDialog: false
												})
											)
									}
								]
							})
						);
				} catch (err) {
					setLoginDialogProps(
						Object.assign({}, loginDialogProps, {
							openDialog: true,
							title: "Invalid Role or Username or Password",
							actions: [
								{
									label: "Close",
									callback: () =>
										setLoginDialogProps(
											Object.assign({}, loginDialogProps, {
												openDialog: false
											})
										)
								}
							]
						})
					);
				}
			} else {
				console.log("Form is invalid");
			}
		},
		[handleValidation, loginDialogProps, credential]
	);

	const { role, user_id, password } = credential;

	return (
		<div className="login" id="login">
			<div className="container-outer" id="container-outer">
				<div className="container-inner" id="container-inner">
					<Card className="card-container" elevation={5}>
						<CardContent className="card-content" id="card-content">
							<div className="logo-container">
								<img src={Logo} className="logo" id="id" alt="Nexcaliber logo" />
							</div>
							<span>{statusMessage}</span>

							<SnackbarAPI snackbarProps={snackbarAPIProps} />

							<form onSubmit={handleSubmit} autoComplete="off" method="">
								<FormControl className="form-container" id="form-container">
									<div className="select-role-container" id="select-role-container">
										<Button
											onClick={handleRoleClick}
											endIcon={<ExpandMoreIcon className="auth-dropdown-icon" />}
											style={{
												backgroundColor: "#e0e0e0",
												width: 200
											}}
										>
											{role !== "" ? role : "Select Your Role"}
										</Button>
										<Menu
											id="simple-menu"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={() => handleMenuClose()}
										>
											<MenuItem
												onClick={() => handleRoleSelectClose(initCapitalize(ROLES.admin))}
											>
												{initCapitalize(ROLES.admin)}
											</MenuItem>
											<MenuItem
												onClick={() =>
													handleRoleSelectClose(initCapitalize(ROLES.enroller_admin))
												}
											>
												{initCapitalize(ROLES.enroller_admin)}
											</MenuItem>
											<MenuItem
												onClick={() => handleRoleSelectClose(initCapitalize(ROLES.agent))}
											>
												{initCapitalize(ROLES.agent)}
											</MenuItem>
										</Menu>
										{validation?.role ? (
											<div className="details" style={{ paddingLeft: "12.7" }}>
												<span className="select-validation-text">{validation?.role}</span>
											</div>
										) : null}
									</div>
									{location.pathname === "/forgot-password" ? (
										<TextField
											className="form-field-input"
											id="user-name-password"
											name="user-name-password"
											label="Username/Email"
											variant="outlined"
											placeholder="Enter Username/Email"
											value={forgetPasswordUser}
											onChange={handleForgotPassword}
											helperText={validation?.user_id ? validation.user_id : null}
											style={{ width: "100%", borderRadius: 50 }}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<AccountCircle className="icon-account-circle" />
													</InputAdornment>
												)
											}}
										/>
									) : location.pathname === "/forgot-user-id" ? (
										<TextField
											className="form-field-input"
											id="forget-user-name"
											name="user_id"
											label="Username/Email"
											variant="outlined"
											placeholder="Enter Email"
											value={forgetUserId}
											onChange={handleChangeForgetUserId}
											helperText={validation?.user_id ? validation.user_id : null}
											style={{ width: "100%", borderRadius: 50 }}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<AccountCircle className="auth-input-icon" />
													</InputAdornment>
												)
											}}
										/>
									) : (
										<>
											{token != undefined ? (
												<>
													<TextField
														className="form-field-input"
														id="new-password"
														name="new_password"
														label="New Password"
														variant="outlined"
														placeholder="Enter New Password"
														value={newPassword}
														onChange={handleNewPassowrdChange}
														helperText={validation?.user_id ? validation.user_id : null}
														style={{ width: "100%", borderRadius: 50 }}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<AccountCircle className="auth-input-icon" />
																</InputAdornment>
															)
														}}
													/>
													<TextField
														className="form-field-input"
														id="confirm-password"
														name="confirm_password"
														type={!showPassword ? "password" : "text"}
														label="Confirm Password"
														variant="outlined"
														placeholder="Enter Confirm Password"
														value={confirmPassword}
														onChange={handleConfirmPassowrdChange}
														helperText={validation?.password ? validation.password : null}
														style={{ width: "100%" }}
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	<LockIcon className="auth-input-icon" />
																</InputAdornment>
															),
															endAdornment: (
																<InputAdornment position="end">
																	{!showPassword ? (
																		<IconButton onClick={handleShowPassword}>
																			<VisibilityOffIcon
																				className="auth-input-icon"
																			/>
																		</IconButton>
																	) : (
																		<IconButton onClick={handleShowPassword}>
																			<VisibilityIcon
																				className="auth-input-icon"
																			/>
																		</IconButton>
																	)}
																</InputAdornment>
															)
														}}
													/>
												</>
											) : (
												<>
													<>
														<TextField
															className="form-field-input"
															id="user-name-input"
															name="user_id"
															label="Username/Email"
															variant="outlined"
															placeholder="Enter Username"
															value={user_id}
															onChange={handleChange}
															helperText={validation?.user_id ? validation.user_id : null}
															style={{ width: "100%", borderRadius: 50 }}
															InputProps={{
																startAdornment: (
																	<InputAdornment position="start">
																		<AccountCircle className="auth-input-icon" />
																	</InputAdornment>
																)
															}}
														/>
														<TextField
															className="form-field-input"
															id="password-name-input"
															name="password"
															type={!showPassword ? "password" : "text"}
															label="Password"
															variant="outlined"
															placeholder="Enter Password"
															value={password}
															onChange={handleChange}
															helperText={
																validation?.password ? validation.password : null
															}
															style={{ width: "100%" }}
															InputProps={{
																startAdornment: (
																	<InputAdornment position="start">
																		<LockIcon className="auth-input-icon" />
																	</InputAdornment>
																),
																endAdornment: (
																	<InputAdornment position="end">
																		{!showPassword ? (
																			<IconButton onClick={handleShowPassword}>
																				<VisibilityOffIcon
																					className="auth-input-icon"
																				/>
																			</IconButton>
																		) : (
																			<IconButton onClick={handleShowPassword}>
																				<VisibilityIcon
																					className="auth-input-icon"
																				/>
																			</IconButton>
																		)}
																	</InputAdornment>
																)
															}}
														/>
													</>
													<>
														<Link
															className="forgot-password-container"
															id="forgot-password-container"
															to="/forgot-password"
														>
															Forgot Password ?
														</Link>
														<Link
															className="forgot-password-container"
															id="forgot-password-container"
															to="/forgot-user-id"
														>
															Forgot Username ?
														</Link>
													</>
												</>
											)}
										</>
									)}
									<div className="login-button-container" id="login-button-container">
										{location.pathname === "/forgot-password" ? (
											<Button
												className="button"
												onClick={handleSubmitForgetPassword}
												variant="contained"
												type="submit"
												style={{
													backgroundColor: "#9c27b0",
													color: "#ffff"
												}}
											>
												<span className="button-label-with-icon" style={{ color: "#ffff" }}>
													Validate User
												</span>
											</Button>
										) : location.pathname === "/forgot-user-id" ? (
											<Button
												className="button"
												onClick={handleSubmitForgetUserId}
												variant="contained"
												type="submit"
												style={{
													backgroundColor: "#9c27b0",
													color: "#ffff"
												}}
											>
												<span className="button-label-with-icon" style={{ color: "#ffff" }}>
													Send Email
												</span>
											</Button>
										) : token != undefined ? (
											<Button
												className="button"
												onClick={handleSubmitChangePassword}
												variant="contained"
												type="submit"
												style={{
													backgroundColor: "#9c27b0",
													color: "#ffff"
												}}
											>
												<span className="button-label-with-icon" style={{ color: "#ffff" }}>
													Change Password
												</span>
												<span>
													<PersonIcon className="button-icon" style={{ color: "#ffff" }} />
												</span>
											</Button>
										) : (
											<Button
												className="button"
												//onClick={handleSubmit}
												variant="contained"
												type="submit"
												style={{
													backgroundColor: "#9c27b0",
													color: "#ffff"
												}}
											>
												<span className="button-label-with-icon" style={{ color: "#ffff" }}>
													Login
												</span>
												<span>
													<PersonIcon className="button-icon" style={{ color: "#ffff" }} />
												</span>
											</Button>
										)}
									</div>
								</FormControl>
							</form>
							<div className="sign-up-container" id="sign-up-container">
								<span>New user? </span>
								<span>
									<Link to="/sign-up">Sign Up</Link>
								</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Login;
