/* eslint-disable prettier/prettier */
import { request } from "../../../api";
import { headers } from "../../../../config/config";
import { MESSAGE } from "../../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../../constants/api/auth";

const { post, get } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "group/member";

// Create Dependent --> This is Integrate in addDependent.jsx
export const createDependent = async _payload => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/dependent`;
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

			if (message === "Employee has not yet created!") {
				alert("Employee has not yet created!");
			} else if (message === "SSN is required!") {
				alert("SSN is required!");
			} else if (message === "date_of_birth is required!") {
				alert("date_of_birth is required!");
			} else if (message === "Email is required!") {
				alert("Email is required!");
			} else if (message === "Invalid Email!") {
				alert("Invalid Email!");
			} else if (message === "Please enter valid 9 digits SSN!") {
				alert("Please enter valid 9 digits SSN!");
			} else if (message === "User Cannot add password while dependent creation!") {
				alert("User Cannot add password while dependent creation!");
			} else if (message === "Unauthorized Role!") {
				alert("Unauthorized Role!");
			} else if (message === "Invalid SSN!") {
				alert("Invalid SSN!");
			} else if (message === "Dependent is already Created!") {
				alert("Dependent is already Created!");
			} else if (message === "Email is already assigned!") {
				alert("Email is already assigned!");
			} else if (message === "Cannot add more than 7 dependents!") {
				alert("Cannot add more than 7 dependents!");
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

// Dependent Sign-up --> This is integrated in dependentSignUp.jsx
export const dependentSignUp = async _payload => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/dependent-signup`;
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
			} else if (message === "Invalid Email!") {
				alert("Invalid Email!");
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
			} else if (message === "Dependent is already registered!") {
				alert("Dependent is already registered!");
			} else if (message === "Dependent has not been created yet!") {
				alert("Dependent has not been created yet!");
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

export const groupMemberDependent = {
	createDependent,
	dependentSignUp
};
