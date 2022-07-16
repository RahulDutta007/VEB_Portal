import ROLES from "../constants/roles";

export type Tab = {
	caption: string;
	route: string;
	icon: () => JSX.Element;
	subTabs: Tab[];
};

export type SidebarOptions = {
	ADMIN: Tab[];
	ENROLLER: Tab[];
	AGENT: Tab[];
	EMPLOYEE?: Tab[];
	DEPENDENT?: Tab[];
};
