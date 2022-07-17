/* eslint-disable prettier/prettier */
import { request } from "../../../api";
import { headers } from "../../../../../config/config";
import { MESSAGE } from "../../../../../constants/api/message";
import { AUTHORIZATION } from "../../../../../constants/api/auth";

const { post, get } = request;
const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "bulk-upload-mapping";

// Get Client Sheet Mapping with group_number
export const getClientSheetMapping = async group_number => {
	try {
		const endpoint = `${initialRoute}/${group_number}`;
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
			if (message === MESSAGE.get.fail) {
				const {
					data: { result }
				} = response;
				return result;
			}
		}
		throw new Error();
	} catch (error) {
		if (error.response.status === 400) {
			alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

export const addClientSheetMapping = async _payload => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = initialRoute;
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
		throw new Error();
	} catch (error) {
		if (error.response.status === 400) {
			const { message } = error.response.data;

			if (message === "Group not found!") {
				alert("Group not found!");
			} else alert("Other Errors of Status Code 400");
		} else {
			throw error;
		}
	}
};

export const bulkUploadMapping = {
	getClientSheetMapping,
	addClientSheetMapping
};
