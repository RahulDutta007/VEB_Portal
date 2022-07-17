export {};
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// import BusinessIcon from "@material-ui/icons/Business";
// import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
// import WorkIcon from "@material-ui/icons/Work";
// import CardMembershipIcon from "@material-ui/icons/CardMembership";

// const tabCaptions = {
// 	admin: {
// 		caption: "Admin",
// 		children: {
// 			user_status: { caption: "User Status" },
// 			upload_administration: { caption: "Upload Administration" },
// 			message_administration: { caption: "Message Administration" },
// 			documents_administration: { caption: "Document Administration" },
// 			enrollments_administration: { caption: "Enrollment Administration" },
// 			system_options: { caption: "System Options" },
// 			custom_employee_page_options: { caption: "Custom Employee Page Options" }
// 		}
// 	},
// 	company: {
// 		caption: "Company",
// 		children: {
// 			health_links: { caption: "Health Links" },
// 			announcements: { caption: "Announcements" }
// 		}
// 	}
// };

// const { admin, company } = tabCaptions;

// const TABS = [
// 	{
// 		name: "admin",
// 		caption: admin.caption,
// 		icon: () => <SupervisorAccountIcon />,
// 		subTabs: [
// 			{
// 				caption: admin.children.user_status.caption,
// 				name: "user_status",
// 				route: "/"
// 			},
// 			{
// 				caption: admin.children.upload_administration.caption,
// 				name: "upload_administrations",
// 				route: "/upload-administration"
// 			},
// 			{
// 				caption: admin.children.message_administration.caption,
// 				name: "message_administrations"
// 			},
// 			{
// 				caption: admin.children.documents_administration.caption,
// 				name: "documents_administrations",
// 				route: "/documents-administration"
// 			},
// 			{
// 				caption: admin.children.enrollments_administration.caption,
// 				name: "enrollments_administrations",
// 				route: "/enrollment-dashboard"
// 			},
// 			{
// 				caption: admin.children.system_options.caption,
// 				name: "system_options",
// 				route: "/system-options"
// 			},
// 			{
// 				caption: admin.children.custom_employee_page_options.caption,
// 				name: "custom_employee_page_options",
// 				route: "/employee-page-design"
// 			}
// 		]
// 	},
// 	{
// 		name: "company",
// 		caption: company.caption,
// 		icon: () => <BusinessIcon />,
// 		subTabs: [
// 			{
// 				caption: "Company Home",
// 				name: "company_home"
// 			},
// 			{
// 				caption: "Issue Tracking",
// 				name: "issue_tracking"
// 			},
// 			{
// 				caption: "Provider Users",
// 				name: "provider_users"
// 			},
// 			{
// 				caption: company.children.announcements.caption,
// 				name: "announcements",
// 				route: "/announcements"
// 			},
// 			{
// 				caption: company.children.health_links.caption,
// 				name: "health_links",
// 				route: "/health-link"
// 			},
// 			{
// 				caption: "Event List",
// 				name: "event_list"
// 			}
// 		]
// 	},
// 	{
// 		name: "employers",
// 		caption: "Employers",
// 		icon: () => <WorkIcon />,
// 		subTabs: [
// 			{
// 				caption: "Employers Home",
// 				name: "employers_home"
// 			},
// 			{
// 				caption: "Reports",
// 				name: "reports"
// 			}
// 		]
// 	},
// 	{
// 		name: "groups",
// 		caption: "Groups",
// 		icon: () => <SupervisedUserCircleIcon />,
// 		subTabs: [
// 			{
// 				caption: "Group Home",
// 				name: "group_home"
// 			},
// 			{
// 				caption: "Group Event List",
// 				name: "group_event_list"
// 			},
// 			{
// 				caption: "Enroll New/Re-hire Members",
// 				name: "enroll_new_/_rehire_members"
// 			},
// 			{
// 				caption: "Terminate Member",
// 				name: "terminate_member"
// 			},
// 			{
// 				caption: "Enrollment Setup",
// 				name: "enrollment_setup"
// 			},
// 			{
// 				caption: "Demographics Setup",
// 				name: "demographics_setup"
// 			}
// 		]
// 	},
// 	{
// 		name: "members",
// 		caption: "Members",
// 		icon: () => <CardMembershipIcon />,
// 		subTabs: [
// 			{
// 				caption: "Members Home",
// 				name: "member_home"
// 			},
// 			{
// 				caption: "Member Documents",
// 				name: "member_documents"
// 			},
// 			{
// 				caption: "Enrollment Form",
// 				name: "enrollment_form"
// 			}
// 		]
// 	}
// ];
// export const TAB_CAPTIONS = tabCaptions;
// export default TABS;
