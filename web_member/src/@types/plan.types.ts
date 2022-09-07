import { type } from "os";

export type Coverage = ["Employee Only", "Employee & Spouse", "Employee & Dependent", "Employee & Family"];

export type CancerPlanCoverageLevel = {
	"High Plan": number;
	"Low Plan": number;
};

export type CancerPlanCoverage = {
	"Employee Only": CancerPlanCoverageLevel;
	"Employee & Family": CancerPlanCoverageLevel;
};

export type CancerPlanPremiumAmount = {
	standard_premium: CancerPlanCoverage;
	rider_premium: CancerPlanCoverage;
};

export type CancerPlanDetails = {
	coverage: ["Employee Only", "Employee & Family"];
	coverage_level: ["High Plan", "Low Plan"];
	premium_amount: CancerPlanPremiumAmount;
};

export type CriticalIllnessCoverageLevel = {
	"With Cancer": number | null;
	"Without Cancer": number | null;
};

export type CriticalIllnessBenefitLevel = {
	10000.0: CriticalIllnessCoverageLevel;
	20000.0: CriticalIllnessCoverageLevel;
	30000.0: CriticalIllnessCoverageLevel;
};

export type CriticalIllnessPlanCoverage = {
	"Employee Only": CriticalIllnessBenefitLevel;
	"Employee & Spouse": CriticalIllnessBenefitLevel;
	"Employee & Dependent": CriticalIllnessBenefitLevel;
	"Employee & Family": CriticalIllnessBenefitLevel;
};

export type CriticalIllnessPlanPremiumAmount = {
	standard_premium: CriticalIllnessPlanCoverage;
};

export type CriticalIllnessPlanDetails = {
	coverage: Coverage;
	coverage_level: ["With Cancer", "Without Cancer"];
	benefit_amount: [10000.0, 20000.0, 30000.0];
	premium_amount: CriticalIllnessPlanPremiumAmount;
};
