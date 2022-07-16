import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import service from "../../../../services";
import AdminModel from "../../../../models/Admin/admin.register.model";

//log creation + dynamic notification + dynamic email left
export const AdminRegister = async (req: Request, res: Response) => {
	try {
		const { email, user_name, password } = req.body;
		const role = req.body.role.toUpperCase();
		let date_of_birth = null,
			data;
		// Check if email is valid or not
		if (!service.common.isValidEmailService(email)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Invalid Email!")
			});
		}

		// If Owner is already registered with the given email.
		// const isRegisteredEmail = await service.auth.isRegisteredEmailService(AdminModel, email);

		// if (isRegisteredEmail) {
		// 	return res.status(StatusCodes.BAD_REQUEST).json({
		// 		message: MESSAGE.custom("Email is already registered!")
		// 	});
		// }

		// Check if user_name is valid or not
		if (!service.common.isValidUserNameService(user_name)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Invalid User Name!")
			});
		}

		// If Owner is already registered with the given Username.
		// const isRegisteredUsername = await service.auth.isRegisteredUsernameService(AdminModel, email);

		// if (isRegisteredUsername) {
		// 	return res.status(StatusCodes.BAD_REQUEST).json({
		// 		message: MESSAGE.custom("Username is already registered!")
		// 	});
		// }

		// converting into MongoDB format of Date of birth, if given
		if (req.body.date_of_birth) {
			const DOB = req.body.date_of_birth;
			date_of_birth = new Date(service.date.formateMongoDateService(DOB));
		}

		// This query is for Owner already registered.
		data = await AdminModel.findOne({
			$and: [{ email }, { role }]
		});

		if (data) {
			if (data.is_registered) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: MESSAGE.custom(`${role} is already registered!`)
				});
			} else {
				// if SSN is given
				if (req.body.SSN) {
					const SSN = req.body.SSN;

					// If SSN is already registered
					const isRegisteredSSN = await service.auth.isRegisteredSSNService(AdminModel, String(SSN));

					if (isRegisteredSSN) {
						return res.status(StatusCodes.BAD_REQUEST).json({
							message: MESSAGE.custom("SSN is already registered!")
						});
					}
				}

				// if SSN is given
				if (req.body.SSN) {
					const SSN = req.body.SSN;

					// If SSN is already registered
					const isRegisteredSSN = await service.auth.isRegisteredSSNService(AdminModel, String(SSN));

					if (isRegisteredSSN) {
						return res.status(StatusCodes.BAD_REQUEST).json({
							message: MESSAGE.custom("SSN is already registered!")
						});
					}
				}

				// Hashing Password
				const encryptedPassword: string = await service.auth.hashPassword(password);

				// Saving data to database
				const payload = {
					$set: {
						...req.body,
						date_of_birth,
						password: encryptedPassword,
						is_registered: true
					}
				};

				const ownerInstance = await AdminModel.findByIdAndUpdate(data._id, payload, {
					new: true,
					runValidators: true,
					setDefaultsOnInsert: true,
					context: "query"
				});

				if (!ownerInstance) {
					return res.status(400).json({
						message: MESSAGE.none
					});
				}

				return res.status(StatusCodes.OK).json({
					message: MESSAGE.put.succ,
					result: ownerInstance
				});
			}
		} else {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom(`${role} has not been created yet!`)
			});
		}
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.put.fail,
			err
		});
	}
};
