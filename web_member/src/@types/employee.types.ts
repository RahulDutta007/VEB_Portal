export type Gender = "MALE" | "FEMALE" | "OTHERS" | null;

export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "COMMON LAW MARRIAGE" | null;

export type ContactLabel = "BUSINESS" | "HOME" | "MAIL" | "MOBILE" | "OTHER" | null;

export type UploadType = "MANUAL" | "BULK" | "MIGRATED";

export type Employee = {
	_id: string;
	member_id: string | null; // This Id is mapped with Group HR (Group Specific)
	employee_number: number | null; //This Id will be from WLT DB
	dependent_number: number | null; //This Id will be from WLT DB
	employee_wlt_id: string | null;
	dependent_wlt_id: string | null;
	group_number: number | null;
	location_number: number | null;
	first_name: string;
	middle_name: string | null;
	last_name: string;
	user_name: string | null;
	password: string | null;
	role: "EMPLOYEE" | "DEPENDENT";
	email: string;
	SSN: string;
	employee_SSN: string;
	date_of_birth: string;
	gender: Gender;
	dependent_type: string | null;
	marital_status: MaritalStatus;
	relationship: string | null;
	upload_type: UploadType;
	address_line_1: string | null;
	address_line_2: string | null;
	city: string | null;
	state: string | null;
	country: string | null;
	ZIP: string | null;
	contact_label: ContactLabel;
	phone_number: number | null;
	phone_extension: number | null;
	hire_date: string;
	hire_location_number: number | null;
	dependent_benefit_term_reason: string | null;
	employee_status: string | null;
	dependent_status: string | null;
	dependent_profile_access: boolean;
	is_registered: boolean;
	is_active: boolean; // This field is for chat support, that whether the user is online or not.
	is_term: boolean;
	term_date: string;
	term_reason: string | null;
	event_date: string;
	event_name: string | null;
	event_document: Record<string, unknown> | null;
	date: string;
	last_login_date: string;
};
