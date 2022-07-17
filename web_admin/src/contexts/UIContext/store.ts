import { Store } from "../../@types/contexts/UIContext/store.types";

const initialState: Store = {
	dashboardHeader: null,
	selectedTab: {
		index: 0,
		subTabIndex: 0
	}
};

export default initialState;
