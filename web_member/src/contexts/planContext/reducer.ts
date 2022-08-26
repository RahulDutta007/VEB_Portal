import { AccidentPlanAction } from "../../@types/contexts/planContext/accidentPlanAction.types";
import { Store } from "../../@types/contexts/planContext/store.types";
import actions from "./actions";

const reducer = (state: Store, action: AccidentPlanAction): Store => {
	switch (action.type) {
		case actions.SET_PREMIUM_AMOUNT: {
			return {
				...state,
				accidentPlan: action.payload
			};
		}
		default:
			throw new Error("Unexpected action: Theme Context");
	}
};

export default reducer;
