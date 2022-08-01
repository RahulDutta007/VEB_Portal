import {
	login,
	forgetPassword,
	changeForgetPassword,
	changeForgetUserId,
	sendOTP,
	findEmail,
	verifyOTP,
	createAdmin
} from "./auth/login";

export const api = {
	auth: {
		login,
		forgetPassword,
		changeForgetPassword,
		changeForgetUserId,
		sendOTP,
		findEmail,
		verifyOTP,
		createAdmin
	}
};
