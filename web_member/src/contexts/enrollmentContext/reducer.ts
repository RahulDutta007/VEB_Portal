import { EnrollmentAction } from "../../@types/contexts/enrollmentContext/enrollmentAction.types";
import { Store } from "../../@types/contexts/enrollmentContext/store.types";
import actions from "./actions";

const reducer = (state: Store, action: EnrollmentAction): Store => {
	switch (action.type) {
		case actions.SET_CURRENT_ENROLLMENT: {
			return {
				...state,
				currentEnrollment: action.payload
			};
		}
		case actions.DELETE_CURRENT_ENROLLMENT: {
			return {
				...state,
				currentEnrollment: action.payload
			};
		}
		default:
			throw new Error("Unexpected action: Auth Context");
	}
};

export default reducer;
