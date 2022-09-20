import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useReducer } from "react";
import { ContextProviderProps } from "../../@types/contexts/context.types";
import AuthContext from "./authContext";
import { Member } from "../../@types/member.types";
import { Paycheck } from "../../@types/paycheck.types";
import { GroupOwner } from "../../@types/groupOwner.types";

const AuthContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = {
		member: state.member,
		setMember: useCallback(
			(member: Member) =>
				dispatch({
					type: actions.SET_MEMBER,
					payload: {
						paycheck: state.paycheck,
						member,
						groupOwner: state.groupOwner,
						dependents: state.dependents
					}
				}),
			[]
		),
		paycheck: state.paycheck,
		setPaycheck: useCallback(
			(paycheck: Paycheck) =>
				dispatch({
					type: actions.SET_PAYCHECK,
					payload: {
						member: state.member,
						paycheck,
						groupOwner: state.groupOwner,
						dependents: state.dependents
					}
				}),
			[]
		),
		groupOwner: state.groupOwner,
		setGroupOwner: useCallback(
			(groupOwner: GroupOwner) =>
				dispatch({
					type: actions.SET_GROUP_OWNER,
					payload: {
						member: state.member,
						paycheck: state.paycheck,
						groupOwner,
						dependents: state.dependents
					}
				}),
			[]
		),
		dependents: state.dependents,
		setDependents: useCallback(
			(dependents: Member[]) =>
				dispatch({
					type: actions.SET_DEPENDENTS,
					payload: {
						member: state.member,
						paycheck: state.paycheck,
						groupOwner: state.groupOwner,
						dependents
					}
				}),
			[]
		)
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
