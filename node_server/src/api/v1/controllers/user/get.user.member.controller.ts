import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message";
import memberModel from "../../../../models/member/member.model";
import service from "../../../../services";

export const getMembersByAssignedGroups = async (req: Request, res: Response) => {
	try {
		const groupNumbers = [220];
		const filter = { group_number: { $in: groupNumbers } };
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
