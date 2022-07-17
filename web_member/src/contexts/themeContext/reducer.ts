import { ThemeAction } from "../../@types/contexts/themeContext/themeAction.types";
import { Store } from "../../@types/contexts/themeContext/store.types";
import actions from "./actions";

const reducer = (state: Store, action: ThemeAction): Store => {
	switch (action.type) {
		case actions.SET_THEME: {
			return {
				...state,
				theme: action.payload
			};
		}
		default:
			throw new Error("Unexpected action: Theme Context");
	}
};

export default reducer;
