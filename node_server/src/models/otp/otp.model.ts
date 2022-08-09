import { Schema, model } from "mongoose";
import { IOTPSchema } from "../../@types/interface/otp.interface";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOption";

const OTPSchema: Schema<IOTPSchema> = new Schema(
	{
		otp: {
			type: String
		},
		expiration_time: {
			type: Date
		},
		verified: {
			type: Boolean,
			default: false
		}
	},
	GENERAL_SCHEMA_OPTIONS
);

const OTPModel = model<IOTPSchema>("OTP", OTPSchema);
export default OTPModel;
