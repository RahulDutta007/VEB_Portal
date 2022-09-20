import { redirection } from "./redirection/redirection";
import { user } from "./user/user";

export const api = {
	redirection: {
		redirectUser: redirection.redirectUser
	},
	user: {
		getGroupOwner: user.getGroupOwner,
		getEmployeeAndDependents: user.getEmployeeAndDependents,
		getMemberByAuth: user.getMemberByAuth
	}
};
