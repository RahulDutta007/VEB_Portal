import { Schema } from "mongoose";
import { ObjectId, SchemaDefinitionProperty, Types } from "mongoose";
import { type } from "os";

export type CoverageCode = "EE" | "EESP" | "EECH" | "EECHS" | "EEFM" | "EEALL";
export type EnrollmentStatus = "OPEN" | "SUBMITTED" | "REJECTED" | "WAIVED" | "CLOSED" | "ACTIVE";

export type StandardDetailType = {
	member_object_id: SchemaDefinitionProperty<Types.ObjectId> | null;
	coverage_code: string;
	member_SSN: string;
	premium_amount: number | null;
	is_tobacco: boolean;
};

export type CommonDetailType = {
	agent_id: SchemaDefinitionProperty<Types.ObjectId> | null;
	location_number: number;
	location_name: string;
	group_number: number;
	group_name: string;
	plan_object_id: SchemaDefinitionProperty<Types.ObjectId> | null;
	plan_code: string;
	enrollment_status: string;
	insured_object_id: SchemaDefinitionProperty<Types.ObjectId> | null;
	insured_SSN: string;
	writing_number: number | null;
	unenrolled_reason: string | null;
	waive_reason: string | null;
	termination_reason: string | null;
	enrollment_date: Date;
	effective_date: Date | null;
	termination_date: Date | null;
	open_enrollment_id: SchemaDefinitionProperty<Types.ObjectId> | null;
};

export type AddEnrollmentType = {
	common_details: CommonDetailType;
	standard_details: StandardDetailType[];
};

/*

{
	weekly:{
		EE:"118.13",
		EECHS:"163.88",
		EECH:"188.88",
		EEFM:"225.70",
		EESP:"209.62",
		EEALL:"246.09"
	},
	monthly:{
		EE:"512.25",
		EECHS:"727.13",
		EECH:"827.13",
		EEFM:"996.36",
		EESP:"910.02",
		EEALL:"1076.36"
	}
}

*/
