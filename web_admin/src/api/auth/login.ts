/* eslint-disable arrow-parens */
import { request } from "../api";
import { headers } from "../../config/config";
import { MESSAGE } from "../../constants/api/message";
import { AUTHORIZATION } from "../../constants/api/auth";
import { Credential } from "../../@types/credential.types";
import { Endpoint } from "../../@types/api/api.types";
const { post, get } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "auth";

type LoginPayload = Credential;

/*
	Replace any with response type, which is
	group owner type here
*/
export const login = async (_payload: LoginPayload): Promise<any> => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint: Endpoint = `${initialRoute}/login`;
		/*
			Add response type here in next line
		*/
		const response = await post(endpoint, payload, headers);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Authentication Successful!") {
				const {
					data: { message, result, token }
				} = response;
				return { message, result, token };
			}
		}
		throw new Error();
	} catch (error: any) {
		if (error.response.status === 400) {
			const { message } = error.response.data;

			if (message === "User Name / Email is required") {
				alert("User Name / Email is required");
			} else if (message === "Password is required") {
				alert("Password is required");
			} else if (message === "Role is required") {
				alert("Role is required");
			} else if (message === "Unauthorized Role!") {
				alert("Unauthorized Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data");
			} else if (message === "Failed to add activity") {
				alert("Failed to add activity log");
			} else alert("Other Errors of Status Code 400");
		} else if (error.response.status === 401) {
			const { message } = error.response.data;

			if (message === "Authentication Failed!") {
				//alert("Authentication Failed!");
				throw error;
			} else {
				throw error;
				//alert("Other Errors of Status Code 401");
			}
		} else if (error.response.status === 500) {
			const { message } = error.response.data;

			if (message === "Internal Server Error!") {
				alert("Internal Server Error!");
			} else alert("Other Errors of Status Code 500");
		} else {
			throw error;
		}
	}
};

export const auth = {
	login
};
