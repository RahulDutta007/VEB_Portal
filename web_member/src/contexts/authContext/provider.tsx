import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useReducer } from "react";
import { ContextProviderProps } from "../../@types/contexts/context.types";
import AuthContext from "./authContext";
import { Member } from "../../@types/member.types";

const AuthContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = {
		member: state.member,
		setMember: useCallback((member: Member) => dispatch({ type: actions.SET_MEMBER, payload: member }), [])
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
