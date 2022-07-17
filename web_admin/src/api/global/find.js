/* eslint-disable prettier/prettier */
import { request } from "../api";
import { headers } from "../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";
const { post, get, put, del } = request;
const { Authorization, Bearer } = AUTHORIZATION;

//http://localhost:4000/api/v1/find-email/?email=email@email.com&role=EMPLOYEE
export const findEmail = async params => {
	try {
		const endpoint = "find-email";
		const response = await get(endpoint, {}, params);

		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Email doesnot exists!") {
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

			if (message === "Email is required") {
				alert("Email is required");
			} else if (message === "Email already exists!") {
				alert("Email already exists!");
			} else if (message === "Unauthorized Role!") {
				alert("Unauthorized Role!");
			} else if (message === "Finding email error!") {
				alert("Finding email error!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

//http://localhost:4000/api/v1/find-member-email/:email
export const findMemberEmail = async email => {
	try {
		const endpoint = `find-member-email/${email}`;
		const response = await get(endpoint);

		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Email doesnot exists!") {
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

			if (message === "Email is required") {
				alert("Email is required");
			} else if (message === "Email already exists!") {
				alert("Email already exists!");
			} else if (message === "Finding email error!") {
				alert("Finding email error!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

//http://localhost:4000/api/v1/find-user-email/:email
export const findUserEmail = async email => {
	try {
		const endpoint = `find-user-email/${email}`;
		const response = await get(endpoint);

		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "Email doesnot exists!") {
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

			if (message === "Email is required") {
				alert("Email is required");
			} else if (message === "Email already exists!") {
				alert("Email already exists!");
			} else if (message === "Finding email error!") {
				alert("Finding email error!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

//http://localhost:4000/api/v1/find-username/:user_name
export const findUserName = async user_name => {
	try {
		const endpoint = `find-username/${user_name}`;
		const response = await get(endpoint);

		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "User Name doesnot exists!") {
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

			if (message === "User Name is required") {
				alert("User Name is required");
			} else if (message === "User Name already exists!") {
				alert("User Name already exists!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

//http://localhost:4000/api/v1/find-SSN/:SSN --> Not used right now
export const findSSN = async SSN => {
	try {
		const endpoint = `find-SSN/${SSN}`;
		const response = await get(endpoint);

		if (response) {
			const {
				data: { message }
			} = response;
			if (message === "SSN doesnot exists!") {
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

			if (message === "SSN is required") {
				alert("SSN is required");
			} else if (message === "SSN already exists!") {
				alert("SSN already exists!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

export const find = {
	findEmail,
	findMemberEmail,
	findUserEmail,
	findSSN,
	findUserName
};
