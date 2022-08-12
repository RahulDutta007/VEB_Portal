import Joi from "joi";

export const forgetPasswordValidator = Joi.object({
	credential: Joi.string(),
	role: Joi.string()
});

export const verifyPasswordValidator = Joi.object({
	new_password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})"))
		.required()
		.messages({
			"string.pattern.base":
				"Password length must be at least 7 characters and contain at least one lowercase letter, one uppercase letter, one number and one special character"
		})
});
