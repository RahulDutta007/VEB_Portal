import { GroupAction } from "../../@types/contexts/groupContext/groupAction.types";
import { Store } from "../../@types/contexts/groupContext/store.types";
import actions from "./actions";

const reducer = (state: Store, action: GroupAction): Store => {
	switch (action.type) {
		case actions.SET_GROUP: {
			return {
				...state,
				group: action.payload
			};
		}
		default:
			throw new Error("Unexpected action: Paycheck Context");
	}
};

export default reducer;
