import { Model } from "mongoose";

export const insert = async (model: Model<any>, data: any, options?: boolean | Record<string, unknown> | undefined) => {
	try {
		const docInstance = await new model(data).save();
		return docInstance;
	} catch (err) {
		// console.log("error", err);
		throw err;
	}
};

export const fetchAll = async (model: Model<any>, filter: Record<string, unknown>) => {
	try {
		const docInstance = await model.find(filter);
		return docInstance;
	} catch (err) {
		throw err;
	}
};

export const fetchOne = async (model: Model<any>, filter: Record<string, unknown>) => {
	try {
		const docInstance = await model.find(filter);
		return docInstance[0];
	} catch (err) {
		throw err;
	}
};

export const findOneAndUpdate = async (model: Model<any>, filter: Record<string, unknown>, update: Record<string, unknown>) => {
	try {
		const docInstance = await model.findOneAndUpdate(filter, update, { new: true, upsert: true });
		return docInstance[0];
	} catch (err) {
		throw err;
	}
};
