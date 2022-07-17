/* eslint-disable prettier/prettier */
import { request } from "../../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../constants/api/auth";

const { post, get, put, del } = request;
const { Bearer, Authorization } = AUTHORIZATION;

const initialRoute = "admin/employee-page-design/preview";

export const getThemeColors = async () => {
	const endpoint = `${initialRoute}/theme-color`;
	const token = localStorage.getItem("@jwt");
	const response = await get(endpoint, {
		headers,
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

export const getThemeColorByGroupId = async group_id => {
	const endpoint = `${initialRoute}/theme-color/group/${group_id}`;
	const token = localStorage.getItem("@jwt");
	const response = await get(endpoint, {
		headers,
		[Authorization]: `${Bearer} ${token}`
	});
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

export const getThemeColorByUserId = async user_id => {
	const endpoint = `${initialRoute}/theme-color/user/${user_id}`;
	const token = localStorage.getItem("@jwt");
	const response = await get(endpoint, {
		headers,
		[Authorization]: `${Bearer} ${token}`
	});
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

export const addThemeColor = async _payload => {
	const endpoint = `${initialRoute}/theme-color`;
	console.log(`${initialRoute}/theme-color`, `${initialRoute}/theme-color`);
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		console.log("response.data", response.data);
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.post.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
		if (message === MESSAGE.post.sameEntry) {
			return false;
		}
	}
};

export const editThemeColor = async _payload => {
	const endpoint = `${initialRoute}/theme-color`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await put(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
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

export const deleteLogoSettingsByUserId = async params => {
	const endpoint = `${initialRoute}/theme-color/user`;
	const token = localStorage.getItem("@jwt");
	const response = await del(endpoint, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});

	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.delete.succ) {
			return true;
		}
		if (message === MESSAGE.none) {
			return false;
		}
	}
};

export const employeePageDesignPreview = {
	addThemeColor,
	editThemeColor,
	getThemeColorByGroupId,
	getThemeColorByUserId,
	getThemeColors,
	deleteLogoSettingsByUserId
};
