import { ObjectId, SchemaDefinitionProperty, Types } from "mongoose";
import { Role } from "../enum/roles.enum";
import { Gender } from "../enum/gender.enum";
import { MaritalStatus } from "../enum/marital.status.enum";
import { UploadType } from "../enum/upload.type.enum";
import { IObjectId } from "./objectId.interface";

export interface IAdminSchema {
	admin_id: string;
	first_name: string;
	last_name: string;
	middle_name: string | null;
	user_name: string;
	password: string | null;
	role: Role;
	email: string;
	SSN: string | null;
	date_of_birth: SchemaDefinitionProperty<Date | null>;
	gender: Gender | null;
	marital_status: MaritalStatus | null;
	address_line_1: string | null;
	group_number: number | null;
	address_line_2: string | null;
	city: string | null;
	state: string | null;
	country: string | null;
	ZIP: string | null;
	contact_label: string | null;
	phone_number: number | null;
	phone_extension: number | null;
	is_active: boolean | null;
	is_member_chat_support: boolean | null;
	is_employer_chat_support: boolean | null;
	hire_date: SchemaDefinitionProperty<Date | null>;
	upload_type: UploadType | null;
	created_by: string | null;
	created_date: SchemaDefinitionProperty<Date | null>;
	is_registered: boolean | null;
	writing_number: number | null;
	enroller_id: string | null;
	otp: number | null;
}

export interface IAdminUser extends IAdminSchema, IObjectId { }
