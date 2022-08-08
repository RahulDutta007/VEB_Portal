import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Model } from "mongoose";
import { IAdminUser } from "../../../../@types/interface/admin.interface";
import { ForgotUserIdEmail } from "../../../../constants/email.enum";
import MESSAGE from "../../../../constants/message";
import AdminModel from "../../../../models/Admin/admin.register.model";
import EmployeeRegisterModel from "../../../../models/Admin/employee.register.model";
import OTPModel from "../../../../models/Admin/otp.model";
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
		const UserInstance = await findUser(AdminModel, user_id);
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
		const UserInstance = await findUser(AdminModel, email);
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
		const UserInstance = await findUser(AdminModel, email);
		console.log(UserInstance);
		if (UserInstance) {
			return res.status(StatusCodes.OK).json({
				message: "Email Exist",
				emailExist: true
			});
		} else {
			return res.status(StatusCodes.OK).json({
				message: "Email Not Exist",
				emailExist: false
			});
		}
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			err
		});
	}
};

export const SendOTP = async (req: Request, res: Response) => {
	try {
		const email = req.body.email;
		if (!email) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.fail,
				result: "Please provide email"
			});
		}
		const UserInstance = await findUser(AdminModel, email);
		if (UserInstance) {
			const otp: number = Math.floor(100000 + Math.random() * 900000);
			const text = `The OTP is ${otp}`;
			const createdAdminInstance = await service.query.findOneAndUpdate(OTPModel, { email }, { otp, createdAt: new Date() });
			await sendEmailService(text, "OTP", email);
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: "OTP Sent Successfully"
			});
		} else {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: "User not found"
			});
		}
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			err
		});
	}
};

export const VerifyOTP = async (req: Request, res: Response) => {
	try {
		const email = req.params.email;
		const otp = req.body.otp;

		if (!email) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.fail,
				result: "Please provide email"
			});
		}
		const UserInstance = await findUser(OTPModel, email);
		if (UserInstance) {
			if (UserInstance._doc.otp === otp) {
				return res.status(StatusCodes.OK).json({
					message: MESSAGE.get.succ,
					result: "OTP Verified Successfully"
				});
			} else {
				return res.status(StatusCodes.OK).json({
					message: MESSAGE.get.succ,
					result: "OTP is not matched"
				});
			}
		} else {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: "User not found"
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
const findUser = async (model: Model<any>, user: any) => {
	const filter = user.includes("@")
		? { email: user }
		: { admin_id: user };
	return await service.query.fetchOne(model, filter);
}

export const FindUserDetails = async (req: Request, res: Response) => {
	try {
		const user = req.user;
		if (user) {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				data: user
			});
		} else {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				data: "No user found"
			});
		}
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			err
		});
	}
};
