import initialState from "./store";
import actions from "./actions";
import reducer from "./reducer";
import { useCallback, useReducer } from "react";
import { ContextProviderProps } from "../../@types/contexts/context.types";
import ThemeContext from "./themeContext";
import { Theme } from "../../@types/theme.types";
import { ThemeContextProps } from "../../@types/contexts/themeContext/themeContextProps.types";

const ThemeContextProvider = ({ children }: ContextProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value: ThemeContextProps = {
		theme: state.theme,
		setTheme: useCallback((theme: Theme) => dispatch({ type: actions.SET_THEME, payload: theme }), [])
	};

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeContextProvider;
