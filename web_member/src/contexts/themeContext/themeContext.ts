import { createContext } from "react";
import { ThemeContextProps } from "../../@types/contexts/themeContext/themeContextProps.types";

const ThemeContext = createContext({} as ThemeContextProps);

export default ThemeContext;
