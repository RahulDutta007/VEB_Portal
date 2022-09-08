import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { ADMIN_DASHBOARD_HEADER } from "../../../../constants/caption/dashboardHeader";
import { UIContext } from "../../../../contexts";
import TabPanel from "../../../shared/tabPanelComponent/TabPanel";
import a11yProps from "../../../../constants/tabPanelProps/ayProps";
import { api } from "../../../../utils/api";
import PlanManagementGrid from "./PlanManagementGrid";
import moment from "moment";
import dateConverterUS from "../../../../utils/commonFunctions/date";

import { Box, Tabs, Tab } from "@mui/material";

const PlanManagement = (): JSX.Element => {
	const [plans, setPlans] = useState([]);
	const [active_plans, setActivePlans] = useState([]);
	const [expired_plans, setExpiredPlans] = useState([]);
	const [value, setValue] = useState(0);
	const { setDashboardHeader } = useContext(UIContext);

	const handleLabelChange = (event: any, newValue: number) => {
		console.log("Value", newValue);
		setValue(newValue);
	};

	const getPlans = useCallback(async () => {
		const _plans = await api.plan.getAllPlan("");
		console.log("Plans ", _plans);
		setPlans(Object.assign([], _plans));
		setActivePlans(
			Object.assign(
				[],
				_plans
					.filter((plan, index) => plan.status === "ACTIVE")
					.map((plan, index) => {
						if (plan.start_date) {
							plan.start_date = dateConverterUS(plan.start_date);
						}
						if (plan.end_date) {
							plan.end_date = dateConverterUS(plan.end_date);
						}
						return plan;
					})
			)
		);
		setExpiredPlans(
			Object.assign(
				[],
				_plans
					.filter((plan, index) => plan.status === "EXPIRED")
					.map((plan, index) => {
						if (plan.start_date) {
							plan.start_date = moment(plan.start_date).format("MM/DD/YYYY");
						}
						if (plan.end_date) {
							plan.end_date = moment(plan.end_date).format("MM/DD/YYYY");
						}
						return plan;
					})
			)
		);
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
				<Box>
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
					<TabPanel value={value} index={0}>
						<PlanManagementGrid gridData={active_plans} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<PlanManagementGrid gridData={expired_plans} />
					</TabPanel>
				</Box>
			</Box>
		</div>
	);
};

export default PlanManagement;
