import { Suspense, useEffect, useContext, useMemo, useCallback, useState } from "react";
import { LazyBrandingActions, LazyCustomFormDialog, PlanBranding, PlanHeader } from "../../../../../../shared";
import { Paper } from "@mui/material";
import { KemperBanner } from "../../../../../../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomFormDialogType } from "../../../../../../../@types/components/dialogProps.types";
import { AuthContext } from "../../../../../../../contexts";
import { generateCancerKemperWaiveEnrollmentPayload } from "../../../../../../../utils/commonFunctions/enrollment";

const KemperCancerBranding = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [cancerPlan, setCancerPlan] = useState({
		_id: "123zxkbnkabb3w2123",
		plan_name: "Kemper Cancer",
		plan_code: "KC"
	});
	const [intensiveCareUnitPlan, setIntensiveCareUnitPlan] = useState({
		_id: "123zxkbnkabb3w2123",
		plan_name: "Cancer - Intensive Care Unit",
		plan_code: "ICU"
	});
	const { member, groupOwner } = useContext(AuthContext);
	const [waiveReason, setWaiveReason] = useState("");
	const urlSearchParams: URLSearchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

	const handleWaiveReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setWaiveReason(value);
	};

	const handleWaiveReasonButtonClick = useCallback(() => {
		console.log("hiiiiiii");
		console.log("member", member);
		if (member) {
			[cancerPlan, intensiveCareUnitPlan].forEach((plan, index) => {
				const enrollment = generateCancerKemperWaiveEnrollmentPayload(plan, groupOwner, member, waiveReason);
				console.log("enrollment", enrollment);
			});
		}
	}, [cancerPlan, groupOwner, intensiveCareUnitPlan, member, waiveReason]);

	const [customFormDialogProps, setCustomFormDialogProps] = useState<CustomFormDialogType>();

	const handleWaiveButtonClick = useCallback(() => {
		setCustomFormDialogProps(
			Object.assign({}, customFormDialogProps, {
				openDialog: true,
				title: "Are you sure want to waive this enrollment?",
				textfields: [
					{
						label: "Waive Reason",
						onChange: handleWaiveReasonChange,
						value: waiveReason,
						placeholder: "Enter your reason for waive"
					}
				],
				actions: [
					{
						label: "Cancel",
						callback: () =>
							setCustomFormDialogProps(Object.assign({}, customFormDialogProps, { openDialog: false }))
					},
					{
						label: "Yes",
						callback: () => {
							setCustomFormDialogProps(
								Object.assign({}, customFormDialogProps, {
									openDialog: false
								})
							);
							console.log("memberssss", member);
							handleWaiveReasonButtonClick();
						}
					}
				]
			})
		);
	}, [customFormDialogProps, handleWaiveReasonButtonClick, member, waiveReason]);

	const handleEnrollButtonClick = useCallback(() => {
		const step = urlSearchParams.get("step");
		navigate(`?step=${step}&stage=1`);
	}, [navigate, urlSearchParams]);

	console.log("custom", customFormDialogProps);

	return (
		<div className="paper-form-container">
			<Suspense fallback={<div />}>
				{customFormDialogProps ? <LazyCustomFormDialog customFormDialogProps={customFormDialogProps} /> : null}
			</Suspense>
			<Paper className="theme-border-radius paper-container" elevation={1}>
				<PlanHeader planName="Kemper Group Cancer Insurance Policy" effectiveDate="01/22/2022" />
				<div className="theme-plan-section-margin" />
				<PlanBranding imgSrc={KemperBanner} />
				<Suspense fallback={<div />}>
					<LazyBrandingActions
						waiveButtonCallback={handleWaiveButtonClick}
						enrollButtonCallback={handleEnrollButtonClick}
					/>
				</Suspense>
			</Paper>
		</div>
	);
};

export default KemperCancerBranding;
