import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../../constants/message";
import service from "../../../../../services";
import AdminModel from "../../../../../models/Admin/admin.register.model";

export const ChangePassword = async (req: Request, res: Response) => {
	try {
		const { old_password, new_password } = req.body;

		const _id = req.user._id; // Extracting _id from JWT

		const filter = { _id };

		const user = await AdminModel.findOne(filter);

		//console.log("user", user);
		if (!user) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.empty
			});
		}

		// Comparing given Password with Actual Password
		const oldPasswordCompare: boolean = await service.auth.comparePassword(old_password, user.password as string);

		if (!oldPasswordCompare) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: MESSAGE.custom("Authentication Failed!")
			});
		}

		// Comparing given Password with Actual Password
		const newPasswordCompare: boolean = await service.auth.comparePassword(new_password, user.password as string);

		if (newPasswordCompare) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("New password cannot be same as old password!")
			});
		}

		// Hashing Password
		const encryptedPassword: string = await service.auth.hashPassword(new_password);

		// Saving New Password to database
		const payload = {
			$set: {
				password: encryptedPassword
			}
		};

		const changePasswordInstance = await AdminModel.findByIdAndUpdate(user._id, payload, {
			new: true,
			runValidators: true,
			setDefaultsOnInsert: true,
			context: "query"
		});

		if (!changePasswordInstance) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.none
			});
		}

		return res.status(StatusCodes.OK).json({
			message: MESSAGE.custom("Password has been changed successfully!"),
			result: changePasswordInstance
		});
	} catch (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.custom("Password updation unsuccessful!"),
			error
		});
	}
};
