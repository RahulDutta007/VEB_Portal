import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import AdminRegisterModel from "../../../../models/Admin/admin.register.model";
import service from "../../../../services";
import { ROLES } from "../../../../constants/roles";
import { UPLOAD_TYPE } from "../../../../constants/upload.types";
import { IAdminUser } from "../../../../@types/interface/admin.interface";
import { IObjectId } from "../../../../@types/objectId.interface";

export const GroupOwnerRegister = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const token = req.headers.token;
		let date_of_birth;

		// Verify group owner token from header
		if (process.env.GROUP_OWNER_TOKEN !== token) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: MESSAGE.custom("Authentication Failed!")
			});
		}

		// Check if email is valid or not
		if (!service.common.isValidEmailService(email)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Invalid Email!")
			});
		}

		// Check if User Name is given
		if (req.body.user_name) {
			const user_name = req.body.user_name;
			if (!service.common.isValidUserNameService(user_name)) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: MESSAGE.custom("Invalid User Name!")
				});
			}
		}

		// converting into MongoDB format of Date of birth
		if (req.body.date_of_birth) {
			const DOB = req.body.date_of_birth;
			date_of_birth = new Date(service.date.formateMongoDateService(DOB));
		}

		// Email of a group owner cannot be duplicated.
		const isDuplicateGroupOwnerEmail = await service.auth.isDuplicateGroupOwnerEmailService(AdminRegisterModel, email);

		if (isDuplicateGroupOwnerEmail) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Email is already registered!")
			});
		}


		// if SSN is given
		if (req.body.SSN) {
			const SSN = req.body.SSN;

			// Dublicate SSN checking in Group Owner and Member Model
			const isDuplicateSSN = await service.auth.isDuplicateSSNService(AdminRegisterModel, String(SSN));

			if (isDuplicateSSN) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: MESSAGE.custom("Invalid SSN!")
				});
			}
		}

		// Hashing Password
		const encryptedPassword: string = await service.auth.hashPassword(password);

		// Saving data to database
		const payload = {
			...req.body,
			role: ROLES.admin,
			password: encryptedPassword,
			date_of_birth: date_of_birth,
			is_registered: true,
			upload_type: UPLOAD_TYPE.manual,
			created_by: null
		};

		const GroupAdminInstance: IAdminUser & IObjectId = await service.query.insert(AdminRegisterModel, payload);
		return res.status(StatusCodes.OK).json({
			message: MESSAGE.post.succ,
			result: GroupAdminInstance
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			err,
			message: MESSAGE.post.fail
		});
	}
};
