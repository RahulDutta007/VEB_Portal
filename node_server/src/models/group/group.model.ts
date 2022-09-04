import { number } from "joi";
import { Schema, model } from "mongoose";
import { IGroupSchema } from "../../@types/interface/group.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";

const groupSchema: Schema<IGroupSchema> = new Schema(
	{
		name: {
			type: String,
			default: null
		},
		MST_number: {
			// Master Group Number - Say Nexcaliber, Trueblue
			type: Number,
			required: true,
			default: 0
		},
		group_number: {
			type: Number,
			required: true
		},
		TAX_ID: {
			type: Number,
			default: null
		},
		physical_name: {
			type: String,
			default: null
		},
		address_1: {
			type: String,
			default: null
		},
		address_2: {
			type: String,
			default: null
		},
		city: {
			type: String,
			default: null
		},
		state: {
			type: String,
			default: null
		},
		ZIP: {
			type: String,
			default: null
		},
		email: {
			type: String,
			default: null
		},
		phone: {
			type: String,
			default: null
		},
		fax: {
			type: String,
			default: null
		},
		medical_coverage: {
			type: String
			// // enum : ['T','F'],
		},
		dental_coverage: {
			type: String
			// enum : ['T','F'],
		},
		vision_coverage: {
			type: String
			// enum : ['T','F']
		},
		drug_coverage: {
			type: String
			// enum : ['T','F']
		},
		miscellaneous_coverage: {
			type: String
			// enum : ['T','F']
		},
		life_coverage: {
			type: String
			// enum : ['T','F']
		},
		LTD_coverage: {
			type: String
			// enum : ['T','F']
		},
		STD_coverage: {
			type: String
			// enum : ['T','F']
		},
		medical_bank: {
			type: Number,
			default: null
		},
		vision_bank: {
			type: Number,
			default: null
		},
		dental_bank: {
			type: Number,
			default: null
		},
		drug_bank: {
			type: Number,
			default: null
		},
		miscellaneous_bank: {
			type: Number,
			default: null
		},
		expense_bank: {
			type: Number,
			default: null
		},
		LTD_bank: {
			type: Number,
			default: null
		},
		STD_bank: {
			type: Number,
			default: null
		},
		flex_bank: {
			type: Number,
			default: null
		},
		group_key: {
			type: Number,
			default: null
		},
		master_key: {
			type: Number,
			default: null
		},
		rest_SSN: {
			type: String,
			default: null
		},
		HRA_begin_date: {
			type: Date,
			default: null
		},
		OON_PPO: {
			type: Number,
			default: null
		},
		OON_reprise: {
			type: String,
			default: null
		},
		M_reporting: {
			type: String,
			default: null
		},
		OON_auto_medical: {
			type: String
		},
		OON_auto_dental: {
			type: String
		},
		OON_auto_visit: {
			type: String
		},
		OON_auto_drug: {
			type: String
		},
		OON_auto_miscellaneous: {
			type: String
		},
		OON_auto_mental_nervous: {
			type: String
		},
		physical_address_1: {
			type: String
		},
		physical_address_2: {
			type: String
		},
		physical_city: {
			type: String
		},
		physical_state: {
			type: String
		},
		physical_zip_code: {
			type: String
		},
		name_2: {
			type: String
		},
		physical_name_2: {
			type: String
		}
	},
	{
		...GENERAL_SCHEMA_OPTIONS,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
);

groupSchema.virtual("branding", {
	ref: "group_brandings",
	localField: "group_number",
	foreignField: "group_number",
	justOne: true
});

const groupModel = model<IGroupSchema>("groups", groupSchema);
export default groupModel;
