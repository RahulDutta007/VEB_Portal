import { Model } from "mongoose";
import { nexcalCollection } from "../../config/db";

type Operation = "Members" | "Groups" | "GROUP OWNERS";

export const getPaginatedDocuments = async (
	model: Model<any>,
	query: Record<string, unknown>,
	filter: Record<string, unknown>,
	operation: Operation
) => {
	let totalPages;

	//Calculating all total Announcements
	const totalDocuments = await model.countDocuments();
	console.log("totalDocuments", totalDocuments);
	if (totalDocuments === 0) {
		// return res.status(StatusCodes.OK).json({
		// 	message: MESSAGE.get.empty,
		// 	result: false
		// });
		return null;
	}

	// Pagination
	const pagination: any = {};
	const page = parseInt(query.page as string) || 1;
	const limit = parseInt(query.limit as string) || totalDocuments;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	// Pagination of All Documents
	let allDocuments: any = {};
	console.log("hello")
	if (operation === "Members") {
		try {
			allDocuments = await model.find(filter).populate("group").populate("location").limit(limit).skip(startIndex);
		} catch (err) {
			console.log("errrrrrrrrrrrrrrrr", err);
		}
	} else if (operation === "Groups") {
		allDocuments = await model.find(filter).populate("branding").limit(limit).skip(startIndex);
	}


	if (!allDocuments) {
		// return res.status(StatusCodes.BAD_REQUEST).json({
		// 	message: MESSAGE.get.fail
		// });
		return null;
	}

	// Documents shown for Particular Page
	const totalDocumentsPerPage = allDocuments.length;

	// For Total Pages Calculations of All Documents
	const pages = totalDocuments / limit;
	const remainingAnnouncements = totalDocuments % limit;

	if (remainingAnnouncements === 0) totalPages = pages;
	else totalPages = pages + 1;

	// Filtered Announcements
	// Pagination Next and Previous Conditions of Documents
	if (endIndex < totalDocuments) {
		pagination.nextPage = {
			page: page + 1,
			limit: limit
		};
	}

	if (startIndex > 0 && totalDocuments !== 0) {
		pagination.previousPage = {
			page: page - 1,
			limit: limit
		};
	}

	if (totalDocuments === 0) {
		// return res.status(StatusCodes.OK).json({
		// 	message: MESSAGE.get.empty
		// });
		return null;
	}

	console.log("page", page);
	console.log("Total page", totalPages);

	if (page > totalPages) {
		// return res.status(StatusCodes.OK).json({
		// 	message: MESSAGE.get.enough
		// });
		return true;
	}

	console.log("Total Pages: ", totalPages);
	if (totalPages === null || isNaN(totalPages)) totalPages = 0;

	return {
		totalDocuments,
		totalPages,
		totalDocumentsPerPage,
		pagination,
		allDocuments
	};
};