import { EnrollmentStandardDetails } from "../../@types/enrollment.types";
import { Member } from "../../@types/member.types";

export const getCoveredDependents = (
	coverage: string,
	eligibleDependents: Member[]
): {
	enrollmentStandardDetails: EnrollmentStandardDetails[];
	dep_SSNs: string[];
} => {
	const enrollmentStandardDetails: EnrollmentStandardDetails[] = [];
	const dep_SSNs: string[] = [];

	if (coverage === "Employee & Spouse") {
		console.log("coverage1", coverage);
		console.log("coverage3", eligibleDependents);
		eligibleDependents.forEach((eligibleDependent: Member) => {
			console.log("eligibleDependent", eligibleDependent);
			const { _id, SSN, relationship } = eligibleDependent;
			if (relationship === "SPOUSE") {
				enrollmentStandardDetails.push({
					member_object_id: _id,
					member_SSN: SSN,
					premium_amount: 0,
					coverage_code: "Employee & Spouse"
				});
				dep_SSNs.push(SSN);
			}
		});
	} else if (coverage === "Employee & Dependents") {
		eligibleDependents.map((eligibleDependent: Member) => {
			const { _id, SSN, relationship } = eligibleDependent;
			if (relationship !== "SPOUSE") {
				enrollmentStandardDetails.push({
					member_object_id: _id,
					member_SSN: SSN,
					premium_amount: 0,
					coverage_code: "Employee & Dependents"
				});
				dep_SSNs.push(SSN);
			}
		});
	} else if (coverage === "Employee & Family") {
		eligibleDependents.map((eligibleDependent: Member) => {
			const { _id, SSN } = eligibleDependent;
			console.log("asdas", enrollmentStandardDetails);
			enrollmentStandardDetails.push({
				member_object_id: _id,
				member_SSN: SSN,
				premium_amount: 0,
				coverage_code: "Employee & Family"
			});
			dep_SSNs.push(SSN);
		});
	}
	return {
		enrollmentStandardDetails,
		dep_SSNs
	};
};
