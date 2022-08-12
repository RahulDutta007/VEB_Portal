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
import { CustomDialog, LazySnackbarAPI, SnackbarAPI } from "../../../shared";
import { SnackbarProps } from "../../../../@types/snackbarAPI.types";

const Login = (props: any): JSX.Element => {
	const location = useLocation();
	const { token } = useParams();
	console.log("ss", token);
	const [credential, setCredential] = useState<Credential>({
		user_id: "",
		role: "",
		password: "",
		newPassword: "",
		confirmPassword: ""
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [validation, setValidation] = useState<Validation>();
	const [loginDialogProps, setLoginDialogProps] = useState({
		openDialog: false,
		title: "",
		content: "",
		actions: []
	});
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

	const handleValidation = useCallback(
		(validationType: string) => {
			// const { target, value } = event;
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
			if (
				user_id.length === 0 &&
				(validationType === "Validate User" || validationType === "Send Email" || validationType === "Login")
			) {
				_validation.current["user_id"] = "User name/Email is required";
				_validation.current["status"] = "invalid";
				flag = false;
			}
			if (password.length === 0 && validationType === "Login") {
				_validation.current["password"] = "Password is required";
				_validation.current["status"] = "invalid";
				flag = false;
			}
			if (validationType === "Change Password" && newPassword?.length) {
				_validation.current["newPassword"] = "New Password is required";
				_validation.current["status"] = "invalid";
				flag = false;
			}
			if (validationType === "Change Password" && confirmPassword?.length) {
				_validation.current["newPassword"] = "Confirm Password is required";
				_validation.current["status"] = "invalid";
				flag = false;
			}
			if (validationType === "Change Password" && confirmPassword !== newPassword) {
				_validation.current["status"] = "invalid";
				flag = false;
				setSnackbarAPIProps(
					Object.assign({}, snackbarAPIProps, {
						open: true,
						message: "New Password should match with Confirm Password",
						severity: "success"
					})
				);
			}
			if (flag === true) _validation.current["status"] = "valid";
			else _validation.current["status"] = "invalid";

			setValidation(Object.assign({}, _validation.current));
			return _validation.current["status"];
		},
		[credential]
	);

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

	const handleNewPassowrdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setNewPassword(value);
	};

	const handleConfirmPassowrdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setConfirmPassword(value);
	};

	const handleSubmitForgetPassword = useCallback(
		async (event: any) => {
			event.preventDefault();
			const payload = {
				credential: credential.user_id,
				role: credential.role.toUpperCase()
			};

			const { target, value } = event;
			const validationResult = handleValidation(target.innerText);
			if (validationResult === "invalid") {
				return false;
			} else {
				const response = await api.auth.forgetPassword(payload);
				// console.log("55", response);
				if (response) {
					// setStatusMessage("Sent a Link Email to email for reset password");
					_validation.current = undefined;
					setValidation(Object.assign({}, _validation.current));
					setCredential({
						user_id: "",
						role: "",
						password: "",
						newPassword: "",
						confirmPassword: ""
					});
					setSnackbarAPIProps(
						Object.assign({}, snackbarAPIProps, {
							open: true,
							message: "Sent a Link Email to email for reset password",
							severity: "success"
						})
					);
					navigate("/login");
				} else {
					setStatusMessage("Error Occurred");
					navigate("/login");
				}
			}
		},
		[credential.user_id, credential.role, handleValidation, snackbarAPIProps, navigate]
	);

	const handleSubmitForgetUserId = useCallback(
		async (event: any) => {
			event.preventDefault();
			const payload = {
				email: credential.user_id,
				role: credential.role.toUpperCase()
			};
			const validationResult = await handleValidation(event.target.innerText);
			if (validationResult === "invalid") {
				return false;
			}
			const response = await api.auth.changeForgetUserId(payload);
			console.log("Forget User Id", response);
			if (response) {
				_validation.current = undefined;
				setValidation(Object.assign({}, _validation.current));
				setCredential({
					user_id: "",
					role: "",
					password: "",
					newPassword: "",
					confirmPassword: ""
				});
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
				// navigate("/login");
			}
		},
		[credential.role, credential.user_id, handleValidation, navigate, snackbarAPIProps]
	);

	const handleSubmitChangePassword = useCallback(async () => {
		// event.preventDefault();
		const payload = {
			new_password: newPassword,
			confirm_password: confirmPassword
		};
		const validationResult = await handleValidation("Change Password");
		if (validationResult === "invalid") {
			return false;
		}
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
		async (event: any) => {
			event.preventDefault();

			const validationResult = handleValidation("Login");
			if (validationResult === "valid") {
				try {
					const _credential = {
						user_id: credential.user_id,
						password: credential.password,
						role: credential.role.toUpperCase()
					};

					const response = await api.auth.login(_credential);
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
					} else {
						console.log("kdas", response?.message);
						setLoginDialogProps(
							Object.assign({}, loginDialogProps, {
								openDialog: true,
								title: "Login failed!",
								content: "Authorization failed",
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
		[handleValidation, credential.user_id, credential.password, credential.role, navigate, loginDialogProps]
	);

	const { role, user_id, password } = credential;

	return (
		<div className="login" id="login">
			<Suspense fallback={<div />}>
				<CustomDialog dialogProps={loginDialogProps} />
			</Suspense>
			<div className="container-outer" id="container-outer">
				<div className="container-inner" id="container-inner">
					<Card className="card-container" elevation={5}>
						<CardContent className="card-content" id="card-content">
							<div className="logo-container">
								<img src={Logo} className="logo" id="id" alt="Nexcaliber logo" />
							</div>
							<span>{statusMessage}</span>

							<SnackbarAPI snackbarProps={snackbarAPIProps} />

							<form autoComplete="off" method="">
								<FormControl className="form-container" id="form-container">
									<div className="select-role-container" id="select-role-container">
										<Button
											onClick={handleRoleClick}
											endIcon={<ExpandMoreIcon className="auth-dropdown-icon" />}
											className="role-dropdown"
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
											<div className="details role-selected-value">
												<span className="select-validation-text">{validation?.role}</span>
											</div>
										) : null}
									</div>
									{location.pathname === "/forgot-password" ? (
										<TextField
											className="form-field-input auth-input-fields"
											id="forget-user-name-password"
											name="user_id"
											label="Username/Email"
											variant="outlined"
											placeholder="Enter Username/Email"
											value={credential.user_id}
											onChange={handleChange}
											helperText={validation?.user_id ? validation.user_id : null}
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
											className="form-field-input auth-input-fields"
											id="forget-user-name"
											name="user_id"
											label="Username/Email"
											variant="outlined"
											placeholder="Enter Email"
											value={credential.user_id}
											onChange={handleChange}
											helperText={validation?.user_id ? validation.user_id : null}
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
											{location.pathname === "/change-password" || token != undefined ? (
												<>
													<TextField
														className="form-field-input auth-input-fields"
														id="new-password"
														name="new_password"
														label="New Password"
														variant="outlined"
														placeholder="Enter New Password"
														value={newPassword}
														onChange={handleNewPassowrdChange}
														helperText={
															validation?.newPassword ? validation.newPassword : null
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
														id="confirm-password"
														name="confirm_password"
														type={!showPassword ? "password" : "text"}
														label="Confirm Password"
														variant="outlined"
														placeholder="Enter Confirm Password"
														value={confirmPassword}
														onChange={handleConfirmPassowrdChange}
														helperText={
															validation?.confirmPassword
																? validation.confirmPassword
																: null
														}
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
												</>
											) : (
												<>
													<>
														<TextField
															className="form-field-input auth-input-fields"
															id="user-name-input"
															name="user_id"
															label="Username/Email"
															variant="outlined"
															placeholder="Enter Username"
															value={user_id}
															onChange={handleChange}
															helperText={validation?.user_id ? validation.user_id : null}
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
												className="button theme-button-violet"
												onClick={handleSubmitForgetPassword}
												name="forget-password-button"
												variant="contained"
												type="submit"
											>
												<span className="button-label-with-icon">Validate User</span>
											</Button>
										) : location.pathname === "/forgot-user-id" ? (
											<Button
												className="button theme-button-violet"
												onClick={handleSubmitForgetUserId}
												variant="contained"
												type="submit"
											>
												<span className="button-label-with-icon">Send Email</span>
											</Button>
										) : token != undefined ? (
											<Button
												className="button theme-button-violet"
												onClick={handleSubmitChangePassword}
												variant="contained"
												type="submit"
											>
												<span className="button-label-with-icon">Change Password</span>
												<span>
													<PersonIcon className="button-icon" />
												</span>
											</Button>
										) : (
											<Button
												className="button theme-button-violet"
												onClick={handleSubmit}
												variant="contained"
												type="submit"
											>
												<span className="button-label-with-icon">Login</span>
												<span>
													<PersonIcon className="button-icon" />
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
