import { PaycheckAction } from "../../@types/contexts/paycheckContext/paycheckAction.types";
import { Store } from "../../@types/contexts/paycheckContext/store.types";
import actions from "./actions";

const reducer = (state: Store, action: PaycheckAction): Store => {
	switch (action.type) {
		case actions.SET_PAYCHECK: {
			return {
				...state,
				paycheck: action.payload
			};
		}
		default:
			throw new Error("Unexpected action: Paycheck Context");
	}
};

export default reducer;
