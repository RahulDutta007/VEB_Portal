import Joi from "joi";

export const editGroupOwnerValidator = Joi.object({
	first_name: Joi.string().min(1).max(30).allow(null, ""),
	// middle_name: Joi.string().optional().allow(null, ""),
	last_name: Joi.string().min(1).max(30).allow(null, ""),
	SSN: Joi.string().pattern(new RegExp("^[0-9]{9}$")).allow(null, ""),
	date_of_birth: Joi.date().allow(null, ""),
	user_name: Joi.string().alphanum().min(3).max(30).allow(null, "")
});
