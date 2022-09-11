import { Member } from "../../@types/member.types";

type EligibleDependents = {
	dependents: Member[];
	coverage: string[];
};

export const getKemperCancerEligibleDependents = (dependents: Member[]): EligibleDependents => ({
	dependents,
	coverage: ["Employee Only", "Employee & Spouse", "Employee & Dependents", "Employee & Family"]
});
