import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import testModel from "../../../../models/test/test.model";

export const addTest = async (req: Request, res: Response) => {
	try {
		const payload = req.body;
		console.log("payload", payload);
		const testInstance = await new testModel(payload).save();
		return res.status(StatusCodes.OK).json({
			message: MESSAGE.post.succ,
			result: testInstance
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			err,
			message: MESSAGE.post.fail
		});
	}
};
