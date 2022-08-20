import { model, Schema } from "mongoose";
import { IPlan } from "../../@types/interface/plan.interface";

const CreatedSchema = {
  by: {
    type: String,
    default: null
  },
  on: {
    type: Date,
    default: Date.now
  }
};

const PlanSchema: Schema<IPlan> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"]
    },
    code: {
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
    is_active: {
      type: Boolean,
      default: null
    },
    created: CreatedSchema
  }
);

const PlanModel = model("plan", PlanSchema);
export default PlanModel;
