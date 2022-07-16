/* eslint-disable react-hooks/exhaustive-deps */
import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useReducer, useCallback } from "react";
import { ContextProviderProps } from "../../@types/contexts/context.types";
import { SelectedTab } from "../../@types/contexts/UIContext/store.types";
import UIContext from "./UIContext";

const UIContextProvider = ({ children }: ContextProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = {
		dashboardHeader: state.dashboardHeader,
		selectedTab: state.selectedTab,
		setDashboardHeader: useCallback((dashboardHeader: string) => {
			dispatch({ type: actions.SET_DASHBOARD_HEADER, payload: { ...state, dashboardHeader } });
		}, []),
		setSelectedTab: useCallback((selectedTab: SelectedTab) => {
			dispatch({ type: actions.SET_SELETED_TAB, payload: { ...state, selectedTab } });
		}, [])
	};

	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIContextProvider;
