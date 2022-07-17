/* eslint-disable prettier/prettier */
import { request } from "../../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
const { post, get, put, del } = request;

const initialRoute = "admin/employee-page-design";

export const addLogoSettings = async formData => {
	const endpoint = `${initialRoute}/logo-settings`;
	const response = await post(endpoint, formData);
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.post.succ) {
			const {
				data: { result }
			} = response;
			console.log("response.data", response.data);
			return result;
		}
	}
};

export const editLogoSettings = async formData => {
	const endpoint = `${initialRoute}/logo-settings`;
	const response = await put(endpoint, formData);
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
};

export const getLogoSettingsByGroupNumber = async group_number => {
	const endpoint = `${initialRoute}/logo-settings/${group_number}`;
	const response = await get(endpoint);
	console.log("response", response);
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
