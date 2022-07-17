import { AuthAction } from "../../@types/contexts/authContext/authAction.types";
import { Store } from "../../@types/contexts/authContext/store.types";
import actions from "./actions";

const reducer = (state: Store, action: AuthAction): Store => {
	switch (action.type) {
		case actions.SET_MEMBER: {
			return {
				...state,
				member: action.payload
			};
		}
		default:
			throw new Error("Unexpected action: Auth Context");
	}
};

export default reducer;
