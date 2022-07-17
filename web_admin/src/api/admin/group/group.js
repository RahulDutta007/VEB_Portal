import { request } from "../../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../constants/api/auth";

const { Authorization, Bearer } = AUTHORIZATION;
const { post, get, put, del } = request;

const initialRoute = "admin";

export const getGroups = async () => {
	try {
		const endpoint = `${initialRoute}/group`;
		const response = await get(endpoint);
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

			if (message === MESSAGE.post.sameEntry) {
				alert("Email is already Registered with another Employee!");
			}
		} else {
			throw error;
		}
	}
};

export const getAssignedGroups = async () => {
	try {
		const endpoint = `${initialRoute}/group/assigned-groups`;
		const token = localStorage.getItem("@jwt");
		const response = await get(endpoint, {
			[Authorization]: `${Bearer} ${token}`,
			...headers
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

export const group = {
	getGroups,
	getAssignedGroups
};
