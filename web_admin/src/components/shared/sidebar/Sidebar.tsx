import { useState, useContext, useEffect, useCallback, Suspense } from "react";
import { SidebarProps } from "../../../@types/components/sidebar.types";
import { UI_THEME } from "../../../constants/UITheme/UITheme";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { UIContext, AuthContext } from "../../../contexts";
import SIDEBAR_OPTIONS from "../../../constants/sidebarOptions";
import { Tab } from "../../../@types/sidebarOptions.types";
import { AUTHORIZATION } from "../../../constants/api/auth";
import axios from "axios";
import { url, port, headers } from "../../../config/config";
import { trackPromise } from "react-promise-tracker";
import { DialogProps, TDialogProps } from "../../../@types/dialogProps.types";
import { ADMIN_DASHBOARD_HEADER } from "../../../constants/caption/dashboardHeader";

import {
	AppBar,
	Box,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	Accordion,
	AccordionSummary,
	Avatar,
	AccordionDetails,
	Popover,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListItemAvatar,
	Badge,
	BadgeProps
} from "@mui/material";

import { styled } from "@mui/material/styles";

import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import "./sidebar.css";
import { LazyCustomDialog } from "..";
import { api } from "../../../utils/api";

const rippleKeyFrame = keyframes`
	0% {
		transform: scale(.8),
		opacity: 1
	},
	100% {
		transform: scale(2.4),
		opacity: 0
	}
`;

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: `${rippleKeyFrame} 1.2s infinite ease-in-out`,
			border: "1px solid currentColor",
			// eslint-disable-next-line quotes
			content: '""'
		}
	}
}));

const drawerWidth = 240;

