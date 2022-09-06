import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import AdminModel from "../../../../models/Admin/admin.register.model";

export const getGroupOwnerByAuth = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user;
		const filter = { _id };
		const groupOwnerInstance = await AdminModel.findById(filter);

		if (!groupOwnerInstance) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.empty
			});
		}

		return res.status(StatusCodes.OK).json({
			message: MESSAGE.get.succ,
			result: groupOwnerInstance
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
};

export const getGroupOwnerById = async (req: Request, res: Response) => {
	try {
		const { _id } = req.params;
		const groupOwnerInstance = await AdminModel.findById(_id);
		return res.status(StatusCodes.OK).json({
			message: MESSAGE.get.succ,
			result: groupOwnerInstance
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
};

export const getGroupOwners = async (req: Request, res: Response) => {
	try {
		const filter = req.query;
		const groupOwnerInstance = await AdminModel.find(filter);
		return res.status(StatusCodes.OK).json({
			message: MESSAGE.get.succ,
			result: groupOwnerInstance
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
};

export const getPaginatedGroupOwners = async (req: Request, res: Response) => {
	try {
		let query, totalPages;

		// copying request query
		const reqQuery = { ...req.query };

		// console.log(reqQuery)
		const removeFields = ["select", "sort", "page", "limit"];

		// loop through the array and remove each keywords from req query
		removeFields.forEach((field) => delete reqQuery[field]);

		const queryStr = JSON.stringify(reqQuery);
		// console.log(queryStr)

		if (reqQuery.user_name) {
			const q = reqQuery.user_name;
			// console.log(reqQuery)
			reqQuery.user_name = { $regex: q };

			// console.log(reqQuery);

			//query = userModel.find(JSON.parse(queryStr))
			query = AdminModel.find(reqQuery);
			//const users = await query
		} else {
			let updatedReqQuery = JSON.parse(queryStr);
			if (updatedReqQuery.is_disabled) {
				console.log(
					"updatedReqQuery.is_disabled------------------------------------------------------------",
					updatedReqQuery.is_disabled
				);
				updatedReqQuery = {
					...updatedReqQuery,
					is_disabled: updatedReqQuery.is_disabled === "true" ? true : false
				};
				console.log("queryStr------------------------------------------------------------", updatedReqQuery);
			}
			query = AdminModel.find(updatedReqQuery);
		}

		//Calculating all total Users
		const totalUsers = await AdminModel.countDocuments();
		console.log("Total Users: ", totalUsers);
		console.log("query---------------", query);
		//Calculating total Filtered Users
		const totalFilterUsers = await AdminModel.countDocuments(query);
		console.log("Total Filtered Users: ", totalFilterUsers);

		// Pagination
		const pagination: any = {};
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || totalFilterUsers;
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		// Pagination of the Filtered Users
		query = query.skip(startIndex).limit(limit);
		console.log("Pagination of the Filtered Users", query);
		const users = await query;

		// Users shown for Particular Page
		const totalUsersParticularPage = users.length;

		// For Total Pages Calculations of All Users
		const pages = totalFilterUsers / limit;
		const remainingUsers = totalFilterUsers % limit;

		if (remainingUsers === 0) totalPages = pages;
		else totalPages = pages + 1;

		// Filtered Users
		// Pagination Next and Previous Conditions of Users
		if (endIndex < totalFilterUsers) {
			pagination.nextUsers = {
				page: page + 1,
				limit: limit
			};
		}

		if (startIndex > 0 && totalFilterUsers !== 0) {
			pagination.previousUsers = {
				page: page - 1,
				limit: limit
			};
		}

		if (totalUsers === 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.empty
			});
		}

		if (totalFilterUsers === 0) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.empty
			});
		}

		console.log("page", page);
		console.log("Total page", totalPages);

		if (page > totalPages) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: MESSAGE.get.enough
			});
		}

		console.log("Total Pages: ", totalPages);
		if (totalPages === null || isNaN(totalPages)) totalPages = 0;

		res.status(StatusCodes.OK).json({
			message: MESSAGE.get.succ,
			totalUsers,
			totalFilterUsers,
			//totalPages,
			totalUsersParticularPage,
			pagination,
			result: users
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
};

export const getGroupOwnerCount = async (req: Request, res: Response) => {
	try {
		const groupOwnerCount = await AdminModel.estimatedDocumentCount({});
		return res.status(StatusCodes.OK).json({
			message: MESSAGE.get.succ,
			result: groupOwnerCount
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
};
