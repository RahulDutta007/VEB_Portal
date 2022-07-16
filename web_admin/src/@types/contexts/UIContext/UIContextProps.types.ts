import { User } from "../../user.types";
import { SelectedTab } from "./store.types";

export type UIContextProps = {
	dashboardHeader: string | null;
	selectedTab: SelectedTab;
	setDashboardHeader: (dashboardHeader: string) => void;
	setSelectedTab: (selectedTab: SelectedTab) => void;
};
