export type Validation = {
	[key: string]: string | null | any;
	status: "valid" | "invalid";
};
