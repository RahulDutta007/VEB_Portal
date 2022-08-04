import { useState, useContext, useEffect, useCallback, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { StyledButtonProps, StyledNavLinkProps } from "../../@types/components/styledComponentProps.types";
import { LogoSettings } from "../../@types/logoSettings.types";
import MenuItems from "../../constants/navbarMenuItems.json";
import { IconButton, Popover, Badge } from "@mui/material";
import { Logo } from "../../assets";
import { ThemeContext } from "../../contexts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Notifications from "../shared/notifications/Notifications";

import "./navbar.css";
import { LOGO_SETTINGS } from "../../constants/theme/logoSettings";

const StyledNavLink = styled(NavLink)`
	&::after {
		background: ${({ themePrimaryColor }: StyledNavLinkProps) => themePrimaryColor};
	}
`;

// eslint-disable-next-line prettier/prettier
const StyledButton = styled.div`
	&::after {
		background: ${({ themePrimaryColor }: StyledButtonProps) => themePrimaryColor};
	}
`;

const Navbar = (): JSX.Element => {
	const { theme, setTheme } = useContext(ThemeContext);
	const [logoSettings, setLogoSettings] = useState<LogoSettings>(LOGO_SETTINGS);
	const [popOverAnchorEl, setPopOverAnchorEl] = useState(null);
	const [limit, setLimit] = useState(8);
	const [oldNotifications, setOldNotifications] = useState([
		{
			user_id: "025689",
			text: "arijit",
			type: "approval",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:00:23"
		},
		{
			user_id: "025685",
			text: "arijit",
			type: "creation",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:05:23"
		},
		{
			user_id: "025689",
			text: "arijit",
			type: "member_support",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:07:23"
		},
		{
			user_id: "025689",
			text: "arijit",
			type: "creation",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:00:23"
		},
		{
			user_id: "022689",
			text: "arijit",
			type: "announcement",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 01:00:23"
		},
		{
			user_id: "026689",
			text: "arijit",
			type: "health_links",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 02:00:23"
		},
		{
			user_id: "025689",
			text: "arijit",
			type: "health_links",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:00:23"
		},
		{
			user_id: "022689",
			text: "arijit",
			type: "approval",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 01:00:23"
		},
		{
			user_id: "026689",
			text: "arijit",
			type: "member_support",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 02:00:23"
		}
	]);
	const [newNotifications, setNewNotifications] = useState([
		{
			user_id: "025689",
			text: "arijit",
			type: "approval",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:00:23"
		},
		{
			user_id: "025685",
			text: "arijit",
			type: "creation",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:05:23"
		},
		{
			user_id: "025689",
			text: "arijit",
			type: "employer_support",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:07:23"
		},
		{
			user_id: "025689",
			text: "arijit",
			type: "registration_help",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:00:23"
		},
		{
			user_id: "022689",
			text: "arijit",
			type: "announcement",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 01:00:23"
		},
		{
			user_id: "026689",
			text: "arijit",
			type: "health_links",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 02:00:23"
		},
		{
			user_id: "025689",
			text: "arijit",
			type: "employer_support",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 00:00:23"
		},
		{
			user_id: "022689",
			text: "arijit",
			type: "approval",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 01:00:23"
		},
		{
			user_id: "026689",
			text: "arijit",
			type: "member_support",
			data: null,
			url: "ari.com",
			new: "",
			time: "2022-01-21 02:00:23"
		}
	]);
	const [_newNotifications, _setNewNotifications] = useState({
		user_id: "025689",
		text: "ari1080",
		type: "aspproval",
		data: null,
		url: "ari.com",
		new: "",
		time: "2022-01-21 00:00:23"
	});
	const [notificationCount, setNotificationCount] = useState();
	const [hasFetchedAllNotifications, setHasFetchedAllNotifications] = useState(false);
	const [skeletonLoad, setSkeletonLoad] = useState(false);
	const [pageNumber, setPageNumber] = useState(0);
	const isPopOverOpen = Boolean(popOverAnchorEl);
	const id = isPopOverOpen ? "simple-popover" : undefined;

	const handleLogoutClick = (): void => {
		localStorage.setItem("@log_out", "true");
		// Deleting JWT from Host after Logout from Guest
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	};

	const handlePopOverOpen = (event: any) => {
		setPopOverAnchorEl(event.currentTarget);
		//setNotificationCount(null);
		const notificationArrow = document?.getElementById("notificationArrow");
		if (notificationArrow) {
			notificationArrow.style.display = "block";
		}
	};

	const handlePopOverClose = useCallback(async () => {
		setPopOverAnchorEl(null);
		const notificationArrow = document?.getElementById("notificationArrow");
		if (notificationArrow) {
			notificationArrow.style.display = "block";
		}
	}, []);

	const loading = useRef(false);
	const scrollToEnd = () => {
		if (loading.current === false) {
			setPageNumber(pageNumber + 1);
		}
	};

	const scrollEvent = (event: any) => {
		const { scrollHeight, scrollTop, clientHeight } = event.target;

		if (scrollTop + clientHeight > scrollHeight - 5) {
			scrollToEnd();
		}
	};

	function timeout(delay: any) {
		return new Promise((res: any) => setTimeout(res, delay));
	}

	/*useEffect(() => {
		setNotificationCount(newNotifications.length);
	}, [newNotifications.length]);*/

	const getNotifications = useCallback(async () => {
		const params = {
			page: pageNumber + 1,
			limit
		};
		if (pageNumber === 1) {
			await timeout(3000);
			setNewNotifications((newNotifications: any) => [...newNotifications, _newNotifications]);
			loading.current = false;
			setSkeletonLoad(false);
		}
		if (pageNumber > 1) {
			setSkeletonLoad(false);
		}
	}, [_newNotifications, limit, pageNumber]);

	useEffect(() => {
		if (pageNumber !== 0 && !hasFetchedAllNotifications) {
			loading.current = true;
			setSkeletonLoad(true);
		}
		if (limit && !hasFetchedAllNotifications) {
			getNotifications();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getNotifications, hasFetchedAllNotifications, limit, pageNumber]);

	const renderNotifications = (
		<div>
			<Popover
				className="notification-popover"
				id={id}
				open={isPopOverOpen}
				anchorEl={popOverAnchorEl}
				onClose={handlePopOverClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center"
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left"
				}}
			>
				<Notifications
					newNotifications={newNotifications}
					oldNotifications={oldNotifications}
					scrollEvent={scrollEvent}
					loading={loading}
					skeletonLoad={skeletonLoad}
				/>
			</Popover>
		</div>
	);

	return (
		<div className="nav-bar-container">
			<div
				id="notificationArrow"
				className={
					window.innerWidth - document.body.clientWidth === 0
						? "notificationArrowNoScroll"
						: "notificationArrowWithScroll"
				}
				style={{
					display: "none"
				}}
			></div>
			{renderNotifications}
			<div
				className="top-bar-container"
				style={{
					backgroundColor: theme && theme.top_bar && theme.top_bar.background_color
				}}
			>
				<div className="top-bar">
					<div className="top-item" style={{ color: theme && theme.top_bar && theme.top_bar.color }}>
						<Link to="/" style={{ color: theme && theme.top_bar && theme.top_bar.color }}>
							FAQ
						</Link>
						<i className="fas fa-question-circle top-bar-item-icon"></i>
					</div>
					<div className="top-item" style={{ color: theme && theme.top_bar && theme.top_bar.color }}>
						<Link to="/" style={{ color: theme && theme.top_bar && theme.top_bar.color }}>
							Contact us
						</Link>
						<i className="fas fa-phone-alt top-bar-item-icon"></i>
					</div>
					<div
						className="top-menu-items"
						style={{
							display: theme && theme.theme_style === "theme_style_1" ? "none" : "flex",
							color: theme && theme.top_bar && theme.top_bar.color
						}}
					>
						<div className="top-item">
							<Link to="/profile" style={{ color: theme && theme.top_bar && theme.top_bar.color }}>
								My Account
							</Link>
							<i className="fas fa-user-circle top-bar-item-icon"></i>
						</div>
						<div className="top-item">
							<Link
								to=""
								onClick={handlePopOverOpen}
								style={{ color: theme && theme.top_bar && theme.top_bar.color }}
							>
								Notifications
							</Link>
							<Badge badgeContent={11} color="secondary">
								<i className="fas fa-bell top-bar-item-icon"></i>
							</Badge>
						</div>
						<div className="top-item">
							<Link
								to=""
								onClick={handleLogoutClick}
								style={{ color: theme && theme.top_bar && theme.top_bar.color }}
							>
								Logout
							</Link>
							<i className="fas fa-sign-out-alt top-bar-item-icon"></i>
						</div>
					</div>
				</div>
			</div>
			<div className="container-outer">
				<nav className="nav-bar">
					<div
						className="logo-container"
						style={{ display: theme && theme.theme_style === "theme_style_1" ? "flex" : "none" }}
					>
						<StyledNavLink to="/">
							{logoSettings && logoSettings.logo && logoSettings.logo.attachment ? (
								<img
									src={logoSettings && logoSettings.logo && logoSettings.logo.attachment}
									height={
										logoSettings &&
										logoSettings.logo &&
										logoSettings.logo.xl &&
										logoSettings.logo.xl.height + "px"
									}
									width={
										logoSettings &&
										logoSettings.logo &&
										logoSettings.logo.xl &&
										logoSettings.logo.xl.width + "px"
									}
									alt="logo"
								/>
							) : null}
						</StyledNavLink>
					</div>
					<div
						className="logo-container-center"
						style={{ display: theme && theme.theme_style === "theme_style_1" ? "none" : "flex" }}
					>
						<StyledNavLink to="/">
							{logoSettings && logoSettings.logo && logoSettings.logo.attachment ? (
								<img
									src={
										logoSettings && logoSettings.logo && logoSettings.logo.attachment
											? `http://localhost:4000/api/v1/show-file/${logoSettings?.logo?.attachment?.filename}`
											: Logo
									}
									// src = {
									//     logoSettings && logoSettings.logo && logoSettings.logo.attachment
									// }
									height={
										logoSettings &&
										logoSettings.logo &&
										logoSettings.logo.xl &&
										logoSettings.logo.xl.height + "px"
									}
									width={
										logoSettings &&
										logoSettings.logo &&
										logoSettings.logo.xl &&
										logoSettings.logo.xl.width + "px"
									}
									alt="logo"
								/>
							) : null}
						</StyledNavLink>
					</div>
					<div
						className="left-menu-items"
						style={{ display: theme && theme.theme_style === "theme_style_1" ? "flex" : "none" }}
					>
						<IconButton>
							<Badge badgeContent={11} color="secondary">
								<NotificationsIcon style={{ color: "#4e4e4e" }} onClick={handlePopOverOpen} />
							</Badge>
						</IconButton>
						<div className="menu-item">
							<StyledNavLink to="/profile" themePrimaryColor={theme && theme.primary_color}>
								<i className="fas fa-user-circle menu-item-icon" />
								My Account
							</StyledNavLink>
						</div>
						<div className="menu-item">
							<StyledButton
								onClick={handleLogoutClick}
								className="logout"
								themePrimaryColor={theme && theme.primary_color}
							>
								<i className="fas fa-sign-out-alt menu-item-icon"></i>
								Logout
							</StyledButton>
						</div>
					</div>
				</nav>
			</div>
			<div className="bottom-container">
				<div className="menu-items">
					{MenuItems.map((menuItem, index) => {
						const { caption, icon_class, link } = menuItem;
						return (
							<div className="menu-item" key={index}>
								<StyledNavLink to={link} themePrimaryColor={theme && theme.primary_color}>
									<i className={`${icon_class} menu-item-icon`} />
									{caption}
								</StyledNavLink>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
