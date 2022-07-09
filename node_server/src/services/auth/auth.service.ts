import { Model, FilterQuery } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

export const isDuplicateGroupOwnerEmailService = async (
	groupOwnerModel: Model<any>,
	email: string
): Promise<boolean> => {
	try {
		const filter = { email };
		const emailInstance = await groupOwnerModel.findOne(filter);

		if (emailInstance) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		throw err;
	}
};

export const isRegisteredEmailService = async (model: Model<any>, email: string): Promise<boolean> => {
	try {
		const emailInstance = await model.findOne({
			$and: [{ email }, { is_registered: true }]
		});

		if (emailInstance) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		throw err;
	}
};

export const isDuplicateSSNService = async (
	groupOwnerModel: Model<any>,
	//memberModel: Model<any>,
	SSN: string
): Promise<boolean> => {
	try {
		const filter = { SSN };
		const groupOwnerSSNInstance = await groupOwnerModel.findOne(filter);
		//const memberSSNInstance = await memberModel.findOne(filter);

		if (groupOwnerSSNInstance) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		throw err;
	}
};

export const isRegisteredSSNService = async (model: Model<any>, SSN: string): Promise<boolean> => {
	try {
		const SSNInstance = await model.findOne({
			$and: [{ SSN }, { is_registered: true }]
		});

		if (SSNInstance) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		throw err;
	}
};

export const isDuplicateUserNameService = async (
	groupOwnerModel: Model<any>,
	memberModel: Model<any>,
	user_name: string
): Promise<boolean> => {
	try {
		const filter = { user_name };
		const groupOwnerUserNameInstance = await groupOwnerModel.findOne(filter);
		const memberUserNameInstance = await memberModel.findOne(filter);

		if (groupOwnerUserNameInstance || memberUserNameInstance) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		throw err;
	}
};

export const isRegisteredUsernameService = async (model: Model<any>, user_name: string): Promise<boolean> => {
	try {
		const usernameInstance = await model.findOne({
			$and: [{ user_name }, { is_registered: true }]
		});

		if (usernameInstance) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		throw err;
	}
};

export const hashPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	const encryptPassword = await bcrypt.hash(password, salt);

	return encryptPassword;
};

export const comparePassword = async (inputPassword: string, dbPassword: string): Promise<boolean> => {
	const compare = await bcrypt.compare(inputPassword, dbPassword);

	if (compare) return true;
	else return false;
};

export const generateJWT = async (jwtPayload: Record<string, unknown>): Promise<string> => {
	const jwtToken = jwt.sign(
		{
			...jwtPayload
		},
		process.env.JWT_KEY as Secret,
		{
			expiresIn: "1y"
		}
	);

	return jwtToken;
};

export const generateDependentNumber = async (memberModel: Model<any>, employee_number: number): Promise<number> => {
	try {
		let max = 0;
		const members = await memberModel.find({ employee_number });

		members.forEach((member) => {
			const { dependent_number } = member;

			if (max < dependent_number) max = dependent_number;
		});

		if (max >= 7) return -1;

		return ++max;
	} catch (err) {
		throw err;
	}
};
