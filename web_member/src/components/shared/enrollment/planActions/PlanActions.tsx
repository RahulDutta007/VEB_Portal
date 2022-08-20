import { Grid, Button } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../../../contexts";
import { PlanActionsProps } from "../../../../@types/components/planActions.types";

import "./planActions.css";

const PlanActions = ({ waiveButtonCallback, activateButtonCallback }: PlanActionsProps): JSX.Element => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className="plan-actions">
			<Grid container spacing={10}>
				<Grid item xl={6} lg={4} md={4} sm={12} xs={12}>
					<Button className="plan-action-button waive" variant="contained" onClick={waiveButtonCallback}>
						Waive Enrollment
					</Button>
				</Grid>
				<Grid item xl={6} lg={4} md={4} sm={12} xs={12}>
					<Button
						className="plan-action-button"
						style={{ backgroundColor: theme.button.background_color, color: theme.button.color }}
						variant="contained"
						onClick={activateButtonCallback}
					>
						Activate Enrollment
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default PlanActions;
