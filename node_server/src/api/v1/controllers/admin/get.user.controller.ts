import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";

export const FindUsername = async (req: Request, res: Response) => {
	try {
		if (req.user._id) {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: `Your username: ${req.user.user_name}`
			});
		}
		else {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.fail
			});
		}

	}
	catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			err
		});
	}
};

export const FindEmail = async (req: Request, res: Response) => {
	try {
		if (req.user._id) {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: `Your registered email: ${req.user.email}`
			});
		}
		else {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.fail
			});
		}

	}
	catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			err
		});
	}
};
