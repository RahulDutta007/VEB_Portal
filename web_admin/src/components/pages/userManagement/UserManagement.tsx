import { useRef, useState, useContext, useEffect } from "react";
import { UIContext } from "../../../contexts";
import { ADMIN_DASHBOARD_HEADER } from "../../../constants/caption/dashboardHeader";
import TabPanel from "../../shared/tabPanelComponent/TabPanel";
import a11yProps from "../../../constants/tabPanelProps/ayProps";
import AgentManagement from "./agents/AgentManagementGrid";

import { Box, Tab, Tabs } from "@mui/material";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const UserManagement = (): JSX.Element => {
	const [value, setValue] = useState(0);
	const [isSelected, setIsSelected] = useState(false);
	const { setDashboardHeader } = useContext(UIContext);

	const handleLabelChange = (event: any, newValue: number) => {
		console.log("Value", newValue);
		setValue(newValue);
	};

	useEffect(() => {
		setDashboardHeader(ADMIN_DASHBOARD_HEADER.user_management);
	}, [setDashboardHeader]);

	return (
		<div className="user-management-container">
			<Box sx={{ width: "100%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleLabelChange}
						aria-label="basic tabs example"
						TabIndicatorProps={{
							style: {
								border: "none",
								backgroundColor: "#558b2f"
							}
						}}
						className="glb-tab-panel"
					>
						<Tab
							label={
								<div>
									<HowToRegIcon style={{ verticalAlign: "middle" }} className="glb-tab-icon" />
									Registared Users
								</div>
							}
							value={0}
							className={value === 0 ? "glb-tab-label-selected" : "glb-tab-label"}
							{...a11yProps(0)}
						/>
						<Tab
							label={
								<div>
									<PersonAddAlt1Icon style={{ verticalAlign: "middle" }} className="glb-tab-icon" />
									Unregistered Usres
								</div>
							}
							value={1}
							className={value === 1 ? "glb-tab-label-selected" : "glb-tab-label"}
							{...a11yProps(1)}
						/>
					</Tabs>
					<TabPanel value={0} index={0}>
						<AgentManagement />
					</TabPanel>
					<TabPanel value={1} index={1}>
						<AgentManagement />
					</TabPanel>
				</Box>
			</Box>
		</div>
	);
};

export default UserManagement;
