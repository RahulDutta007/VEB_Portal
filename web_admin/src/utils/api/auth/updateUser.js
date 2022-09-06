/* eslint-disable prettier/prettier */
import { StatusCodes } from "http-status-codes";
import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";

const { post, get, patch } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "auth";

// eslint-disable-next-line arrow-parens
export const editGroupOwner = async (_payload) => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/edit-group-owner`;
		const token = localStorage.getItem("@jwt");
		const response = await patch(endpoint, payload, {
			...headers,
			[Authorization]: `${Bearer} ${token}`
		});
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Profile Updation Successful!") {
				const {
					data: { result }
				} = response;
				return result;
			}
		}
		throw new Error();
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;

			if (message === "Invalid User Name!") {
				alert("Invalid User Name!");
			} else if (message === "Username is already registered!") {
				alert("Username is already registered!");
			} else if (message === "SSN is already registered!") {
				alert("SSN is already registered!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Profile updation unsuccessful!") {
				alert("Profile updation unsuccessful!");
			} else alert("Other Errors of Status Code 400");
		} else if (error.response.status === StatusCodes.UNAUTHORIZED) {
			const { message } = error.response.data;

			if (message === "Authentication Failed!") {
				alert("Authentication Failed!");
				// throw error;
			} else {
				throw error;
				//alert("Other Errors of Status Code 401");
			}
		} else {
			throw error;
		}
	}
};

// eslint-disable-next-line arrow-parens
export const changePassword = async (_payload) => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/change-password`;
		const token = localStorage.getItem("@jwt");
		const response = await patch(endpoint, payload, {
			...headers,
			[Authorization]: `${Bearer} ${token}`
		});
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Password has been changed successfully!") {
				const {
					data: { result }
				} = response;
				return result;
			}
		}
		throw new Error();
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;

			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.get.empty) {
				alert("Database empty");
			} else if (message === "New password cannot be same as old password!") {
				alert("New password cannot be same as old password!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Password updation unsuccessful!") {
				alert("Password updation unsuccessful!");
			} else alert("Other Errors of Status Code 400");
		} else if (error.response.status === StatusCodes.UNAUTHORIZED) {
			const { message } = error.response.data;

			if (message === "Authentication Failed!") {
				alert("Authentication Failed!");
				// throw error;
			} else {
				throw error;
				//alert("Other Errors of Status Code 401");
			}
		} else {
			throw error;
		}
	}
};
