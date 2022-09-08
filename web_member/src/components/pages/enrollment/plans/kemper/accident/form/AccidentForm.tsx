import { Button, MenuItem } from "@mui/material";
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
			employee_and_family: 12.8
		},
		rider_doc_Rx: 1.16,
		rider_accidentOnly: [
			{
				coverage_amount: 600,
				premium_amount: 1.33
			},
			{
				coverage_amount: 900,
				premium_amount: 2.0
			},
			{
				coverage_amount: 1200,
				premium_amount: 2.67
			},
			{
				coverage_amount: 1800,
				premium_amount: 4.0
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

	const handleCoverageChange = (event: React.FormEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setCoverageFor(value);
	};

	const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setPlanType(value);
	};

	const handleRiderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
		setRiderType(value);
	};

	const handleRiderBenefitAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target as HTMLSelectElement;
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
		const rider_doc_amount = premium_plan.rider_doc_Rx;
		if (plan_type && coverage_for) {
			const planType = plan_type === "Edge Enhanced" ? "edge_enhanced" : "edge_premier";
			const coverageFor = coverage_for === "Employee Only" ? "employee" : "employee_and_family";
			const calculatePremiumAmount = premium_plan[planType][coverageFor];
			setPremiumAmount(calculatePremiumAmount);
			setTotalPremiumAmount(calculatePremiumAmount + rider_doc_amount);
			if (rider_type === "accident") {
				if (rider_benefit_amount !== 0) {
					const riderBenefit = premium_plan.rider_accidentOnly.find(
						// eslint-disable-next-line arrow-parens
						(benefit) => benefit.coverage_amount === rider_benefit_amount
					);
					const riderAmount =
						(riderBenefit?.premium_amount ? riderBenefit?.premium_amount : 0) +
						calculatePremiumAmount +
						rider_doc_amount;
					setRiderPremiumAmount(riderBenefit?.premium_amount ? riderBenefit?.premium_amount : 0);
					setTotalPremiumAmount(riderAmount);
				} else {
					setRiderPremiumAmount(0);
				}
			} else if (rider_type === "accident_sickness") {
				if (rider_benefit_amount !== 0) {
					const riderBenefit = premium_plan.rider_accident_and_sickness.find(
						// eslint-disable-next-line arrow-parens
						(benefit) => benefit.coverage_amount === rider_benefit_amount
					);
					const riderAmount =
						(riderBenefit?.premium_amount ? riderBenefit?.premium_amount : 0) +
						calculatePremiumAmount +
						rider_doc_amount;
					setRiderPremiumAmount(riderBenefit?.premium_amount ? riderBenefit?.premium_amount : 0);
					setTotalPremiumAmount(riderAmount);
				} else {
					setRiderPremiumAmount(0);
				}
			} else {
				setRiderPremiumAmount(0);
			}
		}
	};

	useEffect(() => {
		calculatePremium();
	}, [coverage_for, plan_type, rider_benefit_amount, rider_type]);

	const { plan_name, plan_code, start_date, end_date } = plan;

	return (
		<div className="kemper-cancer-form plan-form">
			<div className="paper-form-container">
				<Paper className="theme-border-radius paper-container" elevation={1}>
					<PlanHeader planName="Kemper Accident Insurance Policy" effectiveDate={start_date} />
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
					</div>
					<div className="plan-content">
						<div className="theme-plan-section-margin" />
						<div className="header-container header-container-new">
							<div className="theme-plan-header">Rider Benefits</div>
						</div>
						<div>
							<div
								className="theme-plan-sub-header plan-text"
								style={{ borderLeftColor: theme.primary_color }}
							>
								Disability income rider rates
							</div>
							<Grid className="grid-container" container columnSpacing={2}>
								<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label  required">Disability income rider type</div>
										<Select
											input={<CustomSelectInput />}
											style={{ width: "100%" }}
											name="contact_label"
											onChange={(event: any) => handleRiderChange(event)}
										>
											<MenuItem value={"no_rider"} className="empty-option"></MenuItem>
											<MenuItem value={"accident"}>Accident Only</MenuItem>
											<MenuItem value={"accident_sickness"}>Accident and Sickness</MenuItem>
										</Select>
									</div>
								</Grid>
								<Grid item xl={5} lg={5} md={5} sm={6} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label  required">Monthly disability benefit</div>
										<Select
											input={<CustomSelectInput />}
											style={{ width: "100%" }}
											name="contact_label"
											onChange={(event: any) => handleRiderBenefitAmountChange(event)}
										>
											<MenuItem value={0} className="empty-option"></MenuItem>
											<MenuItem value={600}>$600</MenuItem>
											<MenuItem value={900}>$900</MenuItem>
											<MenuItem value={1200}>$1200</MenuItem>
											<MenuItem value={1800}>$1800</MenuItem>
										</Select>
									</div>
								</Grid>
								<Grid item xl={2} lg={2} md={2} sm={6} xs={6} className="">
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">
											{rider_premium_amount == 0
												? "$0.00"
												: `$${rider_premium_amount.toFixed(2)}`}
										</div>
									</div>
								</Grid>
							</Grid>
						</div>
						<div>
							<div
								className="theme-plan-sub-header plan-text"
								style={{ borderLeftColor: theme.primary_color }}
							>
								Doctor & Rx
							</div>
							<Grid className="grid-container" container columnSpacing={2}>
								<Grid item xl={10} lg={10} md={10} sm={6} xs={6} className="margin-adjust-33">
									<input type="checkbox" disabled checked></input>
									<label className="details-form-label required">Doctor & RX</label>
								</Grid>
								<Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
									<div className="details-form-row">
										<div className="details-form-label required align-center">Premium</div>
										<div className="show-premium">
											{coverage_for && plan_type ? `$${premium_plan.rider_doc_Rx}` : "$0.00"}
										</div>
									</div>
								</Grid>
							</Grid>
						</div>
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
										{total_premium_amount == 0 ? "$0.00" : `$${total_premium_amount.toFixed(2)}`}
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
					<LazyPlanActions waiveButtonCallback={() => null} activateButtonCallback={() => null} />
				</Paper>
			</div>
		</div>
	);
};

export default KemperAccidentForm;
