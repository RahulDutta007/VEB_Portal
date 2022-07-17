export type Action = {
	label: string;
	callback: () => void;
};

export type DialogProps = {
	openDialog: boolean;
	title: string;
	content: string;
	actions: Action[];
};
