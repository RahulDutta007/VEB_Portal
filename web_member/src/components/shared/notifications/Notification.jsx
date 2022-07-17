import { useRef, useCallback } from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from "@mui/material";
import NOTIFICATION_ICON_TYPE from "../../../constants/notification/notificationIconType.json";
import NOTIFICATION_COLOR from "../../../constants/notification/notificationColor.json";
import timeAgo from "../../../utils/commonFunctions/dateDifferenceCalculator";

// eslint-disable-next-line react/prop-types
const Notification = ({ notification, key }) => {
	// eslint-disable-next-line react/prop-types
	const content = notification.text;

	return (
		<ListItem
			button
			key={key}
			// eslint-disable-next-line react/prop-types
			onClick={() => handleNotificationClick(notification.type, notification.data)}
			className="notification-item"
			// eslint-disable-next-line react/prop-types
			style={{ borderLeftColor: NOTIFICATION_COLOR[notification.type] }}
		>
			<i
				// eslint-disable-next-line react/prop-types
				className={NOTIFICATION_ICON_TYPE[notification.type]}
				// eslint-disable-next-line react/prop-types
				style={{ fontSize: "20px", paddingRight: "15px", color: NOTIFICATION_COLOR[notification.type] }}
			></i>
			<ListItemText
				className="list-item-text"
				// eslint-disable-next-line react/prop-types
				style={{ color: NOTIFICATION_COLOR[notification.type] }}
				primary={<Typography variant="subtitle1">{content}</Typography>}
				// eslint-disable-next-line react/prop-types
				secondary={timeAgo(notification.time)}
			/>
		</ListItem>
	);
};

export default Notification;
