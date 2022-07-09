import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../constants/message";
import AdminModel from "../../models/Admin/admin.register.model";
import { ROLES } from "../../constants/roles";

const groupOwnerAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.headers.authorization) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: MESSAGE.custom("Access denied. No token provided")
			});
		}

		const token = req.headers.authorization.replace("Bearer ", "");
		if (!token) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: MESSAGE.custom("Access denied. No token provided")
			});
		}

		if (!process.env.JWT_KEY) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.custom("Token not found")
			});
		}

		const decoded = jwt.verify(token, process.env.JWT_KEY) as Record<string, unknown>;
		if (!(decoded.role === ROLES.enroller_admin || decoded.role === ROLES.admin || decoded.role === ROLES.agent)) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				message: MESSAGE.custom("Access denied. Invalid Token!"),
				token: req.header("token")
			});
		}

		req.user = decoded;
		req.user["read_access"] = false;
		req.user["write_access"] = false;

		if (req.user.role === ROLES.admin) {
			const { _id } = req.user;
			req.user.write_access = req.user.read_access = true;
			const data = await AdminModel.findOne({
				$and: [{ _id }, { role: ROLES.admin }]
			});
			req.user.info = data;
		} else if (req.user.role === ROLES.enroller_admin) {
			const { _id } = req.user;
			const data = await AdminModel.findOne({
				$and: [{ _id }, { role: ROLES.enroller_admin }]
			});

			req.user.info = data;
		}
		next();
	} catch (error) {
		return res.status(400).json({
			message: MESSAGE.custom("Invalid Token!"),
			error: error,
			token: req.header("token")
		});
	}
};

export default groupOwnerAuth;
