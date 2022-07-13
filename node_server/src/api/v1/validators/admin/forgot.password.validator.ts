import Joi from "joi";

export const forgetPasswordValidator = Joi.object({
  credential: Joi.string()
});
