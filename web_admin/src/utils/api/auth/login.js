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
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;

			if (message === "Incorrect Type Provided!") {
				alert("Incorrect Type Provided!");
			} else if (message === MESSAGE.post.fail) {
				alert("Failed to Send Mail!");
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
		} else if (error.response.status === StatusCodes.NOT_FOUND) {
			const { message } = error.response.data;

			if (message === "No Member Found With given information") {
				alert("No Member Found With given information");
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
		const response = await post(endpoint, payload, headers);

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
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;

			if (message === "Unauthorised Role!") {
				alert("Unauthorised Role!");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === "New password cannot be same as old password!") {
				alert("New password cannot be same as old password!");
			} else if (message === "Timeout!") {
				alert("Timeout!");
			} else alert("Other Errors of Status Code 400");
		} else if (error.response.status === StatusCodes.UNAUTHORIZED) {
			const { message } = error.response.data;

			if (message === "New password cannot be same as old password!") {
				alert("New password cannot be same as old password!");
				// throw error;
			} else if (error.response.status === StatusCodes.NOT_FOUND) {
				const { message } = error.response.data;

				if (message === "No Member Found With given information") {
					alert("No Member Found With given information");
					// throw error;
				} else {
					throw error;
					//alert("Other Errors of Status Code 401");
				}
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
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;
			if (message === "Incorrect Type Provided") {
				alert("Incorrect Type Provided");
			} else if (message === MESSAGE.none) {
				alert("No Such Data!");
			} else if (message === MESSAGE.post.fail) {
				alert("Failed to Send User Id to Mail!");
			} else alert("Other Errors of Status Code 400");
		} else if (error.response.status === StatusCodes.NOT_FOUND) {
			const { message } = error.response.data;

			if (message === "No Member Found With given information") {
				alert("No Member Found With given information");
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

export const findUserName = async (userName) => {
	try {
		const endpoint = `${initialRoute}/find-user-name?user_name=${userName}`;
		const token = localStorage.getItem("@jwt");
		const _headers = Object.assign({}, headers, {
			authorization: `${Bearer} ${token}`
		});
		const response = await get(endpoint, _headers);

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
		const response = await patch(endpoint, _payload, headers);

		if (response) {
			const { data } = response;
			return data;
		}
	} catch (error) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			return "Error Occurred";
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

export const signUpAdmin = async (_payload) => {
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
			} else if (message === "AGENT is already registered!") {
				return { message };
			} else if (message) {
				return { message };
			} else {
				const message = "Please try with valid email and role";
				return { message };
			}
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
			authorization: `${Bearer} ${token}`
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
			return message;
		}
	}
};
