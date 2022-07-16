export type SelectedTab = {
	index: number;
	subTabIndex: number;
};

export type Store = {
	dashboardHeader: string | null;
	selectedTab: SelectedTab;
};
