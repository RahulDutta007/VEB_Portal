import { Coverage } from "../../@types/plan.types";

export const getCriticalIllnessPremium = (
	coverage: string,
	coverageLevel: "With Cancer" | "Without Cancer",
	age: number,
	benefitAmount: number
) => {
	if (coverage === "Employee Only") {
		if (coverageLevel === "With Cancer") {
		}
	}
};
