import ReactPlayer from "react-player";
import { VideoPlayerDialogProps } from "../../../../@types/components/videoPlayerDialogProps.types";
import { Dialog, DialogContent } from "@material-ui/core";

import "./videoPlayerDialog.css";

const VideoPlayerDialog = ({ videoPlayerProps, videoFile, videoFileUrl }: VideoPlayerDialogProps): JSX.Element => {
	const { openPlayer, handleClosePlayer } = videoPlayerProps;

	return (
		<div className="video-player-dialog">
			<Dialog
				open={openPlayer}
				onClose={handleClosePlayer}
				aria-labelledby="form-dialog-title"
				className="video-player-container"
			>
				<DialogContent>
					<ReactPlayer url={videoFileUrl ? videoFileUrl : videoFile} controls />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default VideoPlayerDialog;
