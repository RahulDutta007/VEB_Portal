import { useState, useEffect, useContext } from "react";
import { ADMIN_DASHBOARD_HEADER } from "../../../../constants/caption/dashboardHeader";
import { UIContext } from "../../../../contexts";
import AgentManagementGrid from "./AgentManagementGrid";

import { Button } from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AgentManagement = (): JSX.Element => {
	const { setDashboardHeader } = useContext(UIContext);

	useEffect(() => {
		setDashboardHeader(ADMIN_DASHBOARD_HEADER.agent_management);
	}, [setDashboardHeader]);
	return (
		<div className="agent-management-container">
			<div className="pf-action-button-container" id="pf-action-button-container">
				<Button className="button-green" variant="contained">
					<span className="button-label-with-icon">Add User</span>
					<span>
						<PersonAddIcon className="button-icon" />
					</span>
				</Button>
			</div>
			<AgentManagementGrid />
		</div>
	);
};

export default AgentManagement;
