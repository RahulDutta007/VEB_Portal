import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import service from "../../../../services";
import AdminModel from "../../../../models/Admin/admin.register.model";

//log creation + dynamic notification + dynamic email left
export const ChangePassword = async (req: Request, res: Response) => {
	try {
		const { password, new_password, confirm_password } = req.body;

		// Check if new password and confirm password match
		if (new_password !== confirm_password) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("New password and confirm password dose not match")
			});
		}

		// Compare Password
		const passwordCompare: boolean = await service.auth.comparePassword(password, req.user.info.password);
		// Check if password is correct
		if (!passwordCompare) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Password is not correct")
			});
		}

		// Hashing Password
		const encryptedNewPassword: string = await service.auth.hashPassword(new_password);

		// Saving data to database
		const payload = {
			$set: {
				password: encryptedNewPassword
			}
		};

		const userInstance = await AdminModel.findByIdAndUpdate(req.user._id, payload, {
			new: true,
			runValidators: true,
			setDefaultsOnInsert: true,
			context: "query"
		});

		if (!userInstance) {
			return res.status(400).json({
				message: MESSAGE.none
			});
		}

		return res.status(StatusCodes.OK).json({
			message: MESSAGE.put.succ
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.put.fail,
			err
		});
	}
};
