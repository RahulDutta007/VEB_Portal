/* eslint-disable prettier/prettier */
import { request } from "../../api";
import { headers } from "../../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../constants/api/auth";
const { post, get } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "user";

// Create User --> This is Integrate in createUser.jsx
export const createdUser = async _payload => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/create-user`;
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

			if (message === "Role is required!") {
				alert("Role is required!");
			} else if (message === "Invalid creation!") {
				alert("Invalid creation!");
			} else if (message === "Unauthorized Role!") {
				alert("Unauthorized Role!");
			} else if (message === "An Admin can only create an Employer!") {
				alert("An Admin can only create an Employer!");
			} else if (message === "Please enter valid 9 digits SSN!") {
				alert("Please enter valid 9 digits SSN!");
			} else if (message === "Cannot add password while user creation!") {
				alert("Cannot add password while user creation!");
			} else if (message === "Invalid SSN!") {
				alert("Invalid SSN!");
			} else if (message === "User is already Created!") {
				alert("User is already Created!");
			} else if (message === "Failed to add activity") {
				alert("Failed to add activity!");
			} else if (message === "Unable to send email!") {
				alert("Unable to send email!");
			} else if (message === "Error occurred while creating user!") {
				alert("Error occurred while creating user!");
			} else if (message === "Email is required!") {
				alert("Email is required!");
			} else if (message === "Invalid Email!") {
				alert("Invalid Email!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

export const owner = {
	createdUser
};
