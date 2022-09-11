import { Member } from "../../member.types";
import { Paycheck } from "../../paycheck.types";

export type AuthContextProps = {
	member: Member | null;
	setMember: (member: Member) => void;
	paycheck: Paycheck | null;
	setPaycheck: (paycheck: Paycheck) => void;
};
