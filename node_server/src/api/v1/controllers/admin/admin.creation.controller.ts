import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import { ROLES } from "../../../../constants/roles";
import { UPLOAD_TYPE } from "../../../../constants/upload.types";
import service from "../../../../services";
import AdminModel from "../../../../models/Admin/admin.register.model";
import { IAdminUser } from "../../../../@types/interface/admin.interface";
import { IObjectId } from "../../../../@types/objectId.interface";

// Enroller Id Generation
export const adminCreation = async (req: Request, res: Response) => {
	try {
		const { role, email } = req.body;
		const createdRole = role.toUpperCase();
		const creatorRole = req.user.role.toUpperCase(); // Extrating this role from the JWT
		const { _id } = req.user; // Accessing _id from JWT
		let date_of_birth = null,
			hire_date = null,
			SSN = null;

		//Disallow agent for enroller creation
		if (creatorRole === createdRole) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Unauthorized Role!")
			});
		}
		else if (creatorRole === ROLES.admin) {
			// Can create enroller admin, agent 
		}
		else if (creatorRole === ROLES.enroller_admin) {
			if (createdRole === ROLES.admin) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: MESSAGE.custom("Unauthorized Role!")
				});
			}
		}
		else if (creatorRole === ROLES.agent) {
			if (createdRole === ROLES.admin || createdRole === ROLES.enroller_admin) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: MESSAGE.custom("Unauthorized Role!")
				});
			}
		}

		// Check if email is valid or not
		if (!service.common.isValidEmailService(email)) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Invalid Email!")
			});
		}

		// Email of Group Owner cannot be duplicated.
		const isDuplicateGroupOwnerEmail = await service.auth.isDuplicateGroupOwnerEmailService(AdminModel, email);

		if (isDuplicateGroupOwnerEmail) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Email is already registered!")
			});
		}

		// converting into MongoDB format of Date of birth, if given
		if (req.body.date_of_birth) {
			const DOB = req.body.date_of_birth;
			date_of_birth = new Date(service.date.formateMongoDateService(DOB));
		}

		// converting into MongoDB format of Hire Date, if given
		if (req.body.hire_date) {
			const hireDate = req.body.date_of_birth;
			hire_date = new Date(service.date.formateMongoDateService(hireDate));
		}

		// if SSN is given
		if (req.body.SSN) {
			SSN = req.body.SSN;

			// Dublicate SSN checking in Group Owner and Member Model
			const isDuplicateSSN = await service.auth.isDuplicateSSNService(AdminModel, String(SSN));

			if (isDuplicateSSN) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: MESSAGE.custom("Invalid SSN!")
				});
			}
		}

		// Cannot enter Password during Group Owner Creation
		if (req.body.password) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Cannot enter password during Group Owner creation!")
			});
		}

		// Saving data to Database
		const payload = {
			...req.body,
			role: createdRole,
			SSN: SSN,
			date_of_birth,
			hire_date,
			upload_type: UPLOAD_TYPE.manual,
			created_by: _id,
			is_registered: false
		};

		const createdAdminInstance: IAdminUser & IObjectId = await service.query.insert(AdminModel, payload);
		const user_id: string = createdAdminInstance._id;

		return res.status(StatusCodes.OK).json({
			message: MESSAGE.post.succ,
			result: createdAdminInstance
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.post.fail,
			err
		});
	}
};