const Sidebar = ({ WrappedComponent }: SidebarProps) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { dashboardHeader, selectedTab, setDashboardHeader } = useContext(UIContext);

	const [anchorEl, setAnchorEl] = useState<(EventTarget & (HTMLLIElement | HTMLButtonElement)) | null>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
	const isMenuOpen = Boolean(anchorEl);
	const { user, setUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [logoutDialogProps, setLogoutDialogProps] = useState<TDialogProps>({
		openDialog: false,
		title: "",
		content: "",
		actions: []
	});

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

	const hClick = (route: any) => {
		navigate(route);
	};

	// const getUser = useCallback(async () => {
	// 	const response = await trackPromise(api.groupOwner.getGroupOwnerByAuth());
	// 	// console.log("getUser", response);
	// 	if (response) {
	// 		setUser(Object.assign({}, response));
	// 	}
	// }, [setUser]);

	const getUser = useCallback(async () => {
		try {
			const response = await trackPromise(api.groupOwner.getGroupOwnerByAuth());
			// console.log("Users", response);
			let _SSN;

			const { SSN } = response;
			// Converting SSN to required type
			const ssn = String(SSN);
			if (ssn) _SSN = ssn.substring(0, 3) + "-" + ssn.substring(3, 5) + "-" + ssn.substring(5);
			if (response) {
				const _user = {
					...response,
					SSN: SSN !== "" || SSN !== undefined ? _SSN : ""
				};
				setUser(Object.assign({}, _user));
			}
		} catch (err) {
			alert("Failed to fetch User!");
		}
	}, [setUser]);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLLIElement | HTMLButtonElement>) => {
		const { currentTarget } = event;
		setAnchorEl(currentTarget);
		const menuArrowElement = document.getElementById("menuArrow");
		if (menuArrowElement) {
			menuArrowElement.style.display = "block";
		}
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		const menuArrowElement = document.getElementById("menuArrow");
		if (menuArrowElement) {
			menuArrowElement.style.display = "none";
		}
		handleMobileMenuClose();
	};

	const handleProfileClick = useCallback(() => {
		navigate("/my-profile");
		setAnchorEl(null);
		handleMobileMenuClose();
		const menuArrowElement = document.getElementById("menuArrow");
		if (menuArrowElement) {
			menuArrowElement.style.display = "none";
		}
	}, [navigate]);

	const handleLogoutClick = useCallback(() => {
		localStorage.removeItem("@jwt");
		setLogoutDialogProps(
			Object.assign({}, logoutDialogProps, {
				openDialog: true,
				title: "Thank you",
				content: "You have successfully logged out of VEB Portal",
				actions: [
					{
						label: "Okay",
						callback: () => {
							// window.location.reload();
							navigate("/login");
							setLogoutDialogProps(Object.assign({}, logoutDialogProps, { openDialog: false }));
						}
					}
				]
			})
		);
	}, [logoutDialogProps]);

	useEffect(() => {
		getUser();
	}, [getUser]);

	// useEffect(() => {
	// 	setDashboardHeader(ADMIN_DASHBOARD_HEADER.dashBoard);
	// }, [setDashboardHeader]);

	const menuId = "primary-search-account-menu";

	const renderMenu = (
		<Popover
			id={menuId}
			open={isMenuOpen}
			anchorEl={anchorEl}
			onClose={handleMenuClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center"
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center"
			}}
			style={
				{
					//scrollbar: 5
				}
			}
		>
			<div className="profile-menu">
				<List>
					<ListItem button onClick={handleProfileClick}>
						<ListItemAvatar>
							<Avatar className="list-avatar">
								<PersonIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="My Profile" />
					</ListItem>
					<ListItem button onClick={handleLogoutClick}>
						<ListItemAvatar>
							<Avatar className="list-avatar">
								<ExitToAppIcon /* style={{ color: "#44b700"}} */ />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Logout" />
					</ListItem>
				</List>
			</div>
		</Popover>
	);

	const drawer = (
		<div>
			<Toolbar />
			<div className="welcome-container">
				<div className="dashboard-type-text" id="dashboard-type-text">
					Dashboard
				</div>
				<StyledBadge
					overlap="circular"
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "right"
					}}
					variant="dot"
				>
					<Avatar alt="Remy Sharp" className="profile-avatar">
						<div className="avatar-text">
							{user?.first_name.charAt(0).toUpperCase()}
							{user?.last_name.charAt(0).toUpperCase()}
						</div>
					</Avatar>
				</StyledBadge>
				<div className="welcome-text" id="welcome-text">
					{user?.first_name} {user?.last_name}
				</div>
			</div>
			<Divider />
			<List>
				{"ADMIN" &&
					SIDEBAR_OPTIONS["ADMIN"]?.map((tab: Tab, tabIndex: number) => {
						return (
							<Accordion
								className="list-item-accordion"
								key={tabIndex}
								expanded={tab.subTabs.length > 0 ? undefined : false}
							>
								<AccordionSummary
									expandIcon={tab.subTabs.length > 0 ? <ExpandMoreIcon /> : <div />}
									aria-controls="panel1a-content"
									id="panel1a-header"
									className="list-item-accordion-summary"
								>
									<div style={{ marginRight: 10 }}>{tab.icon()}</div>
									<div onClick={() => navigate(tab.route)}>{tab.caption}</div>
								</AccordionSummary>
								<AccordionDetails>
									<List>
										{tab.subTabs.length !== 0 &&
											tab.subTabs.map((subTab, subTabIndex) => {
												const { caption, route } = subTab;
												return (
													<ListItem
														button
														key={subTabIndex}
														className="list-item-container"
														onClick={hClick}
														style={{
															backgroundColor:
																selectedTab.subTabIndex === subTabIndex &&
																selectedTab.index === tabIndex
																	? "#85CE36"
																	: "inherit",
															color:
																selectedTab.subTabIndex === subTabIndex &&
																selectedTab.index === tabIndex
																	? "#4e4e4e"
																	: "inherit",
															fontWeight:
																selectedTab.subTabIndex === subTabIndex &&
																selectedTab.index === tabIndex
																	? "bolder"
																	: "inherit"
														}}
													>
														<ListItemText
															primary={caption}
															className="list-item-text"
															style={{
																color:
																	selectedTab.subTabIndex === subTabIndex &&
																	selectedTab.index === tabIndex
																		? "#4e4e4e"
																		: "inherit",
																fontWeight:
																	selectedTab.subTabIndex === subTabIndex &&
																	selectedTab.index === tabIndex
																		? "bolder"
																		: "inherit"
															}}
														/>
													</ListItem>
												);
											})}
									</List>
								</AccordionDetails>
							</Accordion>
						);
					})}
			</List>
		</div>
	);

	const container = window !== undefined ? () => window.document.body : undefined;

	return (
		<div className="admin-sidebar">
			<div
				id="menuArrow"
				style={{
					width: "0",
					height: "0",
					borderLeft: "7px solid transparent",
					borderRight: "7px solid transparent",
					borderBottom: "15px solid #fff",
					zIndex: 9999,
					position: "absolute",
					top: 43,
					right: 30,
					transition: "2s",
					display: "none"
				}}
			></div>
			<Suspense fallback={<div />}>
				<LazyCustomDialog dialogProps={logoutDialogProps} />
			</Suspense>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` }
					}}
				>
					<Toolbar className="toolbar">
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}
						>
							<MenuIcon />
						</IconButton>
						<div className="appbar-header" id="appbar-header">
							{dashboardHeader}
						</div>
						<div className="toolbar-grow" />
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							{/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
								<Badge badgeContent={4} className="toolbar-icon-badge" color="primary">
									<MailIcon className="toolbar-icon" />
								</Badge>
							</IconButton> */}
							<IconButton size="large" aria-label="show 17 new notifications" color="inherit">
								<Badge badgeContent={17} className="toolbar-icon-badge" color="primary">
									<NotificationsIcon className="toolbar-icon" />
								</Badge>
							</IconButton>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								aria-controls={menuId}
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle className="toolbar-icon" />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
				{renderMenu}
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Drawer
						container={container}
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
						sx={{
							display: { xs: "block", sm: "none" },
							"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
						}}
					>
						{drawer}
					</Drawer>
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: "none", sm: "block" },
							"& .MuiDrawer-paper": {
								boxSizing: "border-box",
								width: drawerWidth,
								backgroundColor: UI_THEME.secondaryColor
							}
						}}
						open
						style={{
							backgroundColor: "#3A4652"
						}}
					>
						{drawer}
					</Drawer>
				</Box>
				<Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
					<Toolbar />
					<Suspense fallback={<div />}>
						<WrappedComponent />
					</Suspense>
				</Box>
			</Box>
		</div>
	);
};

export default Sidebar;
