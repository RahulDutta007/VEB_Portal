import { FilterQuery } from "mongoose";
import { IVEBOpenEnrollmentSchema } from "../../@types/interface/VEBOpenEnrollment.interface";
import memberModel from "../../models/member/member.model";

export const addVEBOpenEnrollment = async (openEnrollment: IVEBOpenEnrollmentSchema) => {
	try {
		const { employee_SSN } = openEnrollment;
		const filterQuery: FilterQuery<IVEBOpenEnrollmentSchema> = { SSN: employee_SSN };
		const memberInstances = memberModel.find(filterQuery);
		if (memberInstances.length === 0) {
			return false;
		}
	}
}