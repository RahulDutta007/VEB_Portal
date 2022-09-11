import { Member } from "../member.types";

export type EnrollmentTabLabelProps = {
	planName: string;
	status: "ENROLLED" | "WAIVED" | null;
	carrier: string;
};

export type StatusIcon = {
	ENROLLED: JSX.Element;
	WAIVED: JSX.Element;
};

export type PlanFormProps = {
	dependents: Member[];
};
