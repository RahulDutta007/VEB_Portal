/* eslint-disable prettier/prettier */
import { request } from "../api";
import { headers } from "../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";
import OTPMessage from "../../../constants/OTP/OTP.json";

const { post, get, put, del } = request;
const { Authorization, Bearer } = AUTHORIZATION;
const initialRoute = "OTP";

const sendOTPToEmail = async _payload => {
	const endpoint = `${initialRoute}/email`;
	const payload = JSON.stringify(_payload);
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

export const verifyOTP = async _payload => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/verify`;
		const response = await post(endpoint, payload, headers);
		if (response) {
			const {
				data: { message }
			} = response;
			if (message === OTPMessage["OTP matched"]) {
				return true;
			}
		}
	} catch (err) {
		if (err.response.status === 400) {
			const { message } = err.response.data;
			alert(message);
		}
	}
};

export const OTP = {
	sendOTPToEmail,
	verifyOTP
};
