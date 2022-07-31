import { number } from "joi";
import { model, Schema } from "mongoose";
import { IAdminSchema } from "../../@types/interface/admin.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { ROLES } from "../../constants/roles";
import { GENDER } from "../../constants/gender";
import { MARITAL_STATUS } from "../../constants/marital.status";
import { UPLOAD_TYPE } from "../../constants/upload.types";

const AdminRegisterSchema: Schema<IAdminSchema> = new Schema(
	{
		admin_id: {
			type: String,
			required: [true, "Admin id is required"]
		},
		first_name: {
			type: String,
			required: [true, "First name is required"]
		},
		last_name: {
			type: String,
			required: [true, "First name is required"]
		},
		middle_name: {
			type: String
		},
		user_name: {
			type: String,
			required: [true, "Username is required"]
		},
		password: {
			type: String,
			minlength: [7, "Password should have at least 7 character"]
		},
		role: {
			type: String,
			required: [true, "Please provide a role"],
			enum: [ROLES.admin, ROLES.enroller_admin, ROLES.agent]
		},
		email: {
			type: String,
			required: true
		},
		SSN: {
			type: String,
			required: true,
			length: [9, "SSN should be 9 digit"]
		},
		date_of_birth: {
			type: Date,
			default: null
		},
		gender: {
			type: String,
			enum: [GENDER.male, GENDER.female, GENDER.others]
		},
		marital_status: {
			type: String,
			enum: [
				MARITAL_STATUS.single,
				MARITAL_STATUS.married,
				MARITAL_STATUS.divorced,
				MARITAL_STATUS.common_law_marriage
			]
		},
		address_line_1: {
			type: String,
			default: null
		},
		group_number: {
			type: Number,
			default: null
		},
		address_line_2: {
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
		country: {
			type: String,
			default: null
		},
		ZIP: {
			type: String,
			default: null
		},
		contact_label: {
			type: String,
			default: null
		},
		phone_number: {
			type: Number,
			default: null
		},
		phone_extension: {
			type: Number,
			default: null
		},
		is_active: {
			type: Boolean,
			default: null
		},
		is_member_chat_support: {
			type: Boolean,
			default: null
		},
		is_employer_chat_support: {
			type: Boolean,
			default: null
		},
		hire_date: {
			type: Date,
			default: null
		},
		upload_type: {
			type: String,
			enum: [UPLOAD_TYPE.bulk, UPLOAD_TYPE.manual, UPLOAD_TYPE.migrated]
		},
		created_by: {
			type: String,
			default: null
		},
		created_date: {
			type: Date,
			default: null
		},
		is_registered: {
			type: Boolean,
			default: null
		},
		writing_number: {
			type: Number,
			default: null
		},
		enroller_id: {
			type: String,
			default: null
		},
		otp: {
			type: Number
		}
	},
	GENERAL_SCHEMA_OPTIONS
);

const AdminModel = model("useradmin", AdminRegisterSchema);
export default AdminModel;
