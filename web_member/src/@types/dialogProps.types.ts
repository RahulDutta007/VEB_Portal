export type Action = {
	label: string;
	callback: () => void;
};

export type InputField = {
	name: string;
	value: string;
	placeHolder: string;
};

export type DialogProps = {
	openDialog: boolean;
	title: string;
	content: string;
	actions: Action[];
};

export type CustomDisclaimerDialogPropsType = {
	openDialog: boolean;
	title: string;
	content: string;
	importantTitle: string;
	importantContent: string;
	inputFields: InputField[];
	actions: Action[];
};
