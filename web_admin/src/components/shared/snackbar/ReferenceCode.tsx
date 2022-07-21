import { useState, useRef, useContext, useEffect, useCallback, Suspense } from "react";
import { SnackbarProps } from "../../../../@types/snackbarAPI.types";

const Announcements = () => {
	const [snackbarAPIProps, setSnackbarAPIProps] = useState<SnackbarProps>({
		open: false,
		severity: undefined,
		message: "",
		handleSnackbarClose: (event, reason) => {
			if (reason === "clickaway") return;
			setSnackbarAPIProps(
				Object.assign({}, snackbarAPIProps, {
					open: false
				})
			);
		}
	});

	const deleteAnnouncement = useCallback(
		async (_id: string) => {
			const _announcements = await api.announcements.deleteAnnouncementById(_id);
			if (_announcements) {
				setAnnouncements(Object.assign([], [..._announcements]));

				setSnackbarAPIProps(
					Object.assign({}, snackbarAPIProps, {
						open: true,
						message: "Successfully deleted announcement",
						severity: "success"
					})
				);
			}

			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[snackbarAPIProps]
	);

	return (
		<div className="announcements">
			<Suspense fallback={<div />}>
				<LazySnackbarAPI snackbarProps={snackbarAPIProps} />
			</Suspense>
		</div>
	);
};

export default Announcements;
