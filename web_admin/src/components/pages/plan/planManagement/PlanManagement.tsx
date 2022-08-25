import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { ADMIN_DASHBOARD_HEADER } from "../../../../constants/caption/dashboardHeader";
import { UIContext } from "../../../../contexts";
import TabPanel from "../../../shared/tabPanelComponent/TabPanel";
import a11yProps from "../../../../constants/tabPanelProps/ayProps";
import { api } from "../../../../utils/api";
import PlanManagementGrid from "./PlanManagementGrid";

import { Box, Tabs, Tab } from "@mui/material";

const PlanManagement = (): JSX.Element => {
	const [plans, setPlans] = useState([]);
	const [value, setValue] = useState(0);
	const { setDashboardHeader } = useContext(UIContext);

	const handleLabelChange = (event: any, newValue: number) => {
		console.log("Value", newValue);
		setValue(newValue);
	};

	const getPlans = useCallback(async () => {
		const _plans = await api.plan.getAllPlan("ACTIVE");
		console.log("Plans ", _plans.data);
		setPlans(Object.assign([], _plans.data));
	}, []);

	useEffect(() => {
		getPlans();
	}, [getPlans]);

	useEffect(() => {
		setDashboardHeader(ADMIN_DASHBOARD_HEADER.plan_management);
	}, [setDashboardHeader]);

	return (
		<div className="plan-management-container">
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
							label={"Active Plan"}
							value={0}
							className={value === 0 ? "glb-tab-label-selected" : "glb-tab-label"}
							{...a11yProps(0)}
						/>
						<Tab
							label={"Inactive Plan"}
							value={1}
							className={value === 1 ? "glb-tab-label-selected" : "glb-tab-label"}
							{...a11yProps(1)}
						/>
					</Tabs>
					<TabPanel value={0} index={0}>
						<PlanManagementGrid gridData={plans} />
					</TabPanel>
					<TabPanel value={1} index={1}>
						<PlanManagementGrid gridData={plans} />
					</TabPanel>
				</Box>
			</Box>
		</div>
	);
};

export default PlanManagement;
