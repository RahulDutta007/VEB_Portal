import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import service from "../../../../services";
import { getHTMLMailContent, getMailContent, postEmail } from "../../../../services/email/email.service";
import { EMAIL_TYPE } from "../../../../constants/emailType";
import EmployeeRegisterModel from "../../../../models/Admin/employee.register.model";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmailService } from "../../../../services/common/sendEmail.services";
import { ForgotPasswordEmail } from "../../../../constants/email.enum";
import AdminModel from "../../../../models/Admin/admin.register.model";

export const GetToken = async (req: Request, res: Response) => {
	try {
		let link = "";
		const { role } = req.body;
		const query = req.body.credential.includes("@")
			? { email: req.body.credential }
			: { user_name: req.body.credential };

		const filter = {
			...query,
			role
		};
		const UserInstance = await service.query.fetchOne(AdminModel, filter);

		if (!UserInstance?._doc) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: MESSAGE.custom("No Member Found With given information")
			});
		}

		const payload = { user_name: UserInstance._doc.user_name, email: UserInstance._doc.email, expireDate: new Date().getTime() + 15 * 60 * 1000 };
		const token = jwt.sign(payload, process.env.password_Secret as Secret);

		if (process.env.NODE_ENV == "development") link = "http://localhost:3000";
		if (process.env.NODE_ENV == "production") link = "http://localhost:3000";

		// const text: string = ForgotPasswordEmail.replace("${link}", link).replace("${token}", token);

		// sendEmailService(text, "Reset Password", UserInstance._doc.email);

		const mailContent = await getHTMLMailContent(EMAIL_TYPE.forget_password);

		if (mailContent === null) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Incorrect Type Provided!"),
				result: false
			});
		}

		const { mailBody, mailSubject } = mailContent;
		const mailDetails = {
			mailOptions: {
				to: UserInstance._doc.email,
				from: `${process.env.Sender_email}`,
				subject: mailSubject,
				body: mailBody(link, token)
			},
			res: res
		};

		await postEmail(mailDetails);

		return res.status(StatusCodes.OK).json({
			message: MESSAGE.post.succ,
			result: `Token sent to mail: ${UserInstance._doc.email}`,
			token
		});
	} catch (err: any) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.post.fail,
			err
		});
	}
};

// @desc User Forget Password (verify token and reset password)
// @route POST /api/v1/forget-password/verify-token/:token
// @access Public
export const VerifyToken = async (req: Request, res: Response) => {
	try {
		const { new_password } = req.body;
		const token = <jwt.JwtPayload>(
			jwt.verify(req.params.token, process.env.password_Secret as Secret)
		);
		const timeCheck = new Date(token.expireDate) > new Date();

		const { user_name, email } = token;

		const filter = {
			$and: [
				{ user_name },
				{ email }
			]
		}
		if (timeCheck) {
			let UserInstance = await service.query.fetchOne(AdminModel, filter);

			if (!UserInstance?._doc) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: MESSAGE.custom("No Member Found With given information")
				});
			}

			// Comparing given Password with Actual Password
			// const newPasswordCompare: boolean = await service.auth.comparePassword(new_password, UserInstance._doc.password);

			// if (newPasswordCompare) {
			// 	return res.status(StatusCodes.UNAUTHORIZED).json({
			// 		message: MESSAGE.custom("New password cannot be same as old password!")
			// 	});
			// }

			// Hashing Password
			const encryptedPassword: string = await service.auth.hashPassword(new_password);

			// Saving New Password to database
			const payload = {
				$set: {
					password: encryptedPassword
				}
			};

			UserInstance = await AdminModel.findByIdAndUpdate(UserInstance._doc._id, payload, {
				new: true,
				runValidators: true,
				setDefaultsOnInsert: true,
				context: "query"
			});

			if (!UserInstance) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: MESSAGE.none
				});
			}

			return res.status(StatusCodes.OK).json({
				message: MESSAGE.custom("Password has been changed successfully!"),
				result: UserInstance,
				isAccess: timeCheck
			});

		} else {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Timeout!")
			});
		}
	} catch (err: any) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.post.fail,
			err
		});
	}
};

