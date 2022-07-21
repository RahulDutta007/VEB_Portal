export type Gender = "Male" | "Female" | "Others";
export type MaritalStatus = "Single" | "Married" | "Divorced" | "Common Law Marriage";
export type UploadType = "Manual" | "Bulk" | "Migrated";
export type ContactLabel = "Business" | "Home" | "Mail" | "Mobile" | "Other";
export type EmployementStatus = "Active" | "Relieved";
export type Employee = {
	employee_id: string;
	first_name: string;
	middle_name: string | null;
	class: string;
	last_name: string;
	SSN: number;
	date_of_birth: string;
	gender: Gender;
	marital_status: MaritalStatus;
	email: string;
	user_name: string;
	password?: string;
	upload_type: UploadType;
	address_line_1: string;
	address_line_2: string;
	city: string;
	state: string;
	country: string;
	ZIP: string;
	contact_label: ContactLabel;
	phone_number: number;
	phone_extension: number;
	group_number: number;
	hire_date: number;
	employement_status: EmployementStatus;
	dependent_profile_access: boolean;
	last_login_date: number;
	is_registered: boolean;
	_id?: string;
	_v?: number;
};