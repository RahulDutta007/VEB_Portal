/* eslint-disable prettier/prettier */
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../constants/api/auth";
import { request } from "../../api";

const { Authorization, Bearer } = AUTHORIZATION;
const { get } = request;

const initialRoute = "group/member";

export const getMembersByEmployeeNumber = async employee_number => {
	try {
		const endpoint = `${initialRoute}/get-members-by-employee-number/${employee_number}`;
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
		throw new Error();
	} catch (error) {
		if (error.response.status === 400) {
			const { message } = error.response.data;

			if (message === "Employee Number is required!") {
				alert("Employee Number is required!");
			} else if (message === "Employee doesnot exists!") {
				alert("Employee doesnot exists!");
			} else if (message === "Finding Members Error!") {
				alert("Finding Members Error!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

export const getMember = async () => {
	try {
		const endpoint = initialRoute;
		const token = localStorage.getItem("@jwt_member");
		const response = await get(endpoint, {
			...headers,
			Authorization: `${Bearer} ${token}`
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
		throw new Error();
	} catch (err) {
		throw err;
	}
};

export const getDependents = async () => {
	try {
		const endpoint = `${initialRoute}/dependents`;
		const token = localStorage.getItem("@jwt_member");
		const response = await get(endpoint, {
			...headers,
			Authorization: `${Bearer} ${token}`
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
		throw new Error();
	} catch (err) {
		throw err;
	}
};

export const groupMember = {
	getMembersByEmployeeNumber,
	getMember,
	getDependents
};
