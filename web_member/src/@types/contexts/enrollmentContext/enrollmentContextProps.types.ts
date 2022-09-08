import { Member } from "../../member.types";
import { CurrentEnrollment } from "./store.types";

export type EnrollmentContextProps = {
	currentEnrollment: CurrentEnrollment | null;
	setCurrentEnrollment: (currentEnrollment: CurrentEnrollment) => void;
	deleteCurrentEnrollment: () => void;
};
