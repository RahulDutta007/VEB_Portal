import { useContext } from "react";
import { ThemeContext } from "../../../../contexts";
import { PlanHeaderProps } from "../../../../@types/components/planHeader.types";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import "./planHeader.css";

const PlanHeader = ({ planName, effectiveDate }: PlanHeaderProps): JSX.Element => {
	const { theme } = useContext(ThemeContext);

	console.log("theme", theme);
	return (
		<div className="plan-header">
			<div className="header">{planName}</div>
			<div className="sub-header" style={{ color: theme.primary_color, borderLeftColor: theme.primary_color }}>
				<div>
					<CalendarMonthIcon className="icon" style={{ color: theme.primary_color }} />
				</div>
				<div className="code-text">Effective Date: {effectiveDate}</div>
			</div>
			{/* <div
				className="divider-grad-mask"
				style={{
					background: `linear-gradient(90deg, ${theme.primary_color} 0 55%, transparent 0 100%) 0 0 / 2rem 1rem`
				}}
			/> */}
		</div>
	);
};

export default PlanHeader;
