import { number } from "joi";
import { model, Schema } from "mongoose";
import { IEmployeeSchema } from "../../@types/interface/employee.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { ROLES } from "../../constants/roles";
import { GENDER } from "../../constants/gender";
import { MARITAL_STATUS } from "../../constants/marital.status";
import { UPLOAD_TYPE } from "../../constants/upload.types";

const MemberRegisterSchema: Schema<IEmployeeSchema> = new Schema(
	{
		member_id: {
			type: String,
			required: [true, "Member Id is required"]
		},
		email: {
			type: String,
			required: [true, "Email is required"]
		},
		employee_number: {
			type: Number
		},
		password: {
			type: String
		},
		group_number: {
			type: Number
		},
		location_number: {
			type: Number
		},
		employement_start_date: {
			type: Date
		},
		employement_end_date: {
			type: Date
		},
		employee_class: {
			type: String
		},
		term_date: {
			type: Date
		},
		reason: {
			type: String
		},
		updated_by: {
			type: String
		},
		created_by: {
			type: String
		},
		created_date: {
			type: Date
		},
		date: {
			type: Date,
			default: null
		}
	},
	GENERAL_SCHEMA_OPTIONS
);

const EmployeeRegisterModel = model("EmployeeRegister", MemberRegisterSchema);
export default EmployeeRegisterModel;
