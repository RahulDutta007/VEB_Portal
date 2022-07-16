import ROLES from "./roles";

import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessIcon from "@mui/icons-material/Business";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import WorkIcon from "@mui/icons-material/Work";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { SidebarOptions } from "../@types/sidebarOptions.types";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DashboardIcon from "@mui/icons-material/Dashboard";

const sidebarOptions: SidebarOptions = {
	ADMIN: [
		{
			caption: "Dashboard",
			route: "/",
			icon: () => <DashboardIcon />,
			subTabs: []
		},
		{
			caption: "Enroller",
			route: "/",
			icon: () => <AdminPanelSettingsIcon />,
			subTabs: []
		},
		{
			caption: "Agents",
			route: "/",
			icon: () => <SupportAgentIcon />,
			subTabs: []
		},
		{
			caption: "Members",
			route: "/",
			icon: () => <SupervisedUserCircleIcon />,
			subTabs: []
		},
		{
			caption: "Reports",
			route: "/",
			icon: () => <CardMembershipIcon />,
			subTabs: []
		},
		{
			caption: "Settings",
			route: "/",
			icon: () => <WorkIcon />,
			subTabs: []
		}
	],
	ENROLLER: [
		{
			caption: "Dashboard",
			route: "/",
			icon: () => <SupervisorAccountIcon />,
			subTabs: []
		},
		{
			caption: "Agents",
			route: "/",
			icon: () => <BusinessIcon />,
			subTabs: []
		},
		{
			caption: "Members",
			route: "/",
			icon: () => <SupervisedUserCircleIcon />,
			subTabs: []
		},
		{
			caption: "Reports",
			route: "/",
			icon: () => <CardMembershipIcon />,
			subTabs: []
		},
		{
			caption: "Settings",
			route: "/",
			icon: () => <WorkIcon />,
			subTabs: []
		}
	],
	AGENT: [
		{
			caption: "Dashboard",
			route: "/",
			icon: () => <SupervisorAccountIcon />,
			subTabs: []
		},
		{
			caption: "Members",
			route: "/",
			icon: () => <SupervisedUserCircleIcon />,
			subTabs: []
		},
		{
			caption: "Reports",
			route: "/",
			icon: () => <CardMembershipIcon />,
			subTabs: []
		},
		{
			caption: "Settings",
			route: "/",
			icon: () => <WorkIcon />,
			subTabs: []
		}
	]
};

export default sidebarOptions;
