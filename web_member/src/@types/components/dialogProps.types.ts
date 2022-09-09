import { DialogProps } from "../dialogProps.types";
import { CustomDisclaimerDialogPropsType } from "../dialogProps.types";

export type CustomDialogProps = {
	dialogProps: DialogProps;
};

export type CustomDisclaimerDialogProps = {
	enrollmentDisclaimerDialogProps: CustomDisclaimerDialogPropsType;
	handleCloseDisclaimerDialog: () => void;
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
