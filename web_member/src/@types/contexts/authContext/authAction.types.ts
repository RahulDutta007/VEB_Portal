import { Member } from "../../member.types";

export type AuthAction = {
	type: string;
	payload: Member;
};
