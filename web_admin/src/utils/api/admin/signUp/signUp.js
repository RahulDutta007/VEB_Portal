/* eslint-disable prettier/prettier */
import { request } from "../../api";
import { headers } from "../../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../constants/api/auth";
const { post, get } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "user";

// User Sign-up (ADMIN + EMPLOYER) --> This is integrated in signUp.jsx
export const userSignUp = async _payload => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/user-signup`;
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
			} else if (message === "User is already registered!") {
				alert("User is already registered!");
			} else if (message === "User has not been created yet!") {
				alert("User has not been created yet!");
			} else if (message === "Password error!") {
				alert("Password error!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data");
			} else if (message === "Failed to add activity!") {
				alert("Failed to add activity log!");
			} else if (message === "Unable to send email!") {
				alert("Unable to send email to user!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

export const signUp = {
	userSignUp
};
