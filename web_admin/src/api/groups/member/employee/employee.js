/* eslint-disable prettier/prettier */
import { request } from "../../../api";
import { headers } from "../../../../config/config";
import { MESSAGE } from "../../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../../constants/api/auth";
const { post, get } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "group/member";

// Create Employee --> This is Integrate in createMember.jsx
export const createEmployee = async _payload => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/employee`;
		const token = localStorage.getItem("@jwt");
		const response = await post(endpoint, payload, {
			...headers,
			[Authorization]: `${Bearer} ${token}`
		});
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === MESSAGE.post.succ) {
				const {
					data: { result }
				} = response;
				return result;
			}
		}
		throw new Error();
	} catch (error) {
		if (error.response.status === 400) {
			const { message } = error.response.data;

			if (message === "Invalid Employee details") {
				alert("Please fill employee details correctly!");
			} else if (message === "Invalid Paycheck details") {
				alert("Please fill paycheck details correctly!");
			} else if (message === "SSN is required!") {
				alert("SSN is required!");
			} else if (message === "date_of_birth is required!") {
				alert("date_of_birth is required!");
			} else if (message === "group_number is required!") {
				alert("group_number is required!");
			} else if (message === "location_name is required!") {
				alert("location_name is required!");
			} else if (message === "employee_number is required!") {
				alert("employee_number is required!");
			} else if (message === "Please enter valid 9 digits SSN!") {
				alert("Please enter valid 9 digits SSN!");
			} else if (message === "User Cannot add password while employee creation!") {
				alert("User Cannot add password while employee creation!");
			} else if (message === "Unauthorized Role!") {
				alert("Unauthorized Role!");
			} else if (message === "Duplicate Employee Number!") {
				alert("Duplicate Employee Number!");
			} else if (message === "Invalid SSN!") {
				alert("Invalid SSN!");
			} else if (message === "Employee is already Created!") {
				alert("Employee is already Created!");
			} else if (message === MESSAGE.post.sameEntry) {
				alert("Email is already Registered with another Employee!");
			} else if (message === "Failed to add activity") {
				alert("Failed to add activity log");
			} else if (message === "Unable to send email!") {
				alert("Unable to send email to employee!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

// Employee Sign-up --> This is integrated in signUp.jsx
export const employeeSignUp = async _payload => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/employee-signup`;
		const response = await post(endpoint, payload, headers);
		if (response) {
			const {
				data: { message }
			} = response;

			if (message === MESSAGE.put.succ) {
				const {
					data: { result }
				} = response;
				return result;
			}
		}
		throw new Error();
	} catch (error) {
		if (error.response.status === 400) {
			const { message } = error.response.data;

			if (message === "SSN is required!") {
				alert("SSN is required!");
			} else if (message === "date_of_birth is required!") {
				alert("date_of_birth is required!");
			} else if (message === "Role is required!") {
				alert("Role is required!");
			} else if (message === "Email is required!") {
				alert("Email is required!");
			} else if (message === "User Name is required!") {
				alert("User Name is required!");
			} else if (message === "Password is required!") {
				alert("Password is required!");
			} else if (message === "Please enter valid 9 digits SSN!") {
				alert("Please enter valid 9 digits SSN!");
			} else if (message === "Unauthorized Role!") {
				alert("Unauthorized Role!");
			} else if (message === "Email is already registered with different user!") {
				alert("Email is already registered with different user!");
			} else if (message === "Username is already registered with different user!") {
				alert("Username is already registered with different user!");
			} else if (message === "Employee is already registered!") {
				alert("Employee is already registered!");
			} else if (message === "Employee has not been created yet") {
				alert("Employee has not been created yet");
			} else if (message === "Password error!") {
				alert("Password error!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data");
			} else if (message === "Failed to add activity") {
				alert("Failed to add activity log");
			} else if (message === "Unable to send email!") {
				alert("Unable to send email to employee!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

//Paginated All Employee
export const paginatedAllEmployee = async params => {
	const endpoint = `${initialRoute}/all-employees`;
	const token = localStorage.getItem("@jwt");
	const response = await get(
		endpoint,
		{
			...headers,
			[Authorization]: `${Bearer} ${token}`
		},
		params
	);
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.get.succ || message === MESSAGE.get.empty) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

// Count All Employees
export const countAllEmployees = async () => {
	const endpoint = `${initialRoute}/count-employees`;
	const token = localStorage.getItem("@jwt");
	const response = await get(endpoint, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});

	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.get.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const groupMemberEmployee = {
	createEmployee,
	employeeSignUp,
	paginatedAllEmployee,
	countAllEmployees
};
