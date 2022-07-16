/* eslint-disable prettier/prettier */
import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";

const { Authorization, Bearer } = AUTHORIZATION;
const initialRoute = "notifications";
const { get, put } = request;

export const getNotificationsByUserId = async params => {
	const endpoint = initialRoute;
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
		if (message === MESSAGE.get.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
		if (message === "Not Enough Data to Fetch") {
			return false;
		}
	}
};

export const setAllNotificationsAsOldByUserId = async () => {
	const endpoint = initialRoute;
	const token = localStorage.getItem("@jwt");
	const response = await put(
		endpoint,
		{},
		{
			...headers,
			[Authorization]: `${Bearer} ${token}`
		}
	);
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

export const getNotificationCount = async () => {
	const endpoint = `${initialRoute}/count`;
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

export const notification = {
	getNotificationsByUserId,
	setAllNotificationsAsOldByUserId,
	getNotificationCount
};
