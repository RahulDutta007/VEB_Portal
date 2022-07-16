import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import AdminModel from "../../../../models/Admin/admin.register.model";
import service from "../../../../services";

export const FindUsername = async (req: Request, res: Response) => {
	try {
		const user_id = req.query.user_name;
		if (!user_id) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.fail,
				result: "Please provide username"
			});
		}
		const filter = {
			user_name: user_id
		};
		const UserInstance = await service.query.fetchOne(AdminModel, filter);
		if (UserInstance) {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: {
					isRegistered: true
				}
			});
		} else {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: {
					isRegistered: false
				}
			});
		}
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			err
		});
	}
};

export const FindEmail = async (req: Request, res: Response) => {
	try {
		const email = req.query.email;
		if (!email) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.fail,
				result: "Please provide email"
			});
		}
		const filter = {
			email
		};
		const UserInstance = await service.query.fetchOne(AdminModel, filter);
		if (UserInstance) {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: {
					isRegistered: true
				}
			});
		} else {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: {
					isRegistered: false
				}
			});
		}
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			err
		});
	}
};
