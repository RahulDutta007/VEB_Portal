import { Member } from "../../member.types";

export type CurrentEnrollment = {
	plan_name: string;
	premium_amount: number;
	status: string;
};

export type Store = {
	currentEnrollment: CurrentEnrollment | null;
};
