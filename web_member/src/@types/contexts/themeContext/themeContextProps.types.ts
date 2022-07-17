import { Theme } from "../../theme.types";

export type ThemeContextProps = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};
