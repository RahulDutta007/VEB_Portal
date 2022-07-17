import {
	addUploadAdministration,
	getUploadAdministration,
	editUploadAdministration,
	deleteRegistrationHelp,
	deleteStatementOfUnderstanding
} from "./admin/uploadAdministration/UploadAdministration";
import {
	addThemeColor,
	editThemeColor,
	getThemeColors,
	getThemeColorByGroupNumber
} from "./admin/employeePageDesign/EmployeePageDesign";
import {
	getLogoSettings,
	getLogoSettingsByGroupNumber,
	addLogoSettings,
	editLogoSettings
} from "./admin/employeePageDesign/LogoSettings";
import { getGroups, group } from "./admin/group/group";
import { healthLinks } from "./admin/healthLinks/healthLinks";
import {
	toggleMemberSupport,
	toggleEmployerSupport,
	getUserById,
	editUser,
	findUserName,
	findEmail,
	getUser,
	getUserCount
} from "./user/user";
import { employeePageDesignPreview } from "./admin/employeePageDesign/EmployeePageDesignPreview";
import { logoSettingsPreview } from "./admin/employeePageDesign/LogoSettingsPreview";
import { notification } from "./notification/Notification";
import { _assignGroupsAndLocation } from "./admin/assignGroups/AssignGroups";
import { announcements } from "./admin/announcements/announcements";
import { groupMemberEmployee } from "./groups/member/employee/employee";
import { groupMemberDependent } from "./groups/member/dependent/dependent";
import { auth } from "./auth/login";
import { OTP } from "./OTP/OTP";
import { find } from "./global/find";
import { owner } from "./admin/owner/createdUser";
import { signUp } from "./admin/signUp/signUp";
import { groupMember } from "./groups/member/member";
import { bulkUploadMapping } from "./groups/member/bulkUploadMapping/clientSheetMapping";

export const api = {
	uploadAdminstration: {
		addUploadAdministration,
		getUploadAdministration,
		editUploadAdministration,
		deleteRegistrationHelp,
		deleteStatementOfUnderstanding
	},
	employeePageDesign: {
		addThemeColor,
		editThemeColor,
		getThemeColors,
		getThemeColorByGroupNumber,
		getLogoSettings,
		getLogoSettingsByGroupNumber,
		addLogoSettings,
		editLogoSettings
	},
	group: {
		getGroups: group.getGroups,
		getAssignedGroups: group.getAssignedGroups
	},
	healthLinks: {
		assignGroup: healthLinks.assignGroups,
		addHealthLink: healthLinks.addHealthLink,
		getHealthLinks: healthLinks.getHealthLinks,
		editHealthLink: healthLinks.editHealthLink,
		deleteHealthLinkById: healthLinks.deleteHealthLinkById,
		getHealthLinkById: healthLinks.getHealthLinkById,
		getGroups: healthLinks.getGroups,
		assignAllGroups: healthLinks.assignAllGroups,
		getHealthLinkValidity: healthLinks.getHealthLinkValidity,
		filterHealthLinks: healthLinks.filterHealthLinks,
		countHealthLinks: healthLinks.countHealthLinks
	},
	announcements: {
		getGroups: announcements.getGroups,
		assignGroups: announcements.assignGroups,
		assignLocations: announcements.assignLocations,
		assignAllGroups: announcements.assignAllGroups,
		assignAllLocations: announcements.assignAllLocations,
		getAnnouncementById: announcements.getAnnouncementById,
		addAnnouncement: announcements.addAnnouncement,
		editAnnouncement: announcements.editAnnouncement,
		getAnnouncements: announcements.getAnnouncements,
		deleteAnnouncementById: announcements.deleteAnnouncementById,
		filterAnnouncements: announcements.filterAnnouncements,
		countAnnouncements: announcements.countAnnouncements
	},
	user: {
		toggleMemberSupport,
		toggleEmployerSupport,
		getUserById,
		editUser,
		findUserName,
		findEmail,
		getUser,
		getUserCount
	},
	employeePageDesignPreview: {
		addThemeColor: employeePageDesignPreview.addThemeColor,
		editThemeColor: employeePageDesignPreview.editThemeColor,
		getThemeColors: employeePageDesignPreview.getThemeColors,
		getThemeColorByGroupId: employeePageDesignPreview.getThemeColorByGroupId,
		getThemeColorByUserId: employeePageDesignPreview.getThemeColorByUserId,
		deleteLogoSettingsByUserId: employeePageDesignPreview.deleteLogoSettingsByUserId
	},
	logoSettingsPreview: {
		addLogoSettings: logoSettingsPreview.addLogoSettings,
		editLogoSettings: logoSettingsPreview.editLogoSettings,
		getLogoSettings: logoSettingsPreview.getLogoSettings,
		getLogoSettingsByGroupId: logoSettingsPreview.getLogoSettingsByGroupId,
		getLogoSettingsByUserId: logoSettingsPreview.getLogoSettingsByUserId,
		deleteLogoSettingsByUserIdAndGroupId: logoSettingsPreview.deleteLogoSettingsByUserIdAndGroupId,
		deleteLogoSettingsByUserId: logoSettingsPreview.deleteLogoSettingsByUserId
	},
	notification: {
		getNotificationsByUserId: notification.getNotificationsByUserId,
		setAllNotificationsAsOldByUserId: notification.setAllNotificationsAsOldByUserId,
		getNotificationCount: notification.getNotificationCount
	},
	assignGroupsAndLocation: {
		getGroupAndLocationAssignment: _assignGroupsAndLocation.getGroupAndLocationAssignment,
		assignGroups: _assignGroupsAndLocation.assignGroups,
		assignLocations: _assignGroupsAndLocation.assignLocations,
		assignAllGroups: _assignGroupsAndLocation.assignAllGroups,
		assignAllLocations: _assignGroupsAndLocation.assignAllLocations
	},
	owner: {
		createdUser: owner.createdUser
	},
	signUp: {
		userSignUp: signUp.userSignUp
	},
	groupMemberEmployee: {
		createEmployee: groupMemberEmployee.createEmployee,
		employeeSignUp: groupMemberEmployee.employeeSignUp,
		countAllEmployees: groupMemberEmployee.countAllEmployees,
		paginatedAllEmployee: groupMemberEmployee.paginatedAllEmployee
	},
	groupMemberDependent: {
		createDependent: groupMemberDependent.createDependent,
		dependentSignUp: groupMemberDependent.dependentSignUp
	},
	auth: {
		login: auth.login
	},
	OTP: {
		sendToEmail: OTP.sendOTPToEmail,
		verifyOTP: OTP.verifyOTP
	},
	find: {
		findEmail: find.findEmail,
		findMemberEmail: find.findMemberEmail,
		findUserEmail: find.findUserEmail,
		findUserName: find.findUserName
	},
	groupMember: {
		getMembersByEmployeeNumber: groupMember.getMembersByEmployeeNumber,
		getMember: groupMember.getMember
	},
	bulkUploadMapping: {
		getClientSheetMapping: bulkUploadMapping.getClientSheetMapping,
		addClientSheetMapping: bulkUploadMapping.addClientSheetMapping
	}
};
