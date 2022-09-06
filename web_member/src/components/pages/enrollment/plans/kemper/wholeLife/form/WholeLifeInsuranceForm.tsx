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

import "./wholeLifeInsurance.css";

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
				face_amount: null,
				weekly_premium: 0,
				accidental_death: 0,
				waiver_of_premium: 0
			},
			{
				face_amount: 100000.0,
				weekly_premium: 17.96,
				accidental_death: 0.48,
				waiver_of_premium: 0.46
			},
			{
				face_amount: 95000.0,
				weekly_premium: 17.06,
				accidental_death: 0.45,
				waiver_of_premium: 0.43
			},
			{
				face_amount: 90000.0,
				weekly_premium: 16.17,
				accidental_death: 0.43,
				waiver_of_premium: 0.41
			},
			{
				face_amount: 85000.0,
				weekly_premium: 15.27,
				accidental_death: 0.4,
				waiver_of_premium: 0.39
			},
			{
				face_amount: 80000.0,
				weekly_premium: 14.37,
				accidental_death: 0.38,
				waiver_of_premium: 0.36
			},
			{
				face_amount: 75000.0,
				weekly_premium: 13.47,
				accidental_death: 0.36,
				waiver_of_premium: 0.34
			},
			{
				face_amount: 70000.0,
				weekly_premium: 12.57,
				accidental_death: 0.33,
				waiver_of_premium: 0.32
			},
			{
				face_amount: 65000.0,
				weekly_premium: 11.68,
				accidental_death: 0.31,
				waiver_of_premium: 0.3
			},
			{
				face_amount: 60000.0,
				weekly_premium: 10.78,
				accidental_death: 0.28,
				waiver_of_premium: 0.27
			},
			{
				face_amount: 55000.0,
				weekly_premium: 9.88,
				accidental_death: 0.26,
				waiver_of_premium: 0.25
			},
			{
				face_amount: 50000.0,
				weekly_premium: 8.98,
				accidental_death: 0.24,
				waiver_of_premium: 0.23
			},
			{
				face_amount: 45000.0,
				weekly_premium: 8.08,
				accidental_death: 0.21,
				waiver_of_premium: 0.2
			},
			{
				face_amount: 40000.0,
				weekly_premium: 7.18,
				accidental_death: 0.19,
				waiver_of_premium: 0.18
			},
			{
				face_amount: 35000.0,
				weekly_premium: 6.29,
				accidental_death: 0.16,
				waiver_of_premium: 0.16
			},
			{
				face_amount: 30000.0,
				weekly_premium: 5.39,
				accidental_death: 0.14,
				waiver_of_premium: 0.13
			},
			{
				face_amount: 25000.0,
				weekly_premium: 4.49,
				accidental_death: 0.12,
				waiver_of_premium: 0.11
			},
			{
				face_amount: 20000.0,
				weekly_premium: 3.59,
				accidental_death: 0.09,
				waiver_of_premium: 0.09
			},
			{
				face_amount: 15000.0,
				weekly_premium: 2.69,
				accidental_death: 0.07,
				waiver_of_premium: 0.06
			},
			{
				face_amount: 10000.0,
				weekly_premium: 1.8,
				accidental_death: 0.04,
				waiver_of_premium: 0.04
			},
			{
				face_amount: 5000.0,
				weekly_premium: 0.9,
				accidental_death: 0.02,
				waiver_of_premium: 0.02
			}
		],
		spouse: [
			{
				face_amount: null,
				weekly_premium: 0,
				accidental_death: 0,
				waiver_of_premium: 0
			},
			{
				face_amount: 50000.0,
				weekly_premium: 11.12,
				accidental_death: 0.24,
				waiver_of_premium: 0.6
			},
			{
				face_amount: 45000.0,
				weekly_premium: 10.1,
				accidental_death: 0.21,
				waiver_of_premium: 0.54
			},
			{
				face_amount: 40000.0,
				weekly_premium: 8.98,
				accidental_death: 0.19,
				waiver_of_premium: 0.48
			},
			{
				face_amount: 35000.0,
				weekly_premium: 7.85,
				accidental_death: 0.16,
				waiver_of_premium: 0.42
			},
			{
				face_amount: 30000.0,
				weekly_premium: 6.73,
				accidental_death: 0.14,
				waiver_of_premium: 0.36
			},
			{
				face_amount: 25000.0,
				weekly_premium: 5.61,
				accidental_death: 0.12,
				waiver_of_premium: 0.3
			},
			{
				face_amount: 20000.0,
				weekly_premium: 4.49,
				accidental_death: 0.09,
				waiver_of_premium: 0.24
			},
			{
				face_amount: 15000.0,
				weekly_premium: 3.37,
				accidental_death: 0.07,
				waiver_of_premium: 0.18
			},
			{
				face_amount: 10000.0,
				weekly_premium: 2.24,
				accidental_death: 0.04,
				waiver_of_premium: 0.12
			},
			{
				face_amount: 5000.0,
				weekly_premium: 1.12,
				accidental_death: 0.02,
				waiver_of_premium: 0.06
			}
		]
	});
	const [children_plan, setChildrenPlan] = useState([
		{
			benefit_amount: null,
			premium: 0
		},
		{
			benefit_amount: 50000.0,
			premium: 3.69
		},
		{
			benefit_amount: 40000.0,
			premium: 2.95
		},
		{
			benefit_amount: 30000.0,
			premium: 2.22
		},
		{
			benefit_amount: 20000.0,
			premium: 1.48
		},
		{
			benefit_amount: 10000.0,
			premium: 0.74
		}
	]);
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [coverage_for, setCoverageFor] = useState("");
	const [memberFaceAmount, setMemberFaceAmount] = useState<null | number>(null);
	const [spouseFaceAmount, setSpouseFaceAmount] = useState<null | number>(null);
	const [childBenefitPlan, setChildBenefitPlan] = useState<null | number>(null);

	const [memberWeeklyPremium, setmemberWeeklyPremium] = useState<null | number>(null);
	const [memberAccidentalDeath, setmemberAccidentalDeath] = useState<null | number>(null);
	const [memberWaiverPremium, setmemberWaiverPremium] = useState<null | number>(null);
	const [spouseWeeklyPremium, setspouseWeeklyPremium] = useState<null | number>(null);
	const [spouseAccidentalDeath, setspouseAccidentalDeath] = useState<null | number>(null);
	const [spouseWaiverPremium, setspouseWaiverPremium] = useState<null | number>(null);
	const [childrenBenefitPremium, setchildrenBenefitPremium] = useState<number | null>(0);
	const [totalPremium, setTotalPremium] = useState<number>(0);

	const [isChildTermInsuarance, setIsChildTermInsuarance] = useState(false);
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

	const handleCoverageChange = (event: SelectChangeEvent) => {
		const { value } = event.target;
		setCoverageFor(value);
		if (value === "Employee Only") {
			setShowMember(true);
			setspouseAccidentalDeath(0);
			setspouseWaiverPremium(0);
			setspouseWeeklyPremium(0);
			setSpouseFaceAmount(null);
		} else {
			setShowMember(false);
		}
	};

	const handleChildrenBenefitAmount = (event: SelectChangeEvent) => {
		const { value } = event.target;
		if (value === "") {
			setChildBenefitPlan(null);
		} else {
			setChildBenefitPlan(parseInt(value));
		}
	};

	const handleCheckEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		setIsChildTermInsuarance(checked);
		if (!checked) {
			setChildBenefitPlan(null);
			setchildrenBenefitPremium(null);
		}
	};

	const handlePlanChange = (event: SelectChangeEvent) => {
		const { name, value } = event.target;
		if (name === "member_face_amount") {
			if (value === "") {
				setMemberFaceAmount(null);
			} else {
				setMemberFaceAmount(parseInt(value));
			}
		} else {
			if (value === "") {
				setSpouseFaceAmount(null);
			} else {
				setSpouseFaceAmount(parseInt(value));
			}
		}
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

	const findAmount = (premiumArray: any, value: any) => {
		return premiumArray.find((val: any, index: any) => {
			if (value !== null && value === val.face_amount) {
				return true;
			} else {
				return false;
			}
		});
	};

	useEffect(() => {
		const member_weekly_premium = findAmount(premium_plan.member, memberFaceAmount)?.weekly_premium
			? findAmount(premium_plan.member, memberFaceAmount).weekly_premium
			: 0;
		const member_accidental_death = findAmount(premium_plan.member, memberFaceAmount)?.accidental_death
			? findAmount(premium_plan.member, memberFaceAmount).accidental_death
			: 0;
		const member_waiver_premium = findAmount(premium_plan.member, memberFaceAmount)?.waiver_of_premium
			? findAmount(premium_plan.member, memberFaceAmount).waiver_of_premium
			: 0;
		const spouse_weekly_premium = findAmount(premium_plan.spouse, spouseFaceAmount)?.weekly_premium
			? findAmount(premium_plan.spouse, spouseFaceAmount).weekly_premium
			: 0;
		const spouse_accidental_death = findAmount(premium_plan.spouse, spouseFaceAmount)?.accidental_death
			? findAmount(premium_plan.spouse, spouseFaceAmount).accidental_death
			: 0;
		const spouse_waiver_premium = findAmount(premium_plan.spouse, spouseFaceAmount)?.waiver_of_premium
			? findAmount(premium_plan.spouse, spouseFaceAmount).waiver_of_premium
			: 0;
		const children_benefit_amount = children_plan.find((val: any, index: any) => {
			if (childBenefitPlan === val.benefit_amount) {
				return true;
			} else {
				return false;
			}
		})?.premium;
		const finalChildBenefitAmount = children_benefit_amount ? children_benefit_amount : 0;

		const total_premium =
			member_weekly_premium +
			member_waiver_premium +
			member_accidental_death +
			spouse_accidental_death +
			spouse_waiver_premium +
			spouse_weekly_premium +
			finalChildBenefitAmount;

		setmemberWeeklyPremium(member_weekly_premium);
		setmemberAccidentalDeath(member_accidental_death);
		setmemberWaiverPremium(member_waiver_premium);
		setspouseWeeklyPremium(spouse_weekly_premium);
		setspouseAccidentalDeath(spouse_accidental_death);
		setspouseWaiverPremium(spouse_waiver_premium);
		setchildrenBenefitPremium(finalChildBenefitAmount);
		setTotalPremium(total_premium);
	}, [
		coverage_for,
		benefit_amount,
		premium_plan.member,
		premium_plan.spouse,
		memberFaceAmount,
		spouseFaceAmount,
		children_plan,
		childBenefitPlan
	]);

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
								<Grid container columnSpacing={2}>
									<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label  required">Coverage For</div>
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
									<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label  required">Face Amount</div>
											<Select
												input={<CustomSelectInput />}
												style={{ width: "100%" }}
												name="member_face_amount"
												onChange={(event: SelectChangeEvent) => handlePlanChange(event)}
											>
												{premium_plan.member.map((mPlan, index) => {
													return (
														// eslint-disable-next-line react/jsx-key
														<MenuItem
															value={mPlan.face_amount === null ? "" : mPlan.face_amount}
														>
															{mPlan.face_amount === null ? "Select" : mPlan.face_amount}
														</MenuItem>
													);
												})}
											</Select>
										</div>
									</Grid>
									<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="details-form-label required align-center">Premium</div>
											<div className="show-premium">
												<div className="show-premium">
													{memberWeeklyPremium == 0
														? "$0.00"
														: `$${memberWeeklyPremium && memberWeeklyPremium.toFixed(2)}`}
												</div>
											</div>
										</div>
									</Grid>
								</Grid>
								<Grid container columnSpacing={2}>
									<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
										<div className="details-form-row margin-top-20">
											<div className="details-form-label">Accidental Death Chronic illness</div>
										</div>
									</Grid>
									<Grid item xl={5} lg={5} md={5} sm={6} xs={6}></Grid>
									<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="show-premium">
												<div className="show-premium">
													{memberAccidentalDeath == 0
														? "$0.00"
														: `$${
																memberAccidentalDeath &&
																memberAccidentalDeath.toFixed(2)
														  }`}
												</div>
											</div>
										</div>
									</Grid>
								</Grid>
								<Grid container columnSpacing={2}>
									<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
										<div className="details-form-row margin-top-20">
											<div className="details-form-label">Wavier Of Premium</div>
										</div>
									</Grid>
									<Grid item xl={5} lg={5} md={5} sm={6} xs={6}></Grid>
									<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
										<div className="details-form-row">
											<div className="show-premium">
												<div className="show-premium">
													{memberWaiverPremium == 0
														? "$0.00"
														: `$${memberWaiverPremium && memberWaiverPremium.toFixed(2)}`}
												</div>
											</div>
										</div>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</div>
					{/* Spouse */}
					<div
						className={
							coverage_for === "Employee Only" || coverage_for === ""
								? "hidden"
								: "header-container header-container-new margin-top-20"
						}
					>
						<div className="theme-plan-header">Spouse</div>
					</div>
					<Grid
						className={
							coverage_for === "Employee Only" || coverage_for === ""
								? "hidden"
								: "grid-container member-grid"
						}
						container
						columnSpacing={2}
					>
						<Grid container columnSpacing={2}>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label  required">Face Amount</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="spouse_face_amount"
										onChange={(event: any) => handlePlanChange(event)}
									>
										{premium_plan.spouse.map((mPlan, index) => {
											return (
												// eslint-disable-next-line react/jsx-key
												<MenuItem value={mPlan.face_amount ? mPlan.face_amount : ""}>
													{mPlan.face_amount ? mPlan.face_amount : "Select"}
												</MenuItem>
											);
										})}
									</Select>
								</div>
							</Grid>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}></Grid>
							<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label required align-center">Premium</div>
									<div className="show-premium">
										<div className="show-premium">
											{spouseWeeklyPremium == 0
												? "$0.00"
												: `$${spouseWeeklyPremium && spouseWeeklyPremium.toFixed(2)}`}
										</div>
									</div>
								</div>
							</Grid>
						</Grid>
						<Grid container columnSpacing={2}>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
								<div className="details-form-row margin-top-20">
									<div className="details-form-label">Accidental Death Chronic illness</div>
								</div>
							</Grid>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}></Grid>
							<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="show-premium">
										<div className="show-premium">
											{spouseAccidentalDeath == 0
												? "$0.00"
												: `$${spouseAccidentalDeath && spouseAccidentalDeath.toFixed(2)}`}
										</div>
									</div>
								</div>
							</Grid>
						</Grid>
						<Grid container columnSpacing={2}>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
								<div className="details-form-row margin-top-20">
									<div className="details-form-label">Wavier Of Premium</div>
								</div>
							</Grid>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}></Grid>
							<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="show-premium">
										<div className="show-premium">
											{spouseWaiverPremium == 0
												? "$0.00"
												: `$${spouseWaiverPremium && spouseWaiverPremium.toFixed(2)}`}
										</div>
									</div>
								</div>
							</Grid>
						</Grid>
					</Grid>
					{/* End Spouse */}

					{/* Child */}
					<div className="header-container-new margin-top-20">
						<div className="theme-plan-header">Child Term Life Insurance</div>
					</div>
					<Grid className="grid-container" container columnSpacing={2}>
						<Grid container columnSpacing={2}>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label">Benefit Amount</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="children_benefit_plan"
										onChange={(event: SelectChangeEvent) => handleChildrenBenefitAmount(event)}
									>
										{children_plan.map((option: any, index: number) => {
											return (
												<MenuItem
													value={option.benefit_amount ? option.benefit_amount : ""}
													key={index}
												>
													{option.benefit_amount ? option.benefit_amount : "Select"}
												</MenuItem>
											);
										})}
									</Select>
								</div>
							</Grid>
							<Grid item xl={5} lg={5} md={5} sm={6} xs={6}></Grid>
							<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
								<div className="details-form-row">
									<div className="details-form-label required align-center">Premium</div>
									<div className="show-premium">
										<div className="show-premium">
											{childrenBenefitPremium == 0
												? "$0.00"
												: `$${childrenBenefitPremium && childrenBenefitPremium.toFixed(2)}`}
										</div>
									</div>
								</div>
							</Grid>
						</Grid>
					</Grid>
					{/* End Child */}

					{totalPremium > 0 ? (
						<Grid container className="theme-plan-inner-section-margin">
							<Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
								<div className="details-form-row">
									<div
										className="details-form-label theme-plan-total-premium align-right"
										style={{ color: theme.primary_color }}
									>
										Total Premium:{" "}
										<span className="show-premium margin-adjust">
											{totalPremium == 0 ? "" : `$${totalPremium && totalPremium.toFixed(2)}`}
										</span>
									</div>
								</div>
							</Grid>
						</Grid>
					) : null}

					{/* <Grid item xl={2} lg={2} md={2} sm={6} xs={6} className="amount-middle">
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">
											{premium_amount == 0 ? "" : `$${premium_amount.toFixed(2)}`}
										</div>
									</div>
								</Grid> */}
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
