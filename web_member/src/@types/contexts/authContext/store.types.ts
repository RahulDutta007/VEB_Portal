import { Member } from "../../member.types";
import { Paycheck } from "../../paycheck.types";

export type Store = {
	member: Member | null;
	paycheck: Paycheck | null;
};
