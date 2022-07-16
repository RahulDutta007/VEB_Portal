/* eslint-disable prettier/prettier */
import { request } from "../../api";
import { headers } from "../../../../config/config";
import { MESSAGE } from "../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../constants/api/auth";
const { post, get } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "super-admin/assign-group";

export const getGroupAndLocationAssignment = async params => {
	try {
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
		}
		throw new Error();
	} catch (error) {
		throw error;
	}
};

export const assignGroups = async _payload => {
	const endpoint = `${initialRoute}/group`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.post.succ || message === MESSAGE.delete.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const assignLocations = async _payload => {
	const endpoint = `${initialRoute}/location`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { message }
		} = response;
		if (message === MESSAGE.post.succ || message === MESSAGE.delete.succ) {
			const {
				data: { result }
			} = response;
			return result;
		}
	}
};

export const assignAllGroups = async _payload => {
	const endpoint = `${initialRoute}/all-groups`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
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
	}
};

export const assignAllLocations = async _payload => {
	const endpoint = `${initialRoute}/all-locations`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
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
	}
};

export const _assignGroupsAndLocation = {
	getGroupAndLocationAssignment,
	assignGroups,
	assignLocations,
	assignAllGroups,
	assignAllLocations
};
