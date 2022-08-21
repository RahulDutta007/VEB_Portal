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
import { plan } from "./plan/index";

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
	},
	plan: {
		createPlan: plan.createPlan,
		findPlanCode: plan.findPlanCode,
		getAllPlan: plan.getAllPlan
	}
};
