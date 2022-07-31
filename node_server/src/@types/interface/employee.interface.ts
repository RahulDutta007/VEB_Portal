import { ObjectId, SchemaDefinitionProperty, Types } from "mongoose";
import { Role } from "../enum/roles.enum";
import { Gender } from "../enum/gender.enum";
import { MaritalStatus } from "../enum/marital.status.enum";
import { UploadType } from "../enum/upload.type.enum";
import { IObjectId } from "../objectId.interface";

export interface IEmployeeSchema {
	member_id: string;
	password: string;
	email: string;
	employee_number: number;
	group_number: number;
	location_number: number;
	employement_start_date: SchemaDefinitionProperty<Date | null>;
	employement_end_date: SchemaDefinitionProperty<Date | null>;
	employee_class: string;
	employement_status: string | null;
	term_date: SchemaDefinitionProperty<Date | null>;
	reason: Gender | null;
	updated_by: string | null;
	created_by: string | null;
	created_date: number | null;
	date: Date | null;
	otp: number | null;
}

export interface IEmployeeUser extends IEmployeeSchema, IObjectId { }
