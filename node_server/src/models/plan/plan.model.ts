import { model, Schema } from "mongoose";
import { IPlan } from "../../@types/interface/plan.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";
import { PLAN_STATUS } from "../../constants/planStatus";

const PlanSchema: Schema<IPlan> = new Schema({
	plan_name: {
		type: String,
		required: [true, "Plan name is required"]
	},
	plan_code: {
		type: String,
		required: [true, "Plan code is required"]
	},
	start_date: {
		type: Date,
		required: [true, "Start date is required"]
	},
	end_date: {
		type: Date,
		default: null
	},
	status: {
		type: String,
		enum: [PLAN_STATUS.active, PLAN_STATUS.expired, null],
		default: null
	},
	created_by: {
		type: String,
		required: true,
		ref: "veb_group_owners"
	}
}, GENERAL_SCHEMA_OPTIONS);

const PlanModel = model("veb_plans", PlanSchema);
export default PlanModel;
