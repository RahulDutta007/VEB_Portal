import { model, Schema } from "mongoose";
import { IOTP } from "../../@types/interface/otp.interface";

const OTPSchema: Schema<IOTP> = new Schema(
  {
    email: {
      type: String,
      required: [true, "email"]
    },
    otp: {
      type: Number
    },
    createdAt: {
      type: Date
    }
  }
);

const OTPModel = model("otpvalidation", OTPSchema);
export default OTPModel;
