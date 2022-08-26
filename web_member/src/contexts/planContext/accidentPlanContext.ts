import { createContext } from "react";
import { AccidentPlanContextProps } from "../../@types/contexts/planContext/accidentPlanContextProps.types";

const AccidentPlanContext = createContext({} as AccidentPlanContextProps);

export default AccidentPlanContext;
