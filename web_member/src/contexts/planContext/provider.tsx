import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useReducer } from "react";
import { ContextProviderProps } from "../../@types/contexts/context.types";
import AccidentPlanContext from "./accidentPlanContext";
import { AccidentPlan } from "../../@types/accidentPlan.types";
import { AccidentPlanContextProps } from "../../@types/contexts/planContext/accidentPlanContextProps.types";

const AccidentPlanContextProvider = ({ children }: ContextProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value: AccidentPlanContextProps = {
		accidentPlan: state.accidentPlan,
		setAccidentPlan: useCallback((accidentPlan: AccidentPlan) => dispatch({ type: actions.SET_PREMIUM_AMOUNT, payload: accidentPlan }), [])
	};

	return <AccidentPlanContext.Provider value={value}>{children}</AccidentPlanContext.Provider>;
};

export default AccidentPlanContextProvider;
