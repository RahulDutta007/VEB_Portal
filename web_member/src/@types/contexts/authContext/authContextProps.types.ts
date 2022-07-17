import { Member } from "../../member.types";

export type AuthContextProps = {
	member: Member | null;
	setMember: (member: Member) => void;
};
