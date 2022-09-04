import { SchemaDefinitionProperty } from "mongoose";

export interface IGroupSchema {
	populated_group_logo: number;
	name: string | null;
	MST_number: number;
	group_number: number;
	TAX_ID: number | null;
	physical_name: string | null;
	address_1: string | null;
	address_2: string | null;
	city: string | null;
	state: string | null;
	ZIP: string | null;
	email: string | null;
	phone: string | null;
	fax: string | null;
	medical_coverage: string | null;
	dental_coverage: string | null;
	vision_coverage: string | null;
	drug_coverage: string | null;
	miscellaneous_coverage: string | null;
	life_coverage: string | null;
	LTD_coverage: string | null;
	STD_coverage: string | null;
	medical_bank: number | null;
	vision_bank: number | null;
	dental_bank: number | null;
	drug_bank: number | null;
	miscellaneous_bank: number | null;
	expense_bank: number | null;
	LTD_bank: number | null;
	STD_bank: number | null;
	flex_bank: number | null;
	group_key: number | null;
	master_key: number | null;
	rest_SSN: string | null;
	HRA_begin_date: SchemaDefinitionProperty<Date> | null;
	OON_PPO: number | null;
	OON_reprise: string | null;
	M_reporting: string | null;
	OON_auto_medical: string | null;
	OON_auto_dental: string | null;
	OON_auto_visit: string | null;
	OON_auto_drug: string | null;
	OON_auto_miscellaneous: string | null;
	OON_auto_mental_nervous: string | null;
	physical_address_1: string | null;
	physical_address_2: string | null;
	physical_city: string | null;
	physical_state: string | null;
	physical_zip_code: string | null;
	name_2: string | null;
	physical_name_2: string | null;
}

export interface IGroupBrandingSchema {
	group_number: number;
	logo: Record<string, unknown> | null | Express.Multer.File;
	favicon: Record<string, unknown> | null | Express.Multer.File;
}
