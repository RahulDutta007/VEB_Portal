import Joi from "joi";
import { PLAN_STATUS } from "../../../../constants/planStatus";

export const planCreationValidator = Joi.object({
    plan_name: Joi.string().required(),
    plan_code: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().optional().allow(null),
    status: Joi.string().optional().allow(null).valid(PLAN_STATUS.active, PLAN_STATUS.expired).messages({
        message: "Please provide valid status!"
    })
});