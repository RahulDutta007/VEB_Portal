import { DialogProps } from "../dialogProps.types";

export type Action = {
	label: string;
	callback: () => void;
};
export type CustomDialogProps = {
	dialogProps: {
		openDialog: boolean;
		title: string;
		content: string;
		actions: Action[];
	};
};

export type CustomFullScreenDialogProps = {
	dialogProps: {
		openDialog: boolean;
		title: string;
		content: string;
		handleCloseCallback: () => void;
		isParsed: boolean;
	};
};

export type CustomImageDialog = {
	openDialog: boolean;
	image: string | undefined;
	// eslint-disable-next-line @typescript-eslint/ban-types
	handleCloseCallback: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
};

export type CustomImageDialogProps = {
	dialogProps: CustomImageDialog;
};

export type ImageUploadField = {
	buttonLabel: string;
	callback: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ImageUploadAction = {
	label: string;
	callback: () => void;
};

export type CustomImageUploadDialog = {
	openDialog: boolean;
	title: string;
	uploadFields: ImageUploadField[];
	actions: ImageUploadAction[];
	imageSrc: any;
};

export type CustomImageUploadDialogProps = {
	dialogProps: CustomImageUploadDialog;
};
