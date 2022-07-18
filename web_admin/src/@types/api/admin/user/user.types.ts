export type User = {
	approved_by: string | null;
	is_approved: boolean;
	is_member_support: boolean;
	is_employer_support: boolean;
	_id: string;
	first_name: string;
	last_name: string;
	middle_name: string;
	SSN: string;
	gender: string | null;
	city: string | null;
	zip: string | null;
	address_line_1: string | null;
	address_line_2: string | null;
	mobile: string | null;
	alternate_id: string | null;
	employee_id: string | null;
	last_login_date: string | null;
	date_of_birth: string | null;
	user_name: string | null;
	password: string | null;
	email: string | null;
	role: "Employee";
	assigned_groups: [
		{
			group_number: number | null;
			_id: string;
		}
	];
	date: string | null;
	__v: number;
	assigned_locations: [
		{
			location_name: string | null;
		}
	];
};
