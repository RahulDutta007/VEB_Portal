export type NotificationProps = {
	notification: any;
	key?: number;
};

export type NotificationsProps = {
	newNotifications: any;
	oldNotifications: any;
	scrollEvent: (event: React.UIEvent<HTMLDivElement>) => void;
	loading: React.MutableRefObject<boolean>;
	skeletonLoad: boolean;
};
