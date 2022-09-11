export type EmployeeClass = "PT - Part Time" | "FT - Full Time" | "PTIN - Part Time Insurance Eligible";

export type PaycheckStatus = "ACTIVE" | "ENDED";

export type PayFrequency = "WEEKLY" | "MONTHLY";

export type RateType = "FLAT RATE" | "HOURLY RATE";

export type PaycheckOperation = "CREATE" | "EDIT";

export type EmploymentStatus = "ACTIVE" | "ENDED" | "TERM" | "REINSTATE";

export type Paycheck = {
	member_object_id: string;
	member_id: string;
	employment_id: string; // This field is to generate the UID
	employee_SSN: string;
	group_number: number;
	location_number: number;
	employment_start_date: string;
	employment_end_date: string | null;
	employee_class: EmployeeClass;
	employment_status: EmploymentStatus;
	paycheck_start_date: string;
	paycheck_end_date: string | null;
	pay_frequency: PayFrequency;
	rate_type: RateType;
	hourly_base_pay_rate: number | 0;
	weekly_base_rate: number | 0;
	monthly_base_rate: number | 0;
	buy_up_eligibility: boolean;
	paycheck_status: PaycheckStatus;
	paycheck_operation: PaycheckOperation;
	updated_by: string | Record<string, unknown> | null;
	loa_start_date: Date | null;
	loa_end_date: Date | null;
};
