/* eslint-disable prettier/prettier */
import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";
import { StatusCodes } from "http-status-codes";
const { post, get, put, del } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "users";

// eslint-disable-next-line prettier/prettier, arrow-parens
export const getGroupOwnerByAuth = async () => {
	try {
		const endpoint = `${initialRoute}/group-owner`;
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
	} catch (error: any) {
		if (error.response.status === StatusCodes.BAD_REQUEST) {
			const { message } = error.response.data;

			if (message === MESSAGE.get.empty) {
				alert("Database Empty");
			} else if (message === MESSAGE.post.fail) {
				alert("Failed to get members!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

export const getGroupOwnerCount = async (): Promise<number> => {
	try {
		const endpoint = `${initialRoute}/group-owners/count`;
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
			throw new Error();
		}
		throw new Error();
	} catch (err) {
		alert(err);
		throw err;
	}
};

export const getGroupOwnerById = async (id: string) => {
	try {
		const endpoint = `${initialRoute}/group-owner/${id}`;
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
			throw new Error();
		}
		throw new Error();
	} catch (err) {
		alert(err);
		throw err;
	}
};

export const getMemberCount = async (): Promise<number> => {
	try {
		const endpoint = `${initialRoute}/members/count`;
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
			throw new Error();
		}
		throw new Error();
	} catch (err) {
		alert(err);
		throw err;
	}
};

export const groupOwner = {
	getGroupOwnerByAuth,
	getGroupOwnerCount,
	getGroupOwnerById,
	getMemberCount
};
