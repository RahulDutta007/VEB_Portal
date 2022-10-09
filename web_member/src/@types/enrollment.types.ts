export type OpenEnrollment = {
	plan_name: string;
	status: "ENROLLED" | "WAIVED";
};

export type EnrollmentCommonDetails = {
	agent_id: string | null;
	location_number: number;
	location_name: string;
	group_number: number;
	group_name: string;
	plan_object_id: string | null;
	plan_code: string;
	enrollment_status: string;
	insured_object_id: string;
	insured_SSN: string;
	unenrolled_reason: string | null;
	waive_reason: string | null;
	termination_reason: string | null;
	enrollment_date: string | null;
	effective_date: string | null;
	termination_date: Date | null;
	open_enrollment_id: string | null;
};

export type EnrollmentStandardDetails = {
	member_object_id: string;
	coverage_code: string;
	member_SSN: string;
	premium_amount: number | null;
	benefit_amount?: number | null;
};

export type Enrollment = {
	common_details: EnrollmentCommonDetails;
	dep_SSNs: string[];
	standard_details: EnrollmentStandardDetails[];
};
