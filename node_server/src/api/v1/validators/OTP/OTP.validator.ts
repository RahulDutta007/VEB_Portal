import Joi from "joi";
import { OTP_TYPE } from "../../../../constants/OTP/OTP";

export const sendOTPToEmailValidator = Joi.object({
	email: Joi.string().email().required(),
	type: Joi.valid(OTP_TYPE.verification, OTP_TYPE.change_Password)
});

export const verifyOTPValidator = Joi.object({
	verification_key: Joi.string().required(),
	otp: Joi.string().required(),
	check: Joi.string().required()
});
