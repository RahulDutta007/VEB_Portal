import { login, forgetPassword, changeForgetPassword } from "./auth/login";

export const api = {
	auth: {
		login,
		forgetPassword,
		changeForgetPassword
	}
};
