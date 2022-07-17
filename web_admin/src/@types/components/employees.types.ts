export type EmployeesTypes = {
	employee_id: string;
	employee_number: number | null;
	dependent_number: number | null;
	first_name: string;
	middle_name?: string;
	last_name: string;
	role: string;
	SSN: number | null;
	date_of_birth: Date | null;
	gender: "Male" | "Female" | "Others" | null;
	dependent_type: "D-Dependent" | "Not Eligible" | null;
	marital_status: "Single" | "Married" | "Divorced" | "Common Law Marriage" | null;
	relationship:
		| "Spouse"
		| "Son"
		| "Daughter"
		| "Stepchild"
		| "Court-Ordered Dependent"
		| "Legal Custody Child"
		| "Disabled Child"
		| "Grandchild"
		| null;
	email: string;
	user_name: string;
	password: string;
	upload_type: "Manual" | "Bulk" | "Migrat" | null;
	address_line_1: string;
	address_line_2?: string;
	city: string;
	state: string;
	country: string;
	ZIP: string;
	contact_label: "Business" | "Home" | "Mail" | "Mobile" | "Other" | null;
	phone_number: number | null;
	phone_extension: number | null;
	group_number: number | null;
	location_name: string;
	hire_date: Date | null;
	employment_status: "ACTIVE" | "INACTIVE" | "RELIEVED" | null;
	dependent_profile_access: boolean | null;
	is_registered: boolean | null;
	event_date: Date | null;
	event_name: "Marriage" | "Birth of Baby" | "Adoption or Placement for Adoption of a Child" | "Others" | null;
	event_document: any;
	employee_profile_access: boolean | null;
	created_by: any;
	last_login_date: Date | null;
};
