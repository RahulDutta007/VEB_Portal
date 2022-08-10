import { _assignGroupsAndLocation } from "./admin/assignGroups/AssignGroups";

import {
	login,
	forgetPassword,
	changeForgetPassword,
	changeForgetUserId,
	findEmail,
	createAdmin,
	createEnroller,
	findUserName
} from "./auth/login";

import { OTP } from "./OTP/OTP";

export const api = {
	auth: {
		login,
		forgetPassword,
		changeForgetPassword,
		changeForgetUserId,
		findEmail,
		createAdmin,
		createEnroller,
		findUserName
	},
	OTP: {
		sendToEmail: OTP.sendOTPToEmail,
		verifyOTP: OTP.verifyOTP
	},
	assignGroupsAndLocation: {
		getGroupAndLocationAssignment: _assignGroupsAndLocation.getGroupAndLocationAssignment,
		assignGroups: _assignGroupsAndLocation.assignGroups,
		assignLocations: _assignGroupsAndLocation.assignLocations,
		assignAllGroups: _assignGroupsAndLocation.assignAllGroups,
		assignAllLocations: _assignGroupsAndLocation.assignAllLocations
	}
};
