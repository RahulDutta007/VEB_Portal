import { Grid, Button } from "@mui/material";
import { useContext, Suspense, useMemo, useCallback } from "react";
import { ThemeContext, ThemeContextProvider } from "../../../../contexts";
import { BrandingActionsProps, PlanActionsProps } from "../../../../@types/components/planActions.types";
import { useLocation, useNavigate } from "react-router-dom";
import { LazyBrandingActions, LazyPlanActions } from "../..";

import "./planActions.css";

const BrandingActions = ({ waiveButtonCallback, enrollButtonCallback }: BrandingActionsProps): JSX.Element => {
	const { theme } = useContext(ThemeContext);
	const location = useLocation();
	const navigate = useNavigate();
	const urlSearchParams: URLSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

	const handleEnrollClick = useCallback(() => {
		const step = urlSearchParams.get("step");
		navigate(`?step=${step}&stage=1`);
	}, [navigate, urlSearchParams]);

	return (
		<div className="plan-actions">
			<Grid container columnSpacing={2}>
				<Grid xl={3}></Grid>
				<Grid xl={3}></Grid>
				<Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
					<Button className="plan-action-button waive" variant="contained" onClick={waiveButtonCallback}>
						Waive
					</Button>
				</Grid>
				<Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
					<Button
						className="plan-action-button"
						style={{ backgroundColor: theme.button.background_color, color: theme.button.color }}
						variant="contained"
						onClick={enrollButtonCallback}
					>
						Enroll
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default BrandingActions;
