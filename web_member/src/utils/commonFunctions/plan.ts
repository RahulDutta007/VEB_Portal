import { Coverage } from "../../@types/plan.types";

export const getCriticalIllnessPremium = (
	coverage: string,
	coverageLevel: "With Cancer" | "Without Cancer",
	benefitAmount: number,
	age: number
): number => {
	let premiumAmount = 0.0;
	if (coverageLevel === "Without Cancer") {
		if (benefitAmount == 10000.0) {
			if (age >= 18 && age <= 39) {
				if (coverage === "Employee Only") {
					premiumAmount = 0.66;
				} else {
					premiumAmount = 1.52;
				}
			} else if (age >= 40 && age <= 59) {
				if (coverage === "Employee Only") {
					premiumAmount = 3.03;
				} else {
					premiumAmount = 6.17;
				}
			} else if (age >= 60 && age <= 64) {
				if (coverage === "Employee Only") {
					premiumAmount = 5.13;
				} else {
					premiumAmount = 10.3;
				}
			} else if (age >= 65) {
				if (coverage === "Employee Only") {
					premiumAmount = 8.47;
				} else {
					premiumAmount = 16.03;
				}
			}
		} else if (benefitAmount == 20000.0) {
			if (age >= 18 && age <= 39) {
				if (coverage === "Employee Only") {
					premiumAmount = 1.03;
				} else {
					premiumAmount = 2.31;
				}
			} else if (age >= 40 && age <= 59) {
				if (coverage === "Employee Only") {
					premiumAmount = 5.71;
				} else {
					premiumAmount = 11.52;
				}
			} else if (age >= 60 && age <= 64) {
				if (coverage === "Employee Only") {
					premiumAmount = 9.92;
				} else {
					premiumAmount = 19.77;
				}
			} else if (age >= 65) {
				if (coverage === "Employee Only") {
					premiumAmount = 16.59;
				} else {
					premiumAmount = 31.22;
				}
			}
		} else if (benefitAmount == 30000.0) {
			if (age >= 18 && age <= 39) {
				if (coverage === "Employee Only") {
					premiumAmount = 1.4;
				} else {
					premiumAmount = 3.1;
				}
			} else if (age >= 40 && age <= 59) {
				if (coverage === "Employee Only") {
					premiumAmount = 8.4;
				} else {
					premiumAmount = 16.86;
				}
			} else if (age >= 60 && age <= 64) {
				if (coverage === "Employee Only") {
					premiumAmount = 14.71;
				} else {
					premiumAmount = 29.24;
				}
			} else if (age >= 65) {
				if (coverage === "Employee Only") {
					premiumAmount = 24.71;
				} else {
					premiumAmount = 46.42;
				}
			}
		}
	} else if (coverageLevel === "With Cancer") {
		if (benefitAmount == 10000.0) {
			if (age >= 18 && age <= 39) {
				if (coverage === "Employee Only") {
					premiumAmount = 1.12;
				} else {
					premiumAmount = 2.46;
				}
			} else if (age >= 40 && age <= 59) {
				if (coverage === "Employee Only") {
					premiumAmount = 5.71;
				} else {
					premiumAmount = 11.15;
				}
			} else if (age >= 60 && age <= 64) {
				if (coverage === "Employee Only") {
					premiumAmount = 9.75;
				} else {
					premiumAmount = 19.16;
				}
			} else if (age >= 65) {
				if (coverage === "Employee Only") {
					premiumAmount = 15.05;
				} else {
					premiumAmount = 16.03;
				}
			}
		} else if (benefitAmount == 20000.0) {
			if (age >= 18 && age <= 39) {
				if (coverage === "Employee Only") {
					premiumAmount = 1.94;
				} else {
					premiumAmount = 4.18;
				}
			} else if (age >= 40 && age <= 59) {
				if (coverage === "Employee Only") {
					premiumAmount = 11.07;
				} else {
					premiumAmount = 21.47;
				}
			} else if (age >= 60 && age <= 64) {
				if (coverage === "Employee Only") {
					premiumAmount = 19.16;
				} else {
					premiumAmount = 37.48;
				}
			} else if (age >= 65) {
				if (coverage === "Employee Only") {
					premiumAmount = 29.75;
				} else {
					premiumAmount = 55.9;
				}
			}
		} else if (benefitAmount == 30000.0) {
			if (age >= 18 && age <= 39) {
				if (coverage === "Employee Only") {
					premiumAmount = 2.77;
				} else {
					premiumAmount = 5.91;
				}
			} else if (age >= 40 && age <= 59) {
				if (coverage === "Employee Only") {
					premiumAmount = 16.44;
				} else {
					premiumAmount = 31.79;
				}
			} else if (age >= 60 && age <= 64) {
				if (coverage === "Employee Only") {
					premiumAmount = 28.57;
				} else {
					premiumAmount = 55.81;
				}
			} else if (age >= 65) {
				if (coverage === "Employee Only") {
					premiumAmount = 44.46;
				} else {
					premiumAmount = 83.44;
				}
			}
		}
	}

	return premiumAmount;
};
