import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useReducer } from "react";
import { ContextProviderProps } from "../../@types/contexts/context.types";
import AuthContext from "./groupContext";
import { Group } from "../../@types/group.types";

const GroupContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = {
		group: state.group,
		setGroup: useCallback((group: Group) => dispatch({ type: actions.SET_GROUP, payload: group }), [])
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default GroupContextProvider;
