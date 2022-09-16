/* eslint-disable arrow-parens */
import { Button, MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { AuthContext, ThemeContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import CustomInput from "../../../../../../shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../shared/customInput/CustomSelectInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import "./docAndRx.css";
import {
	Enrollment,
	EnrollmentCommonDetails,
	EnrollmentStandardDetails
} from "../../../../../../../@types/enrollment.types";
import { getCoveredDependents } from "../../../../../../../utils/commonFunctions/coveredDependents";
import { Member } from "../../../../../../../@types/member.types";

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		"&:not(:last-child)": {
			borderBottom: 0
		},
		"&:before": {
			display: "none"
		}
	})
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)"
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1)
	}
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

const DoctorAndRxForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [plan, setPlan] = useState({
		_id: "004",
		plan_name: "Doctor & Rx",
		plan_code: "plan001",
		start_date: "01/01/2023",
		end_date: "01/01/2024"
	});
	const [expanded, setExpanded] = useState<string | false>("panel_question");
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [coverage_for, setCoverageFor] = useState("");
	const [premium_amount, setPremiumAmount] = useState(0);
	const { paycheck, member } = useContext(AuthContext);
	const [eligibleDependents, setEligibleDependents] = useState<Member[]>([]);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleCoverageForChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setCoverageFor(value);
	};

	const handleActivateButtonCallback = useCallback(() => {
		if (member && coverage_for) {
			const enrollmentCommonDetails: EnrollmentCommonDetails = {
				agent_id: null,
				location_number: member.location_number,
				location_name: member.location.location_name,
				group_number: member.group_number,
				group_name: member.group.name,
				plan_object_id: plan._id,
				plan_code: plan.plan_code,
				enrollment_status: "APPROVED",
				insured_object_id: member._id,
				insured_SSN: member.SSN,
				unenrolled_reason: null,
				waive_reason: null,
				termination_reason: null,
				enrollment_date: "01/23/22",
				effective_date: "01/23/22",
				termination_date: null,
				open_enrollment_id: "0xqwe123123"
			};
			console.log("enrollmentCommonDetails", enrollmentCommonDetails);
			const enrollmentStandardDetails: EnrollmentStandardDetails[] = [];
			console.log("eligible xxxx", eligibleDependents);
			const coveredDependents = getCoveredDependents(coverage_for, eligibleDependents, member, premium_amount);
			console.log("coveredDependents", coveredDependents);
			const member_SSNs = [...coveredDependents.dep_SSNs, member.SSN];
			const enrollment: Enrollment = {
				standard_details: coveredDependents.enrollmentStandardDetails,
				common_details: enrollmentCommonDetails,
				dep_SSNs: member_SSNs
			};
			console.log("enrollment", enrollment);
		}
	}, [coverage_for, eligibleDependents, member, plan._id, plan.plan_code, premium_amount]);

	const handleWritingNumberChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target as HTMLInputElement;
			setWritingNumber(Number(value));
			if (Number(value) !== prevWritingNumber) {
				setShowWritingNumberValidateButton(true);
			} else {
				setShowWritingNumberValidateButton(false);
			}
		},
		[prevWritingNumber]
	);

	const calculatePremium = () => {
		if (coverage_for) {
			setPremiumAmount(1.16);
		}
	};

	useEffect(() => {
		calculatePremium();
	}, [coverage_for]);

	const { plan_name, plan_code, start_date, end_date } = plan;

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader planName="Call Up a Doc Group Doc & Rx" effectiveDate={start_date} />
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container">
							<div className="header-container header-container-new">
								<div className="theme-plan-header">Standard Benefits</div>
							</div>
							<div
								className="theme-plan-sub-header plan-text"
								style={{ borderLeftColor: theme.primary_color }}
							>
								In addition to yourself, who would you like to cover under this plan?
							</div>
						</div>
						<div className="theme-plan-inner-section-margin-2" />
						<Grid className="grid-container" container columnSpacing={2}>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Coverage For</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="contact_label"
										onChange={(event: any) => handleCoverageForChange(event)}
									>
										<MenuItem value="Employee Only">Employee Only</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}></Grid>
							<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label required align-center">Premium</div>
									<div className="show-premium">
										{premium_amount == 0 ? "$0.00" : `$${premium_amount.toFixed(2)}`}
									</div>
								</div>
							</Grid>
						</Grid>
					</div>
					<div className="theme-plan-inner-section-margin" />
					<Grid container className="theme-plan-inner-section-margin">
						<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
							<div className="details-form-row">
								<div
									className="details-form-label theme-plan-total-premium align-right"
									style={{ color: theme.primary_color }}
								>
									Total Premium:{" "}
									<span className="show-premium margin-adjust">
										{premium_amount == 0 ? "$0.00" : `$${premium_amount.toFixed(2)}`}
									</span>
								</div>
							</div>
						</Grid>
					</Grid>
					<div className="theme-plan-option-content">
						<Checkbox defaultChecked style={{ paddingLeft: 0 }} />
						<p className="theme-plan-checkbox-label">
							<strong>Are you actively at work 20 or more hours per week?</strong>
						</p>
					</div>
					<div className="theme-plan-inner-section-margin-2" />
					<Grid container>
						<Grid item xl={4} lg={4} md={4} sm={10} xs={10} columnSpacing={2}>
							<div className="details-form-row">
								<div className="details-form-label required">Writing Number</div>
								<Grid container>
									<Grid item xl={9}>
										<CustomInput value={writingNumber} onChange={handleWritingNumberChange} />
									</Grid>
									{showWritingNumberValidateButton ? (
										<Grid item xl={3}>
											<div className="writing-number-validate-container">
												<Button
													style={{
														backgroundColor: theme.button.background_color,
														color: theme.button.color,
														opacity: 0.8
													}}
												>
													Validate
												</Button>
											</div>
										</Grid>
									) : null}
								</Grid>
							</div>
						</Grid>
					</Grid>
					<div className="theme-plan-inner-section-margin-2" />
					<LazyPlanActions
						waiveButtonCallback={() => null}
						activateButtonCallback={handleActivateButtonCallback}
					/>
				</Paper>
			</div>
		</div>
	);
};

export default DoctorAndRxForm;
