import { Member } from "./member.types";
import { Role } from "./role.types";

export type User = {
	_id?: string;
	first_name: string;
	middle_name?: string | null;
	last_name: string;
	user_name: string | null;
	password: string | null;
	role: Role;
	group_number: number | null;
	email: string;
	SSN: string | null;
	date_of_birth: number;
	gender: Gender;
	marital_status: MaritalStatus;
	address_line_1: string | null;
	address_line_2: string | null;
	city: string | null;
	state: string | null;
	country: string | null;
	ZIP: string | null;
	contact_label: ContactLabel;
	phone_number: number | null;
	phone_extension: number | null;
	is_registered: boolean; // This field is for checking whether the user is registered or not.
	is_disabled: boolean; // This field is to disable Group Owners from accessing their Profile (i.e if is_disabled = true, then particular owner will not able to login)
	is_active: boolean; // This field is for chat support, that whether the user is online or not.
	is_employer_chat_support: boolean;
	is_member_chat_support: boolean;
	hire_date: number;
	upload_type: UploadType;
	subscription: {
		statement_of_understanding: {
			email: boolean;
			notification: boolean;
		};
		registration_help: {
			email: boolean;
			notification: boolean;
		};
		dependent_creation: {
			email: boolean;
			notification: boolean;
		};
		dependent_registration: {
			email: boolean;
			notification: boolean;
		};
		employee_creation: {
			email: boolean;
			notification: boolean;
		};
		employee_registration: {
			email: boolean;
			notification: boolean;
		};
		employer_creation: {
			email: boolean;
			notification: boolean;
		};
		employer_registration: {
			email: boolean;
			notification: boolean;
		};
		admin_creation: {
			email: boolean;
			notification: boolean;
		};
		admin_registration: {
			email: boolean;
			notification: boolean;
		};
		super_admin_registration: {
			email: boolean;
			notification: boolean;
		};
		employee_address_change: {
			email: boolean;
			notification: boolean;
		};
		benefit_change: {
			email: boolean;
			notification: boolean;
		};
		reinstate_enrollment: {
			email: boolean;
			notification: boolean;
		};
		rehire_enrollment: {
			email: boolean;
			notification: boolean;
		};
		termination: {
			email: boolean;
			notification: boolean;
		};
		new_hire_enrollment: {
			email: boolean;
			notification: boolean;
		};
		plan_submission: {
			email: boolean;
			notification: boolean;
		};
		grievance_logged: {
			email: boolean;
			notification: boolean;
		};
	};
	last_login_date: number;
};

export type UploadType = "MANUAL" | "BULK" | "MIGRATED";

export type MaritalStatus = "SINGLE" | "MARRIED" | "DIVORCED" | "COMMON LAW MARRIAGE" | null;

export type Gender = "MALE" | "FEMALE" | "OTHERS";

export type ContactLabel = "BUSINESS" | "HOME" | "MAIL" | "MOBILE" | "OTHER" | null;

export type ChangePassword = {
	old_password: string;
	new_password: string;
	confirm_password: string;
	user_name: string;
};

export type AssignedPaginatedMembers = {
	totalDocuments: number;
	totalPages: number;
	totalDocumentsPerPage: number;
	pagination: any;
	members: Member[];
};
