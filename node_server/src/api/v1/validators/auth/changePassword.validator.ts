import Joi from "joi";
import { ROLES } from "../../../../constants/roles/roles";

export const changePasswordValidator = Joi.object({
	old_password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"))
		.required()
		.messages({
			"string.pattern.base":
				"Password length must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number and one special character"
		}),
	new_password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"))
		.required()
		.messages({
			"string.pattern.base":
				"Password length must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number and one special character"
		})
});
