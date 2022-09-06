import { Request, Response } from "express";
import { Model } from "mongoose";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../../constants/message";
import { ROLES } from "../../../../../constants/roles/roles";
import service from "../../../../../services";
import AdminModel from "../../../../../models/Admin/admin.register.model";

export const editGroupOwner = async (req: Request, res: Response) => {
	try {
		const { first_name, last_name, date_of_birth, SSN, user_name } = req.body;
		const _id = req.user._id; // Extracting _id from JWT

		const filter = { _id };

		const user = await AdminModel.findOne(filter);

		console.log("Usersssss", user);

		if (!user) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: MESSAGE.custom("Authentication Failed!")
			});
		}

		let dateOfBirth = null;
		const DOB = user.date_of_birth;

		// converting into MongoDB format of Date of Birth, if given
		if (date_of_birth) {
			dateOfBirth = new Date(service.date.formateMongoDateService(date_of_birth));
		}

		// Check if user_name is valid or not
		if (user_name) {
			if (!service.common.isValidUserNameService(user_name)) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: MESSAGE.custom("Invalid User Name!")
				});
			}

			if (user_name !== user.user_name && user.user_name !== null) {
				// If given Username is already registered or not.
				const isRegisteredUsername = await service.auth.isRegisteredUsernameService(AdminModel, user_name);

				if (isRegisteredUsername) {
					return res.status(StatusCodes.BAD_REQUEST).json({
						message: MESSAGE.custom("Username is already registered!")
					});
				}
			}
		}

		// Check if SSN is Duplicate or not
		if (SSN) {
			if (SSN !== user.SSN && user.SSN !== null) {
				// If SSN is already registered
				const isRegisteredSSN = await service.auth.isRegisteredSSNService(AdminModel, String(SSN));

				if (isRegisteredSSN) {
					return res.status(StatusCodes.BAD_REQUEST).json({
						message: MESSAGE.custom("SSN is already registered!")
					});
				}
			}
		}

		// Saving data to database
		const payload = {
			$set: {
				first_name: first_name !== "" || first_name !== null ? first_name : user.first_name,
				last_name: last_name !== "" || last_name !== null ? last_name : user.last_name,
				date_of_birth: date_of_birth !== null || date_of_birth !== "" ? dateOfBirth : DOB,
				SSN: SSN !== "" || SSN !== null ? SSN : user.SSN,
				user_name: user_name !== "" || user_name !== null ? user_name : user.user_name
			}
		};

		const userInstance = await AdminModel.findByIdAndUpdate(_id, payload, {
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
			message: MESSAGE.custom("Profile Updation Successful!"),
			result: userInstance
		});
	} catch (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.custom("Profile updation unsuccessful!"),
			error
		});
	}
};
