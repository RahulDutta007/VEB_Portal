export type Action = {
	label: string;
	callback: () => void;
};

export type DialogProps = {
	dialogProps: {
		openDialog: boolean;
		title: string;
		content: string;
		actions: Action[];
	};
};

export type TDialogProps = {
	openDialog: boolean;
	title: string;
	content: string;
	actions: Action[];
};
