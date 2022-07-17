export type employeesFilterSchema = {
	[name: string]: {
		value: string | null;
		type: "contains" | "not_contains" | "equals" | "not_equals" | "starts_with" | "ends_with" | null;
	};
};
