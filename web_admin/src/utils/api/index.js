import {
	login,
	forgetPassword,
	changeForgetPassword,
	changeForgetUserId,
	sendOTP,
	findEmail,
	verifyOTP
} from "./auth/login";

export const api = {
	auth: {
		login,
		forgetPassword,
		changeForgetPassword,
		changeForgetUserId,
		sendOTP,
		findEmail,
		verifyOTP
	}
};
