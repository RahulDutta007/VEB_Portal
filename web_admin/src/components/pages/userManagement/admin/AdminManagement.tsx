import { useRef, useState, useContext, useEffect } from "react";
import { UIContext } from "../../../../contexts";
import { ADMIN_DASHBOARD_HEADER } from "../../../../constants/caption/dashboardHeader";
// import { ADMIN_DASHBOARD_HEADER } from "../../../constants/caption/dashboardHeader";
import AdminManagementGrid from "./adminManagementGrid/AdminManagementGrid";

const AdminManagement = (): JSX.Element => {
	const { setDashboardHeader } = useContext(UIContext);

	useEffect(() => {
		setDashboardHeader(ADMIN_DASHBOARD_HEADER.admin_management);
	}, [setDashboardHeader]);

	return (
		<div className="admin-management-container">
			<AdminManagementGrid />
		</div>
	);
};

export default AdminManagement;
