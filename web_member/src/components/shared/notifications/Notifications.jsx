/* eslint-disable*/
import { useState, useEffect, useRef, useCallback, Typography } from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText, ListItemAvatar, Tab, Tabs, Box } from "@mui/material";
import Notification from "./Notification";
import Skeleton from "@mui/material/Skeleton";
import { tabsClasses } from "@mui/material/Tabs";
import NOTIFICATION_ICON_TYPE from "../../../constants/notification/notificationIconType.json";
import NOTIFICATION_COLOR from "../../../constants/notification/notificationColor.json";

import "./notifications.css";

const Notifications = ({ newNotifications, oldNotifications, scrollEvent, loading, skeletonLoad }) => {
	const [_filteredNewNotifications, setFilteredNewNotifications] = useState([]);
	const [_filteredOldNotifications, setFilteredOldNotifications] = useState([]);
	const [value, setValue] = useState("all");
	const tabTypes = [
		{
			label: "All",
			value: "all"
		},
		{
			label: "Approval",
			value: "approval"
		},
		{
			label: "Creation",
			value: "creation"
		},
		{
			label: "Health Links",
			value: "health_links"
		}
	];

	const filterNotification = (notifications, _type) => {
		const filteredNotifications = [];
		notifications.forEach((notification) => {
			if (_type === "all") {
				filteredNotifications.push(notification);
			} else if (notification.type === _type) {
				filteredNotifications.push(notification);
			}
		});

		return filteredNotifications;
	};

	const handleTabChange = (event, newValue) => {
		setValue(newValue);
		const _filteredNewNotifications = filterNotification(newNotifications, newValue);
		const _filteredOldNotifications = filterNotification(oldNotifications, newValue);
		setFilteredNewNotifications(Object.assign([], _filteredNewNotifications));
		setFilteredOldNotifications(Object.assign([], _filteredOldNotifications));
	};

	useEffect(() => {
		const _filteredNewNotifications = filterNotification(newNotifications, "all");
		const _filteredOldNotifications = filterNotification(oldNotifications, "all");
		setFilteredNewNotifications(Object.assign([], _filteredNewNotifications));
		setFilteredOldNotifications(Object.assign([], _filteredOldNotifications));
	}, [newNotifications, oldNotifications]);

	return (
		<div className="notifications" onScroll={scrollEvent}>
			<div className="header">
				<span>Notifications</span>
				<a href="/all-notifications">See all</a>
			</div>
			<Box sx={{ flexGrow: 1, maxWidth: 480, bgcolor: "background.paper" }}>
				<Tabs
					value={value}
					onChange={handleTabChange}
					indicatorColor="secondary"
					variant="scrollable"
					scrollButtons
					centered
					sx={{
						[`& .${tabsClasses.scrollButtons}`]: {
							"&.Mui-disabled": { opacity: 0.3 }
						}
					}}
				>
					{tabTypes.map((tab, index) => (
						<Tab
							style={{ color: NOTIFICATION_COLOR[tab.value], fontSize: "12px" }}
							label={tab.label}
							icon={
								<i
									className={NOTIFICATION_ICON_TYPE[tab.value]}
									style={{
										fontSize: "15px",
										color: NOTIFICATION_COLOR[tab.value]
									}}
								></i>
							}
							value={tab.value}
						/>
					))}
					;
				</Tabs>
			</Box>
			<List>
				<div className="notification-header">
					{_filteredNewNotifications.length > 0 ? <div className="notification-time-header">New</div> : ""}
				</div>
				{_filteredNewNotifications
					? _filteredNewNotifications.map((_filteredNewNotifications, index) => (
							<Notification notification={_filteredNewNotifications} key={index} />
					  ))
					: ""}
				<div className="notification-header">
					{_filteredNewNotifications.length > 0 && _filteredOldNotifications.length ? (
						<div className="notification-time-header">Earlier</div>
					) : (
						""
					)}
				</div>
				{_filteredOldNotifications
					? _filteredOldNotifications.map((_filteredOldNotifications, index) => (
							<Notification notification={_filteredOldNotifications} key={index} />
					  ))
					: ""}
				{loading.current && skeletonLoad ? (
					<div className="skeleton-container">
						<div className="loading-skeleton">
							<ListItem>
								<ListItemAvatar>
									<Skeleton animation="wave" variant="circle" width={40} height={40} />
								</ListItemAvatar>
								<ListItemText
									className="list-item-text"
									primary={
										<Skeleton
											animation="wave"
											height={10}
											width="95%"
											style={{ marginBottom: 6 }}
										/>
									}
									secondary={<Skeleton animation="wave" height={10} width="30%" />}
								/>
							</ListItem>
						</div>
						<div className="loading-skeleton">
							<ListItem>
								<ListItemAvatar>
									<Skeleton animation="wave" variant="circle" width={40} height={40} />
								</ListItemAvatar>
								<ListItemText
									className="list-item-text"
									primary={
										<Skeleton
											animation="wave"
											height={10}
											width="95%"
											style={{ marginBottom: 6 }}
										/>
									}
									secondary={<Skeleton animation="wave" height={10} width="30%" />}
								/>
							</ListItem>
						</div>
					</div>
				) : (
					""
				)}
			</List>
		</div>
	);
};

export default Notifications;
