export {};
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
// import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
// import CardMembershipIcon from "@material-ui/icons/CardMembership";
// import ControlCameraIcon from "@material-ui/icons/ControlCamera";
// import DashboardIcon from "@material-ui/icons/Dashboard";

// const tabCaptions = {
// 	dashboard: {
// 		caption: "Dashboard",
// 		children: {}
// 	},
// 	member: {
// 		caption: "Member",
// 		children: {
// 			search_member: { caption: "Search Member" },
// 			create_member: { caption: "Create Member" },
// 			tools: { caption: "Tools" },
// 			deletion: { caption: "Deletion" }
// 		}
// 	},
// 	plan_control: {
// 		caption: "Plan Control",
// 		children: {
// 			create_plan: { caption: "Create Plan" },
// 			plan_management: { caption: "Plan Management" },
// 			open_enrollment: { caption: "Open Enrollment" },
// 			all_open_enrollments: { caption: "All Open Enrollments" }
// 		}
// 	},
// 	admin_section: {
// 		caption: "Admin Section",
// 		children: {
// 			create_admin: { caption: "Create Admin" },
// 			admin_management: { caption: "Admin Management" }
// 		}
// 	},
// 	organization: {
// 		caption: "Organization",
// 		children: {
// 			all_locations: { caption: "All Locations" },
// 			add_location: { caption: "Add Location" }
// 		}
// 	}
// };

// const { dashboard, member, plan_control, admin_section, organization } = tabCaptions;

// const ENROLLTABS = [
// 	{
// 		name: "dashboard",
// 		caption: dashboard.caption,
// 		icon: () => <DashboardIcon />
// 	},
// 	{
// 		name: "member",
// 		caption: member.caption,
// 		icon: () => <CardMembershipIcon />,
// 		subTabs: [
// 			{
// 				caption: member.children.search_member.caption,
// 				name: "search_member"
// 				//route: '/'
// 			},
// 			{
// 				caption: member.children.create_member.caption,
// 				name: "create_member"
// 				//route: '/upload-administration'
// 			},
// 			{
// 				caption: member.children.tools.caption,
// 				name: "tools"
// 			},
// 			{
// 				caption: member.children.deletion.caption,
// 				name: "deletion"
// 				//route: '/documents-administration'
// 			}
// 		]
// 	},
// 	{
// 		name: "plan_control",
// 		caption: plan_control.caption,
// 		icon: () => <ControlCameraIcon />,
// 		subTabs: [
// 			{
// 				caption: plan_control.children.create_plan.caption,
// 				name: "create_plan"
// 			},
// 			{
// 				caption: plan_control.children.plan_management.caption,
// 				name: "plan_management"
// 			},
// 			{
// 				caption: plan_control.children.open_enrollment.caption,
// 				name: "open_enrollment"
// 			},
// 			{
// 				caption: plan_control.children.all_open_enrollments.caption,
// 				name: "all_open_enrollments"
// 				//route: '/announcements'
// 			}
// 		]
// 	},
// 	{
// 		name: "admin_section",
// 		caption: admin_section.caption,
// 		icon: () => <SupervisorAccountIcon />,
// 		subTabs: [
// 			{
// 				caption: admin_section.children.create_admin.caption,
// 				name: "create_admin"
// 			},
// 			{
// 				caption: admin_section.children.admin_management.caption,
// 				name: "admin_management"
// 			}
// 		]
// 	},
// 	{
// 		name: "organization",
// 		caption: organization.caption,
// 		icon: () => <SupervisedUserCircleIcon />,
// 		subTabs: [
// 			{
// 				caption: organization.children.all_locations.caption,
// 				name: "all_locations"
// 			},
// 			{
// 				caption: organization.children.add_location.caption,
// 				name: "add_location"
// 			}
// 		]
// 	}
// ];

// export const TAB_CAPTIONS = tabCaptions;
// export default ENROLLTABS;
