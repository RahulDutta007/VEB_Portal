import { Button, MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Grid, Paper } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { COVERAGE } from "../../../../../../../constants/coverage";
import { ThemeContext } from "../../../../../../../contexts";
import { AccidentPlanContext } from "../../../../../../../contexts";
import { LazyPlanActions, PlanHeader } from "../../../../../../shared";
import CustomInput from "../../../../../../shared/customInput/CustomInput";
import CustomSelectInput from "../../../../../../shared/customInput/CustomSelectInput";
import { Checkbox } from "@mui/material";
import { useState } from "react";
import { useCallback } from "react";

import "./accidentForm.css";

const KemperAccidentForm = (): JSX.Element => {
	const [writingNumber, setWritingNumber] = useState(1408);
	const [plan, setPlan] = useState({
		plan_name: "Accident",
		plan_code: "plan001",
		start_date: "01/01/2023",
		end_date: "01/01/2024"
	});
	const [premium_plan, setPremiumPlan] = useState({
		edge_enhanced: {
			employee: 3.82,
			employee_and_family: 8.08
		},
		edge_premier: {
			employee: 6.07,
			employee_and_family: 12.80
		},
		rider_accidentOnly: [
			{
				coverage_amount: 600,
				premium_amount: 1.33
			},
			{
				coverage_amount: 900,
				premium_amount: 2.00
			},
			{
				coverage_amount: 1200,
				premium_amount: 2.67
			},
			{
				coverage_amount: 1800,
				premium_amount: 4.00
			}
		],
		rider_accident_and_sickness: [
			{
				coverage_amount: 600,
				premium_amount: 5.86
			},
			{
				coverage_amount: 900,
				premium_amount: 8.79
			},
			{
				coverage_amount: 1200,
				premium_amount: 11.72
			},
			{
				coverage_amount: 1800,
				premium_amount: 17.59
			}
		]
	});
	const [prevWritingNumber, setPrevWritingNumber] = useState(1408);
	const [showWritingNumberValidateButton, setShowWritingNumberValidateButton] = useState(false);
	const { theme } = useContext(ThemeContext);
	const [coverage_for, setCoverageFor] = useState("");
	const [plan_type, setPlanType] = useState("");
	const [premium_amount, setPremiumAmount] = useState(0);
	const [rider_premium_amount, setRiderPremiumAmount] = useState(0);
	const [total_premium_amount, setTotalPremiumAmount] = useState(0);
	const [rider_type, setRiderType] = useState("none");
	const [rider_benefit_amount, setRiderBenefitAmount] = useState(0);
	const { accidentPlan, setAccidentPlan } = useContext(AccidentPlanContext);

	const handleCoverageChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setAccidentPlan(Object.assign({}, accidentPlan, { coverage_for: value }));
		setCoverageFor(value);
	};

	const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setAccidentPlan(Object.assign({}, accidentPlan, { plan_type: value }));
		setPlanType(value);
	};

	const handleRiderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setAccidentPlan(Object.assign({}, accidentPlan, { rider_type: value }));
		setRiderType(value);
	};

	const handleRiderBenefitAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setAccidentPlan(Object.assign({}, accidentPlan, { rider_benefit_amount: value }));
		setRiderBenefitAmount(parseInt(value));
		setRiderBenefitAmount(parseInt(value));
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
		const { plan_type, coverage_for } = accidentPlan;
		if (plan_type && coverage_for) {
			const planType = (plan_type === "Edge Enhanced" ? "edge_enhanced" : "edge_premier");
			const coverageFor = (coverage_for === "Employee Only" ? "employee" : "employee_and_family");
			const calculatePremiumAmount = premium_plan[planType][coverageFor];
			setPremiumAmount(calculatePremiumAmount);
			setTotalPremiumAmount(calculatePremiumAmount);
			if (rider_type === "accident") {
				if (rider_benefit_amount !== 0) {
					const riderBenefit = premium_plan.rider_accidentOnly.find(benefit => benefit.coverage_amount === rider_benefit_amount);
					const riderAmount = (riderBenefit?.premium_amount ? riderBenefit?.premium_amount : 0) + calculatePremiumAmount;
					setRiderPremiumAmount(riderBenefit?.premium_amount ? riderBenefit?.premium_amount : 0);
					setTotalPremiumAmount(riderAmount);
				}
			}
			else if (rider_type === "accident_sickness") {
				if (rider_benefit_amount !== 0) {
					const riderBenefit = premium_plan.rider_accident_and_sickness.find(benefit => benefit.coverage_amount === rider_benefit_amount);
					const riderAmount = (riderBenefit?.premium_amount ? riderBenefit?.premium_amount : 0) + calculatePremiumAmount;
					setRiderPremiumAmount(riderBenefit?.premium_amount ? riderBenefit?.premium_amount : 0);
					setTotalPremiumAmount(riderAmount);
				}
			} else {
				// do nothing
			}
		}

	};

	useEffect(() => {
		calculatePremium();
	}, [accidentPlan]);

	const { plan_name, plan_code, start_date, end_date } = plan;
	console.log(111, accidentPlan);

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader planName="Kemper Group Accident Insurance Policy" effectiveDate={start_date} />
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container">
							<div className="theme-plan-header">Standard Benefits</div>
							<div className="theme-plan-sub-header" style={{ borderLeftColor: theme.primary_color }}>
								In addition to yourself, who would you like to cover under this plan?
							</div>
						</div>
						<div className="theme-plan-inner-section-margin-2" />
						<Grid container columnSpacing={2}>
							<Grid item xl={6} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label  required">Coverage</div>
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
							<Grid item xl={6} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label  required">Coverage Level</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="contact_label"
										onChange={(event: any) => handlePlanChange(event)}
									>
										<MenuItem value={"Edge Enhanced"}>Edge Enhanced</MenuItem>
										<MenuItem value={"Edge Premier"}>Edge Premier</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label required">Standard Premium</div>
									<CustomInput disabled value={premium_amount == 0 ? "" : `$${premium_amount}`} />
								</div>
							</Grid>
						</Grid>
						<div className="theme-plan-inner-section-margin" />
						<div className="header-container">
							<div className="theme-plan-header">Rider Benefits</div>
							<div className="theme-plan-sub-header" style={{ borderLeftColor: theme.primary_color }}>
								Disability income rider rates
							</div>
						</div>
						<div className="theme-plan-inner-section-margin" />
						<Grid container className="theme-plan-section-margin">
							<Grid item xl={6} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label  required">Disability income rider type</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="contact_label"
										onChange={(event: any) => handleRiderChange(event)}
									>
										<MenuItem value={"accident"}>Accident Only</MenuItem>
										<MenuItem value={"accident_sickness"}>Accident and Sickness</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={6} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label  required">Monthly disability benefit</div>
									<Select
										input={<CustomSelectInput />}
										style={{ width: "100%" }}
										name="contact_label"
										onChange={(event: any) => handleRiderBenefitAmountChange(event)}
									>
										<MenuItem value={600}>600</MenuItem>
										<MenuItem value={900}>900</MenuItem>
										<MenuItem value={1200}>1200</MenuItem>
										<MenuItem value={1800}>1800</MenuItem>
									</Select>
								</div>
							</Grid>
							<Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div className="details-form-label required">
										Disability income - Rider Premium
									</div>
									<CustomInput disabled value={rider_premium_amount == 0 ? "" : `$${rider_premium_amount}`} />
								</div>
							</Grid>
						</Grid>
						<div className="theme-plan-inner-section-margin" />
						<Grid container className="theme-plan-inner-section-margin">
							<Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
								<div className="details-form-row">
									<div
										className="details-form-label theme-plan-total-premium"
										style={{ color: theme.primary_color }}
									>
										Total Premium
									</div>
									<CustomInput disabled value={total_premium_amount == 0 ? "" : `$${total_premium_amount}`} />
								</div>
							</Grid>
						</Grid>
					</div>
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

export default KemperAccidentForm;
