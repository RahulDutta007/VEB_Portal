import { type } from "os";
import { PayFrequency } from "./paycheck.types";

export type Coverage = ["Employee Only", "Employee & Spouse", "Employee & Dependent", "Employee & Family"];

export type PaycheckFrequency = {
	[key in PayFrequency]: number;
};

export type CancerPlanCoverageLevel = {
	"High Plan": PaycheckFrequency;
	"Low Plan": PaycheckFrequency;
};

export type CancerPlanCoverage = {
	"Employee Only": CancerPlanCoverageLevel;
	"Employee & Spouse": CancerPlanCoverageLevel;
	"Employee & Dependents": CancerPlanCoverageLevel;
	"Employee & Family": CancerPlanCoverageLevel;
};

export type CancerPlanPremiumAmount = {
	standard_premium: CancerPlanCoverage;
	rider_premium: CancerPlanCoverage;
};

export type CancerPlanDetails = {
	coverage: string[];
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

export type HospitalIndemnityPlanDetails = {
	coverage: string[];
	coverage_level: ["Plan 1", "Plan 2", "Plan 3", "Plan 4"];
	premium_amount: HospitalIndemnityPremiumAmount;
};

export type HospitalIndemnityPremiumAmount = {
	standard_premium: HospitalIndemnityPlanCoverage;
};

export type HospitalIndemnityPlanCoverageLevel = {
	"Plan 1": PaycheckFrequency;
	"Plan 2": PaycheckFrequency;
	"Plan 3": PaycheckFrequency;
	"Plan 4": PaycheckFrequency;
};

export type HospitalIndemnityPlanCoverage = {
	"Employee Only": HospitalIndemnityPlanCoverageLevel;
	"Employee & Spouse": HospitalIndemnityPlanCoverageLevel;
	"Employee & Dependents": HospitalIndemnityPlanCoverageLevel;
	"Employee & Family": HospitalIndemnityPlanCoverageLevel;
};

export type AccidentPlanDetails = {
	coverage: string[];
	coverage_level: ["Edge Enhanced", "Edge Premier"];
	premium_amount: AccidentPremiumAmount;
};

export type AccidentPremiumAmount = {
	standard_premium: AccidentPlanCoverage;
};

export type AccidentPlanCoverage = {
	"Employee Only": AccidentPlanCoverageLevel;
	"Employee & Spouse": AccidentPlanCoverageLevel;
	"Employee & Dependents": AccidentPlanCoverageLevel;
	"Employee & Family": AccidentPlanCoverageLevel;
};

export type AccidentPlanCoverageLevel = {
	"Edge Enhanced": PaycheckFrequency;
	"Edge Premier": PaycheckFrequency;
};

export type AccidentRiderPlanDetails = {
	rider_type: ["Rider Accident Only", "Rider Accident Only"];
	monthly_benefit: [600, 900, 1200, 1800];
	standard_premium: AccidentRiderPlanCoverage;
};

export type AccidentRiderPlanCoverage = {
	"Rider Accident Only": PaycheckArrayFrequency;
	"Rider Accident And Sickness": PaycheckArrayFrequency;
};

export type PaycheckArrayFrequency = {
	[key in PayFrequency]: AccidentPremiumBenefit[];
};

export type AccidentPremiumBenefit = {
	coverageAmount: number;
	premiumAmount: number;
};

export type AccidentDocAndRxPlanDetails = {
	standard_premium: PaycheckFrequency;
};
