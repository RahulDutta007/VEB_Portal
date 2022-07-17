import { Branding } from "../uploadAdministration.types";

export type UploadVideoProps = {
	videoFile: File | any | string | null;
	videoFileUrl: string;
	setVideoFileUrl: React.Dispatch<React.SetStateAction<string>>;
	setVideoFile: React.Dispatch<React.SetStateAction<File | Record<string, unknown> | string | null>>;
};

export type NewVideoFormDialogProps = {
	dialogProps: {
		openDialog: boolean;
		isAvailable: boolean;
		buttonTitle: string;
		textFieldTitle: string;
		buttonTitleIcon: JSX.Element;
		handleCloseDialog: () => void;
	};
	handleVideoFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleVideoUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	videoFile: File | any | null | string;
};

export type UploadBrandingProps = {
	branding: Branding;
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleBrandingDelete: (name: string) => void;
};
