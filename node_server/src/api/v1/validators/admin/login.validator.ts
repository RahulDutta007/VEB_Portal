import Joi from "joi";
import { ROLES } from "../../../../constants/roles";

export const loginValidator = Joi.object({
	role: Joi.string()
		.required()
		.valid(ROLES.admin, ROLES.enroller_admin, ROLES.agent),
	user_id: Joi.string().required(),
	password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{7,})"))
		.required()
		.messages({
			"string.pattern.base":
				"Password length must be at least 7 characters and contain at least one lowercase letter, one uppercase letter, one number and one special character"
		})
});
