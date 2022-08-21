import { auth } from "./auth/login";
import { plan } from "../utils/api/plan/index";

export const api = {
	auth: {
		login: auth.login
	}
};
