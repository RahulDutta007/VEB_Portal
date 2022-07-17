import { Paycheck } from "../../paycheck.types";

export type PaycheckContextProps = {
	paycheck: Paycheck | null;
	setPaycheck: (paycheck: Paycheck) => void;
};
