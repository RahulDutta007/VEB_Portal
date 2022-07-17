import { Paycheck } from "../../paycheck.types";

export type PaycheckAction = {
	type: string;
	payload: Paycheck;
};
