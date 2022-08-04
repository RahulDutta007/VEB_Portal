/* eslint-disable prettier/prettier */
import { request } from "../../api";
import { headers } from "../../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../constants/api/auth";

const { post, get, put, del } = request;
const { Authorization, Bearer } = AUTHORIZATION;
const initialRoute = "admin/employee-page-design/preview";

export const addLogoSettings = async formData => {
	const endpoint = `${initialRoute}/logo-settings`;
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, formData, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
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
		if (message === MESSAGE.post.sameEntry) {
			return false;
		}
	}
};

export const editLogoSettings = async formData => {
	const endpoint = `${initialRoute}/logo-settings`;
	const token = localStorage.getItem("@jwt");
	const response = await put(endpoint, formData, {
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

export const getLogoSettings = async () => {
	const endpoint = `${initialRoute}/logo-settings`;
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

export const getLogoSettingsByGroupId = async group_id => {
	const endpoint = `${initialRoute}/logo-settings/group/${group_id}`;
	const token = localStorage.getItem("@jwt");
	const response = await get(endpoint, {
		...headers,
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

export const getLogoSettingsByUserId = async user_id => {
	const endpoint = `${initialRoute}/logo-settings/user/${user_id}`;
	const token = localStorage.getItem("@jwt");
	const response = await del(endpoint, {
		...headers,
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

export const deleteLogoSettingsByUserIdAndGroupId = async params => {
	const endpoint = `${initialRoute}/group-and-user`;
	const token = localStorage.getItem("@jwt");
	const response = await get(
		endpoint,
		{
			...headers,
			[Authorization]: `${Bearer} ${token}`
		},
		params
	);

	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.delete.succ) {
			return true;
		}
	}
};

export const deleteLogoSettingsByUserId = async params => {
	const endpoint = `${initialRoute}/logo-settings/user`;
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

export const logoSettingsPreview = {
	addLogoSettings,
	getLogoSettings,
	getLogoSettingsByGroupId,
	editLogoSettings,
	getLogoSettingsByUserId,
	deleteLogoSettingsByUserIdAndGroupId,
	deleteLogoSettingsByUserId
};
