/* eslint-disable prettier/prettier */
import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";
const { post, get, put, del } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "user";

export const toggleMemberSupport = async (_payload, _id) => {
	const endpoint = `${initialRoute}/toggle-member-support/${_id}`;
	const payload = _payload;
	const token = localStorage.getItem("@jwt");
	const response = await put(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.get.empty || message === MESSAGE.put.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const toggleEmployerSupport = async (_payload, _id) => {
	const endpoint = `${initialRoute}/toggle-employer-support/${_id}`;
	const payload = _payload;
	const token = localStorage.getItem("@jwt");
	const response = await put(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.get.empty || message === MESSAGE.put.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const getUserById = async _id => {
	const endpoint = `${initialRoute}/${_id}`;
	const response = await get(endpoint);
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.get.succ || message === MESSAGE.get.empty) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const editUser = async _payload => {
	const endpoint = initialRoute;
	const payload = JSON.stringify(_payload);
	const response = await put(endpoint, payload, headers);
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
};

export const findUserName = async user_name => {
	const endpoint = `${initialRoute}/find-user-name/${user_name}`;
	const response = await get(endpoint);
	if (response) {
		console.log("response.data", response.data);
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
};

export const findEmail = async user_name => {
	const endpoint = `${initialRoute}/find-email/${user_name}`;
	const response = await get(endpoint);
	if (response) {
		console.log("response.data", response.data);
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
};

export const getUser = async () => {
	const endpoint = initialRoute;
	let token;
	if (localStorage.getItem("@jwt")) {
		token = localStorage.getItem("@jwt");
	} else {
		token = localStorage.getItem("@jwt_member");
	}
	const response = await get(endpoint, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const { status } = response;
		if (status === 200) {
			const {
				data: { data }
			} = response;
			return data;
		}
	}
};

export const getUserCount = async () => {
	const endpoint = `${initialRoute}/count/all-users`;
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
};
