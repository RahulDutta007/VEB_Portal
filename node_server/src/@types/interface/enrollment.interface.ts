import { ObjectId, SchemaDefinitionProperty, Types } from "mongoose";
import { CoverageCode, EnrollmentStatus } from "../types/enrollment.types";

export interface IEnrollmentSchema {
	agent_id: SchemaDefinitionProperty<Types.ObjectId> | null;
	member_object_id: SchemaDefinitionProperty<Types.ObjectId>;
	location_number: number;
	location_name: string;
	group_number: number;
	group_name: string;
	member_SSN: string;
	plan_object_id: SchemaDefinitionProperty<Types.ObjectId>;
	plan_code: string;
	coverage_code: CoverageCode;
	enrollment_status: EnrollmentStatus;
	premium_amount: number | null;
	enrollment_date: Date;
	effective_date: Date | null;
	insured_object_id: SchemaDefinitionProperty<Types.ObjectId>;
	insured_SSN: string;
	is_tobacco: boolean;
	unenrolled_reason: string | null;
	waive_reason: string | null;
	termination_reason: string | null;
	termination_date: Date | null;
	writing_number: number | null;
	open_enrollment_id: SchemaDefinitionProperty<Types.ObjectId> | null;
	stakeholder: string | null;
	flexa_premium: number | null;
	flexb_premium: number | null;
}

// convert to type
