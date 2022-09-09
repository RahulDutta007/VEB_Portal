import { createContext } from "react";
import { EnrollmentContextProps } from "../../@types/contexts/enrollmentContext/enrollmentContextProps.types";

const enrollmentContext = createContext({} as EnrollmentContextProps);

export default enrollmentContext;
