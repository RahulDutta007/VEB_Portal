import { AccidentPlan } from "../../accidentPlan.types";

export type AccidentPlanContextProps = {
	accidentPlan: AccidentPlan;
	setAccidentPlan: (accidentPlan: AccidentPlan) => void;
};
