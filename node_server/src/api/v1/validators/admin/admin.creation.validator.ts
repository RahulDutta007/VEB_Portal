import Joi from "joi";
import { ROLES } from "../../../../constants/roles";
import { GENDER } from "../../../../constants/gender";
import { MARITAL_STATUS } from "../../../../constants/marital.status";
import { UPLOAD_TYPE } from "../../../../constants/upload.types";


export const adminCreationValidator = Joi.object({
	admin_id: Joi.string().required(),
	first_name: Joi.string().min(3).max(30).required(),
	last_name: Joi.string().min(3).max(30).required(),
	middle_name: Joi.string().optional().allow(null),
	user_name: Joi.string().min(3).max(30).alphanum().min(3).max(30).required(),
	role: Joi.string().required().valid(ROLES.enroller_admin, ROLES.agent).messages({
		message: "Unauthorized Role!"
	}),
	email: Joi.string().email().required(),
	SSN: Joi.string().pattern(new RegExp("^[0-9]{9}$")).required(),
	date_of_birth: Joi.date().optional().allow(null),
	gender: Joi.string().required().valid(GENDER.male, GENDER.female, GENDER.others).messages({
		message: "Please provide correct gender!"
	}),
	marital_status: Joi.string().required().valid(MARITAL_STATUS.single, MARITAL_STATUS.married, MARITAL_STATUS.divorced, MARITAL_STATUS.common_law_marriage).messages({
		message: "Please provide correct marital status!"
	}),
	address_line_1: Joi.string().optional().allow(null),
	group_number: Joi.number().optional().allow(null),
	address_line_2: Joi.string().optional().allow(null),
	city: Joi.string().optional().allow(null),
	state: Joi.string().optional().allow(null),
	country: Joi.string().optional().allow(null),
	ZIP: Joi.string().optional().allow(null),
	contact_label: Joi.string().optional().allow(null),
	phone_number: Joi.number().optional().allow(null),
	phone_extension: Joi.number().optional().allow(null),
	is_active: Joi.boolean().optional().allow(null),
	is_member_chat_support: Joi.boolean().optional().allow(null),
	is_employer_chat_support: Joi.boolean().optional().allow(null),
	hire_date: Joi.date().optional().allow(null),
	upload_type: Joi.string().required().valid(UPLOAD_TYPE.bulk, UPLOAD_TYPE.manual, UPLOAD_TYPE.migrated).messages({
		message: "Please provide correct upload type!"
	}),
	created_by: Joi.string().optional().allow(null),
	created_date: Joi.date().optional().allow(null),
	is_registered: Joi.boolean().optional().allow(null),
	writing_number: Joi.number().optional().allow(null),
	enroller_id: Joi.string().optional().allow(null)
});
