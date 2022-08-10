/* eslint-disable prettier/prettier */
import { request } from "../api";
import { headers } from "../../../config/config";
import { MESSAGE } from "../../../constants/api/message";
import { AUTHORIZATION } from "../../../constants/api/auth";
import OTPMessage from "../../../constants/OTP/OTP.json";

const { post, get, put, del } = request;
const { Authorization, Bearer } = AUTHORIZATION;
const initialRoute = "OTP";

// eslint-disable-next-line arrow-parens
const sendOTPToEmail = async (_payload) => {
	const endpoint = `${initialRoute}/post-email`;
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

// eslint-disable-next-line arrow-parens
export const verifyOTP = async (_payload) => {
	try {
		const payload = JSON.stringify(_payload);
		const endpoint = `${initialRoute}/verify-otp`;
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
