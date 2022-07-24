import { login, forgetPassword, changeForgetPassword, changeForgetUserId } from "./auth/login";

export const api = {
	auth: {
		login,
		forgetPassword,
		changeForgetPassword,
		changeForgetUserId
	}
};
