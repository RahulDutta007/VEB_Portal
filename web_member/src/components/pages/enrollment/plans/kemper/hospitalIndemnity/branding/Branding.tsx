import { Suspense, useMemo, useCallback } from "react";
import { LazyBrandingActions, PlanBranding, PlanHeader } from "../../../../../../shared";
import { Paper } from "@mui/material";
import { AccidentBanner, KemperBanner } from "../../../../../../../assets";
import { useLocation, useNavigate } from "react-router-dom";

const KemperHospitalIndemnityBranding = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const urlSearchParams: URLSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

	const handleEnroll = useCallback(() => {
		const step = urlSearchParams.get("step");
		navigate(`?step=${step}&stage=1`);
	}, [navigate, urlSearchParams]);

	return (
		<div className="paper-form-container">
			<Paper className="theme-border-radius paper-container" elevation={1}>
				<PlanHeader planName="Kemper Group Cancer Insurance Policy" effectiveDate="01/22/2022" />
				<div className="theme-plan-section-margin" />
				<PlanBranding imgSrc={AccidentBanner} />
				<Suspense fallback={<div />}>
					<LazyBrandingActions waiveButtonCallback={() => null} enrollButtonCallback={() => handleEnroll()} />
				</Suspense>
			</Paper>
		</div>
	);
};

export default KemperHospitalIndemnityBranding;
