import { _assignGroupsAndLocation } from "./admin/assignGroups/AssignGroups";

import {
	login,
	forgetPassword,
	changeForgetPassword,
	changeForgetUserId,
	findEmail,
	signUpAdmin,
	createEnroller,
	findUserName
} from "./auth/login";
import { editGroupOwner, changePassword } from "./auth/updateUser";
import { plan } from "./plan/index";
import { groupOwner } from "./user/user";

import { OTP } from "./OTP/OTP";

export const api = {
	auth: {
		login,
		forgetPassword,
		changeForgetPassword,
		changeForgetUserId,
		findEmail,
		signUpAdmin,
		createEnroller,
		findUserName,
		editGroupOwner,
		changePassword
	},
	groupOwner: {
		getGroupOwnerByAuth: groupOwner.getGroupOwnerByAuth,
		getGroupOwnerCount: groupOwner.getGroupOwnerCount,
		getGroupOwnerById: groupOwner.getGroupOwnerById
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
	},
	plan: {
		createPlan: plan.createPlan,
		findPlanCode: plan.findPlanCode,
		getAllPlan: plan.getAllPlan
	}
};
