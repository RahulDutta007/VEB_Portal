import { model, Schema } from "mongoose";
import { IVEBOpenEnrollmentSchema } from "../../@types/interface/VEBOpenEnrollment.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";

const VEBOpenEnrollmentSchema = new Schema<IVEBOpenEnrollmentSchema>({
	employee_SSN: {
		type: String,
		ref: "members",
		required: true
	},
	group_number: {
		type: Number,
		ref: "groups",
		required: true
	},
	type: {
		type: String,
		enum: ["HIRE", "SPECIAL", "YEARLY"],
		required: true
	},
	action: {
		type: Boolean,
		default: false
	},
	start_date: {
		type: Date,
		required: true
	},
	end_date: {
		type: Date,
		default: null
	},
}, GENERAL_SCHEMA_OPTIONS);

const VEBOpenEnrollmentModel = model("VEB_open_enrollments", VEBOpenEnrollmentSchema);

export default VEBOpenEnrollmentModel;