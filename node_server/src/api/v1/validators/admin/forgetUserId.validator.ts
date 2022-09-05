import Joi from "joi";
import { ROLES } from "../../../../constants/roles";

export const forgetUserIdValidator = Joi.object({
	role: Joi.string().required().valid(ROLES.admin, ROLES.enroller_admin, ROLES.agent),
	user_id: Joi.string().required(),
});
