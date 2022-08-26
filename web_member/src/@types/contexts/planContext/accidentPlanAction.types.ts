import { AccidentPlan } from "../../accidentPlan.types";

export type AccidentPlanAction = {
	type: string;
	payload: AccidentPlan;
};
