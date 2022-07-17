import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ObjectSchema } from "joi";
import MESSAGE from "../../constants/message";
import mongoose from "mongoose";

const validator = (validationSchema: ObjectSchema, parseProperty: string | null) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log("parseProperty", req.body);
			let payload = req.body;
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
