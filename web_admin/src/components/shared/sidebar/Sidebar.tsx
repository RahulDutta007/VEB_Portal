import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Accordion, AccordionSummary, Avatar, AccordionDetails } from "@mui/material";
import { UI_THEME } from "../../../constants/UITheme/UITheme";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../../contexts";
import SIDEBAR_OPTIONS from "../../../constants/sidebarOptions";
import { Tab } from "../../../@types/sidebarOptions.types";

import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./sidebar.css";

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

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
}

const Sidebar = (props: Props) => {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const { dashboardHeader, selectedTab } = useContext(UIContext);
	const navigate = useNavigate();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			<Toolbar />
			<div className="welcome-container">
				<div className="dashboard-type-text" id="dashboard-type-text">
					Admin Dashboard
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
						<div className="avatar-text">RD</div>
					</Avatar>
				</StyledBadge>
				<div className="welcome-text" id="welcome-text">
					Rahul Dutta
				</div>
			</div>
			<Divider />
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
									<div>{tab.caption}</div>
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
														onClick={() => navigate(route)}
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

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<div className="admin-sidebar">
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
							{dashboardHeader ? "Dashboard Header" : "Dashboard Header"}
						</div>
						<div className="toolbar-grow" />
						<Box sx={{ display: { xs: "none", md: "flex" } }}>
							<IconButton size="large" aria-label="show 4 new mails" color="inherit">
								<Badge badgeContent={4} className="toolbar-icon-badge" color="primary">
									<MailIcon className="toolbar-icon" />
								</Badge>
							</IconButton>
							<IconButton size="large" aria-label="show 17 new notifications" color="inherit">
								<Badge badgeContent={17} className="toolbar-icon-badge" color="primary">
									<NotificationsIcon className="toolbar-icon" />
								</Badge>
							</IconButton>
							<IconButton
								size="large"
								edge="end"
								aria-label="account of current user"
								//aria-controls={menuId}
								aria-haspopup="true"
								//onClick={handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle className="toolbar-icon" />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
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
					<Typography paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo
						vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
						tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis
						commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer
						quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
						proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
						feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
						ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
					</Typography>
					<Typography paragraph>
						Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi
						etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare
						suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
						Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
						tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum
						quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
						senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod
						elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
						posuere sollicitudin aliquam ultrices sagittis orci a.
					</Typography>
				</Box>
			</Box>
		</div>
	);
};

export default Sidebar;
