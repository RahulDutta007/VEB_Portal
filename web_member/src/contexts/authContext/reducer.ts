import { AuthAction } from "../../@types/contexts/authContext/authAction.types";
import { Store } from "../../@types/contexts/authContext/store.types";
import actions from "./actions";

const reducer = (state: Store, action: AuthAction): Store => {
	switch (action.type) {
		case actions.SET_MEMBER: {
			return {
				...state,
				member: action.payload.member
			};
		}
		case actions.SET_PAYCHECK: {
			return {
				...state,
				paycheck: action.payload.paycheck
			};
		}
		case actions.SET_GROUP_OWNER: {
			return {
				...state,
				groupOwner: action.payload.groupOwner
			};
		}
		case actions.SET_DEPENDENTS: {
			return {
				...state,
				dependents: action.payload.dependents
			};
		}
		default:
			throw new Error("Unexpected action: Auth Context");
	}
};

export default reducer;
