import { createContext } from "react";
import { GroupContextProps } from "../../@types/contexts/groupContext/groupContextProps.types";

const GroupContext = createContext({} as GroupContextProps);

export default GroupContext;
