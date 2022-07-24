import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ForgotUserIdEmail } from "../../../../constants/email.enum";
import MESSAGE from "../../../../constants/message";
import AdminModel from "../../../../models/Admin/admin.register.model";
import service from "../../../../services";
import { sendEmailService } from "../../../../services/common/sendEmail.services";

export const FindUsername = async (req: Request, res: Response) => {
	try {
		const user_id = req.query.user_name;
		if (!user_id) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.fail,
				result: "Please provide username"
			});
		}
		const UserInstance = await findUser(user_id);
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

export const ForgotUserName = async (req: Request, res: Response) => {
	try {
		const email = req.query.email;
		if (!email) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.fail,
				result: "Please provide username"
			});
		}
		const UserInstance = await findUser(email);
		if (UserInstance) {
			await sendEmailService(ForgotUserIdEmail.replace("${userId}", UserInstance._doc.member_id), "Retrieve UserId", email);
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.email
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
		const UserInstance = await findUser(email);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findUser = async (user: any) => {
	const filter = user.includes("@")
		? { email: user }
		: { member_id: user };
	return await service.query.fetchOne(AdminModel, filter);
}
