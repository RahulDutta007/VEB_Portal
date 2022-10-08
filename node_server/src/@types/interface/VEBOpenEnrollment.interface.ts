import { SchemaDefinitionProperty, Types } from "mongoose";
import { IObjectId } from "../objectId.interface";
import { ICreated } from "./general.interface";

export type OpenEnrollmentType = "HIRE" | "SPECIAL" | "YEARLY";

export interface IVEBOpenEnrollmentSchema extends ICreated {
	employee_SSN: string;
	group_number: number;
	type: OpenEnrollmentType;
	action: boolean;
	start_date: SchemaDefinitionProperty<Date>;
	end_date: SchemaDefinitionProperty<Date | null>;
}

export interface IVEBOpenEnrollment extends IVEBOpenEnrollmentSchema, IObjectId { }