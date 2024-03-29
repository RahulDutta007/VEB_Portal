/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
import { useState, useEffect, useRef, Suspense, useCallback, useContext } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useHistory } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { TextField, Checkbox, withStyles, Paper, Grid, Button, Select, MenuItem } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import "date-fns";
import { green } from "@material-ui/core/colors";
import validateEmail from "../../../../../../utils/commonFunctions/validateEmail";

import { SnackbarAPICall } from "../../../../../shared";
import DashboardContext from "../../../../../../contexts/dashboardContext/dashboardContext";
import { api } from "../../../../../../utils/api";
import initCapitalize from "../../../../../../utils/commonFunctions/initCapitalize";
import STATES from "../../../../../../constants/states";
import ROLES from "../../../../../../constants/roles";

import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EventIcon from "@material-ui/icons/Event";

import "../../../../../../globalStyles/paperFormStyles.css";
import { AuthContext } from "../../../../../../contexts";
import { ADMIN_DASHBOARD_HEADER } from "../../../../../../constants/caption/dashboardHeader";

const mailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
var specialCharacters = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		"&$checked": {
			color: green[600]
		}
	},
	checked: {}
})(props => <Checkbox color="default" {...props} />);

const CreateGroupOwner = () => {
	const [userForm, setUserForm] = useState({});
	const [emailExists, setEmailExists] = useState(false);
	const [checkInvalidEmail, setCheckInvalidEmail] = useState(false);
	const [pasted, setPasted] = useState(false);
	const [hasCreateClick, setHasCreateClick] = useState(false);
	const [assignedGroups, setAssignedGroups] = useState([]);
	const [selectedGroup, setSelectedGroup] = useState({});
	const { user } = useContext(AuthContext); // Extracting logged in user from central storage.
	const [createdUser, setCreatedUsers] = useState({
		user_id: "", // This Id is mapped with Group HR (Group Specific)
		first_name: "",
		middle_name: "",
		last_name: "",
		role: "",
		SSN: null,
		date_of_birth: "",
		hire_date: "",
		gender: "",
		marital_status: null,
		email: "",
		address_line_1: "",
		address_line_2: "",
		city: "",
		state: "",
		country: "USA - United States of America",
		ZIP: "",
		contact_label: null,
		mobile: null,
		phone_extension: null,
		is_member_support: false,
		is_employer_support: false,
		group_number: null
	});
	const [validation, setValidation] = useState({
		createdUser: {}
	});
	let _validation = useRef();
	let history = useHistory();
	const [snackbarAPICallProps, setSnackbarAPICallProps] = useState({
		open: false,
		severity: "",
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
	const { setDashboardHeader } = useContext(DashboardContext);

	const getAssignGroups = useCallback(async () => {
		const params = {
			user_id: user._id
		};
		const response = await api.assignGroupsAndLocation.getGroupAndLocationAssignment(params);

		if (response) {
			let _assignedGroups = [];
			response.groupsAndLocations.forEach(group => {
				if (group.assigned_group_info) {
					_assignedGroups.push(group);
				}
			});

			setAssignedGroups(Object.assign([], _assignedGroups));
		}
	}, [user._id]);

	const findUserEmail = useDebouncedCallback(async value => {
		if (value !== "") {
			const email = await api.find.findUserEmail(value);
			if (email === false) {
				setEmailExists(false);
			} else {
				setEmailExists(true);
			}
		} else {
			setEmailExists(false);
		}
	}, 500);

	const handleValidation = useCallback(async () => {
		const {
			user_id, // This Id is mapped with Group HR (Group Specific)
			first_name,
			last_name,
			role,
			SSN,
			date_of_birth,
			hire_date,
			gender,
			marital_status,
			email,
			address_line_1,
			city,
			state,
			ZIP,
			contact_label,
			mobile,
			phone_extension
		} = createdUser;
		_validation.current = {
			...validation,
			createdUser: {}
		};
		let flag = true;

		// createdUser validation checking
		// if (user_id.length === 0 || user_id === undefined) {
		// 	_validation.current.createdUser["user_id"] = "User Id is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
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
		// if (SSN === null || SSN === "") {
		// 	_validation.current.createdUser["SSN"] = "SSN is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (SSN !== null) {
		// 	var _SSN = SSN.replaceAll("-", "");
		// 	if (String(_SSN).length !== 9) {
		// 		_validation.current.createdUser["SSN"] = "Enter correct 9 digit SSN";
		// 		_validation.current["status"] = "invalid";
		// 		flag = false;
		// 	}
		// }
		// if (SSN !== null) {
		// 	if (SSN !== "") {
		// 		var _SSN = SSN.replaceAll("-", "");
		// 		if (String(_SSN).length !== 9) {
		// 			_validation.current.createdUser["SSN"] = "Enter correct 9 digit SSN";
		// 			_validation.current["status"] = "invalid";
		// 			flag = false;
		// 		}
		// 	}
		// }
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
		// if (String(hire_date).length !== 0) {
		// 	let hireDate = new Date(hire_date).getFullYear();
		// 	let DOB = new Date(date_of_birth).getFullYear();
		// 	let hireDateTime = new Date(hire_date).getTime();
		// 	let DOBtime = new Date(date_of_birth).getTime();
		// 	let age = hireDate - DOB;

		// 	if (age <= 14) {
		// 		_validation.current.createdUser["hire_date"] = "Age should be 14 years or above!";
		// 		_validation.current["status"] = "invalid";
		// 		flag = false;
		// 	}

		// 	if (hireDateTime < DOBtime) {
		// 		_validation.current.createdUser["hire_date"] = "Hire date cannot be less than Date of Birth!";
		// 		_validation.current["status"] = "invalid";
		// 		flag = false;
		// 	}
		// }
		if (role.length === 0) {
			_validation.current.createdUser["role"] = "Role is required";
			_validation.current["status"] = "invalid";
			flag = false;
		}
		// if (gender.length === 0) {
		// 	_validation.current.createdUser["gender"] = "Gender is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (marital_status.length === 0) {
		// 	_validation.current.createdUser["marital_status"] = "Marital Status is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (contact_label.length === 0) {
		// 	_validation.current.createdUser["contact_label"] = "Contact Label is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
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
		// if (mobile === null) {
		// 	_validation.current.createdUser["mobile"] = "Phone number is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (mobile !== null) {
		// 	if (String(mobile).length !== 10) {
		// 		_validation.current.createdUser["mobile"] = "Enter valid 10 digit phone number";
		// 		_validation.current["status"] = "invalid";
		// 		flag = false;
		// 	}
		// }
		// if (phone_extension === null) {
		// 	_validation.current.createdUser["phone_extension"] = "Phone extension is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (phone_extension !== null) {
		// 	if (String(phone_extension).length !== 3) {
		// 		_validation.current.createdUser["phone_extension"] = "Enter Valid 3 digit Phone extension";
		// 		_validation.current["status"] = "invalid";
		// 		flag = false;
		// 	}
		// }
		// if (address_line_1.length === 0) {
		// 	_validation.current.createdUser["address_line_1"] = "Address line 1 is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (city.length === 0) {
		// 	_validation.current.createdUser["city"] = "City is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (state.length === 0) {
		// 	_validation.current.createdUser["state"] = "State is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (ZIP.length === 0) {
		// 	_validation.current.createdUser["ZIP"] = "ZIP Code is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (ZIP.length === 0) {
		// 	_validation.current.createdUser["ZIP"] = "ZIP Code is required";
		// 	_validation.current["status"] = "invalid";
		// 	flag = false;
		// }
		// if (ZIP.length !== 0) {
		// 	var _zip = ZIP.replaceAll("-", "");
		// 	if (_zip.length === 5) {
		// 		_validation.current["status"] = "valid";
		// 		flag = true;
		// 	} else if (_zip.length === 9) {
		// 		_validation.current["status"] = "valid";
		// 		flag = true;
		// 	} else {
		// 		_validation.current.createdUser["ZIP"] = "Enter 5 or 9 digit ZIP Code!";
		// 		_validation.current["status"] = "invalid";
		// 		flag = false;
		// 	}
		// }

		if (flag === true) _validation.current["status"] = "valid";
		else {
			_validation.current["status"] = "invalid";
			alert("Please, fill all required fields!");
		}
		setValidation(Object.assign({}, _validation.current));
		return _validation.current["status"];
	}, [createdUser, validation]);

	const handleKeyCheck = useCallback(
		event => {
			var { name, value } = event.target;
			var keyID = event.keyCode;

			if (name === "ZIP") {
				if (keyID === 8 || keyID === 46) {
					if (/[-]/.test(value) && value.length === 7) {
						var index = value.indexOf("-");
						value = value.substr(0, index + 1);
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					}
				}
			}
			if (name === "SSN") {
				if (keyID === 8 || keyID === 46) {
					if (/[-]/.test(value) && value.length === 4) {
						var index = value.indexOf("-");
						value = value.substr(0, index);
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					}
					if (/[-]/.test(value) && value.length === 7) {
						var index = value.lastIndexOf("-");
						value = value.substr(0, index);
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					}
				}
			}
		},
		[createdUser]
	);

	const handlePaste = event => {
		let { name } = event.target;
		if (name === "SSN" || name === "ZIP") {
			setPasted(true);
			setTimeout(2000);
		}
	};

	const handleUserChange = useCallback(
		event => {
			let { name, value } = event.target;

			if (name === "first_name") {
				var regex = /^[a-zA-Z]+$/;
				if (value.match(regex) || value === "") {
					value = value.slice(0, 1).toUpperCase() + value.slice(1);
					setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
				} else if (/\s/g.test(value)) {
					setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
				}
			} else if (name === "email") {
				findUserEmail(value);
				setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
			} else if (name === "SSN") {
				if (!pasted) {
					// console.log("Not Pasted");
					var _value = Number(value.replaceAll("-", ""));
					if (!isNaN(_value)) {
						let ssn = value;
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
						event.target.value = null;
						event.target.value = createdUser.SSN;
					}
				} else {
					// console.log("Pasted");
					setPasted(false);
					if (!isNaN(value)) {
						if (value.length > 9) {
							event.target.value = null;
							event.target.value = createdUser.SSN;
							alert("Please enter a valid 9 digit SSN!");
						} else {
							// console.log("Inside Number");
							let ssn = value;

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
						var ssnValue = value.replace(/[^0-9]/g, "").replace(/[^\w\s]/gi, "");
						//console.log("replaced string", ssnValue);
						alert("You have pasted alpha-numeric SSN!");

						if (ssnValue.length > 9) {
							event.target.value = null;
							event.target.value = createdUser.SSN;
							alert("Please enter a valid SSN!");
						} else {
							let ssn = ssnValue;

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
					var _value = Number(value.replaceAll("-", ""));
					if (!isNaN(_value) && value.length <= 10) {
						let zip = value;
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
						event.target.value = null;
						event.target.value = createdUser.ZIP;
					}
				} else {
					setPasted(false);
					if (!isNaN(value)) {
						if (value.length > 9) {
							event.target.value = null;
							event.target.value = createdUser.ZIP;
							alert("Please enter a valid 5 or 9 digit ZIP!");
						} else {
							// console.log("Inside Number");
							let zip = value;

							if (zip.length >= 6 && zip.length <= 9) {
								value = value.substr(0, 5) + "-" + value.substr(5);
							}

							setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
						}
					} else {
						// console.log("Inside alpha-numeric");
						var zipValue = value.replace(/[^0-9]/g, "").replace(/[^\w\s]/gi, "");
						//console.log("replaced string", zipValue);
						alert("You have pasted alpha-numeric ZIP!");

						if (zipValue.length > 9) {
							event.target.value = null;
							event.target.value = createdUser.ZIP;
							alert("Please enter a valid 5 or 9 digit ZIP!");
						} else {
							let zip = zipValue;

							if (zip.length >= 6 && zip.length <= 9) {
								zipValue = zipValue.substr(0, 5) + "-" + zipValue.substr(5);
							}

							setCreatedUsers(Object.assign({}, createdUser, { [name]: zipValue }));
						}
					}
				}
			} else if (name === "mobile") {
				if (!isNaN(value)) {
					if (value.length <= 10) {
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					} else {
						event.target.value = createdUser.mobile;
						alert("Phone Number cannot be greater 10 digit!");
					}
				} else {
					event.target.value = null;
					event.target.value = createdUser.mobile;
				}
			} else if (name === "phone_extension") {
				if (!isNaN(value)) {
					if (value.length <= 3) {
						setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
					} else {
						event.target.value = createdUser.phone_extension;
						alert("Phone Extension cannot be greater 3 digit!");
					}
				} else {
					event.target.value = null;
					event.target.value = createdUser.phone_extension;
				}
			} else {
				setCreatedUsers(Object.assign({}, createdUser, { [name]: value }));
			}
		},
		[createdUser, findUserEmail, pasted]
	);

	const handleUserDateChange = useCallback(
		(_date, name) => {
			const date = new Date(_date);
			const parsedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

			setCreatedUsers(Object.assign({}, createdUser, { [name]: parsedDate }));
		},
		[createdUser]
	);

	const handleEnableCheckbox = useCallback(
		event => {
			let { name, checked } = event.target;
			setCreatedUsers(Object.assign({}, createdUser, { [name]: checked }));
		},
		[createdUser]
	);

	const handleGroupChange = useCallback(
		event => {
			let { value } = event.target;

			setCreatedUsers(
				Object.assign({}, createdUser, {
					group_number: value
				})
			);

			// Storing and Checking of Particular group for all locations of that group.
			assignedGroups.forEach(group => {
				if (group.group_number === value) {
					setSelectedGroup(Object.assign({}, group));
				}
			});
		},
		[assignedGroups, createdUser]
	);

	const createUser = useCallback(
		async event => {
			try {
				event.preventDefault();
				let validation = await handleValidation();
				if (validation === "valid") {
					const { date_of_birth, hire_date } = createdUser;
					const DOB = date_of_birth ? new Date(date_of_birth) : null;
					const hireDate = hire_date ? new Date(hire_date) : null;

					const payload = {
						createdUser: {
							...createdUser,
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
							SSN: createdUser.SSN ? Number(createdUser.SSN.replaceAll("-", "")) : null,
							ZIP: createdUser.ZIP ? createdUser.ZIP.replaceAll("-", "") : null
						}
					};

					console.log("Payload", payload);
					const response = await trackPromise(api.owner.createdUser(payload));

					if (response) {
						setHasCreateClick(true);
						console.log("Response", response);
						setCreatedUsers(Object.assign({}, response));
						alert("User Created Successfully!");
						// setSnackbarAPICallProps(
						// 	Object.assign({}, snackbarAPICallProps, {
						// 		open: true,
						// 		message: "Member Created Successfully!",
						// 		severity: "success"
						// 	})
						// );

						history.push("/");
						// setTimeout(() => {
						// 	history.push("/");
						// }, 2000);
					}
				} else {
					setHasCreateClick(false);
				}
			} catch (error) {
				setHasCreateClick(false);
				alert("User creation unsuccessful!");
				throw error;
			}
		},
		[createdUser, handleValidation, history]
	);

	useEffect(() => {
		setDashboardHeader(ADMIN_DASHBOARD_HEADER.create_user);
		getAssignGroups();
	}, [getAssignGroups, setDashboardHeader]);

	useEffect(() => {
		setUserForm(
			Object.assign(
				{},
				{
					"Role Information": [
						{
							label: "Role",
							name: "role",
							onChange: event => handleUserChange(event),
							placeholder: "Select role",
							value: createdUser.role,
							type: "select",
							options:
								user.role === ROLES.super_admin
									? [initCapitalize(ROLES.admin), initCapitalize(ROLES.employer)]
									: [initCapitalize(ROLES.employer)]
						}
					],
					"Group Information": [
						{
							schema: "employee",
							label: "Group",
							name: "group_number",
							onChange: event => handleGroupChange(event),
							placeholder: "Select group",
							value: createdUser.group_number,
							type: "select",
							options: [...assignedGroups]
						}
					],
					"User Information": [
						{
							label: "User ID",
							name: "user_id",
							onChange: event => handleUserChange(event),
							placeholder: "Enter user Id",
							value: createdUser.user_id,
							type: "textfield"
						},
						{
							label: "First Name",
							name: "first_name",
							onChange: event => handleUserChange(event),
							placeholder: "Enter first name",
							value: createdUser.first_name,
							type: "textfield"
						},
						{
							label: "Middle Name",
							name: "middle_name",
							onChange: event => handleUserChange(event),
							placeholder: "Enter middle name",
							value: createdUser.middle_name,
							type: "textfield"
						},
						{
							label: "Last Name",
							name: "last_name",
							onChange: event => handleUserChange(event),
							placeholder: "Enter last name",
							value: createdUser.last_name,
							type: "textfield"
						},
						{
							label: "Email",
							name: "email",
							onChange: event => handleUserChange(event),
							placeholder: "Enter email",
							value: createdUser.email,
							type: "textfield"
						},
						{
							label: "SSN",
							name: "SSN",
							onChange: event => handleUserChange(event),
							placeholder: "Enter SSN",
							value: createdUser.SSN,
							type: "textfield"
						},
						{
							label: "Date of Birth",
							name: "date_of_birth",
							onChange: (date, name) => handleUserDateChange(date, name),
							placeholder: "Enter date of birth",
							value: createdUser.date_of_birth,
							type: "date"
						},
						{
							label: "Hire Date",
							name: "hire_date",
							onChange: (date, name) => handleUserDateChange(date, name),
							placeholder: "Enter hire date",
							value: createdUser.hire_date,
							type: "date"
						},
						{
							label: "Gender",
							name: "gender",
							onChange: event => handleUserChange(event),
							placeholder: "Enter gender",
							value: createdUser.gender,
							type: "select",
							options: ["Male", "Female", "Others"]
						},
						{
							label: "Marital Status",
							name: "marital_status",
							onChange: event => handleUserChange(event),
							placeholder: "Enter marital status",
							value: createdUser.marital_status,
							type: "select",
							options: ["Single", "Married", "Divorced", "Common Law Marriage"]
						},
						{
							label: "Member Support",
							name: "is_member_support",
							onChange: event => handleEnableCheckbox(event),
							value: createdUser.is_member_support,
							type: "checkbox"
						},
						{
							label: "Employer Support",
							name: "is_employer_support",
							onChange: event => handleEnableCheckbox(event),
							value: createdUser.is_employer_support,
							type: "checkbox"
						}
					],
					"Contact Details": [
						{
							label: "Contact Label",
							name: "contact_label",
							onChange: event => handleUserChange(event),
							placeholder: "Enter contact label",
							value: createdUser.contact_label,
							type: "select",
							options: ["Business", "Home", "Other"]
						},
						{
							label: "Phone Number",
							name: "mobile",
							onChange: event => handleUserChange(event),
							placeholder: "Enter phone number",
							value: createdUser.mobile,
							type: "textfield"
						},
						{
							label: "Phone Extension",
							name: "phone_extension",
							onChange: event => handleUserChange(event),
							placeholder: "Enter phone extension",
							value: createdUser.phone_extension,
							type: "textfield"
						}
					],
					"User Address": [
						{
							label: "Address Line 1",
							name: "address_line_1",
							onChange: event => handleUserChange(event),
							placeholder: "Enter address line 1",
							value: createdUser.address_line_1,
							type: "textfield"
						},
						{
							label: "Address Line 2",
							name: "address_line_2",
							onChange: event => handleUserChange(event),
							placeholder: "Enter address line 2",
							value: createdUser.address_line_2,
							type: "textfield"
						},
						{
							label: "City",
							name: "city",
							onChange: event => handleUserChange(event),
							placeholder: "Enter city",
							value: createdUser.city,
							type: "textfield"
						},
						{
							label: "State",
							name: "state",
							onChange: event => handleUserChange(event),
							placeholder: "Enter state",
							value: createdUser.state,
							type: "select",
							options: [...STATES]
						},
						{
							label: "Country",
							name: "country",
							onChange: event => handleUserChange(event),
							placeholder: "Enter country",
							value: "USA - United States of America",
							type: "textfield"
						},
						{
							label: "ZIP Code",
							name: "ZIP",
							onChange: event => handleUserChange(event),
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
		user.role
	]);

	console.log("createdUser", createdUser);
	// console.log("Pasted", pasted);

	return (
		<div className="create-createdUser" id="create-createdUser">
			<Suspense fallback={<div />}>
				<SnackbarAPICall snackbarProps={snackbarAPICallProps} />
			</Suspense>
			<div className="pf-action-button-container" id="pf-action-button-container">
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
			<Grid container spacing={1} className="pf-grid-container">
				{Object.entries(userForm).map(([key, value], index) => {
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
									{value.map((field, index) => {
										return (
											<Grid key={index} item xl={12} lg={12} md={12} sm={12} xs={12}>
												<Grid
													container
													spacing={1}
													className="pf-label"
													style={{
														display:
															createdUser.role === initCapitalize(ROLES.employer)
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
																? ""
																: 12
														}
														sm={
															field.name === "is_employer_support" ||
																field.name === "is_member_support"
																? ""
																: 12
														}
														md={
															field.name === "is_employer_support" ||
																field.name === "is_member_support"
																? ""
																: 3
														}
														lg={
															field.name === "is_employer_support" ||
																field.name === "is_member_support"
																? ""
																: 3
														}
														xl={
															field.name === "is_employer_support" ||
																field.name === "is_member_support"
																? ""
																: 3
														}
													>
														<div
															className={
																field.name === "first_name" ||
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
																className="text-field-input"
																id="text-field-input"
																name={field.name}
																placeholder={field.placeholder}
																value={field.value}
																onChange={field.onChange}
																//onBlur={field.onBlur}
																onKeyDown={event => handleKeyCheck(event)}
																onPaste={event => handlePaste(event)}
																variant="outlined"
																InputProps={{
																	readOnly:
																		field.value === "USA - United States of America"
																			? true
																			: false
																}}
																helperText={
																	emailExists && field.name === "email"
																		? "Email exists!"
																		: checkInvalidEmail && field.name === "email"
																			? "Please enter a valid email address!"
																			: validation.createdUser[field.name]
																}
																//style={{ width: "70%", borderRadius: 50 }}
																//disabled={!isButtonSelected}
																//disableElevation={!isButtonSelected}
																style={{
																	//cursor: !isButtonSelected?"not-allowed": "pointer",
																	pointerEvents: "unset",
																	width: "340px",
																	borderRadius: 50
																}}
															/>
														) : field.type === "select" ? (
															<>
																<Select
																	id="text-align-options"
																	name={field.name}
																	onChange={field.onChange}
																	//disabled={!isButtonSelected}
																	//disableElevation={!isButtonSelected}
																	style={{
																		//cursor: !isButtonSelected ? "not-allowed" : "pointer",
																		pointerEvents: "unset",
																		minWidth: 180,
																		textAlign: "left",
																		// zIndex: 10000,
																		overflowY: "visible"
																	}}
																	MenuProps={{
																		style: { zIndex: 35960 }
																	}}
																	inputProps={{ "aria-label": "Without label" }}
																>
																	<MenuItem value="" disabled>
																		Select Value
																	</MenuItem>
																	{field.options.map(option => (
																		<MenuItem
																			key={option}
																			value={
																				field.name === "group_number"
																					? option.group_number
																					: option
																			}
																		>
																			{field.name === "group_number"
																				? option.physical_name
																				: option}
																		</MenuItem>
																	))}
																</Select>
																{validation && validation.createdUser[field.name] ? (
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
																	className="date-input"
																	id="date-input"
																	inputVariant="outlined"
																	label={field.label}
																	placeholder={field.placeholder}
																	name={field.name}
																	format="MM/dd/yyyy"
																	error={""}
																	value={field.value}
																	onChange={date => field.onChange(date, field.name)}
																	InputProps={{
																		readOnly: true
																	}}
																	InputLabelProps={{
																		shrink: true
																	}}
																	//style={{ width: "340px", borderRadius: 50 }}
																	keyboardIcon={
																		<EventIcon style={{ color: "#7cb342" }} />
																	}
																	KeyboardButtonProps={{
																		"aria-label": "change date"
																	}}
																	// disabled={!isButtonSelected}
																	// disableElevation={!isButtonSelected}
																	style={{
																		// cursor: !isButtonSelected ? "not-allowed" : "pointer",
																		pointerEvents: "unset",
																		width: "340px",
																		borderRadius: 50
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
																	<span className="pf-label-text" id="pf-label-text">
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

export default CreateGroupOwner;
