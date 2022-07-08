import { ObjectId, SchemaDefinitionProperty, Types } from "mongoose";
import { Role } from "../enum/roles.enum";
import { Gender } from "../enum/gender.enum";
import { MaritalStatus } from "../enum/marital.status.enum";
import { UploadType } from "../enum/upload.type.enum";

export interface EmployeeSchema {
	member_object_id: Types.ObjectId;
	member_id: string;
	employee_number: number;
	group_number: number;
	location_number: number;
	employement_start_date: SchemaDefinitionProperty<Date | null>;
	employement_end_date: Role;
	employee_class: string;
	employement_status: string | null;
	term_date: SchemaDefinitionProperty<Date | null>;
	reason: Gender | null;
	updated_by: MaritalStatus | null;
	created_by: string | null;
	created_date: number | null;
	date: string | null;
}