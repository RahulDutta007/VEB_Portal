import { _assignGroupsAndLocation } from "./admin/assignGroups/AssignGroups";

import {
	login,
	forgetPassword,
	changeForgetPassword,
	changeForgetUserId,
	sendOTP,
	findEmail,
	verifyOTP,
	createAdmin,
	createEnroller,
	findUserName
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
		createAdmin,
		createEnroller,
		findUserName
	},
	assignGroupsAndLocation: {
		getGroupAndLocationAssignment: _assignGroupsAndLocation.getGroupAndLocationAssignment,
		assignGroups: _assignGroupsAndLocation.assignGroups,
		assignLocations: _assignGroupsAndLocation.assignLocations,
		assignAllGroups: _assignGroupsAndLocation.assignAllGroups,
		assignAllLocations: _assignGroupsAndLocation.assignAllLocations
	}
};
