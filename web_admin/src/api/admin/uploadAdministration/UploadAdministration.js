/* eslint-disable prettier/prettier */
import { request } from "../../api";
import { headers } from "../../../config/config";
import { AUTHORIZATION } from "../../../../constants/api/auth";
const { post, get, put, del } = request;
const { Authorization, Bearer } = AUTHORIZATION;

export const addUploadAdministration = async _payload => {
	const endpoint = "super-admin/upload-administration";
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await post(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { data }
		} = response;
		return data;
	}
};

export const editUploadAdministration = async (_payload, _id) => {
	const endpoint = `super-admin/upload-administration/${_id}`;
	const payload = JSON.stringify(_payload);
	const token = localStorage.getItem("@jwt");
	const response = await put(endpoint, payload, {
		...headers,
		[Authorization]: `${Bearer} ${token}`
	});
	if (response) {
		const {
			data: { data }
		} = response;
		return data;
	}
};

export const getUploadAdministration = async () => {
	const endpoint = "super-admin/upload-administration";
	const response = await get(endpoint);
	if (response) {
		const {
			data: { data }
		} = response;
		return data[0];
	}
};

export const deleteStatementOfUnderstanding = async () => {
	const endpoint = "super-admin/upload-administration/statement-of-understanding";
	const response = await del(endpoint, headers);
	if (response) {
		const {
			data: { data }
		} = response;
		return data;
	}
};

export const deleteRegistrationHelp = async () => {
	const endpoint = "super-admin/upload-administration/registration-help";
	const response = await del(endpoint, headers);
	if (response) {
		const {
			data: { data }
		} = response;
		return data;
	}
};
