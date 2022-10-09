import { type } from "os";
import { PayFrequency } from "./paycheck.types";

export type PlanStatus = "ACTIVE" | "EXPIRED";

export type Plan = {
	_id?: string;
	plan_code: string;
	plan_name: string;
	start_date: string;
	end_date: string;
	has_end_date: boolean;
	status?: PlanStatus;
};

export type Coverage = ["Employee Only", "Employee & Spouse", "Employee & Dependent", "Employee & Family"];
export type STDEmployeeBenefitAmount =
	| 1500
	| 1450
	| 1400
	| 1350
	| 1300
	| 1250
	| 1200
	| 1150
	| 1100
	| 1050
	| 1000
	| 950
	| 900
	| 850
	| 800
	| 750
	| 700
	| 650
	| 600
	| 550
	| 500
	| 450
	| 400
	| 350
	| 300
	| 250
	| 200
	| 150
	| 100;
type AccidentBenefitAmounts = 600 | 900 | 1200 | 1800;
type STDDependentBenefitAmount = 350 | 300 | 250 | 200 | 150 | 100;
export type STDAgeGroup = "18-49" | "50-59" | "60-64";

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

export type VisionPlanCoverageLevel = {
	"Monthly": PaycheckFrequency;
	"Weekly": PaycheckFrequency;
};

export type VisionPlanCoverage = {
	"Employee Only": VisionPlanCoverageLevel;
	"Employee & Dependents": VisionPlanCoverageLevel;
	"Employee & Family": VisionPlanCoverageLevel;
};

export type VisionPlanPremiumAmount = {
	standard_premium: VisionPlanCoverage;
};

export type VisionPlanDetails = {
	coverage: string[];
	coverage_level: ["Monthly", "Weekly"];
	premium_amount: VisionPlanPremiumAmount;
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
//Beazley
export type BeazleyPlanDetails = {
	coverage: string[];
	coverage_level: ["Plan 2", "Plan 3", "Plan 4 with RX"];
	premium_amount: BeazleyPremiumAmount;
};

export type BeazleyPremiumAmount = {
	standard_premium: BeazleyStanderdPlanCoverage;
	rider_premium: BeazleyRiderPlanCoverage;
};

export type BeazleyStanderdPlanCoverage = {
	"Employee Only": BeazleyPlanCoverageLevel;
	"Employee & Spouse": BeazleyPlanCoverageLevel;
	"Employee & Dependents": BeazleyPlanCoverageLevel;
	"Employee & Family": BeazleyPlanCoverageLevel;
};

export type BeazleyRiderPlanCoverage = {
	"Employee Only": PaycheckFrequency;
	"Employee & Spouse": PaycheckFrequency;
	"Employee & Dependents": PaycheckFrequency;
	"Employee & Family": PaycheckFrequency;
};

export type BeazleyPlanCoverageLevel = {
	"Plan 2": PaycheckFrequency;
	"Plan 3": PaycheckFrequency;
	"Plan 4 with RX": PaycheckFrequency;
};

export type MacPlanDetails = {
	coverage: string[];
	benefit_amount: [3000, 1500, 5000];
	premium_amount: MacCoverage;
};

export type MacCoverage = {
	"Employee Only": MacBenefitAmount;
	"Employee & Spouse": MacBenefitAmount;
	"Employee & Dependents": MacBenefitAmount;
	"Employee & Family": MacBenefitAmount;
};

export type MacBenefitAmount = {
	1500: PaycheckFrequency;
	3000: PaycheckFrequency;
	5000: PaycheckFrequency;
};

export type ShortTermDisabilityPlanDetails = {
	coverage: string[];
	benefit: string[];
	benefit_amount: ShortTermDisabilityPlanCoverage;
};

export type ShortTermDisabilityPlanCoverage = {
	"Employee Only": ShortTermDisabilityCoverageLevel;
	"Employee & Spouse": ShortTermDisabilityCoverageLevel;
	"Employee & Dependents": ShortTermDisabilityCoverageLevel;
	"Employee & Family": ShortTermDisabilityCoverageLevel;
};

export type ShortTermDisabilityCoverageLevel = {
	"Non-Occupational(Elim Period accident: 0 Sickness: 7 Benefit Period: 6 Months)": PaycheckSTDArrayFrequency;
	"Non-Occupational(Elim Period accident: 14 Sickness: 14 Benefit Period: 6 Months)": PaycheckSTDArrayFrequency;
};

export type PaycheckSTDArrayFrequency = {
	[key in STDEmployeeBenefitAmount]: STDAgeGroups;
};

export type STDAgeGroups = {
	[key in STDAgeGroup]: PaycheckFrequency;
};

export type ShortTermDisabilityDependentPlanDetails = {
	[key in STDDependentBenefitAmount]: STDAgeGroups;
};

export type ShortTermDisabilityPremiumBenefit = {
	amount: number;
	premium_amount: number;
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
