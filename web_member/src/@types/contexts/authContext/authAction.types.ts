import { GroupOwner } from "../../groupOwner.types";
import { Member } from "../../member.types";
import { Paycheck } from "../../paycheck.types";

export type AuthAction = {
	type: string;
	payload: {
		member: Member | null;
		paycheck: Paycheck | null;
		groupOwner: GroupOwner | null;
		dependents: Member[] | null;
	};
};
