import { AtomicType } from "./atomic.types";

export type Group = {
	logo: string;
	name: string;
	group_number?: number;
	[key: string]: AtomicType;
};
