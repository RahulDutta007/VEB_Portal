export type dependentTypes = {
	employee_number: number | null;
	first_name: string;
	middle_name?: string;
	last_name: string;
	email: string;
	SSN: number | null;
	date_of_birth: string;
	dependent_type: "D-Dependent" | "Not Eligible" | null;
	gender: "Male" | "Female" | "Transgender" | null;
	relationship:
		| "Daughter"
		| "Son"
		| "Stepchild"
		| "Court-Ordered Dependent"
		| "Legal Custody Child"
		| "Disabled Child"
		| "Grandchild"
		| "Spouse"
		| null;
	address_line_1: string;
	address_line_2?: string;
	city: string;
	state: string;
	country: string;
	ZIP: string;
	contact_label: "Business" | "Home" | "Mail" | "Mobile" | "Other" | null;
	event_date: Date | null;
	event_name: string;
	event_document: any;
};
