import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema } from "joi";
import MESSAGE from "../../constants/message";
import mongoose from "mongoose";

const validator = (validationSchema: ObjectSchema, parseProperty: string | null) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log("parseProperty", req.body.group_branding);
			let payload;
			if (parseProperty) {
				payload = JSON.parse(req.body[parseProperty]);
			} else {
				payload = req.body;
				//payload.created_by = new mongoose.Types.ObjectId(req.body.created_by);
				//payload.enroller_id = new mongoose.Types.ObjectId(req.body.enroller_admin);
			}
			const { error } = validationSchema.validate(payload);
			if (error) {
				throw error;
			}
			next();
		} catch (err) {
			return res.status(StatusCodes.BAD_REQUEST).json({ err, message: MESSAGE.custom("Invalid payload") });
		}
	};
};

export default validator;
