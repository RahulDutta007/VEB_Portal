import { Gender, MaritalStatus, UploadType } from "./member.types";
import { Role } from "./role.types";

export type GroupOwner = {
	user_name: string; // This Id is mapped with Group HR (Group Specific)
	admin_id: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	role: string;
	SSN: string;
	reenterSSN?: string;
	date_of_birth: string;
	hire_date: string;
	gender: string;
	marital_status: string;
	email: string;
	address_line_1: null;
	address_line_2: null;
	city: string;
	state: string;
	country: string;
	ZIP: string;
	contact_label: null;
	phone_number: null;
	phone_extension: null;
	group_number: null;
};
