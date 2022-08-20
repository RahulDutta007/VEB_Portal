import Joi from "joi";

export const planCreationValidator = Joi.object({
    name: Joi.string().required(),
    code: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().optional().allow(null),
    is_active: Joi.boolean().optional().allow(null)
});
