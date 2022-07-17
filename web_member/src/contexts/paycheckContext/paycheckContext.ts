import { createContext } from "react";
import { PaycheckContextProps } from "../../@types/contexts/paycheckContext/paycheckContextProps.types";

const PaycheckContext = createContext({} as PaycheckContextProps);

export default PaycheckContext;
