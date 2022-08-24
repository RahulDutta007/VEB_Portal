import { useRef, useState } from "react";
import AgentManagementGrid from "./AgentManagementGrid";

const AgentManagement = (): JSX.Element => {
	return (
		<div className="agent-management-container">
			<AgentManagementGrid />
		</div>
	);
};

export default AgentManagement;
