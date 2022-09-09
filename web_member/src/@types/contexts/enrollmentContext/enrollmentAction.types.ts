import { Member } from "../../member.types";
import { CurrentEnrollment } from "./store.types";

export type EnrollmentAction = {
	type: string;
	payload: CurrentEnrollment | null;
};
