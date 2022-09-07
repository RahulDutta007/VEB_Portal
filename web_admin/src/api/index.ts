import { auth } from "./auth/login";
import { plan } from "../utils/api/plan/index";
import { member } from "./user/member";

export const api = {
	auth: {
		login: auth.login
	},
	user: {
		getAssignedPaginatedMembers: member.getAssignedPaginatedMembers,
		getAssignedMemberCount: member.getAssignedMemberCount,
		getGroupOwnerCount: member.getGroupOwnerCount,
		getGroupOwnersPaginated: member.getGroupOwnersPaginated
	}
};
