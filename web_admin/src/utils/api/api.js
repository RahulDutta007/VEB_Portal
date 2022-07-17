import axios from "axios";
import { url, port, version } from "../../config/config";

const get = async (endpoint, headers, params = {}) => {
	try {
		const response = await axios.get(`${url}:${port}/api/${version}/${endpoint}`, {
			headers,
			params
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};

const post = async (endpoint, payload, headers) => {
	try {
		const response = await axios.post(`${url}:${port}/api/${version}/${endpoint}`, payload, {
			headers
		});
		console.log("222", response);
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};

const put = async (endpoint, payload, headers) => {
	try {
		const response = await axios.put(`${url}:${port}/api/${version}/${endpoint}`, payload, {
			headers
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};

const del = async (endpoint, headers) => {
	try {
		const response = await axios.delete(`${url}:${port}/api/${version}/${endpoint}`, {
			headers
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (error) {
		console.log("error", error);
		throw error;
	}
};

export const request = {
	fetch,
	get,
	post,
	put,
	del
};
