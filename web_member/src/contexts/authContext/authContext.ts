import { createContext } from "react";
import { AuthContextProps } from "../../@types/contexts/authContext/authContextProps.types";

const AuthContext = createContext({} as AuthContextProps);

export default AuthContext;
