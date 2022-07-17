/* eslint-disable prettier/prettier */
import { request } from "../../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
const { post, get, put, del } = request;

const initialRoute = "admin/employee-page-design";

export const getThemeColors = async () => {
	const endpoint = `${initialRoute}/theme-color`;
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

export const getThemeColorByGroupNumber = async group_number => {
	const endpoint = `${initialRoute}/theme-color/${group_number}`;
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

export const addThemeColor = async _payload => {
	const endpoint = `${initialRoute}/theme-color`;
	const payload = JSON.stringify(_payload);
	console.log("payload", payload);
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
};

export const editThemeColor = async _payload => {
	const endpoint = `${initialRoute}/theme-color`;
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
