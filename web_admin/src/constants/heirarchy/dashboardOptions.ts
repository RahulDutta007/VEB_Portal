// import ROLES from "../roles";
// import { TAB_CAPTIONS } from "../adminTabs";

// const { admin, company } = TAB_CAPTIONS;
// const access = {
// 	read: "read",
// 	write: "write"
// };
// const unrestricted = [access.read, access.write];
// const readOnly = [access.read];

// const parentHeirarchy = {
// 	[admin.caption]: {
// 		[ROLES.super_admin]: unrestricted,
// 		[ROLES.admin]: unrestricted,
// 		[ROLES.employee]: unrestricted,
// 		[ROLES.employer]: unrestricted,
// 		[ROLES.dependent]: unrestricted
// 	},
// 	[company.caption]: {
// 		[ROLES.super_admin]: unrestricted,
// 		[ROLES.admin]: unrestricted,
// 		[ROLES.employee]: unrestricted,
// 		[ROLES.employer]: unrestricted,
// 		[ROLES.dependent]: unrestricted
// 	}
// };

// const childrenHeirarchy = {
// 	[admin.caption]: {
// 		[admin.children.user_status.caption]: {
// 			[ROLES.super_admin]: unrestricted,
// 			[ROLES.admin]: unrestricted,
// 			[ROLES.employer]: unrestricted,
// 			[ROLES.employee]: [],
// 			[ROLES.dependent]: []
// 		},
// 		[admin.children.upload_administration.caption]: {
// 			[ROLES.super_admin]: unrestricted,
// 			[ROLES.admin]: unrestricted,
// 			[ROLES.employer]: [],
// 			[ROLES.employee]: [],
// 			[ROLES.dependent]: []
// 		},
// 		[admin.children.message_administration.caption]: {
// 			[ROLES.super_admin]: unrestricted,
// 			[ROLES.admin]: unrestricted,
// 			[ROLES.employer]: unrestricted,
// 			[ROLES.employee]: [],
// 			[ROLES.dependent]: []
// 		},
// 		[admin.children.documents_administration.caption]: {
// 			[ROLES.super_admin]: unrestricted,
// 			[ROLES.admin]: unrestricted,
// 			[ROLES.employer]: unrestricted,
// 			[ROLES.employee]: [],
// 			[ROLES.dependent]: []
// 		},
// 		[admin.children.enrollments_administration.caption]: {
// 			[ROLES.super_admin]: unrestricted,
// 			[ROLES.admin]: unrestricted,
// 			[ROLES.employer]: readOnly,
// 			[ROLES.employee]: [],
// 			[ROLES.dependent]: []
// 		},
// 		[admin.children.system_options.caption]: {
// 			[ROLES.super_admin]: unrestricted,
// 			[ROLES.admin]: [],
// 			[ROLES.employer]: [],
// 			[ROLES.employee]: [],
// 			[ROLES.dependent]: []
// 		},
// 		[admin.children.custom_employee_page_options.caption]: {
// 			[ROLES.super_admin]: unrestricted,
// 			[ROLES.admin]: unrestricted,
// 			[ROLES.employer]: unrestricted,
// 			[ROLES.employee]: [],
// 			[ROLES.dependent]: []
// 		}
// 	},
// 	[company.caption]: {
// 		[company.children.health_links.caption]: {
// 			[ROLES.super_admin]: unrestricted,
// 			[ROLES.admin]: unrestricted,
// 			[ROLES.employer]: unrestricted,
// 			[ROLES.employee]: readOnly,
// 			[ROLES.dependent]: readOnly
// 		},
// 		[company.children.announcements.caption]: {
// 			[ROLES.super_admin]: unrestricted,
// 			[ROLES.admin]: unrestricted,
// 			[ROLES.employer]: unrestricted,
// 			[ROLES.employee]: readOnly,
// 			[ROLES.dependent]: readOnly
// 		}
// 	},
// 	Employers: {},
// 	Groups: {},
// 	Members: {}
// };

// export const PARENT_HIERARCHY = parentHeirarchy;
// export const CHILDREN_HEIRARCHY = childrenHeirarchy;
export {};
