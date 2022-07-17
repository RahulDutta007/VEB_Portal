export type VideoPlayerDialogProps = {
	videoPlayerProps: {
		openPlayer: boolean;
		handleClosePlayer: () => void;
	};
	videoFile: File | any | null | string;
	videoFileUrl: string;
};
