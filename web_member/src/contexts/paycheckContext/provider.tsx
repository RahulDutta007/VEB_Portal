import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useReducer } from "react";
import { ContextProviderProps } from "../../@types/contexts/context.types";
import AuthContext from "./paycheckContext";
import { Paycheck } from "../../@types/paycheck.types";

const PaycheckContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = {
		paycheck: state.paycheck,
		setPaycheck: useCallback(
			(paycheck: Paycheck) => dispatch({ type: actions.SET_PAYCHECK, payload: paycheck }),
			[]
		)
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default PaycheckContextProvider;
