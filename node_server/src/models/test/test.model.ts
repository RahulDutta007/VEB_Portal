import { model, Schema } from "mongoose";
import { ITestSchema } from "../../@types/test.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";

const testSchema: Schema<ITestSchema> = new Schema(
	{
		first_name: {
			type: String,
			required: true
		},
		last_name: {
			type: String,
			required: true
		}
	},
	GENERAL_SCHEMA_OPTIONS
);

const testModel = model("tests", testSchema);
export default testModel;
