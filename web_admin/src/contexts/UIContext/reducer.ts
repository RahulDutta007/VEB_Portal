import { Store } from "../../@types/contexts/UIContext/store.types";
import { UIAction } from "../../@types/contexts/UIContext/UIAction.types";
import actions from "./actions";

const reducer = (state: Store, action: UIAction) => {
	switch (action.type) {
		case actions.SET_DASHBOARD_HEADER: {
			return {
				...state,
				dashboardHeader: action.payload.dashboardHeader
			};
		}
		case actions.SET_SELETED_TAB: {
			return {
				...state,
				selectedTab: action.payload.selectedTab
			};
		}
		default:
			throw new Error("Unexpected action: UI Context");
	}
};

export default reducer;
