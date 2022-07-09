import { Request, Response } from "express";
import { Model } from "mongoose";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import { ROLES } from "../../../../constants/roles";
import service from "../../../../services";
import AdminModel from "../../../../models/Admin/admin.register.model";

// Log Activity left
export const login = async (req: Request, res: Response) => {
	try {
		const { user_id, password } = req.body;
		const role = req.body.role.toUpperCase();

		// checking if user_id is email or user_name
		const query = user_id.includes("@") ? { email: user_id } : { user_name: user_id };
		let model: Model<any>,
			jwtPayload = {};

		if (role === ROLES.admin || role === ROLES.enroller_admin || role === ROLES.agent) {
			model = AdminModel;
			//} else if (role === ROLES.employee || role === ROLES.dependent) {
			//model = memberModel;
		}
		else {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Unauthorised Role!")
			});
		}

		const user = await model.findOne({
			$and: [query, { role }]
		});

		if (!user) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: MESSAGE.custom("Authentication Failed!")
			});
		}

		// Comparing given Password with Actual Password
		const passwordCompare: boolean = await service.auth.comparePassword(password, user.password);

		if (!passwordCompare) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: MESSAGE.custom("Authentication Failed!")
			});
		}

		// Creating JWT Payload for JWT generation
		if (role === ROLES.enroller_admin || role === ROLES.admin || role === ROLES.agent) {
			// Updating Last login date with current system date
			user.last_login_date = Date.now();

			// Creating JWT payload for Group Owner login
			jwtPayload = {
				_id: user._id,
				email: user.email,
				role: user.role,
				first_name: user.first_name,
				last_name: user.last_name,
				user_name: user.user_name
			};
		}
		// else if (role === ROLES.employee || role === ROLES.dependent) {
		// 	// Updating Last login date with current system date
		// 	user.last_login_date = Date.now();
		// 	user.employee_status = "ACTIVE";

		// 	// Creating JWT payload for Member login
		// 	jwtPayload = {
		// 		_id: user._id,
		// 		email: user.email,
		// 		role: user.role,
		// 		first_name: user.first_name,
		// 		last_name: user.last_name,
		// 		user_name: user.user_name,
		// 		employee_number: user.employee_number,
		// 		dependent_number: user.dependent_number
		// 	};
		// }

		// Generating JWT
		const token: string = await service.auth.generateJWT(jwtPayload);

		// Updating the database
		const loginInstance = await model.findByIdAndUpdate(user._id, user);

		if (!loginInstance) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.none
			});
		}

		return res.status(StatusCodes.OK).json({
			message: MESSAGE.custom("Authentication Successful!"),
			result: loginInstance,
			token
		});
	} catch (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.post.fail,
			error
		});
	}
};
