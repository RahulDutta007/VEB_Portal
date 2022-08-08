/* eslint-disable arrow-parens */
import { StatusCodes } from "http-status-codes";
import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";
const { post, get, patch } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "auth";
const adminRoute = "auth/group-owner";

export const login = async (_payload) => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/login`;
		const response = await post(endpoint, _payload);

		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Authentication Successful!") {
				const {
					data: { message, result, token }
				} = response;
				return { message, result, token };
			} else {
				return { message };
			}
		}
		throw new Error();
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;
			return { message };
		}
	}
};

export const forgetPassword = async (_payload) => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/forget-password/get-token`;
		const response = await post(endpoint, _payload, headers);

		if (response) {
			const { data } = response;
			return data;
		}
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;

			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Login Unsuccessful!") {
				alert("Login Unsuccessful!");
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

export const changeForgetPassword = async (_payload, token) => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/forget-password/verify-token/${token}`;
		const response = await post(endpoint, _payload, headers);

		if (response) {
			const { data } = response;
			return data;
		}
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;

			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Login Unsuccessful!") {
				alert("Login Unsuccessful!");
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

export const changeForgetUserId = async (_payload) => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/forget-user-name`;
		const response = await post(endpoint, _payload, headers);

		if (response) {
			const { data } = response;
			return data;
		}
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;
			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Login Unsuccessful!") {
				alert("Login Unsuccessful!");
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

export const findEmail = async (email) => {
	try {
		const endpoint = `${initialRoute}/find-email?email=${email}`;
		const response = await get(endpoint, headers);

		if (response) {
			const { data } = response;
			return data;
		}
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;
			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Login Unsuccessful!") {
				alert("Login Unsuccessful!");
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

export const sendOTP = async (_payload) => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/send-otp`;
		const response = await patch(endpoint, _payload, _headers);

		if (response) {
			const { data } = response;
			return data;
		}
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;
			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Login Unsuccessful!") {
				alert("Login Unsuccessful!");
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

export const verifyOTP = async (_payload, email) => {
	try {
		const endpoint = `${initialRoute}/verify-otp/${email}`;
		const response = await post(endpoint, _payload, headers);

		if (response) {
			const { data } = response;
			return data;
		}
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;
			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Login Unsuccessful!") {
				alert("Login Unsuccessful!");
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

export const createAdmin = async (_payload) => {
	try {
		const endpoint = `${adminRoute}/enroller/signup`;
		const response = await post(endpoint, _payload, headers);

		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Data edited successfully") {
				const {
					data: { message, result }
				} = response;
				return { message, result };
			}
		}
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;
			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Login Unsuccessful!") {
				alert("Login Unsuccessful!");
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

export const createEnroller = async (_payload) => {
	try {
		const endpoint = `${adminRoute}/enroller/creation`;
		const token = localStorage.getItem("@jwt");
		const _headers = Object.assign({}, headers, {
			Authorization: `${Bearer} ${token}`
		});
		const response = await post(endpoint, _payload, _headers);

		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Data added successfully") {
				const {
					data: { message, result }
				} = response;
				return { message, result };
			}
		}
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;
			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "Login Unsuccessful!") {
				alert("Login Unsuccessful!");
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
