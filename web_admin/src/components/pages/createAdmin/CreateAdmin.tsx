/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useEffect, useRef, Suspense, useCallback, useContext } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import {
	TextField,
	Checkbox,
	CheckboxProps,
	withStyles,
	Paper,
	Grid,
	Button,
	Select,
	MenuItem
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import "date-fns";
import { green } from "@material-ui/core/colors";
import { SnackbarProps } from "../../../@types/snackbarAPI.types";
import AuthContext from "../../../contexts/authContext/authContext";
import UIContext from "../../../contexts/UIContext/UIContext";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import validateEmail from "../../../utils/commonFunctions/validateEmail";
import { LazySnackbarAPI } from "../../shared/index";
import { api } from "../../../utils/api";
import initCapitalize from "../../../utils/commonFunctions/initCapitalize";
import STATES from "../../../constants/states";
import ROLES from "../../../constants/roles";
import { ADMIN_DASHBOARD_HEADER } from "../../../constants/caption/dashboardHeader";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EventIcon from "@material-ui/icons/Event";
import { DynamicForm, DynamicFormField } from "../../../@types/dynamicForm.types";
import { Validation } from "../../../@types/validation.types";

import "./createAdmin.css";

const mailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
const specialCharacters = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		"&$checked": {
			color: green[600]
		}
	},
	checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CreateAdmin = () => {
	const [userForm, setUserForm] = useState<DynamicForm>();
	const [emailExists, setEmailExists] = useState(false);
	const [userNameExists, setUserNameExists] = useState(false);
	const [checkInvalidEmail, setCheckInvalidEmail] = useState(false);
	const [pasted, setPasted] = useState(false);
	const [hasCreateClick, setHasCreateClick] = useState(false);
	const [assignedGroups, setAssignedGroups] = useState<any[]>([]);
	const [selectedGroup, setSelectedGroup] = useState({});
	const { setDashboardHeader } = useContext(UIContext);
	const { user } = useContext(AuthContext); // Extracting logged in user from central storage.
	const [createdUser, setCreatedUsers] = useState({
		user_name: "", // This Id is mapped with Group HR (Group Specific)
		admin_id: null,
		first_name: "",
		middle_name: "",
		last_name: "",
		role: "",
		SSN: "",
		date_of_birth: "",
		hire_date: "",
		gender: "",
		marital_status: "",
		email: "",
		address_line_1: null,
		address_line_2: null,
		city: "",
		state: "",
		country: "USA - United States of America",
		ZIP: "",
		contact_label: null,
		phone_number: null,
		phone_extension: null,
		group_number: null
	});
	const [validation, setValidation] = useState<Validation>({
		createdUser: {},
		status: "invalid"
	});
	const _validation = useRef<Validation>();
	const navigate = useNavigate();
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

	const findUserEmail = useDebouncedCallback(async (value: string) => {
		if (value !== "") {
			const data = await api.auth.findEmail(value);
			if (data.emailExist) {
				setEmailExists(true);
				setCheckInvalidEmail(false);
			} else {
				setEmailExists(false);
				setCheckInvalidEmail(false);
			}
		} else {
			setEmailExists(false);
		}
	}, 500);

	const findUserName = useDebouncedCallback(async (value: string) => {
		if (value !== "") {
			const data = await api.auth.findUserName(value);
			if (data.isNameExist) {
				setUserNameExists(true);
			} else {
				setUserNameExists(false);
			}
		} else {
			setUserNameExists(false);
		}
	}, 500);

	const handleValidation = useCallback(() => {
		const {
			user_name, // This Id is mapped with Group HR (Group Specific)
			admin_id,
			first_name,
			last_name,
			role,
			SSN,
			date_of_birth,
			hire_date,
			email
		} = createdUser;
		_validation.current = {
			...validation,
			createdUser: {},
			status: "invalid"
		};
		let flag = true;

		if (user_name.length === 0) {
			_validation.current.createdUser["user_name"] = "User Name is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}

		if (userNameExists) {
			_validation.current.createdUser["user_name"] = "User Name is Exist";
			_validation.current["status"] = "invalid";
			flag = false;
		}

		if (emailExists) {
			_validation.current.createdUser["email"] = "Email is Exist";
			_validation.current["status"] = "invalid";
			flag = false;
		}

		if (first_name.length === 0) {
			_validation.current.createdUser["first_name"] = "First Name is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (last_name.length === 0) {
			_validation.current.createdUser["last_name"] = "Last Name is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}

		if (SSN !== null) {
			if (SSN !== "") {
				const _SSN = SSN.replaceAll("-", "");
				if (String(_SSN).length !== 9) {
					_validation.current.createdUser["SSN"] = "Enter correct 9 digit SSN";
					_validation.current["status"] = "invalid";
					flag = false;
				}
			}
		}
		// if (String(date_of_birth).length === 0) {
		// 	_validation.current.createdUser["date_of_birth"] = "Date of birth is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (String(hire_date).length === 0) {
		// 	_validation.current.createdUser["hire_date"] = "Hire Date is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		if (String(date_of_birth).length > 0 && String(hire_date).length > 0 && String(hire_date).length !== 0) {
			const hireDate = new Date(hire_date).getFullYear();
			const DOB = new Date(date_of_birth).getFullYear();
			const hireDateTime = new Date(hire_date).getTime();
			const DOBtime = new Date(date_of_birth).getTime();
			const age = hireDate - DOB;

			if (age <= 14) {
				_validation.current.createdUser["hire_date"] = "Age should be 14 years or above!";
				_validation.current["status"] = "invalid";
				flag = false;
			}

			if (hireDateTime < DOBtime) {
				_validation.current.createdUser["hire_date"] = "Hire date cannot be less than Date of Birth!";
				_validation.current["status"] = "invalid";
				flag = false;
			}
		}
		if (role.length === 0) {
			_validation.current.createdUser["role"] = "Role is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (email.length === 0) {
			_validation.current.createdUser["email"] = "Email is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		if (email.length !== 0) {
			if (!email.match(mailformat)) {
				_validation.current.createdUser["email"] = "Valid Email is required";
				_validation.current["status"] = "invalid";
				flag = false;
			}
			setCheckInvalidEmail(false);
			if (!validateEmail(email)) {
				setCheckInvalidEmail(true);
			}
		}

		if (flag === true) _validation.current["status"] = "valid";
		else {
			_validation.current["status"] = "invalid";
			alert("Please, fill all required fields!");
		}
		setValidation(Object.assign({}, _validation.current));
		return _validation.current["status"];
	}, [createdUser, emailExists, userNameExists, validation]);

	const handleKeyCheck = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>) => {
			const { name } = event.target as HTMLInputElement;
			let { value } = event.target as HTMLInputElement;
			const keyID = event.keyCode;

			if (name === "ZIP") {
				if (keyID === 8 || keyID === 46) {
					if (/[-]/.test(value) && value.length === 7) {
						const index = value.indexOf("-");
						value = value.substr(0, index + 1);
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					}
				}
			}
			if (name === "SSN") {
				if (keyID === 8 || keyID === 46) {
					if (/[-]/.test(value) && value.length === 4) {
						const index = value.indexOf("-");
						value = value.substr(0, index);
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					}
					if (/[-]/.test(value) && value.length === 7) {
						const index = value.lastIndexOf("-");
						value = value.substr(0, index);
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					}
				}
			}
		},
		[createdUser]
	);

	const handlePaste = (event: React.ClipboardEvent<HTMLInputElement | HTMLDivElement>) => {
		const { name } = event.target as HTMLInputElement;
		if (name === "SSN" || name === "ZIP") {
			setPasted(true);
			setTimeout(() => null, 2000);
		}
	};

	const handleUserChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			let { value } = event.target;
			const { name } = event.target;
			if (name === "first_name") {
				const regex = /^[a-zA-Z]+$/;
				if (value.match(regex) || value === "") {
					value = value.slice(0, 1).toUpperCase() + value.slice(1);
					setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
				} else if (/\s/g.test(value)) {
					setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
				}
			} else if (name === "user_name") {
				setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
				await findUserName(value);
			} else if (name === "email") {
				setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
				if (validateEmail(value)) {
					await findUserEmail(value);
				} else {
					setCheckInvalidEmail(true);
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

						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					} else {
						event.target.value = "";
						event.target.value = createdUser.SSN;
					}
				} else {
					// console.log("Pasted");
					setPasted(false);
					if (!isNaN(value as any)) {
						if (value.length > 9) {
							event.target.value = "";
							event.target.value = createdUser.SSN;
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

							setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
						}
					} else {
						// console.log("Inside alpha-numeric");
						let ssnValue = value.replace(/[^0-9]/g, "").replace(/[^\w\s]/gi, "");
						//console.log("replaced string", ssnValue);
						alert("You have pasted alpha-numeric SSN!");

						if (ssnValue.length > 9) {
							event.target.value = "";
							event.target.value = createdUser.SSN;
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

							setCreatedUsers(Object.assign({}, createdUser, { [name]: ssnValue }));
						}
					}
				}
			} else if (name === "ZIP") {
				if (!pasted) {
					const _value = Number(value.replaceAll("-", ""));
					if (!isNaN(_value) && value.length <= 10) {
						const zip = value;
						if (zip.length === 6) {
							value = value.substr(0, 5) + "-" + value.substr(5);
						}

						console.log("ZIP Event", event.target.value);
						setCreatedUsers(
							Object.assign({}, createdUser, {
								[name]: value
							})
						);
					} else {
						event.target.value = "";
						event.target.value = createdUser.ZIP;
					}
				} else {
					setPasted(false);
					if (!isNaN(value as any)) {
						if (value.length > 9) {
							event.target.value = "";
							event.target.value = createdUser.ZIP;
							alert("Please enter a valid 5 or 9 digit ZIP!");
						} else {
							// console.log("Inside Number");
							const zip = value;

							if (zip.length >= 6 && zip.length <= 9) {
								value = value.substr(0, 5) + "-" + value.substr(5);
							}

							setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
						}
					} else {
						// console.log("Inside alpha-numeric");
						let zipValue = value.replace(/[^0-9]/g, "").replace(/[^\w\s]/gi, "");
						//console.log("replaced string", zipValue);
						alert("You have pasted alpha-numeric ZIP!");

						if (zipValue.length > 9) {
							event.target.value = "";
							event.target.value = createdUser.ZIP;
							alert("Please enter a valid 5 or 9 digit ZIP!");
						} else {
							const zip = zipValue;

							if (zip.length >= 6 && zip.length <= 9) {
								zipValue = zipValue.substr(0, 5) + "-" + zipValue.substr(5);
							}

							setCreatedUsers(Object.assign({}, createdUser, { [name]: zipValue }));
						}
					}
				}
			} else if (name === "phone_number") {
				if (!isNaN(value as any)) {
					if (value.length <= 10) {
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					} else {
						event.target.value = createdUser?.phone_number
							? (createdUser?.phone_number as unknown as string)
							: "";
						alert("Phone Number cannot be greater 10 digit!");
					}
				} else {
					event.target.value = "";
					event.target.value = createdUser?.phone_number
						? (createdUser?.phone_number as unknown as string)
						: "";
				}
			} else if (name === "phone_extension") {
				if (!isNaN(value as any)) {
					if (value.length <= 3) {
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					} else {
						event.target.value = createdUser?.phone_extension
							? (createdUser?.phone_extension as unknown as string)
							: "";
						alert("Phone Extension cannot be greater 3 digit!");
					}
				} else {
					event.target.value = "";
					event.target.value = createdUser?.phone_extension
						? (createdUser?.phone_extension as unknown as string)
						: "";
				}
			} else {
				setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
			}
		},
		[createdUser, findUserEmail, findUserName, pasted]
	);

	const handleUserDateChange = useCallback(
		(_date: MaterialUiPickersDate, name: string) => {
			const date = new Date(_date as any);
			const parsedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

			setCreatedUsers(Object.assign({}, createdUser, { [name]: parsedDate }));
		},
		[createdUser]
	);

	const handleEnableCheckbox = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, checked } = event.target;
			setCreatedUsers(Object.assign({}, createdUser, { [name]: checked }));
		},
		[createdUser]
	);

	const handleGroupChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;

			setCreatedUsers(
				Object.assign({}, createdUser, {
					group_number: value
				})
			);

			// Storing and Checking of Particular group for all locations of that group.
			assignedGroups.forEach((group: any) => {
				if (group.group_number === value) {
					setSelectedGroup(Object.assign({}, group));
				}
			});
		},
		[assignedGroups, createdUser]
	);

	const createUser = useCallback(
		async (event: React.MouseEvent<HTMLButtonElement>) => {
			try {
				event.preventDefault();
				const validation = handleValidation();
				if (validation === "valid") {
					const { date_of_birth, hire_date } = createdUser;
					const DOB = date_of_birth ? new Date(date_of_birth) : null;
					const hireDate = hire_date ? new Date(hire_date) : null;

					const payload = {
						createdUser: {
							...createdUser,
							group_number: "220",
							role: createdUser.role.toUpperCase(),
							date_of_birth:
								DOB !== null
									? DOB.getFullYear() + "-" + (DOB.getMonth() + 1) + "-" + DOB.getDate()
									: DOB,
							hire_date:
								hireDate !== null
									? hireDate.getFullYear() +
									  "-" +
									  (hireDate.getMonth() + 1) +
									  "-" +
									  hireDate.getDate()
									: hireDate,
							SSN: createdUser.SSN ? createdUser?.SSN?.replaceAll("-", "").toString() : null,
							ZIP:
								createdUser.ZIP && createdUser.ZIP.length > 0
									? createdUser.ZIP.replaceAll("-", "")
									: null,
							state: createdUser.state && createdUser.state.length > 0 ? createdUser.state : null,
							city: createdUser.city && createdUser.city.length > 0 ? createdUser.city : null,
							gender: createdUser.gender !== "" ? createdUser.gender.toUpperCase() : null,
							marital_status:
								createdUser.marital_status !== "" ? createdUser.marital_status.toUpperCase() : null
						}
					};

					console.log("Payload", payload);
					const response = await api.auth.createEnroller(payload.createdUser);

					if (response?.message === "Data added successfully") {
						console.log("Response", response);
						setSnackbarAPICallProps(
							Object.assign({}, snackbarAPICallProps, {
								open: true,
								message: "Member Created Successfully!",
								severity: "success"
							})
						);
						setHasCreateClick(false);
						_validation.current = {
							createdUser: {},
							status: "invalid"
						};
						setCreatedUsers({
							user_name: "", // This Id is mapped with Group HR (Group Specific)
							admin_id: null,
							first_name: "",
							middle_name: "",
							last_name: "",
							role: createdUser.role,
							SSN: "",
							date_of_birth: "",
							hire_date: "",
							gender: "",
							marital_status: "",
							email: "",
							address_line_1: null,
							address_line_2: null,
							city: "",
							state: "",
							country: "USA - United States of America",
							ZIP: "",
							contact_label: null,
							phone_number: null,
							phone_extension: null,
							group_number: null
						});
						setUserNameExists(false);
						setEmailExists(false);
						navigate("/");
						// setTimeout(() => {
						// 	history.push("/");
						// }, 2000);
					} else {
						setSnackbarAPICallProps(
							Object.assign({}, snackbarAPICallProps, {
								open: true,
								message: "Member Creation Failed!",
								severity: "error"
							})
						);
					}
				} else {
					setSnackbarAPICallProps(
						Object.assign({}, snackbarAPICallProps, {
							open: true,
							message: "Invalid!",
							severity: "error"
						})
					);
				}
			} catch (error) {
				setHasCreateClick(false);
				alert("User creation unsuccessful!");
			}
		},
		[createdUser, handleValidation, navigate, snackbarAPICallProps]
	);

	useEffect(() => {
		setUserForm(
			Object.assign(
				{},
				{
					"Role Information": [
						{
							label: "Role",
							name: "role",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Select role",
							value: createdUser.role,
							type: "select",
							options:
								user?.role === ROLES.admin
									? [initCapitalize(ROLES.enroller_admin), initCapitalize(ROLES.agent)]
									: user?.role === ROLES.enroller_admin
									? [initCapitalize(ROLES.agent)]
									: []
						}
					],
					"User Information": [
						{
							label: "User Name",
							name: "user_name",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter user Name",
							value: createdUser.user_name,
							type: "textfield"
						},
						{
							label: "Admin Id",
							name: "admin_id",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter Admin Id",
							value: createdUser.admin_id,
							type: "textfield"
						},
						{
							label: "First Name",
							name: "first_name",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter first name",
							value: createdUser.first_name,
							type: "textfield"
						},
						{
							label: "Middle Name",
							name: "middle_name",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter middle name",
							value: createdUser.middle_name,
							type: "textfield"
						},
						{
							label: "Last Name",
							name: "last_name",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter last name",
							value: createdUser.last_name,
							type: "textfield"
						},
						{
							label: "Email",
							name: "email",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter email",
							value: createdUser.email,
							type: "textfield"
						},
						{
							label: "SSN",
							name: "SSN",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter SSN",
							value: createdUser.SSN,
							type: "textfield"
						},
						{
							label: "Date of Birth",
							name: "date_of_birth",
							onChange: (date: MaterialUiPickersDate, name: string) => handleUserDateChange(date, name),
							placeholder: "Enter date of birth",
							value: createdUser.date_of_birth,
							type: "date"
						},
						{
							label: "Hire Date",
							name: "hire_date",
							onChange: (date: MaterialUiPickersDate, name: string) => handleUserDateChange(date, name),
							placeholder: "Enter hire date",
							value: createdUser.hire_date,
							type: "date"
						},
						{
							label: "Gender",
							name: "gender",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter gender",
							value: createdUser.gender,
							type: "select",
							options: ["Male", "Female", "Others"]
						},
						{
							label: "Marital Status",
							name: "marital_status",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter marital status",
							value: createdUser.marital_status,
							type: "select",
							options: ["Single", "Married", "Divorced", "Common Law Marriage"]
						}
					],
					"Contact Details": [
						{
							label: "Contact Label",
							name: "contact_label",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter contact label",
							value: createdUser.contact_label,
							type: "select",
							options: ["Business", "Home", "Other"]
						},
						{
							label: "Phone Number",
							name: "phone_number",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter phone number",
							value: createdUser.phone_number,
							type: "textfield"
						},
						{
							label: "Phone Extension",
							name: "phone_extension",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter phone extension",
							value: createdUser.phone_extension,
							type: "textfield"
						}
					],
					"User Address": [
						{
							label: "Address Line 1",
							name: "address_line_1",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter address line 1",
							value: createdUser.address_line_1,
							type: "textfield"
						},
						{
							label: "Address Line 2",
							name: "address_line_2",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter address line 2",
							value: createdUser.address_line_2,
							type: "textfield"
						},
						{
							label: "City",
							name: "city",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter city",
							value: createdUser.city,
							type: "textfield"
						},
						{
							label: "State",
							name: "state",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter state",
							value: createdUser.state,
							type: "select",
							options: [...STATES]
						},
						{
							label: "Country",
							name: "country",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter country",
							value: "USA - United States of America",
							type: "textfield"
						},
						{
							label: "ZIP Code",
							name: "ZIP",
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleUserChange(event),
							placeholder: "Enter ZIP",
							value: createdUser.ZIP,
							type: "textfield"
						}
					]
				}
			)
		);
	}, [
		assignedGroups,
		createdUser,
		handleEnableCheckbox,
		handleGroupChange,
		handleUserChange,
		handleUserDateChange,
		user?.role
	]);

	useEffect(() => {
		setDashboardHeader(ADMIN_DASHBOARD_HEADER.create_user);
	}, [setDashboardHeader]);

	return (
		<div className="create-createdUser" id="create-createdUser">
			<Suspense fallback={<div />}>
				<LazySnackbarAPI snackbarProps={snackbarAPICallProps} />
			</Suspense>
			<div className="pf-action-button-container" id="pf-action-button-container">
				<Button
					className="button-green"
					onClick={createUser}
					variant="contained"
					disabled={hasCreateClick}
					style={{
						cursor: hasCreateClick ? "not-allowed" : "pointer",
						pointerEvents: "unset"
					}}
				>
					<span className="button-label-with-icon">Create User</span>
					<span>
						<PersonAddIcon className="button-icon" />
					</span>
				</Button>
			</div>
			<Grid container spacing={1} className="pf-grid-container">
				{userForm &&
					Object.entries(userForm).map(([key, value], index) => {
						return (
							<div key={index}>
								<div
									className="pf-title"
									style={{
										display:
											createdUser.role === initCapitalize(ROLES.admin)
												? key === "Group Information"
													? "none"
													: ""
												: ""
									}}
								>
									{key}
								</div>
								<Suspense fallback={<div />}>
									<Paper
										className="pf-paper-container"
										elevation={3}
										variant="outlined"
										style={{
											display:
												createdUser.role === initCapitalize(ROLES.admin)
													? key === "Group Information"
														? "none"
														: ""
													: ""
										}}
									>
										{value.map((field: DynamicFormField, index: number) => {
											return (
												<Grid key={index} item xl={12} lg={12} md={12} sm={12} xs={12}>
													<Grid
														container
														spacing={1}
														className="pf-label"
														style={{
															display:
																createdUser.role === initCapitalize(ROLES.admin)
																	? field.name === "is_employer_support"
																		? "none"
																		: ""
																	: ""
														}}
													>
														<Grid
															item
															xs={
																field.name === "is_employer_support" ||
																field.name === "is_member_support"
																	? undefined
																	: 12
															}
															sm={
																field.name === "is_employer_support" ||
																field.name === "is_member_support"
																	? undefined
																	: 12
															}
															md={
																field.name === "is_employer_support" ||
																field.name === "is_member_support"
																	? undefined
																	: 3
															}
															lg={
																field.name === "is_employer_support" ||
																field.name === "is_member_support"
																	? undefined
																	: 3
															}
															xl={
																field.name === "is_employer_support" ||
																field.name === "is_member_support"
																	? undefined
																	: 3
															}
														>
															<div
																className={
																	field.name === "first_name" ||
																	field.name === "user_name" ||
																	field.name === "last_name" ||
																	field.name === "email" ||
																	field.name === "group_number" ||
																	field.name === "role"
																		? // field.name === "address_line_2" ||
																		  // field.name === "is_employer_support" ||
																		  // field.name === "is_member_support"
																		  "pf-label-text required"
																		: "pf-label-text"
																}
																id="pf-label-text"
															>
																{field.name === "is_employer_support" ||
																field.name === "is_member_support"
																	? ""
																	: field.label}
															</div>
														</Grid>
														<Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
															{field.type === "textfield" ? (
																<TextField
																	className="text-field-input text-field-input-create-enroller pointer-event-unset create-admin-input-width"
																	id="text-field-input"
																	name={field.name}
																	placeholder={field.placeholder}
																	value={field.value}
																	onChange={field.onChange}
																	//onBlur={field.onBlur}
																	onKeyDown={(
																		event: React.KeyboardEvent<HTMLDivElement>
																	) => handleKeyCheck(event)}
																	onPaste={(
																		event: React.ClipboardEvent<HTMLDivElement>
																	) => handlePaste(event)}
																	variant="outlined"
																	InputProps={{
																		readOnly:
																			field.value ===
																			"USA - United States of America"
																				? true
																				: false
																	}}
																	helperText={
																		field.name === "email"
																			? field.value.length === 0 &&
																			  _validation.current !== undefined
																				? `${field.label} is required`
																				: !checkInvalidEmail && emailExists
																				? "Email exists!"
																				: checkInvalidEmail
																				? "Please enter a valid email address!"
																				: ""
																			: field.name === "user_name" &&
																			  userNameExists
																			? "User Name exists!"
																			: _validation?.current?.status ===
																					"invalid" &&
																			  Object.keys(
																					_validation?.current?.createdUser
																			  ).indexOf(field.name) > -1
																			? `${field.label} is required`
																			: ""
																	}
																/>
															) : field.type === "select" ? (
																<>
																	<Select
																		id="text-align-options"
																		className="pointer-event-unset select-input-style create-user-input-select"
																		name={field.name}
																		onChange={field.onChange}
																		MenuProps={{
																			style: { zIndex: 35960 }
																		}}
																		inputProps={{ "aria-label": "Without label" }}
																	>
																		<MenuItem value="" disabled>
																			Select Value
																		</MenuItem>
																		{field?.options?.map((option: any) => (
																			<MenuItem
																				key={option}
																				value={
																					field.name === "group_number"
																						? option?.group_number!
																						: option
																				}
																			>
																				{field.name === "group_number"
																					? option?.physical_name!
																					: option}
																			</MenuItem>
																		))}
																	</Select>
																	{validation &&
																	validation.createdUser[field.name] ? (
																		<div className="details">
																			<span className="select-validation-text2">
																				{validation.createdUser[field.name]}
																			</span>
																		</div>
																	) : null}
																</>
															) : field.type === "date" ? (
																<MuiPickersUtilsProvider utils={DateFnsUtils}>
																	<KeyboardDatePicker
																		className="date-input pointer-event-unset create-admin-input-width create-user-input-date"
																		id="date-input"
																		inputVariant="outlined"
																		label={field.label}
																		placeholder={field.placeholder}
																		name={field.name}
																		format="MM/dd/yyyy"
																		error={false}
																		value={field.value}
																		onChange={(date: MaterialUiPickersDate) =>
																			field.onChange(date, field.name)
																		}
																		InputProps={{
																			readOnly: true
																		}}
																		InputLabelProps={{
																			shrink: true
																		}}
																		keyboardIcon={
																			<EventIcon className="theme-color-green" />
																		}
																		KeyboardButtonProps={{
																			"aria-label": "change date"
																		}}
																		helperText={validation.createdUser[field.name]}
																	/>
																</MuiPickersUtilsProvider>
															) : field.type === "checkbox" ? (
																<>
																	<div className="check-support" id="check-support">
																		<span>
																			<GreenCheckbox
																				onChange={field.onChange}
																				name={field.name}
																				checked={field.value}
																			/>
																		</span>
																		<span
																			className="pf-label-text"
																			id="pf-label-text"
																		>
																			{field.label}
																		</span>
																	</div>
																</>
															) : null}
														</Grid>
													</Grid>
												</Grid>
											);
										})}
									</Paper>
								</Suspense>
							</div>
						);
					})}
			</Grid>
			<div className="pf-action-button-container margin-top-action-button" id="pf-action-button-container">
				<Button
					className="button-green"
					onClick={createUser}
					variant="contained"
					disabled={hasCreateClick}
					disableElevation={hasCreateClick}
					style={{
						cursor: hasCreateClick ? "not-allowed" : "pointer",
						pointerEvents: "unset"
					}}
				>
					<span className="button-label-with-icon">Create User</span>
					<span>
						<PersonAddIcon className="button-icon" />
					</span>
				</Button>
			</div>
		</div>
	);
};

export default CreateAdmin;
