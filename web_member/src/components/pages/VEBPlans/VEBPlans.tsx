import { useContext } from "react";
import { KemperLogo } from "../../../assets";
import { ThemeContext } from "../../../contexts";
import { VEBPlanCard } from "../../shared";

import "./VEBPlans.css";

const VEBPlans = (): JSX.Element => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className="VEB-plans">
			<div className="VEB-plans-header">
				<span style={{ color: theme.primary_color }}>Insurance </span> for you and your loved ones
			</div>
			<div className="VEB-plans-subheader">
				Live your life while knowing you and your loved ones are protected by us
			</div>
			<div className="carrier-logo kemper glb-theme-margin-top-bottom-3">
				<img src={KemperLogo} />
			</div>
			<VEBPlanCard />
		</div>
	);
};

export default VEBPlans;
