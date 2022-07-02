import Joi from "joi";

const testValidator = Joi.object({
	first_name: Joi.string().required(),
	last_name: Joi.string().required()
});

export default testValidator;
