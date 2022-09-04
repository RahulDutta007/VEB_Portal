import { useState, useEffect, useContext } from "react";
import { ADMIN_DASHBOARD_HEADER } from "../../../../constants/caption/dashboardHeader";
import { UIContext } from "../../../../contexts";
import AgentManagementGrid from "./AgentManagementGrid";

const AgentManagement = (): JSX.Element => {
	const { setDashboardHeader } = useContext(UIContext);

	useEffect(() => {
		setDashboardHeader(ADMIN_DASHBOARD_HEADER.agent_management);
	}, [setDashboardHeader]);
	return (
		<div className="agent-management-container">
			<AgentManagementGrid />
		</div>
	);
};

export default AgentManagement;
