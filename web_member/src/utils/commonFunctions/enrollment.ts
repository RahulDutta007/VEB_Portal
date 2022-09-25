import { Enrollment, EnrollmentCommonDetails, EnrollmentStandardDetails } from "../../@types/enrollment.types";
import { GroupOwner } from "../../@types/groupOwner.types";
import { Member } from "../../@types/member.types";
import { getCoveredDependents } from "./coveredDependents";
import { getCurrentDate, getFirstOfNextMonth } from "./date";

export const generateActivateEnrollmentPayload = (
	plan: any,
	groupOwner: GroupOwner | null,
	member: Member,
	coverage: string,
	premiumAmount: number,
	eligibleDependents: Member[]
): Enrollment => {
	const enrollmentCommonDetails: EnrollmentCommonDetails = {
		agent_id: groupOwner && groupOwner._id ? groupOwner._id : null,
		location_number: member.location_number,
		location_name: member.location.location_name,
		group_number: member.group_number,
		group_name: member.group.name,
		plan_object_id: plan._id,
		plan_code: plan.plan_code,
		enrollment_status: "APPROVED",
		insured_object_id: member._id,
		insured_SSN: member.SSN,
		unenrolled_reason: null,
		waive_reason: null,
		termination_reason: null,
		enrollment_date: getCurrentDate(),
		effective_date: getFirstOfNextMonth(),
		termination_date: null,
		open_enrollment_id: "0xqwe123123"
	};
	console.log("enrollmentCommonDetails", getFirstOfNextMonth());
	const enrollmentStandardDetails: EnrollmentStandardDetails[] = [
		{
			member_object_id: member._id,
			member_SSN: member.SSN,
			premium_amount: premiumAmount,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			coverage_code: coverage
		}
	];
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const coveredDependents = getCoveredDependents(coverage, eligibleDependents);
	const member_SSNs = [...coveredDependents.dep_SSNs, member.SSN];
	const enrollment: Enrollment = {
		standard_details: enrollmentStandardDetails.concat(coveredDependents.enrollmentStandardDetails),
		common_details: enrollmentCommonDetails,
		dep_SSNs: member_SSNs
	};

	return enrollment;
};

export const generateWaiveEnrollmentPayload = (
	plan: any,
	groupOwner: GroupOwner | null,
	member: Member,
	waiveReason: string
): Enrollment => {
	const enrollmentCommonDetails: EnrollmentCommonDetails = {
		agent_id: groupOwner && groupOwner._id ? groupOwner._id : null,
		location_number: member.location_number,
		location_name: member.location.location_name,
		group_number: member.group_number,
		group_name: member.group.name,
		plan_object_id: plan._id,
		plan_code: plan.plan_code,
		enrollment_status: "WAIVED",
		insured_object_id: member._id,
		insured_SSN: member.SSN,
		unenrolled_reason: null,
		waive_reason: waiveReason,
		termination_reason: null,
		enrollment_date: getCurrentDate(),
		effective_date: null,
		termination_date: null,
		open_enrollment_id: "0xqwe123123"
	};
	console.log("enrollmentCommonDetails", getFirstOfNextMonth());
	const enrollmentStandardDetails: EnrollmentStandardDetails[] = [
		{
			member_object_id: member._id,
			member_SSN: member.SSN,
			premium_amount: 0,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			coverage_code: ""
		}
	];
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const member_SSNs = [member.SSN];
	const enrollment: Enrollment = {
		standard_details: enrollmentStandardDetails,
		common_details: enrollmentCommonDetails,
		dep_SSNs: member_SSNs
	};

	return enrollment;
};

export const generateCancerKemperActivateEnrollmentPayload = generateActivateEnrollmentPayload;
export const generateCancerKemperWaiveEnrollmentPayload = generateWaiveEnrollmentPayload;
