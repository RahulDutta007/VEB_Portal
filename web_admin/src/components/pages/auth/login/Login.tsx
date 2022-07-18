import "../auth.css";
import "./login.css";
import React, { useCallback, useRef, useState } from "react";
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

import "./login.css";

const Login = (): JSX.Element => {
	const [credential, setCredential] = useState<Credential>({
		user_id: "",
		role: "",
		password: ""
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [validation, setValidation] = useState<Validation>();
	const [loginDialogProps, setLoginDialogProps] = useState<DialogProps>();
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
							<form onSubmit={handleSubmit} autoComplete="off" method="">
								<FormControl className="form-container" id="form-container">
									<div className="select-role-container" id="select-role-container">
										<Button
											onClick={handleRoleClick}
											endIcon={<ExpandMoreIcon style={{ color: "#9c27b0" }} />}
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
													<AccountCircle style={{ color: "#7cb342" }} />
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
										helperText={validation?.password ? validation.password : null}
										style={{ width: "100%" }}
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
															<VisibilityOffIcon style={{ color: "#7cb342" }} />
														</IconButton>
													) : (
														<IconButton onClick={handleShowPassword}>
															<VisibilityIcon style={{ color: "#7cb342" }} />
														</IconButton>
													)}
												</InputAdornment>
											)
										}}
									/>
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
									<div className="login-button-container" id="login-button-container">
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
