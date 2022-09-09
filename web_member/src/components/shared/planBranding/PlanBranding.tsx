import { PlanBrandingProps } from "../../../@types/components/planBrandingProps.types";
import PlanHeader from "../enrollment/planHeader/PlanHeader";
import { Paper } from "@mui/material";

import "./planBranding.css";

const PlanBranding = ({ imgSrc }: PlanBrandingProps): JSX.Element => {
	return <img src={imgSrc} alt="Plan Branding" width="100%" />;
};

export default PlanBranding;
