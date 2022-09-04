import axios from "axios";
import { url, port, version } from "../config/config";
import { Endpoint, Params, Payload, Headers } from "../@types/api/api.types";

const get = async (endpoint: Endpoint, headers?: Headers, params: Params = {}) => {
	try {
		const response = await axios.get(`${url}:${port}/api/${version}/${endpoint}`, {
			headers,
			params
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (err) {
		console.log("err", err);
		alert(err);
	}
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const post = async (endpoint: Endpoint, payload: any, headers: Headers) => {
	try {
		const response = await axios.post(`${url}:${port}/api/${version}/${endpoint}`, payload, {
			headers
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (err) {
		console.log("err", err);
		alert(err);
	}
};

const put = async (endpoint: Endpoint, payload: Payload, headers: Headers) => {
	try {
		const response = await axios.put(`${url}:${port}/api/${version}/${endpoint}`, payload, {
			headers
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (err) {
		console.log("err", err);
		alert(err);
	}
};

const del = async (endpoint: Endpoint, headers: Headers) => {
	try {
		const response = await axios.delete(`${url}:${port}/api/${version}/${endpoint}`, {
			headers
		});
		const { status } = response;
		if (status === 200) {
			return response;
		}
	} catch (err) {
		console.log("err", err);
		alert(err);
	}
};

export const request = {
	get,
	post,
	put,
	del
};
