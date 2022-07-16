export type DynamicFormField = {
	schema?: string;
	label: string;
	type: string;
	name: string;
	value: any;
	placeholder?: string | undefined;
	onChange: (...args: any[]) => void;
	options?: string[];
};

export type DynamicForm = {
	[key: string]: DynamicFormField[];
};
