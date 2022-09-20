import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FilterQuery } from "mongoose";
import { IMemberSchema } from "../../../../@types/interface/memberSchema.interface";
import MESSAGE from "../../../../constants/message";
import memberModel from "../../../../models/member/member.model";
import service from "../../../../services";

export const getMembersByAssignedGroups = async (req: Request, res: Response) => {
	try {
		const groupNumbers = [220];
		const filter: FilterQuery<IMemberSchema> = { group_number: { $in: groupNumbers }, role: "EMPLOYEE" };
		console.log(filter);
		const paginationResult = await service.pagination.getPaginatedDocuments(
			memberModel,
			req.query,
			filter,
			"Members"
		);
		console.log("paginationResult", paginationResult);
		if (paginationResult === null) {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.empty
			});
		} else if (paginationResult === true) {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.enough
			});
		} else if (paginationResult) {
			return res.status(StatusCodes.OK).json({
				message: MESSAGE.get.succ,
				result: { ...paginationResult, members: paginationResult.allDocuments }
			});
		}
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
};

export const getMemberCount = async (req: Request, res: Response) => {
	try {
		const filter = { group_number: 220 };
		const memberCount = await memberModel.estimatedDocumentCount(filter);
		return res.status(StatusCodes.OK).json({
			message: MESSAGE.get.succ,
			result: memberCount
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
};

export const getMemberByAuth = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user;
		const member = await memberModel.findById(_id).populate("group").populate("location");
		return res.status(StatusCodes.OK).json({
			message: MESSAGE.get.succ,
			result: member
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
}

export const getMember = async (req: Request, res: Response) => {
	try {
		const member = await memberModel.find(req.query).populate("group").populate("location");
		return res.status(StatusCodes.OK).json({
			message: MESSAGE.get.succ,
			result: member
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
}

export const getEmployeeAndDependents = async (req: Request, res: Response) => {
	try {
		const { SSN } = req.user;
		console.log("req.user", req.user);
		const employeeFilter: FilterQuery<IMemberSchema> = { SSN };

		const dependentFilter: FilterQuery<IMemberSchema> = { employee_SSN: SSN, role: "DEPENDENT" };
		const employeeInstance = await memberModel.findOne(employeeFilter).populate("group").populate("location");
		const dependentInstances = await memberModel.find(dependentFilter);

		return res.status(StatusCodes.OK).json({
			message: MESSAGE.get.succ,
			result: {
				employee: employeeInstance,
				dependents: dependentInstances
			}
		});
	} catch (err) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: MESSAGE.get.fail,
			result: null
		});
	}
}