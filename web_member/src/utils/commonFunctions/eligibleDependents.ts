import { Relationship } from "../../@types/employee.types";
import { Member } from "../../@types/member.types";
import calculateAge from "./age";

type EligibleDependents = {
	dependents: Member[];
	coverage: string[];
};

export const getCoverage = (relationship: Relationship) => {
	if (relationship === "CHILD") {
		return "Employee & Dependents";
	} else if (relationship === "GRAND CHILD") {
		return "Employee & Dependents";
	} else if (relationship === "SPOUSE") {
		return "Employee & Spouse";
	} else if (relationship === "DOMESTIC PARTNER") {
		return "Employee & Spouse";
	} else if (relationship === "STEP CHILD") {
		return "Employee & Dependents";
	} else {
		return "EMPLOYEE & FAMILY";
	}
};

export const getKemperCancerEligibleDependents = (dependents: Member[]): EligibleDependents => {
	const coverage: string[] = ["Employee Only"];
	const eligibleDependents: Member[] = [];
	dependents.forEach((dependent: Member) => {
		const { date_of_birth, relationship } = dependent;
		const dependentAge = calculateAge(date_of_birth, new Date());
		if (dependentAge >= 18 && dependentAge <= 25) {
			const coverageStr = getCoverage(relationship);
			coverage.indexOf(coverageStr) === -1 ? coverage.push(coverageStr) : null;
			eligibleDependents.push(dependent);
		}
	});

	if (
		coverage.indexOf("Employee & Spouse") !== -1 &&
		coverage.indexOf("Employee & Dependents") !== -1 &&
		coverage.indexOf("Employee & Family") === -1
	) {
		coverage.push("Employee & Family");
	}
	return {
		dependents: eligibleDependents,
		coverage
	};
};
