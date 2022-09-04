import { Button, MenuItem, SelectChangeEvent } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { ThemeContext } from "../../../../../../../contexts";
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

// import "./shortTermDisabilityForm.css";

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

const KemperWholeLifeInsuaranceForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [plan, setPlan] = useState({
		plan_name: "Whole Life",
		plan_code: "plan001",
		start_date: "01/01/2023",
		end_date: "01/01/2024"
	});
	const [premium_plan, setPremiumPlan] = useState({
		member: [
			{
				face_amount: 100000.0,
				weekly_premium: 17.96,
				accidental_death: 0.48,
				waiver_of_premium: 0.46
			},
			{
				face_amount: 90000.0,
				weekly_premium: 15.96,
				accidental_death: 0.38,
				waiver_of_premium: 0.36
			},
			{
				face_amount: 80000.0,
				weekly_premium: 13.96,
				accidental_death: 0.28,
				waiver_of_premium: 0.26
			},
			{
				face_amount: 70000.0,
				weekly_premium: 11.96,
				accidental_death: 0.18,
				waiver_of_premium: 0.16
			}
		],
		spouse: [
			{
				face_amount: 100000.0,
				weekly_premium: 17.96,
				accidental_death: 0.48,
				waiver_of_premium: 0.46
			},
			{
				face_amount: 90000.0,
				weekly_premium: 15.96,
				accidental_death: 0.38,
				waiver_of_premium: 0.36
			},
			{
				face_amount: 80000.0,
				weekly_premium: 13.96,
				accidental_death: 0.28,
				waiver_of_premium: 0.26
			},
			{
				face_amount: 70000.0,
				weekly_premium: 11.96,
				accidental_death: 0.18,
				waiver_of_premium: 0.16
			}
		]
	});
	const [children_plan, setChildrenPlan] = useState([
		{
			benefit_amount: 60000.0,
			premium: 17.96
		},
		{
			benefit_amount: 50000.0,
			premium: 17.96
		},
		{
			benefit_amount: 40000.0,
			premium: 17.96
		}
	]);
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [coverage_for, setCoverageFor] = useState("");
	const [plan_type, setPlanType] = useState("");
	const [premium_amount, setPremiumAmount] = useState(0);
	const [benefit_amount, setBenefitAmount] = useState(0);
	const [total_premium_amount, setTotalPremiumAmount] = useState(0);
	const [expanded, setExpanded] = useState<string | false>("panel1");
	const [family_member, setFamilyMembers] = useState(["Rahul"]);
	const [family_member_amount, setFamilyMemberAmount] = useState([]);
	const [showMember, setShowMember] = useState(false);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const handleCoverageChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setCoverageFor(value);
		if (value !== "Employee Only") {
			setShowMember(true);
		} else {
			setShowMember(false);
		}
	};

	const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setPlanType(value);
	};

	const handleBenefitAmountChange = (event: SelectChangeEvent) => {
		const { value } = event.target as HTMLSelectElement;
		setBenefitAmount(parseInt(value));
	};

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
		const asd = "";
	};

	useEffect(() => {
		calculatePremium();
	}, [coverage_for, plan_type, benefit_amount]);

	const { plan_name, plan_code, start_date, end_date } = plan;

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader planName="Kemper Whole Life Insurance Policy" effectiveDate={start_date} />
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container header-container-new">
							<div className="theme-plan-header">Standard Benefits</div>
						</div>
						<div>
							<div
								className="theme-plan-sub-header plan-text"
								style={{ borderLeftColor: theme.primary_color }}
							>
								In addition to yourself, who would you like to cover under this plan?
							</div>
							<Grid className="grid-container" container columnSpacing={2}>
								<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
									<div className="details-form-row">
										<div className="details-form-label  required">Coverage For</div>
										<Select
											input={<CustomSelectInput />}
											style={{ width: "50%" }}
											name="contact_label"
											onChange={(event: any) => handleCoverageChange(event)}
										>
											{COVERAGE.map((option: string, index: number) => {
												return (
													<MenuItem value={option} key={index}>
														{option}
													</MenuItem>
												);
											})}
										</Select>
									</div>
								</Grid>
								{/* Member */}
								<div className="header-container header-container-new">
									<div className="theme-plan-header">Member</div>
								</div>
								<Grid className="grid-container" container columnSpacing={2}>
									<Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label  required">Face Amount</div>
											<Select
												input={<CustomSelectInput />}
												style={{ width: "100%" }}
												name="contact_label"
												onChange={(event: any) => handlePlanChange(event)}
											>
												{premium_plan.member.map((mPlan, index) => {
													return (
														// eslint-disable-next-line react/jsx-key
														<MenuItem value={mPlan.face_amount}>
															{mPlan.face_amount}
														</MenuItem>
													);
												})}
											</Select>
										</div>
									</Grid>
									<Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label">Weekly Premium</div>
											<CustomInput value={writingNumber} />
										</div>
									</Grid>
									<Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label">Accidental Death Chronic illness</div>
											<CustomInput value={writingNumber} onChange={handleWritingNumberChange} />
										</div>
									</Grid>
									<Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label">Wavier Of Premium</div>
											<CustomInput value={writingNumber} onChange={handleWritingNumberChange} />
										</div>
									</Grid>
								</Grid>
								{/* End Member */}
								{/* Spouse */}
								<div className="header-container header-container-new">
									<div className="theme-plan-header">Spouse</div>
								</div>
								<Grid className="grid-container" container columnSpacing={2}>
									<Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label  required">Face Amount</div>
											<Select
												input={<CustomSelectInput />}
												style={{ width: "100%" }}
												name="contact_label"
												onChange={(event: any) => handlePlanChange(event)}
											>
												{premium_plan.member.map((mPlan, index) => {
													return (
														// eslint-disable-next-line react/jsx-key
														<MenuItem value={mPlan.face_amount}>
															{mPlan.face_amount}
														</MenuItem>
													);
												})}
											</Select>
										</div>
									</Grid>
									<Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label">Weekly Premium</div>
											<CustomInput value={writingNumber} />
										</div>
									</Grid>
									<Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label">Accidental Death Chronic illness</div>
											<CustomInput value={writingNumber} onChange={handleWritingNumberChange} />
										</div>
									</Grid>
									<Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label">Wavier Of Premium</div>
											<CustomInput value={writingNumber} onChange={handleWritingNumberChange} />
										</div>
									</Grid>
								</Grid>
								{/* End Spouse */}
								<div className="theme-plan-option-content">
									<Checkbox defaultChecked style={{ paddingLeft: 0 }} />
									<p className="theme-plan-checkbox-label">
										<strong>Child Term Life Insuarance</strong>
									</p>
								</div>
								<Grid className="grid-container" container columnSpacing={2}>
									<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
										<div className="details-form-row">
											<div className="details-form-label">Benefit Amount</div>
											<Select
												input={<CustomSelectInput />}
												style={{ width: "100%" }}
												name="contact_label"
												onChange={(event: any) => handleCoverageChange(event)}
											>
												{COVERAGE.map((option: string, index: number) => {
													return (
														<MenuItem value={option} key={index}>
															{option}
														</MenuItem>
													);
												})}
											</Select>
										</div>
									</Grid>
									<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
										<div className="details-form-row">
											<div className="details-form-label">Premium</div>
											<CustomInput value={writingNumber} onChange={handleWritingNumberChange} />
										</div>
									</Grid>
								</Grid>

								<div className="details-form-row">
									<div className="details-form-label required align-center">Premium</div>
									<div className="show-premium">{11.88}</div>
								</div>

								{/* <Grid item xl={2} lg={2} md={2} sm={6} xs={6} className="amount-middle">
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">
											{premium_amount == 0 ? "" : `$${premium_amount.toFixed(2)}`}
										</div>
									</div>
								</Grid> */}
							</Grid>
						</div>
						{showMember &&
							family_member.map((member, index) => {
								return (
									// eslint-disable-next-line react/jsx-key
									<div>
										<div className="member-name">{member}</div>
										<Grid className="grid-container" container columnSpacing={2}>
											<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
												<div className="details-form-row">
													<div className="details-form-label  required">Benefit Amount</div>
													<Select
														input={<CustomSelectInput />}
														style={{ width: "100%" }}
														name="contact_label"
														onChange={(event: SelectChangeEvent) =>
															handleBenefitAmountChange(event)
														}
													>
														<MenuItem value={350}>350.00</MenuItem>
														<MenuItem value={300}>300.00</MenuItem>
														<MenuItem value={250}>250.00</MenuItem>
														<MenuItem value={200}>200.00</MenuItem>
														<MenuItem value={150}>150.00</MenuItem>
														<MenuItem value={100}>100.00</MenuItem>
													</Select>
												</div>
											</Grid>
											<Grid item xl={5} lg={5} md={5} sm={6} xs={6}></Grid>
											<Grid item xl={2} lg={2} md={2} sm={6} xs={6} className="amount-middle">
												<div className="details-form-row">
													<div className="details-form-label required align-center">
														Premium
													</div>
													<div className="show-premium">
														{premium_amount == 0 ? "" : `$${premium_amount.toFixed(2)}`}
													</div>
												</div>
											</Grid>
										</Grid>
									</div>
								);
							})}
					</div>
					<div className="accordion-container">
						<Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
							<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
								<Typography>Questions</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									No eligibility questions are required for the selected coverage, please press next.
								</Typography>
							</AccordionDetails>
						</Accordion>
					</div>
					<div className="theme-plan-inner-section-margin" />
					{total_premium_amount > 0 ? (
						<Grid container className="theme-plan-inner-section-margin">
							<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
								<div className="details-form-row">
									<div
										className="details-form-label theme-plan-total-premium align-right"
										style={{ color: theme.primary_color }}
									>
										Total Premium:{" "}
										<span className="show-premium margin-adjust">
											{total_premium_amount == 0 ? "" : `$${total_premium_amount.toFixed(2)}`}
										</span>
									</div>
								</div>
							</Grid>
						</Grid>
					) : null}
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
					<LazyPlanActions waiveButtonCallback={() => null} activateButtonCallback={() => null} />
				</Paper>
			</div>
		</div>
	);
};

export default KemperWholeLifeInsuaranceForm;
