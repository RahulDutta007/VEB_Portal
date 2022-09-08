import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useReducer } from "react";
import { ContextProviderProps } from "../../@types/contexts/context.types";
import EnrollmentContext from "./enrollmentContext";
import { CurrentEnrollment } from "../../@types/contexts/enrollmentContext/store.types";

const EnrollmentContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = {
		currentEnrollment: state.currentEnrollment,
		setCurrentEnrollment: useCallback(
			(currentEnrollment: CurrentEnrollment) =>
				dispatch({ type: actions.SET_CURRENT_ENROLLMENT, payload: currentEnrollment }),
			[]
		),
		deleteCurrentEnrollment: useCallback(
			() => dispatch({ type: actions.DELETE_CURRENT_ENROLLMENT, payload: null }),
			[]
		)
	};

	return <EnrollmentContext.Provider value={value}>{children}</EnrollmentContext.Provider>;
};

export default EnrollmentContextProvider;
